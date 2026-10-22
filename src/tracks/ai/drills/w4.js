/* Week 4 syntax drills: iterators, generators, decorators, context managers, the standard library, pytest, logging, debugging. */
export default {

"w4-1": [
 { q: "Use iter() and next() by hand to see how a for loop works.", s: [
   { c: String.raw`nums = [10, 20, 30]
it = iter(nums)
print(next(it), next(it), next(it))   # 10 20 30
print(next(it, "done"))               # default instead of StopIteration

# What a for loop really does:
it = iter(nums)
while True:
    try:
        n = next(it)
    except StopIteration:
        break
    print(n)`,
     e: "An iterable can give you an iterator (iter); an iterator gives the next item (next) until it raises StopIteration. for does this for you." },
 ]},
 { q: "Write a generator that yields the Fibonacci sequence forever, and take the first 10.", s: [
   { c: String.raw`from itertools import islice

def fibonacci():
    a, b = 0, 1
    while True:
        yield a              # pause here and hand back a value
        a, b = b, a + b

print(list(islice(fibonacci(), 10)))

for i, n in enumerate(fibonacci()):
    if i == 5:
        break
    print(n)`,
     e: "A function with yield becomes a generator: it remembers where it paused. Infinite generators are fine because values are produced only when asked for." },
 ]},
 { q: "Compare a list comprehension with a generator expression for memory.", s: [
   { c: String.raw`import sys

squares_list = [n * n for n in range(1_000_000)]
squares_gen = (n * n for n in range(1_000_000))

print(sys.getsizeof(squares_list))   # ~8 MB
print(sys.getsizeof(squares_gen))    # ~200 bytes
print(sum(n * n for n in range(1_000_000)))   # no extra brackets needed inside a call`,
     e: "Square brackets build the whole list now; round brackets make a lazy generator. Use generators when you only loop once, especially over big data." },
 ]},
 { q: "Read a huge log file lazily and yield only the error lines.", s: [
   { c: String.raw`def read_lines(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")

def only_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

with open("app.log", "w") as f:
    f.write("INFO start\nERROR db down\nINFO retry\nERROR timeout\n")

for line in only_errors(read_lines("app.log")):
    print(line)`,
     e: "Chaining generators builds a pipeline: each line flows through one at a time, so a 10 GB file uses almost no memory." },
 ]},
 { q: "Write a custom iterator class with __iter__ and __next__.", s: [
   { c: String.raw`class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

print(list(Countdown(5)))   # [5, 4, 3, 2, 1]`,
     e: "This is what a generator does for you automatically. Knowing the protocol helps you read library code." },
 ]},
 { q: "Use yield from, and split a list into batches with a generator.", s: [
   { c: String.raw`def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)    # delegate to the inner generator
        else:
            yield item

def batched(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]

print(list(flatten([1, [2, [3, 4]], 5])))      # [1, 2, 3, 4, 5]
print(list(batched(list(range(7)), 3)))        # [[0, 1, 2], [3, 4, 5], [6]]`,
     e: "yield from passes through every value of another iterable. Batching is how you send data to an API or a model in chunks." },
 ]},
],

"w4-2": [
 { q: "Write a decorator that times any function.", s: [
   { c: String.raw`import time
from functools import wraps

def timer(func):
    @wraps(func)                       # keep the original name and docstring
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

@timer                                 # same as: slow_sum = timer(slow_sum)
def slow_sum(n):
    return sum(range(n))

print(slow_sum(1_000_000))`,
     e: "A decorator is a function that takes a function and returns a new one wrapping it. *args, **kwargs pass any arguments through untouched." },
 ]},
 { q: "Write a decorator with arguments: retry a function up to n times.", s: [
   { c: String.raw`import random
from functools import wraps

def retry(times=3, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt == times:
                        raise
        return wrapper
    return decorator

@retry(times=5, exceptions=(ConnectionError,))
def flaky_call():
    if random.random() < 0.7:
        raise ConnectionError("network blip")
    return "ok"

try:
    print(flaky_call())
except ConnectionError:
    print("gave up")`,
     e: "Decorators with arguments need three levels: the outer takes the settings, the middle takes the function, the inner runs each call. Retry logic like this wraps every external API call in a backend." },
 ]},
 { q: "Memoise a slow recursive function.", s: [
   { t: "functools.cache", c: String.raw`from functools import cache

@cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(100))`, e: "Results are stored per argument, turning O(2^n) into O(n). Use lru_cache(maxsize=...) to cap memory." },
   { t: "Hand-written dict cache", c: String.raw`def memoize(func):
    store = {}
    def wrapper(n):
        if n not in store:
            store[n] = func(n)
        return store[n]
    return wrapper

@memoize
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(100))`, e: "What cache does under the hood: a closure over a dict." },
 ]},
 { q: "Write a decorator that checks a user is an admin before running a function.", s: [
   { c: String.raw`from functools import wraps

class Forbidden(Exception):
    pass

def require_role(role):
    def decorator(func):
        @wraps(func)
        def wrapper(user, *args, **kwargs):
            if role not in user.get("roles", []):
                raise Forbidden(f"{user['name']} needs role {role!r}")
            return func(user, *args, **kwargs)
        return wrapper
    return decorator

@require_role("admin")
def delete_user(current_user, user_id):
    return f"user {user_id} deleted by {current_user['name']}"

print(delete_user({"name": "asha", "roles": ["admin"]}, 42))
try:
    delete_user({"name": "ben", "roles": []}, 42)
except Forbidden as e:
    print(e)`,
     e: "This is exactly how web frameworks implement @login_required and permission checks." },
 ]},
 { q: "Write a context manager as a class with __enter__ and __exit__.", s: [
   { c: String.raw`import time

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self                         # bound to the 'as' name

    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"took {self.elapsed:.4f}s")
        return False                        # don't swallow exceptions

with Timer() as t:
    sum(range(1_000_000))
print(round(t.elapsed, 4))`,
     e: "with calls __enter__ on the way in and __exit__ on the way out, even if an error happens. Returning True from __exit__ would hide the error." },
 ]},
 { q: "Write the same kind of context manager with @contextmanager.", s: [
   { c: String.raw`from contextlib import contextmanager
import os

@contextmanager
def working_directory(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield                      # the body of the with block runs here
    finally:
        os.chdir(old)              # always restored

with working_directory("/"):
    print(os.getcwd())
print(os.getcwd())`,
     e: "Code before yield is setup, code after is cleanup. Put the cleanup in finally so it runs even when the with block raises." },
 ]},
 { q: "Open two files in one with statement, and suppress an expected error.", s: [
   { c: String.raw`from contextlib import suppress
import os

with open("notes.txt", "w") as f:
    f.write("hello\nworld\n")

with open("notes.txt") as src, open("copy.txt", "w") as dst:
    for line in src:
        dst.write(line.upper())

with suppress(FileNotFoundError):
    os.remove("does-not-exist.tmp")   # no error if it's already gone

print(open("copy.txt").read())`,
     e: "Several context managers can share one with. suppress is a tidy replacement for try/except/pass when ignoring an error is truly intended." },
 ]},
],

"w4-3": [
 { q: "Counter, defaultdict, deque and namedtuple in one go.", s: [
   { c: String.raw`from collections import Counter, defaultdict, deque, namedtuple

print(Counter("mississippi").most_common(2))     # [('i', 4), ('s', 4)]

by_dept = defaultdict(list)
for name, dept in [("asha", "ml"), ("ben", "web"), ("chen", "ml")]:
    by_dept[dept].append(name)
print(dict(by_dept))

recent = deque(maxlen=3)                         # keeps only the last 3
for page in ["home", "about", "blog", "contact"]:
    recent.append(page)
print(list(recent))                              # ['about', 'blog', 'contact']

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p[1], p._asdict())`,
     e: "collections is the most useful module for interviews: counting, grouping, queues and lightweight records." },
 ]},
 { q: "Find the top-k largest numbers and the k most frequent words with heapq.", s: [
   { c: String.raw`import heapq
from collections import Counter

nums = [5, 1, 9, 3, 7, 9, 2]
print(heapq.nlargest(3, nums), heapq.nsmallest(2, nums))

words = "a b a c b a d".split()
counts = Counter(words)
print(heapq.nlargest(2, counts, key=counts.get))   # ['a', 'b']

heap = []
for task in [(3, "low"), (1, "urgent"), (2, "normal")]:
    heapq.heappush(heap, task)                     # min-heap ordered by priority
print(heapq.heappop(heap))                         # (1, 'urgent')`,
     e: "heapq keeps a list as a min-heap: the smallest item is always at index 0. Great for top-k and priority queues (O(n log k))." },
 ]},
 { q: "Work with dates: today, parse, format, add days and find the difference.", s: [
   { c: String.raw`from datetime import date, datetime, timedelta, timezone

today = date.today()
deadline = datetime.strptime("2026-12-31", "%Y-%m-%d").date()   # parse
print((deadline - today).days, "days left")
print(today + timedelta(days=30))
print(datetime.now().strftime("%d %b %Y, %H:%M"))               # format
print(datetime.now(timezone.utc).isoformat())                   # store UTC in backends
print(datetime.fromisoformat("2026-10-23T10:30:00"))`,
     e: "strptime parses a string into a date (p = parse), strftime formats a date as a string (f = format). Store times in UTC and convert only for display." },
 ]},
 { q: "Use pathlib to find files, read and write, and build paths.", s: [
   { c: String.raw`from pathlib import Path

base = Path("demo_dir")
(base / "sub").mkdir(parents=True, exist_ok=True)   # / joins paths
(base / "a.txt").write_text("hello")
(base / "sub" / "b.py").write_text("print('hi')")

for p in base.rglob("*.py"):           # recursive glob
    print(p, p.name, p.stem, p.suffix, p.parent)

print([p.name for p in base.iterdir()])
print(Path.home(), Path.cwd(), (base / "a.txt").stat().st_size)`,
     e: "pathlib replaces os.path with objects. / joins parts on any OS, and .name, .stem, .suffix, .parent split a path apart." },
 ]},
 { q: "Regular expressions: extract emails, find numbers, validate and replace.", s: [
   { c: String.raw`import re

text = "Contact asha@mail.com or ben.dev@company.co.in, call 98765-43210. Order #4521 costs 1299.50"

print(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", text))     # all emails
print(re.findall(r"\d+(?:\.\d+)?", text))               # all numbers
m = re.search(r"Order #(\d+)", text)
print(m.group(1) if m else None)                        # captured group: 4521
print(bool(re.fullmatch(r"\d{6}", "560001")))           # valid PIN code
print(re.sub(r"\d", "*", "card 4111"))                  # card ****
print(re.split(r"[,;]\s*", "a, b;c"))`,
     e: "Always use raw strings r\"...\" for patterns. findall returns every match, search the first match object, fullmatch checks the whole string, sub replaces." },
 ]},
 { q: "itertools: combinations, permutations, product, groupby and chain.", s: [
   { c: String.raw`from itertools import combinations, permutations, product, groupby, chain, accumulate

print(list(combinations("ABC", 2)))      # order doesn't matter: AB AC BC
print(list(permutations("ABC", 2)))      # order matters: AB BA AC CA BC CB
print(list(product([0, 1], repeat=2)))   # all pairs: like nested loops
print(list(chain([1, 2], [3], [4, 5])))
print(list(accumulate([1, 2, 3, 4])))    # running total: [1, 3, 6, 10]

logs = sorted(["err", "info", "err", "warn"])
print({k: len(list(g)) for k, g in groupby(logs)})   # groupby needs sorted input`,
     e: "itertools gives you fast, lazy building blocks. Combinations and permutations come up a lot in 'generate all subsets' questions." },
 ]},
 { q: "Generate random data and secure tokens.", s: [
   { c: String.raw`import random
import secrets
import uuid

random.seed(42)                         # reproducible results
print(random.randint(1, 6), random.choice(["a", "b", "c"]), random.sample(range(100), 3))
items = [1, 2, 3, 4]; random.shuffle(items); print(items)

print(secrets.token_urlsafe(16))        # use secrets for passwords, tokens, API keys
print(uuid.uuid4())                     # unique IDs for database rows`,
     e: "random is for simulations and ML; secrets is for anything security-related, because random is predictable." },
 ]},
],

"w4-4": [
 { q: "Write basic pytest tests for a function, including an expected exception.", s: [
   { c: String.raw`# calc.py
def divide(a, b):
    if b == 0:
        raise ValueError("b must not be zero")
    return a / b

# test_calc.py
import pytest
from calc import divide

def test_divide():
    assert divide(10, 2) == 5

def test_divide_float():
    assert divide(1, 3) == pytest.approx(0.3333, rel=1e-3)

def test_divide_by_zero():
    with pytest.raises(ValueError, match="zero"):
        divide(1, 0)

# terminal: uv run pytest -v`,
     e: "Test files and functions start with test_. A plain assert is all you need; pytest shows a detailed diff when it fails." },
 ]},
 { q: "Test many inputs at once with @pytest.mark.parametrize.", s: [
   { c: String.raw`import pytest

def is_palindrome(s: str) -> bool:
    s = "".join(c.lower() for c in s if c.isalnum())
    return s == s[::-1]

@pytest.mark.parametrize("text, expected", [
    ("madam", True),
    ("Nurses run", True),
    ("hello", False),
    ("", True),
])
def test_is_palindrome(text, expected):
    assert is_palindrome(text) == expected`,
     e: "One test function, four test cases. Each row shows up separately in the report, so you see exactly which input broke." },
 ]},
 { q: "Use fixtures for shared setup, and tmp_path for files.", s: [
   { c: String.raw`import json
import pytest

@pytest.fixture
def sample_user():
    return {"id": 1, "name": "asha", "roles": ["admin"]}

def test_user_is_admin(sample_user):          # fixture injected by name
    assert "admin" in sample_user["roles"]

def test_save_json(tmp_path, sample_user):    # tmp_path: a fresh temp folder
    path = tmp_path / "user.json"
    path.write_text(json.dumps(sample_user))
    assert json.loads(path.read_text())["name"] == "asha"`,
     e: "A fixture is setup code pytest runs for any test that names it as a parameter. tmp_path is built in and cleaned up for you." },
 ]},
 { q: "Fake an external dependency with monkeypatch so tests don't hit the network.", s: [
   { c: String.raw`# weather.py
import requests

def get_temp(city):
    r = requests.get("https://api.example.com/weather", params={"q": city}, timeout=5)
    r.raise_for_status()
    return r.json()["temp"]

# test_weather.py
import weather

class FakeResponse:
    def raise_for_status(self): pass
    def json(self): return {"temp": 31}

def test_get_temp(monkeypatch):
    monkeypatch.setattr(weather.requests, "get", lambda *a, **k: FakeResponse())
    assert weather.get_temp("Pune") == 31

def test_env(monkeypatch):
    monkeypatch.setenv("API_KEY", "test-key")    # also handy for settings`,
     e: "monkeypatch swaps a function or env var for the duration of one test. Unit tests must be fast and must not depend on the internet." },
 ]},
],

"w4-5": [
 { q: "Set up logging with a format, and log at each level.", s: [
   { c: String.raw`import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
)
log = logging.getLogger(__name__)      # one logger per module

log.debug("hidden: below INFO")
log.info("server started on port %s", 8000)   # lazy formatting with %s
log.warning("disk 85%% full")
log.error("payment failed for order %s", 4521)`,
     e: "Levels from low to high: DEBUG, INFO, WARNING, ERROR, CRITICAL. Pass values as arguments (%s) rather than f-strings so formatting only happens if the message is actually logged." },
 ]},
 { q: "Log an exception with its full traceback.", s: [
   { c: String.raw`import logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger("orders")

def process(order):
    try:
        return order["qty"] * order["price"]
    except KeyError:
        log.exception("order %s is missing a field", order.get("id"))   # includes traceback
        return None

process({"id": 7, "qty": 2})`,
     e: "log.exception inside an except block logs at ERROR level and appends the traceback, which is what you want when debugging production issues." },
 ]},
 { q: "Log to both the console and a rotating file.", s: [
   { c: String.raw`import logging
from logging.handlers import RotatingFileHandler

log = logging.getLogger("app")
log.setLevel(logging.DEBUG)
fmt = logging.Formatter("%(asctime)s %(levelname)s %(message)s")

console = logging.StreamHandler()
console.setLevel(logging.INFO)
console.setFormatter(fmt)

file = RotatingFileHandler("app.log", maxBytes=1_000_000, backupCount=3)
file.setLevel(logging.DEBUG)
file.setFormatter(fmt)

log.addHandler(console)
log.addHandler(file)
log.debug("only in the file")
log.info("in both")`,
     e: "Handlers decide where logs go, each with its own level. RotatingFileHandler stops a log file from growing forever." },
 ]},
],

"w4-6": [
 { q: "Find the bug: removing items from a list while looping over it.", s: [
   { t: "Buggy", c: String.raw`nums = [1, 2, 2, 3, 4]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)
print(nums)   # [1, 2, 3] <- one 2 survived!`, e: "Removing shifts the remaining items left, so the loop skips the next one." },
   { t: "Fixed", c: String.raw`nums = [1, 2, 2, 3, 4]
nums = [n for n in nums if n % 2 != 0]
print(nums)   # [1, 3]`, e: "Build a new list instead, or loop over a copy: for n in nums[:]." },
 ]},
 { q: "Find the bug: == vs is, and copying lists.", s: [
   { c: String.raw`a = [1, 2, 3]
b = a              # NOT a copy: both names point to one list
b.append(4)
print(a)           # [1, 2, 3, 4]

c = a.copy()       # or a[:] or list(a)
print(c == a, c is a)   # True False: equal values, different objects

import copy
nested = [[1], [2]]
deep = copy.deepcopy(nested)   # copies inner lists too
deep[0].append(99)
print(nested)      # unchanged

x = None
print(x is None)   # use 'is' only for None, True, False`,
     e: "== compares values; is compares identity (same object). Assignment never copies. Shallow copies share nested objects; deepcopy doesn't." },
 ]},
 { q: "Find the bug: late binding of loop variables in lambdas.", s: [
   { t: "Buggy", c: String.raw`funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])   # [2, 2, 2]`, e: "Each lambda looks up i when it's called, and by then the loop has finished with i = 2." },
   { t: "Fixed", c: String.raw`funcs = [lambda i=i: i for i in range(3)]
print([f() for f in funcs])   # [0, 1, 2]`, e: "A default argument captures the value at creation time." },
 ]},
 { q: "Use breakpoint() and read a traceback.", s: [
   { c: String.raw`def average(nums):
    total = sum(nums)
    # breakpoint()          # uncomment: pauses here in pdb
    return total / len(nums)

try:
    average([])
except ZeroDivisionError:
    import traceback
    traceback.print_exc()

# Read a traceback from the BOTTOM up:
#   last line         -> the error type and message
#   line above it     -> the exact file and line that failed
#   lines above that  -> who called it
# pdb commands: n(ext)  s(tep into)  c(ontinue)  p expr  l(ist)  q(uit)`,
     e: "breakpoint() drops you into the debugger at that line. In VS Code, click left of a line number to set the same breakpoint visually." },
 ]},
 { q: "Find the bug: integer vs float, and floating-point comparison.", s: [
   { c: String.raw`print(0.1 + 0.2 == 0.3)            # False!
print(0.1 + 0.2)                   # 0.30000000000000004

import math
print(math.isclose(0.1 + 0.2, 0.3))   # True

from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2") == Decimal("0.3"))   # True: use for money

print(7 / 2, 7 // 2, -7 // 2, round(2.5), round(3.5))   # 3.5 3 -4 2 4`,
     e: "Floats are binary approximations, so compare with math.isclose and use Decimal for money. // rounds towards minus infinity, and round() uses banker's rounding." },
 ]},
],

"w4-p": [
 { q: "File organiser: move files into folders by extension, with a dry-run option.", s: [
   { c: String.raw`import shutil
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger("organiser")

FOLDERS = {
    "Images": {".jpg", ".jpeg", ".png", ".gif"},
    "Docs": {".pdf", ".docx", ".txt", ".md"},
    "Code": {".py", ".js", ".ipynb"},
}

def folder_for(path: Path) -> str:
    for folder, exts in FOLDERS.items():
        if path.suffix.lower() in exts:
            return folder
    return "Other"

def organise(root: Path, dry_run: bool = True) -> dict[str, int]:
    moved: dict[str, int] = {}
    for item in root.iterdir():
        if not item.is_file():
            continue
        target = root / folder_for(item)
        log.info("%s -> %s/", item.name, target.name)
        if not dry_run:
            target.mkdir(exist_ok=True)
            shutil.move(str(item), target / item.name)
        moved[target.name] = moved.get(target.name, 0) + 1
    return moved

demo = Path("downloads_demo"); demo.mkdir(exist_ok=True)
for name in ["cat.png", "cv.pdf", "app.py", "song.mp3"]:
    (demo / name).touch()
print(organise(demo, dry_run=False))`,
     e: "Small pure helper (folder_for) that's easy to test, a dry-run flag so nothing is moved by accident, and logging instead of print." },
 ]},
 { q: "Test the organiser with tmp_path.", s: [
   { c: String.raw`# test_organiser.py
from pathlib import Path
from organiser import folder_for, organise

def test_folder_for():
    assert folder_for(Path("a.PNG")) == "Images"
    assert folder_for(Path("a.xyz")) == "Other"

def test_organise_moves_files(tmp_path):
    (tmp_path / "x.pdf").touch()
    result = organise(tmp_path, dry_run=False)
    assert result == {"Docs": 1}
    assert (tmp_path / "Docs" / "x.pdf").exists()

def test_dry_run_moves_nothing(tmp_path):
    (tmp_path / "x.pdf").touch()
    organise(tmp_path, dry_run=True)
    assert (tmp_path / "x.pdf").exists()`,
     e: "tmp_path gives each test a throw-away folder, so file-moving code can be tested without touching your real Downloads." },
 ]},
],

};
