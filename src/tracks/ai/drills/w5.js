/* Week 5 syntax drills: HTTP clients, scraping, async, FastAPI backends, databases, settings, and the capstone patterns. */
export default {

"w5-1": [
 { q: "GET JSON from an API with query parameters, a timeout and error handling.", s: [
   { t: "requests", c: String.raw`import requests

def get_posts(user_id: int) -> list[dict]:
    try:
        r = requests.get(
            "https://jsonplaceholder.typicode.com/posts",
            params={"userId": user_id},       # becomes ?userId=1
            timeout=10,                       # always set a timeout
        )
        r.raise_for_status()                  # 4xx/5xx -> HTTPError
    except requests.exceptions.Timeout:
        print("API too slow")
        return []
    except requests.exceptions.HTTPError as e:
        print("Bad status:", e.response.status_code)
        return []
    return r.json()

posts = get_posts(1)
print(len(posts), posts[0]["title"] if posts else None)`,
     e: "params builds the query string for you, raise_for_status turns error codes into exceptions, and timeout stops your server hanging forever on a slow API." },
   { t: "httpx", c: String.raw`import httpx

with httpx.Client(base_url="https://jsonplaceholder.typicode.com", timeout=10) as client:
    r = client.get("/posts", params={"userId": 1})
    r.raise_for_status()
    print(len(r.json()))`,
     e: "httpx has almost the same API as requests, plus async support. A Client reuses connections, which is faster for many calls." },
 ]},
 { q: "POST JSON with headers (an auth token) and read the response.", s: [
   { c: String.raw`import os
import requests

headers = {"Authorization": f"Bearer {os.getenv('API_TOKEN', 'demo-token')}"}
payload = {"title": "Hello", "body": "From Python", "userId": 1}

r = requests.post("https://jsonplaceholder.typicode.com/posts",
                  json=payload, headers=headers, timeout=10)
print(r.status_code)          # 201 Created
print(r.json())               # the server's reply, parsed
print(r.headers["Content-Type"])`,
     e: "json= serialises the dict and sets Content-Type: application/json for you. Read the token from an environment variable, never hard-code it." },
 ]},
 { q: "Reuse a Session with automatic retries and backoff.", s: [
   { c: String.raw`import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(total=3, backoff_factor=0.5, status_forcelist=[429, 500, 502, 503, 504])
session.mount("https://", HTTPAdapter(max_retries=retries))
session.headers.update({"User-Agent": "zero-to-ai/1.0"})

r = session.get("https://jsonplaceholder.typicode.com/users/1", timeout=10)
print(r.json()["name"])`,
     e: "A Session keeps connections and default headers. Retry with backoff_factor waits 0.5s, 1s, 2s between attempts, which handles rate limits (429) and brief outages." },
 ]},
 { q: "Download a large file in chunks without loading it into memory.", s: [
   { c: String.raw`import requests

url = "https://www.python.org/static/img/python-logo.png"
with requests.get(url, stream=True, timeout=30) as r:
    r.raise_for_status()
    with open("logo.png", "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)
print("saved")`,
     e: "stream=True plus iter_content writes the file piece by piece. \"wb\" opens the file in binary mode." },
 ]},
],

"w5-2": [
 { q: "Scrape titles and links from an HTML page with BeautifulSoup.", s: [
   { c: String.raw`from bs4 import BeautifulSoup

html = """
<html><body>
  <h1>Blog</h1>
  <div class="post"><a href="/p/1">First post</a><span class="date">2026-01-01</span></div>
  <div class="post"><a href="/p/2">Second post</a><span class="date">2026-02-01</span></div>
</body></html>
"""
soup = BeautifulSoup(html, "html.parser")

print(soup.h1.text)                              # Blog
for post in soup.find_all("div", class_="post"):
    link = post.find("a")
    print(link.text, link["href"], post.select_one(".date").get_text(strip=True))

print([a["href"] for a in soup.select("div.post a")])   # CSS selectors`,
     e: "find returns the first match, find_all every match, select uses CSS selectors. Tag attributes read like a dict: link[\"href\"]." },
 ]},
 { q: "Fetch a real page politely and turn an HTML table into a list of dicts.", s: [
   { c: String.raw`import requests
from bs4 import BeautifulSoup

r = requests.get("https://www.w3schools.com/html/html_tables.asp",
                 headers={"User-Agent": "Mozilla/5.0 (learning project)"}, timeout=10)
soup = BeautifulSoup(r.text, "html.parser")

table = soup.find("table")
headers = [th.get_text(strip=True) for th in table.find_all("th")]
rows = []
for tr in table.find_all("tr")[1:]:
    cells = [td.get_text(strip=True) for td in tr.find_all("td")]
    rows.append(dict(zip(headers, cells)))
print(rows[:2])`,
     e: "zip(headers, cells) pairs each column name with its value. Check robots.txt and the site's terms, send a User-Agent, and add time.sleep between requests." },
 ]},
],

"w5-3": [
 { q: "Write your first async function and run it.", s: [
   { c: String.raw`import asyncio

async def greet(name, delay):
    await asyncio.sleep(delay)       # non-blocking wait
    return f"hello {name}"

async def main():
    result = await greet("asha", 1)
    print(result)

asyncio.run(main())                  # the entry point for async code`,
     e: "async def makes a coroutine; await pauses it until the result is ready, letting other work run meanwhile. asyncio.run starts the event loop." },
 ]},
 { q: "Run several tasks concurrently with asyncio.gather and time the difference.", s: [
   { c: String.raw`import asyncio
import time

async def fake_api(n):
    await asyncio.sleep(1)           # pretend network call
    return n * 10

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(*(fake_api(i) for i in range(5)))
    print(results, f"{time.perf_counter() - start:.1f}s")   # ~1s, not 5s

asyncio.run(main())`,
     e: "gather starts all coroutines at once and waits for all of them. Five 1-second waits finish in about 1 second total." },
 ]},
 { q: "Fetch many URLs concurrently with httpx, limited to 3 at a time.", s: [
   { c: String.raw`import asyncio
import httpx

URLS = [f"https://jsonplaceholder.typicode.com/posts/{i}" for i in range(1, 11)]

async def fetch(client, sem, url):
    async with sem:                          # at most 3 requests in flight
        r = await client.get(url, timeout=10)
        r.raise_for_status()
        return r.json()["id"]

async def main():
    sem = asyncio.Semaphore(3)
    async with httpx.AsyncClient() as client:
        ids = await asyncio.gather(*(fetch(client, sem, u) for u in URLS))
    print(ids)

asyncio.run(main())`,
     e: "A Semaphore caps concurrency so you don't overload the API or hit rate limits. async with is the async version of with." },
 ]},
 { q: "Add a timeout to an async call, and handle errors from gather.", s: [
   { c: String.raw`import asyncio

async def slow():
    await asyncio.sleep(5)
    return "done"

async def broken():
    raise ValueError("boom")

async def main():
    try:
        await asyncio.wait_for(slow(), timeout=1)
    except asyncio.TimeoutError:
        print("timed out")

    results = await asyncio.gather(broken(), asyncio.sleep(0, "ok"), return_exceptions=True)
    for r in results:
        print("error:" if isinstance(r, Exception) else "value:", r)

asyncio.run(main())`,
     e: "wait_for cancels a coroutine that takes too long. return_exceptions=True makes gather return errors as values instead of failing the whole batch." },
 ]},
 { q: "Run blocking code (like requests or a heavy function) without freezing async code.", s: [
   { c: String.raw`import asyncio
import time

def blocking_work(n):
    time.sleep(1)                    # a normal, blocking function
    return n * n

async def main():
    results = await asyncio.gather(*(asyncio.to_thread(blocking_work, i) for i in range(4)))
    print(results)                   # ~1s total

asyncio.run(main())`,
     e: "Calling time.sleep or requests inside async code blocks the whole event loop. asyncio.to_thread runs it in a worker thread instead." },
 ]},
],

"w5-4": [
 { q: "Hello FastAPI: a GET route with a path parameter and query parameters.", s: [
   { c: String.raw`# main.py   ->   run: uv run fastapi dev main.py   (docs at /docs)
from fastapi import FastAPI

app = FastAPI(title="Demo API")

@app.get("/")
def root():
    return {"message": "hello"}             # dicts become JSON automatically

@app.get("/users/{user_id}")
def get_user(user_id: int, verbose: bool = False):   # path param + query param
    return {"id": user_id, "verbose": verbose}

# GET /users/42?verbose=true  ->  {"id": 42, "verbose": true}
# GET /users/abc              ->  422 error: user_id must be an int`,
     e: "Type hints do the work: FastAPI converts and validates parameters and documents them at /docs. Anything in the path is a path param; other arguments are query params." },
 ]},
 { q: "Validate a request body with a Pydantic model and return a response model.", s: [
   { c: String.raw`from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

class UserIn(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    email: EmailStr                      # needs: uv add "pydantic[email]"
    age: int = Field(ge=13, le=120)
    password: str = Field(min_length=8)

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

@app.post("/users", response_model=UserOut, status_code=201)
def create_user(user: UserIn):
    # response_model filters the output: password is never returned
    return {"id": 1, **user.model_dump()}`,
     e: "A Pydantic model as a parameter means 'read this from the JSON body and validate it'. Separate In and Out models stop secrets like passwords leaking in responses." },
 ]},
 { q: "Full CRUD API for todos with 404 handling (in-memory).", s: [
   { c: String.raw`from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

class TodoIn(BaseModel):
    title: str
    done: bool = False

class Todo(TodoIn):
    id: int

todos: dict[int, Todo] = {}
next_id = 1

@app.get("/todos", response_model=list[Todo])
def list_todos(done: bool | None = None, limit: int = 20, offset: int = 0):
    items = [t for t in todos.values() if done is None or t.done == done]
    return items[offset:offset + limit]                  # simple pagination

@app.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    if todo_id not in todos:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todos[todo_id]

@app.post("/todos", response_model=Todo, status_code=status.HTTP_201_CREATED)
def create_todo(data: TodoIn):
    global next_id
    todo = Todo(id=next_id, **data.model_dump())
    todos[next_id] = todo
    next_id += 1
    return todo

@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, data: TodoIn):
    get_todo(todo_id)                                    # reuse the 404 check
    todos[todo_id] = Todo(id=todo_id, **data.model_dump())
    return todos[todo_id]

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int):
    get_todo(todo_id)
    del todos[todo_id]`,
     e: "GET reads, POST creates (201), PUT replaces, DELETE removes (204). Raise HTTPException for errors, and FastAPI turns it into the right status code and JSON." },
 ]},
 { q: "Use a SQLite database with the built-in sqlite3 module (parameterised queries).", s: [
   { c: String.raw`import sqlite3

conn = sqlite3.connect("app.db")
conn.row_factory = sqlite3.Row            # rows behave like dicts

conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
""")

with conn:                                # commits, or rolls back on error
    conn.execute("INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)", ("Asha", "asha@mail.com"))
    conn.executemany("INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)",
                     [("Ben", "ben@mail.com"), ("Chen", "chen@mail.com")])

email = "asha@mail.com"
row = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
print(dict(row))
print([dict(r) for r in conn.execute("SELECT id, name FROM users ORDER BY name")])

with conn:
    conn.execute("UPDATE users SET name = ? WHERE id = ?", ("Asha R", row["id"]))
    conn.execute("DELETE FROM users WHERE email = ?", ("chen@mail.com",))
conn.close()

# NEVER: f"SELECT * FROM users WHERE email = '{email}'"  -> SQL injection`,
     e: "Always use ? placeholders and pass values separately; the driver escapes them, which prevents SQL injection. with conn: wraps the statements in a transaction." },
 ]},
 { q: "Define models and query with SQLAlchemy 2.0 ORM.", s: [
   { c: String.raw`# uv add sqlalchemy
from sqlalchemy import create_engine, String, ForeignKey, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    posts: Mapped[list["Post"]] = relationship(back_populates="author")

class Post(Base):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    author: Mapped[User] = relationship(back_populates="posts")

engine = create_engine("sqlite:///orm.db", echo=False)
Base.metadata.create_all(engine)

with Session(engine) as session:
    asha = User(name="Asha", posts=[Post(title="Hello"), Post(title="RAG tips")])
    session.add(asha)
    session.commit()

    user = session.scalars(select(User).where(User.name == "Asha")).first()
    print(user.name, [p.title for p in user.posts])`,
     e: "Each class is a table, each Mapped attribute a column, relationship links tables. select(...).where(...) builds SQL for you; session.commit() saves." },
 ]},
 { q: "Share a database session with FastAPI's Depends.", s: [
   { c: String.raw`import sqlite3
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException

app = FastAPI()

def get_db():
    conn = sqlite3.connect("app.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn                     # handed to the route
    finally:
        conn.close()                   # runs after the response

DB = Annotated[sqlite3.Connection, Depends(get_db)]

@app.get("/users/{user_id}")
def read_user(user_id: int, db: DB):
    row = db.execute("SELECT id, name, email FROM users WHERE id = ?", (user_id,)).fetchone()
    if row is None:
        raise HTTPException(404, "User not found")
    return dict(row)`,
     e: "Depends runs get_db for each request and injects the result. A yield dependency gives you setup and guaranteed cleanup, like a context manager. Tests can swap it out with app.dependency_overrides." },
 ]},
 { q: "Protect routes with an API key header, and hash passwords.", s: [
   { c: String.raw`import hashlib
import hmac
import os
import secrets
from fastapi import Depends, FastAPI, Header, HTTPException

app = FastAPI()
API_KEY = os.getenv("API_KEY", "dev-key")

def require_api_key(x_api_key: str = Header()):       # reads the X-API-Key header
    if not hmac.compare_digest(x_api_key, API_KEY):    # constant-time compare
        raise HTTPException(status_code=401, detail="Invalid API key")

@app.get("/admin/stats", dependencies=[Depends(require_api_key)])
def stats():
    return {"users": 42}

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 200_000).hex()
    return f"{salt}:{digest}"

def verify_password(password: str, stored: str) -> bool:
    salt, digest = stored.split(":")
    check = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 200_000).hex()
    return hmac.compare_digest(check, digest)

h = hash_password("s3cret-pass")
print(verify_password("s3cret-pass", h), verify_password("wrong", h))`,
     e: "Never store plain passwords: store a salted, slow hash (PBKDF2 here; bcrypt or argon2 via a library in production). compare_digest avoids timing attacks. For user logins you'd add JWT tokens (e.g. PyJWT) on top." },
 ]},
 { q: "Add middleware for request timing, CORS for a React frontend, and a global error handler.", s: [
   { c: String.raw`import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

log = logging.getLogger("api")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # your frontend's URL, not "*" in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_timing(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Process-Time"] = f"{time.perf_counter() - start:.4f}"
    return response

class OutOfStock(Exception):
    def __init__(self, item):
        self.item = item

@app.exception_handler(OutOfStock)
async def out_of_stock_handler(request: Request, exc: OutOfStock):
    return JSONResponse(status_code=409, content={"error": f"{exc.item} is out of stock"})

@app.get("/buy/{item}")
def buy(item: str):
    raise OutOfStock(item)`,
     e: "Middleware runs around every request. CORS lets a browser app on another origin call your API. Exception handlers turn your own domain errors into clean HTTP responses in one place." },
 ]},
 { q: "Organise routes with APIRouter, and run work after the response with BackgroundTasks.", s: [
   { c: String.raw`from fastapi import APIRouter, BackgroundTasks, FastAPI

router = APIRouter(prefix="/emails", tags=["emails"])

def send_email(to: str, subject: str):
    print(f"sending '{subject}' to {to}")    # slow work: SMTP, logging, webhooks

@router.post("/welcome/{address}", status_code=202)
def welcome(address: str, background: BackgroundTasks):
    background.add_task(send_email, address, "Welcome!")
    return {"queued": True}                  # responds immediately

app = FastAPI()
app.include_router(router)                   # POST /emails/welcome/{address}`,
     e: "APIRouter splits a big app into files (users.py, orders.py) that main.py includes. BackgroundTasks is for small jobs; heavy jobs belong in a queue like Celery or RQ." },
 ]},
 { q: "Test a FastAPI app with TestClient.", s: [
   { c: String.raw`# test_main.py
from fastapi.testclient import TestClient
from main import app          # the todo CRUD app from the drill above

client = TestClient(app)

def test_create_and_get_todo():
    r = client.post("/todos", json={"title": "learn pytest"})
    assert r.status_code == 201
    todo_id = r.json()["id"]

    r = client.get(f"/todos/{todo_id}")
    assert r.status_code == 200
    assert r.json()["title"] == "learn pytest"

def test_missing_todo_returns_404():
    assert client.get("/todos/9999").status_code == 404

def test_validation_error():
    assert client.post("/todos", json={}).status_code == 422`,
     e: "TestClient calls your app in-process, no server needed. Test the happy path, the not-found path and the validation path for every endpoint." },
 ]},
 { q: "Write an async endpoint that calls an external API with a shared httpx client.", s: [
   { c: String.raw`from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI, HTTPException, Request

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.http = httpx.AsyncClient(timeout=10)   # created once at startup
    yield
    await app.state.http.aclose()                    # closed at shutdown

app = FastAPI(lifespan=lifespan)

@app.get("/github/{username}")
async def github_user(username: str, request: Request):
    r = await request.app.state.http.get(f"https://api.github.com/users/{username}")
    if r.status_code == 404:
        raise HTTPException(404, "GitHub user not found")
    r.raise_for_status()
    data = r.json()
    return {"login": data["login"], "repos": data["public_repos"]}`,
     e: "Use async def when the route awaits I/O. lifespan creates shared resources (HTTP clients, DB pools, ML models) once instead of per request." },
 ]},
],

"w5-5": [
 { q: "Read environment variables with defaults, and fail fast when a required one is missing.", s: [
   { c: String.raw`import os

DEBUG = os.getenv("DEBUG", "false").lower() == "true"     # env vars are always strings
PORT = int(os.getenv("PORT", "8000"))

def require(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required env var {name}")
    return value

os.environ["DATABASE_URL"] = "sqlite:///app.db"   # normally set outside Python
print(DEBUG, PORT, require("DATABASE_URL"))`,
     e: "os.getenv returns None (or your default) when unset. Convert types yourself, and crash at startup if a required secret is missing rather than at the first request." },
 ]},
 { q: "Load a .env file with python-dotenv, and keep it out of Git.", s: [
   { c: String.raw`# .env  (add ".env" to .gitignore; commit a .env.example with dummy values)
# OPENAI_API_KEY=sk-...
# DATABASE_URL=postgresql://user:pass@localhost/app

# uv add python-dotenv
import os
from dotenv import load_dotenv

load_dotenv()                     # reads .env into os.environ (won't override real env vars)
key = os.getenv("OPENAI_API_KEY")
print("key loaded" if key else "no key set")`,
     e: "Secrets go in .env locally and in the platform's secret settings in production. .env.example documents which variables are needed." },
 ]},
 { q: "Typed, validated settings with pydantic-settings.", s: [
   { c: String.raw`# uv add pydantic-settings
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Zero to AI API"
    debug: bool = False
    database_url: str = "sqlite:///app.db"
    openai_api_key: str = ""
    max_upload_mb: int = 10

@lru_cache                      # read once, reuse everywhere
def get_settings() -> Settings:
    return Settings()

s = get_settings()
print(s.app_name, s.debug, s.max_upload_mb)   # DEBUG=true in env -> s.debug is True`,
     e: "Fields map to env vars by name (case-insensitive) and are converted and validated. This is the standard settings pattern in FastAPI projects." },
 ]},
],

"w5-6": [
 { q: "Use the most handy Jupyter magics and shell commands.", s: [
   { c: String.raw`# In a notebook cell:
%timeit sum(range(10_000))          # time a single line many times
%%time                              # (first line of a cell) time the whole cell
!uv pip list | head                 # run a shell command
%load_ext autoreload
%autoreload 2                       # re-import edited .py files automatically
%who                                # list variables in memory`,
     e: "Lines starting with % are IPython magics and ! runs a shell command. autoreload lets you edit helper .py files and use them without restarting the kernel." },
 ]},
 { q: "Move notebook code into a reusable module.", s: [
   { c: String.raw`# utils.py: logic lives in a plain module (testable, importable, reviewable in Git)
import pandas as pd

def load_clean(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    return df.dropna().drop_duplicates()

# notebook cell: exploration only
# from utils import load_clean
# df = load_clean("data.csv")
# df.describe()`,
     e: "Notebooks for exploring and showing; .py modules for logic you'll reuse or deploy. That split is what keeps data projects maintainable." },
 ]},
],

"w5-p": [
 { q: "Lay out a production-style FastAPI project.", s: [
   { c: String.raw`weather-api/
├── pyproject.toml          # uv add fastapi httpx pydantic-settings
├── uv.lock
├── .env.example            # WEATHER_API_KEY=changeme
├── Dockerfile
├── README.md
├── app/
│   ├── __init__.py
│   ├── main.py             # create app, include routers, lifespan
│   ├── config.py           # Settings (pydantic-settings)
│   ├── schemas.py          # Pydantic request/response models
│   ├── services/
│   │   └── weather.py      # talks to the external API, no FastAPI imports
│   └── routers/
│       └── weather.py      # HTTP layer: validates input, calls service
└── tests/
    ├── conftest.py         # shared fixtures (client, fake service)
    └── test_weather.py`,
     e: "Routers handle HTTP, services hold business logic, schemas describe data, config reads settings. Keeping the layers apart makes each one easy to test and change." },
 ]},
 { q: "Write the service, router and in-memory cache for the capstone.", s: [
   { c: String.raw`# app/services/weather.py
import time
import httpx

class WeatherService:
    def __init__(self, client: httpx.AsyncClient, ttl: int = 300):
        self.client = client
        self.ttl = ttl
        self._cache: dict[str, tuple[float, dict]] = {}

    async def current(self, city: str) -> dict:
        key = city.lower()
        hit = self._cache.get(key)
        if hit and time.monotonic() - hit[0] < self.ttl:
            return hit[1]                                   # cache hit
        r = await self.client.get(
            "https://api.open-meteo.com/v1/forecast",
            params={"latitude": 18.52, "longitude": 73.86, "current_weather": True},
        )
        r.raise_for_status()
        data = r.json()["current_weather"]
        self._cache[key] = (time.monotonic(), data)
        return data

# app/routers/weather.py
from fastapi import APIRouter, Depends, Request
from app.services.weather import WeatherService

router = APIRouter(prefix="/weather", tags=["weather"])

def get_service(request: Request) -> WeatherService:
    return request.app.state.weather

@router.get("/{city}")
async def weather(city: str, svc: WeatherService = Depends(get_service)):
    return {"city": city, **(await svc.current(city))}`,
     e: "The service knows nothing about HTTP routes, so it can be reused from a CLI or a worker. A tiny TTL cache saves you from hitting rate limits on the external API." },
 ]},
 { q: "Test the router with a fake service using dependency_overrides.", s: [
   { c: String.raw`# tests/test_weather.py
from fastapi.testclient import TestClient
from app.main import app
from app.routers.weather import get_service

class FakeService:
    async def current(self, city):
        return {"temperature": 30.5, "windspeed": 4.0}

def test_weather_returns_city_and_temp():
    app.dependency_overrides[get_service] = lambda: FakeService()
    try:
        client = TestClient(app)
        r = client.get("/weather/pune")
        assert r.status_code == 200
        assert r.json() == {"city": "pune", "temperature": 30.5, "windspeed": 4.0}
    finally:
        app.dependency_overrides.clear()`,
     e: "dependency_overrides swaps a real dependency for a fake one in tests, so they run offline in milliseconds." },
 ]},
 { q: "Containerise the API with a Dockerfile.", s: [
   { c: String.raw`# Dockerfile
FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev            # install deps first: cached layer
COPY app ./app
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# terminal
# docker build -t weather-api .
# docker run -p 8000:8000 --env-file .env weather-api`,
     e: "Copy the dependency files and install before copying your code, so Docker reuses the install layer when only code changes. Secrets come in at run time with --env-file, never baked into the image." },
 ]},
],

};
