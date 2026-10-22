/* Week 3 syntax drills: classes, inheritance, dunder methods, exceptions, modules, environments, type hints, dataclasses. */
export default {

"w3-1": [
 { q: "Write a Student class with __init__, attributes and a method.", s: [
   { c: String.raw`class Student:
    def __init__(self, name, marks):
        self.name = name          # instance attributes live on self
        self.marks = marks

    def average(self):
        return sum(self.marks) / len(self.marks)

    def is_passing(self, cutoff=40):
        return self.average() >= cutoff

s = Student("Asha", [78, 85, 92])
print(s.name, round(s.average(), 1), s.is_passing())`,
     e: "__init__ runs when you create an object. self is the object itself; Python passes it automatically when you call s.average()." },
 ]},
 { q: "Class attributes vs instance attributes: count how many objects were created.", s: [
   { c: String.raw`class User:
    count = 0                    # class attribute: shared by all users

    def __init__(self, name):
        self.name = name         # instance attribute: one per user
        User.count += 1

a, b = User("asha"), User("ben")
print(User.count, a.count)       # 2 2
print(a.name, b.name)`,
     e: "Attributes defined in the class body are shared. Update them through the class name (User.count), not self, or you'll create a new instance attribute instead." },
 ]},
 { q: "BankAccount with deposit and withdraw that refuses overdrafts.", s: [
   { c: String.raw`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount
        self.history.append(("deposit", amount))

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.history.append(("withdraw", amount))

acc = BankAccount("Asha", 1000)
acc.deposit(500)
acc.withdraw(200)
print(acc.balance, acc.history)`,
     e: "Methods protect the object's rules (no negative deposits, no overdraft). Raising an exception tells the caller exactly what went wrong." },
 ]},
 { q: "Use @property to validate an attribute and to compute a value.", s: [
   { c: String.raw`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price               # goes through the setter below

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price can't be negative")
        self._price = value

    @property
    def price_with_tax(self):            # read-only, computed
        return round(self._price * 1.18, 2)

p = Product("Mouse", 500)
print(p.price, p.price_with_tax)
p.price = 650                            # looks like a plain attribute
# p.price = -5  -> ValueError`,
     e: "@property lets you add checks or calculations while callers still write p.price. _price with one underscore means 'internal, please don't touch'." },
 ]},
 { q: "Write a @classmethod alternative constructor and a @staticmethod helper.", s: [
   { c: String.raw`from datetime import date

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, year):
        return cls(name, date.today().year - year)   # cls is the class itself

    @staticmethod
    def is_adult(age):
        return age >= 18                              # no self, no cls

p = Person.from_birth_year("Ravi", 2000)
print(p.name, p.age, Person.is_adult(p.age))`,
     e: "A classmethod gets the class (cls) and is used for 'other ways to create an object', like dict.fromkeys. A staticmethod is just a function grouped inside the class." },
 ]},
 { q: "Implement a Stack class and a Queue class.", s: [
   { t: "Stack (LIFO)", c: String.raw`class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        return self._items[-1] if self._items else None

    def is_empty(self):
        return not self._items

s = Stack()
s.push(1); s.push(2)
print(s.pop(), s.peek())   # 2 1`, e: "Last in, first out: undo history, browser back button, bracket matching." },
   { t: "Queue (FIFO) with deque", c: String.raw`from collections import deque

class Queue:
    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        return self._items.popleft()     # O(1); list.pop(0) is O(n)

    def __len__(self):
        return len(self._items)

q = Queue()
q.enqueue("a"); q.enqueue("b")
print(q.dequeue(), len(q))   # a 1`, e: "First in, first out: job queues and BFS. Use deque because removing from the front of a list is slow." },
 ]},
 { q: "Implement a singly linked list with append, prepend and print.", s: [
   { c: String.raw`class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        node = Node(value)
        if not self.head:
            self.head = node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node

    def prepend(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node

    def reverse(self):
        prev, cur = None, self.head
        while cur:
            cur.next, prev, cur = prev, cur, cur.next
        self.head = prev

    def __iter__(self):
        cur = self.head
        while cur:
            yield cur.value
            cur = cur.next

ll = LinkedList()
for v in [2, 3, 4]:
    ll.append(v)
ll.prepend(1)
print(list(ll))     # [1, 2, 3, 4]
ll.reverse()
print(list(ll))     # [4, 3, 2, 1]`,
     e: "Each node points to the next. Reversing a linked list by flipping the next pointers is a top-10 interview question." },
 ]},
],

"w3-2": [
 { q: "Inheritance: a Shape base class with Circle and Rectangle that override area().", s: [
   { c: String.raw`import math

class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError

    def describe(self):
        return f"{self.name} with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, r):
        super().__init__("Circle")     # run the parent's __init__
        self.r = r

    def area(self):
        return math.pi * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        super().__init__("Rectangle")
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h

for shape in [Circle(2), Rectangle(3, 4)]:
    print(shape.describe())            # polymorphism: same call, different behaviour`,
     e: "class Child(Parent) inherits everything. super() calls the parent's version. Calling describe() on any shape works because each one supplies its own area()." },
 ]},
 { q: "Make an abstract base class that forces subclasses to implement a method.", s: [
   { c: String.raw`from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float) -> str: ...

class Razorpay(PaymentGateway):
    def charge(self, amount):
        return f"Charged Rs {amount} via Razorpay"

print(Razorpay().charge(499))
# PaymentGateway()  -> TypeError: can't instantiate abstract class`,
     e: "ABC + @abstractmethod defines an interface. Backends use this to swap implementations (payment providers, storage, LLM clients) behind one API." },
 ]},
 { q: "Add __str__, __repr__, __len__, __eq__ and __add__ to a class.", s: [
   { c: String.raw`class Cart:
    def __init__(self, items=None):
        self.items = items or []

    def __repr__(self):                 # for developers: unambiguous
        return f"Cart({self.items!r})"

    def __str__(self):                  # for users: friendly
        return f"Cart with {len(self)} items"

    def __len__(self):
        return len(self.items)

    def __eq__(self, other):
        return isinstance(other, Cart) and self.items == other.items

    def __add__(self, other):
        return Cart(self.items + other.items)

    def __getitem__(self, i):
        return self.items[i]

    def __contains__(self, item):
        return item in self.items

a, b = Cart(["pen"]), Cart(["book", "bag"])
c = a + b
print(repr(c), str(c), len(c), c[0], "bag" in c, a == Cart(["pen"]))`,
     e: "Dunder (double underscore) methods let your objects work with built-in syntax: len(), +, ==, [], in and print()." },
 ]},
 { q: "Composition: a Car that has an Engine instead of inheriting from it.", s: [
   { c: String.raw`class Engine:
    def __init__(self, hp):
        self.hp = hp

    def start(self):
        return f"{self.hp}hp engine started"

class Car:
    def __init__(self, model, engine):
        self.model = model
        self.engine = engine          # has-a relationship

    def drive(self):
        return f"{self.model}: {self.engine.start()}"

print(Car("Nexon", Engine(120)).drive())`,
     e: "Use inheritance for 'is-a' (a Circle is a Shape) and composition for 'has-a' (a Car has an Engine). Most real backends prefer composition because parts are easier to swap and test." },
 ]},
 { q: "Multiple inheritance and the method resolution order (MRO).", s: [
   { c: String.raw`class LoggerMixin:
    def log(self, msg):
        print(f"[{type(self).__name__}] {msg}")

class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class User(LoggerMixin, JsonMixin):
    def __init__(self, name):
        self.name = name

u = User("asha")
u.log("created")
print(u.to_json())
print([cls.__name__ for cls in User.__mro__])`,
     e: "Mixins are small classes that add one ability. Python searches parents left to right following the MRO, which you can print with Class.__mro__." },
 ]},
 { q: "Make a class iterable and comparable so sorted() works on it.", s: [
   { c: String.raw`from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, text):
        self.parts = tuple(int(p) for p in text.split("."))

    def __eq__(self, other):
        return self.parts == other.parts

    def __lt__(self, other):
        return self.parts < other.parts

    def __repr__(self):
        return ".".join(map(str, self.parts))

print(sorted([Version("1.10.0"), Version("1.2.3"), Version("1.9")]))   # [1.2.3, 1.9, 1.10.0]`,
     e: "Define __eq__ and __lt__ and @total_ordering fills in <=, > and >=. Tuples compare item by item, so 1.10 correctly sorts after 1.9." },
 ]},
],

"w3-3": [
 { q: "Handle division with try / except / else / finally.", s: [
   { c: String.raw`def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Can't divide by zero")
        return None
    except TypeError as e:
        print("Bad types:", e)
        return None
    else:
        print("No errors")          # runs only if try succeeded
        return result
    finally:
        print("Always runs")        # cleanup: close files, connections

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "x"))`,
     e: "except catches specific errors, else runs on success, finally always runs. Catch the narrowest exception you can." },
 ]},
 { q: "Catch several exceptions in one except, and re-raise after logging.", s: [
   { c: String.raw`def parse_age(text):
    try:
        age = int(text)
        if age < 0:
            raise ValueError("age can't be negative")
        return age
    except (ValueError, TypeError) as e:
        print(f"Invalid age {text!r}: {e}")
        raise                     # bare raise re-throws the same error

for value in ["25", "-3", None]:
    try:
        print(parse_age(value))
    except (ValueError, TypeError):
        pass`,
     e: "A tuple of exception types catches any of them. A bare raise inside except passes the error up unchanged after you've logged it." },
 ]},
 { q: "Create custom exceptions for a banking app.", s: [
   { c: String.raw`class BankError(Exception):
    """Base class for all bank errors."""

class InsufficientFunds(BankError):
    def __init__(self, balance, amount):
        super().__init__(f"Balance {balance} is less than {amount}")
        self.balance = balance
        self.amount = amount

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(balance, amount)
    return balance - amount

try:
    withdraw(100, 500)
except InsufficientFunds as e:
    print("Error:", e, "| short by", e.amount - e.balance)
except BankError:
    print("Some other bank error")`,
     e: "Inherit from Exception (never BaseException). One base class per app lets callers catch all your errors at once, and extra attributes carry useful details." },
 ]},
 { q: "Chain exceptions with raise ... from to keep the original cause.", s: [
   { c: String.raw`import json

class ConfigError(Exception):
    pass

def load_config(text):
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise ConfigError("config.json is not valid JSON") from e

try:
    load_config("{bad json}")
except ConfigError as e:
    print(e, "| caused by:", repr(e.__cause__))`,
     e: "raise NewError(...) from e wraps a low-level error in a meaningful one while keeping the original in the traceback. Common in service and repository layers." },
 ]},
 { q: "Why is a bare except: dangerous? Show the right way.", s: [
   { t: "Bad", c: String.raw`try:
    value = int("abc")
except:                 # also swallows KeyboardInterrupt, SystemExit and typos
    pass                # the bug is now invisible`,
     e: "A bare except hides every problem, including Ctrl+C and NameErrors from typos." },
   { t: "Good", c: String.raw`import logging

try:
    value = int("abc")
except ValueError:
    logging.exception("Could not parse value")   # logs the traceback too
    value = 0
print(value)`,
     e: "Catch the specific error you expect, and log it so you can debug later." },
 ]},
 { q: "Use assert for internal sanity checks, and know when not to.", s: [
   { c: String.raw`def average(nums):
    assert len(nums) > 0, "nums must not be empty"
    return sum(nums) / len(nums)

print(average([1, 2, 3]))
# average([]) -> AssertionError: nums must not be empty`,
     e: "assert is for 'this should never happen' checks during development. Python skips asserts when run with -O, so never use them to validate user input; raise ValueError instead." },
 ]},
],

"w3-4": [
 { q: "Show the different ways to import.", s: [
   { c: String.raw`import math                         # use as math.sqrt
from math import sqrt, pi           # use directly as sqrt
import numpy as np                  # alias (needs numpy installed)
from collections import Counter as C
from os import path                 # import a submodule

print(math.floor(2.7), sqrt(16), pi, C("aab"))
# from math import *   -> avoid: you can't tell where names came from`,
     e: "Prefer import module or from module import name. Avoid import * because it hides where names come from and can overwrite your own." },
 ]},
 { q: "Write a reusable module and guard its demo code with if __name__ == \"__main__\".", s: [
   { c: String.raw`# utils.py
def slugify(text):
    return "-".join(text.lower().split())

if __name__ == "__main__":
    # runs on: python utils.py
    # skipped on: import utils
    print(slugify("Hello AI World"))

# main.py
# from utils import slugify
# print(slugify("Zero to AI Engineer"))`,
     e: "__name__ is \"__main__\" only when the file is run directly. This lets one file be both an importable module and a runnable script." },
 ]},
 { q: "Lay out a package with sub-modules and import between them.", s: [
   { c: String.raw`# Folder layout
# app/
# ├── __init__.py          makes 'app' a package; can re-export names
# ├── main.py
# ├── services/
# │   ├── __init__.py
# │   └── billing.py       def total(items): ...
# └── models/
#     ├── __init__.py
#     └── user.py          class User: ...

# app/main.py
# from app.services.billing import total      # absolute import (preferred)
# from .models.user import User              # relative import inside the package

# Run it from the project root as a module:
# python -m app.main`,
     e: "Absolute imports from the package root are clearest. python -m runs a module with the right import paths, which avoids most 'ModuleNotFoundError' surprises." },
 ]},
 { q: "Read command-line arguments with argparse.", s: [
   { c: String.raw`import argparse

parser = argparse.ArgumentParser(description="Resize images")
parser.add_argument("folder", help="folder to process")
parser.add_argument("--width", type=int, default=800)
parser.add_argument("--dry-run", action="store_true")

args = parser.parse_args(["photos", "--width", "1024", "--dry-run"])   # pass nothing to read sys.argv
print(args.folder, args.width, args.dry_run)`,
     e: "argparse gives you --help, type conversion and defaults for free. --dry-run becomes args.dry_run." },
 ]},
],

"w3-5": [
 { q: "Create a project, add and remove dependencies, and run code with uv.", s: [
   { c: String.raw`# terminal
uv init my-api && cd my-api
uv add fastapi httpx             # writes pyproject.toml and uv.lock
uv add --dev pytest ruff         # dev-only tools
uv remove httpx
uv run python main.py            # runs inside the project's .venv
uv run pytest
uv sync                          # recreate .venv exactly from uv.lock (fresh clone, CI)`,
     e: "pyproject.toml lists what you asked for; uv.lock pins exact versions so every machine installs the same thing. Commit both, never the .venv folder." },
 ]},
 { q: "Do the same with plain venv and pip, and freeze requirements.", s: [
   { c: String.raw`# terminal
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install requests
pip freeze > requirements.txt
pip install -r requirements.txt  # on another machine
deactivate`,
     e: "You'll meet requirements.txt in most existing projects, so read it fluently even if you use uv day to day." },
 ]},
 { q: "Check from Python which interpreter and which package versions are in use.", s: [
   { c: String.raw`import sys
from importlib.metadata import version, PackageNotFoundError

print(sys.executable)     # path of the Python running this file
print(sys.prefix)         # points inside .venv when a venv is active

for pkg in ["pip", "fastapi"]:
    try:
        print(pkg, version(pkg))
    except PackageNotFoundError:
        print(pkg, "not installed")`,
     e: "When 'it works on my machine' fails, sys.executable tells you which Python is actually running." },
 ]},
],

"w3-6": [
 { q: "Add type hints to variables and functions, including lists, dicts and optional values.", s: [
   { c: String.raw`def average(scores: list[float]) -> float:
    return sum(scores) / len(scores)

def find_user(users: dict[int, str], user_id: int) -> str | None:
    return users.get(user_id)          # may return None

def tag(text: str, *labels: str, upper: bool = False) -> tuple[str, ...]:
    return tuple(l.upper() if upper else l for l in labels)

count: int = 0
names: list[str] = ["asha", "ben"]
print(average([80, 90]), find_user({1: "asha"}, 2), tag("x", "a", "b", upper=True))`,
     e: "Built-in generics like list[str] and the X | None union work in Python 3.10+. Hints don't run checks, but mypy, pyright and FastAPI read them." },
 ]},
 { q: "Write a dataclass with defaults, a list field and a computed method.", s: [
   { c: String.raw`from dataclasses import dataclass, field

@dataclass
class Order:
    id: int
    customer: str
    items: list[str] = field(default_factory=list)   # never items: list = []
    paid: bool = False

    def total_items(self) -> int:
        return len(self.items)

o = Order(1, "asha", ["pen", "book"])
print(o)                       # auto __repr__
print(o == Order(1, "asha", ["pen", "book"]))   # auto __eq__: True
o.paid = True`,
     e: "@dataclass writes __init__, __repr__ and __eq__ for you. Use field(default_factory=list) for mutable defaults, for the same reason as the mutable-default-argument bug." },
 ]},
 { q: "Make an immutable (frozen) dataclass, sort objects by a field, and convert to a dict.", s: [
   { c: String.raw`from dataclasses import dataclass, asdict, replace

@dataclass(frozen=True, order=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
# p.x = 5  -> FrozenInstanceError
q = replace(p, x=5)                     # copy with one field changed
print(sorted([Point(3, 1), Point(1, 9)]))   # order=True compares fields in order
print(asdict(q), {p, q})                # frozen makes it hashable`,
     e: "frozen=True makes objects read-only and hashable; order=True adds < and >; asdict turns it into a dict, handy for JSON." },
 ]},
 { q: "Use Enum for a fixed set of choices.", s: [
   { c: String.raw`from enum import Enum

class Status(str, Enum):
    PENDING = "pending"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

s = Status("shipped")          # from a string (e.g. a DB value)
print(s, s.value, s is Status.SHIPPED)
print([st.value for st in Status])
if s == Status.SHIPPED:
    print("on the way")`,
     e: "Enums stop typos like \"shiped\" from sneaking in. Inheriting from str makes members compare equal to their string values and serialise neatly to JSON." },
 ]},
 { q: "Describe the shape of a dict with TypedDict, and a callable with Callable.", s: [
   { c: String.raw`from typing import TypedDict, Callable

class UserDict(TypedDict):
    id: int
    name: str
    email: str | None

def apply_twice(fn: Callable[[int], int], x: int) -> int:
    return fn(fn(x))

u: UserDict = {"id": 1, "name": "asha", "email": None}
print(u["name"], apply_twice(lambda n: n * 3, 2))   # asha 18`,
     e: "TypedDict documents JSON-like dicts (API payloads). Callable[[args], return] types a function parameter." },
 ]},
],

"w3-p": [
 { q: "Library system: Book dataclass, Library class and custom exceptions for borrowing.", s: [
   { c: String.raw`from dataclasses import dataclass

class LibraryError(Exception): pass
class BookNotFound(LibraryError): pass
class BookUnavailable(LibraryError): pass

@dataclass
class Book:
    isbn: str
    title: str
    available: bool = True

class Library:
    def __init__(self):
        self.books: dict[str, Book] = {}

    def add(self, book: Book) -> None:
        self.books[book.isbn] = book

    def _get(self, isbn: str) -> Book:
        try:
            return self.books[isbn]
        except KeyError:
            raise BookNotFound(isbn) from None

    def borrow(self, isbn: str) -> Book:
        book = self._get(isbn)
        if not book.available:
            raise BookUnavailable(book.title)
        book.available = False
        return book

    def give_back(self, isbn: str) -> None:
        self._get(isbn).available = True

lib = Library()
lib.add(Book("111", "Clean Code"))
lib.borrow("111")
for isbn in ["111", "999"]:
    try:
        lib.borrow(isbn)
    except BookUnavailable as e:
        print("Already borrowed:", e)
    except BookNotFound as e:
        print("No such book:", e)`,
     e: "Dataclass for data, a class for behaviour, a small exception hierarchy for errors. 'from None' hides the internal KeyError from the user-facing traceback." },
 ]},
 { q: "Persist objects to JSON and load them back as dataclasses.", s: [
   { c: String.raw`import json
from dataclasses import dataclass, asdict

@dataclass
class Book:
    isbn: str
    title: str
    available: bool = True

books = [Book("111", "Clean Code"), Book("222", "Fluent Python", False)]
text = json.dumps([asdict(b) for b in books], indent=2)
loaded = [Book(**d) for d in json.loads(text)]   # ** unpacks dict into keyword args
print(loaded == books)   # True`,
     e: "asdict on the way out, Book(**d) on the way in. This is the same round trip an API or ORM does for you later." },
 ]},
],

};
