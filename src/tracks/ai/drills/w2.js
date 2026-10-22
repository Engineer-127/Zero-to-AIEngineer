/* Week 2 syntax drills: dicts, sets, functions, comprehensions, strings, files and classic interview problems. */
export default {

"w2-1": [
 { q: "Create a dict, then read, add, update and delete keys safely.", s: [
   { c: String.raw`student = {"name": "Ravi", "age": 21, "skills": ["python"]}

print(student["name"])                 # KeyError if missing
print(student.get("email"))            # None instead of an error
print(student.get("email", "n/a"))     # with a default
student["email"] = "ravi@mail.com"     # add or update
student.update({"age": 22, "city": "Pune"})
removed = student.pop("city")          # remove and return
student["skills"].append("sql")        # mutate a nested list
print("age" in student)                # True: checks keys
print(len(student), student)`,
     e: "Use d[key] when the key must exist and d.get(key, default) when it might not. 'in' checks keys, not values." },
 ]},
 { q: "Loop over a dict's keys, values and key-value pairs.", s: [
   { c: String.raw`prices = {"apple": 120, "banana": 40, "mango": 150}

for fruit in prices:                 # keys
    print(fruit)
for price in prices.values():
    print(price)
for fruit, price in prices.items():  # the one you'll use most
    print(f"{fruit}: Rs {price}")`,
     e: ".items() gives (key, value) tuples, unpacked straight into two loop variables." },
 ]},
 { q: "Count how often each word appears in a sentence.", s: [
   { t: "if / else", c: String.raw`text = "the cat and the hat and the bat"
counts = {}
for word in text.split():
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
print(counts)`, e: "The long way. Good to show you understand what's happening." },
   { t: "dict.get", c: String.raw`text = "the cat and the hat and the bat"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)`, e: "get(word, 0) returns 0 the first time, so one line handles both cases." },
   { t: "collections.Counter", c: String.raw`from collections import Counter
text = "the cat and the hat and the bat"
counts = Counter(text.split())
print(counts.most_common(2))   # [('the', 3), ('and', 2)]`, e: "The production answer. most_common(n) gives the top n." },
 ]},
 { q: "Merge two dictionaries (values from the second win).", s: [
   { t: "| operator (3.9+)", c: String.raw`a = {"x": 1, "y": 2}
b = {"y": 20, "z": 30}
print(a | b)          # {'x': 1, 'y': 20, 'z': 30}`, e: "Creates a new dict. a |= b updates a in place." },
   { t: "Unpacking", c: String.raw`a = {"x": 1, "y": 2}
b = {"y": 20, "z": 30}
print({**a, **b})`, e: "** unpacks a dict's pairs. You'll see this a lot in older code and in function calls." },
   { t: "update (in place)", c: String.raw`a = {"x": 1, "y": 2}
b = {"y": 20, "z": 30}
merged = a.copy()
merged.update(b)
print(merged)`, e: "copy() first, otherwise update changes a." },
 ]},
 { q: "Sort a dictionary by its values (highest first).", s: [
   { c: String.raw`scores = {"asha": 82, "ben": 95, "chen": 78}

ranked = sorted(scores.items(), key=lambda pair: pair[1], reverse=True)
print(ranked)              # [('ben', 95), ('asha', 82), ('chen', 78)]
print(dict(ranked))        # back to a dict, now in that order
print(max(scores, key=scores.get))   # 'ben': key with the highest value`,
     e: "Sort the (key, value) pairs using pair[1], the value. max(d, key=d.get) is the neat one-liner for 'key with the biggest value'." },
 ]},
 { q: "Invert a dictionary (swap keys and values).", s: [
   { c: String.raw`codes = {"IN": "India", "US": "United States"}
inverted = {v: k for k, v in codes.items()}
print(inverted)`,
     e: "A dict comprehension. If two keys share a value, the last one wins, so mention that in an interview." },
 ]},
 { q: "Group a list of words by their first letter.", s: [
   { t: "setdefault", c: String.raw`words = ["apple", "avocado", "banana", "blueberry", "cherry"]
groups = {}
for w in words:
    groups.setdefault(w[0], []).append(w)
print(groups)`, e: "setdefault returns the existing list or inserts an empty one first." },
   { t: "defaultdict", c: String.raw`from collections import defaultdict
words = ["apple", "avocado", "banana", "blueberry", "cherry"]
groups = defaultdict(list)
for w in words:
    groups[w[0]].append(w)
print(dict(groups))`, e: "defaultdict(list) creates an empty list automatically for a new key. The cleanest grouping pattern." },
 ]},
 { q: "Use set operations: union, intersection, difference and symmetric difference.", s: [
   { c: String.raw`python_devs = {"asha", "ben", "chen"}
ml_devs = {"chen", "dia", "asha"}

print(python_devs | ml_devs)   # union: in either
print(python_devs & ml_devs)   # intersection: in both
print(python_devs - ml_devs)   # difference: only python
print(python_devs ^ ml_devs)   # in one but not both
print({"asha"} <= python_devs) # subset check: True

s = set()          # empty set ({} would be an empty dict!)
s.add(3); s.add(3) # duplicates are ignored
s.discard(99)      # no error if missing (remove() would raise)
print(s)`,
     e: "Sets hold unique items with O(1) membership checks. Remember {} is a dict; use set() for an empty set." },
 ]},
 { q: "Find the common elements of two lists.", s: [
   { t: "Sets", c: String.raw`a = [1, 2, 3, 4, 5]
b = [4, 5, 6, 7]
print(list(set(a) & set(b)))`, e: "O(n + m). Order and duplicates are lost." },
   { t: "Comprehension (keeps order of a)", c: String.raw`a = [1, 2, 3, 4, 5]
b = [4, 5, 6, 7]
b_set = set(b)
print([x for x in a if x in b_set])`, e: "Convert b to a set once, so each 'in' check is fast." },
 ]},
 { q: "Read values from a nested dict (like JSON from an API) without crashing.", s: [
   { c: String.raw`user = {"name": "Ravi", "address": {"city": "Pune", "geo": {"lat": 18.5}}}

print(user["address"]["geo"]["lat"])                       # 18.5
print(user.get("address", {}).get("zip", "unknown"))       # unknown
print(user.get("company", {}).get("name"))                 # None, no crash`,
     e: "Chain .get(key, {}) so a missing level returns an empty dict instead of raising KeyError." },
 ]},
],

"w2-2": [
 { q: "Write a function with default parameters, and call it with positional and keyword arguments.", s: [
   { c: String.raw`def greet(name, greeting="Hello", punct="!"):
    return f"{greeting}, {name}{punct}"

print(greet("Asha"))                       # Hello, Asha!
print(greet("Asha", "Hi"))                 # positional
print(greet("Asha", punct="?"))            # keyword: skip greeting
print(greet(greeting="Hey", name="Ben"))   # any order with keywords`,
     e: "Parameters with defaults must come after those without. Keyword arguments make calls readable and let you skip defaults." },
 ]},
 { q: "Write a function that accepts any number of numbers (*args) and returns their sum and average.", s: [
   { c: String.raw`def stats(*nums):
    if not nums:
        return 0, 0
    total = sum(nums)
    return total, total / len(nums)

print(stats(1, 2, 3, 4))       # (10, 2.5)
values = [10, 20, 30]
print(stats(*values))          # * unpacks a list into arguments
total, avg = stats(5, 15)      # unpack the returned tuple`,
     e: "*args collects extra positional arguments into a tuple. In a call, *list does the reverse and spreads the list out." },
 ]},
 { q: "Write a function that accepts any keyword arguments (**kwargs) and prints them.", s: [
   { c: String.raw`def build_profile(name, **details):
    profile = {"name": name}
    profile.update(details)
    return profile

print(build_profile("Asha", role="ML engineer", city="Pune"))

options = {"timeout": 5, "retries": 3}
def connect(host, timeout=10, retries=1):
    print(host, timeout, retries)
connect("db.local", **options)     # ** spreads a dict into keyword args`,
     e: "**kwargs collects extra keyword arguments into a dict. You'll see def f(*args, **kwargs) everywhere in libraries and decorators." },
 ]},
 { q: "Force some arguments to be keyword-only, and some positional-only.", s: [
   { c: String.raw`def train(data, /, *, epochs=10, lr=0.01):
    print(len(data), epochs, lr)

train([1, 2, 3], epochs=5)          # OK
# train([1, 2, 3], 5)               # TypeError: epochs must be named
# train(data=[1, 2, 3])             # TypeError: data is positional-only`,
     e: "Everything after * must be passed by name, which prevents mix-ups like train(x, 0.01, 10). Everything before / must be positional." },
 ]},
 { q: "Spot and fix the mutable default argument bug.", s: [
   { t: "The bug", c: String.raw`def add_item(item, basket=[]):
    basket.append(item)
    return basket

print(add_item("a"))   # ['a']
print(add_item("b"))   # ['a', 'b']  <- surprise!`,
     e: "The default list is created once when the function is defined and then shared by every call." },
   { t: "The fix", c: String.raw`def add_item(item, basket=None):
    if basket is None:
        basket = []
    basket.append(item)
    return basket

print(add_item("a"))   # ['a']
print(add_item("b"))   # ['b']`,
     e: "Use None as the default and create the list inside. One of the most-asked Python gotchas." },
 ]},
 { q: "Write a function with a docstring and type hints, then read its help.", s: [
   { c: String.raw`def bmi(weight_kg: float, height_m: float) -> float:
    """Return body-mass index rounded to 1 decimal.

    >>> bmi(70, 1.75)
    22.9
    """
    return round(weight_kg / height_m ** 2, 1)

print(bmi(70, 1.75))
help(bmi)`,
     e: "Type hints don't change how the code runs, but editors and tools use them. The docstring is what help() and hover tooltips show." },
 ]},
 { q: "Write a recursive function to compute the power of a number and the sum of a list.", s: [
   { c: String.raw`def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

def list_sum(nums):
    if not nums:
        return 0
    return nums[0] + list_sum(nums[1:])

print(power(2, 10), list_sum([1, 2, 3, 4]))   # 1024 10`,
     e: "Every recursive function needs a base case and a step that gets closer to it. Python's default recursion limit is about 1000 calls." },
 ]},
 { q: "Pass a function as an argument to another function.", s: [
   { c: String.raw`def apply(func, values):
    return [func(v) for v in values]

def square(x):
    return x * x

print(apply(square, [1, 2, 3]))       # [1, 4, 9]
print(apply(str.upper, ["a", "b"]))   # ['A', 'B']
print(apply(len, ["hi", "hello"]))    # [2, 5]`,
     e: "Functions are objects in Python: you can store them in variables, pass them around and return them. That's the base of decorators and callbacks." },
 ]},
],

"w2-3": [
 { q: "Write list comprehensions: squares, evens only, and a conditional label.", s: [
   { c: String.raw`nums = range(1, 11)
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in nums]
print(squares, evens, labels, sep="\n")

# The same as a normal loop:
squares_loop = []
for n in nums:
    squares_loop.append(n * n)`,
     e: "[expression for item in iterable if condition]. A filter 'if' goes at the end; an if/else that picks a value goes at the front." },
 ]},
 { q: "Write dict and set comprehensions.", s: [
   { c: String.raw`words = ["apple", "kiwi", "banana", "kiwi"]
lengths = {w: len(w) for w in words}            # {'apple': 5, 'kiwi': 4, 'banana': 6}
unique_lengths = {len(w) for w in words}        # {4, 5, 6}
long_only = {w: n for w, n in lengths.items() if n > 4}
print(lengths, unique_lengths, long_only)`,
     e: "Same shape as a list comprehension but with {key: value} for dicts and {value} for sets." },
 ]},
 { q: "Flatten a list of lists, and transpose a matrix.", s: [
   { t: "Nested comprehension", c: String.raw`matrix = [[1, 2, 3], [4, 5, 6]]
flat = [x for row in matrix for x in row]
print(flat)    # [1, 2, 3, 4, 5, 6]

transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(transposed)   # [[1, 4], [2, 5], [3, 6]]`,
     e: "Read the nested for clauses left to right, exactly like nested loops." },
   { t: "zip and itertools", c: String.raw`from itertools import chain
matrix = [[1, 2, 3], [4, 5, 6]]
print(list(chain.from_iterable(matrix)))
print([list(col) for col in zip(*matrix)])`,
     e: "zip(*matrix) unpacks the rows as arguments, and zip pairs up their columns." },
 ]},
 { q: "Use lambda with sorted, max, map and filter.", s: [
   { c: String.raw`people = [("asha", 29), ("ben", 22), ("chen", 35)]

print(sorted(people, key=lambda p: p[1]))        # by age
print(max(people, key=lambda p: p[1]))           # oldest
print(list(map(lambda p: p[0].title(), people))) # ['Asha', 'Ben', 'Chen']
print(list(filter(lambda p: p[1] > 25, people)))

add = lambda a, b: a + b    # works, but a def is clearer for named functions
print(add(2, 3))`,
     e: "lambda args: expression makes a tiny anonymous function. Use it inline as a key or callback; use def for anything you name." },
 ]},
 { q: "Multiply all numbers in a list with functools.reduce.", s: [
   { t: "reduce", c: String.raw`from functools import reduce
nums = [1, 2, 3, 4, 5]
print(reduce(lambda acc, x: acc * x, nums, 1))   # 120`,
     e: "reduce folds a list into one value by applying the function to an accumulator and each item in turn." },
   { t: "math.prod", c: String.raw`import math
print(math.prod([1, 2, 3, 4, 5]))`,
     e: "The readable built-in for this exact job (3.8+)." },
 ]},
 { q: "Show local vs global scope, and use global and nonlocal.", s: [
   { c: String.raw`count = 0

def increment():
    global count        # without this, count += 1 raises UnboundLocalError
    count += 1

def outer():
    total = 0
    def inner():
        nonlocal total  # refers to outer's total
        total += 5
    inner()
    return total

increment()
print(count, outer())   # 1 5`,
     e: "Python looks up names Local, Enclosing, Global, Built-in (LEGB). Assigning inside a function creates a local unless you say global or nonlocal. In real code, prefer returning values over globals." },
 ]},
 { q: "Write a closure: a counter function that remembers its count.", s: [
   { c: String.raw`def make_counter(start=0):
    count = start
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

c = make_counter()
print(c(), c(), c())   # 1 2 3
d = make_counter(100)
print(d())             # 101: separate memory`,
     e: "An inner function that remembers variables from the function that created it is a closure. Decorators are built on this." },
 ]},
 { q: "Use zip and enumerate to loop over two lists together.", s: [
   { c: String.raw`names = ["asha", "ben", "chen"]
scores = [82, 95, 78]

for i, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"{i}. {name}: {score}")

lookup = dict(zip(names, scores))      # build a dict from two lists
print(lookup)`,
     e: "zip pairs items by position and stops at the shortest list. enumerate(..., start=1) numbers from 1." },
 ]},
],

"w2-4": [
 { q: "Practise the everyday string methods.", s: [
   { c: String.raw`s = "  Hello, AI World!  "
print(s.strip())                 # remove spaces at both ends
print(s.lower(), s.upper())
print(s.strip().title())         # Hello, Ai World!
print(s.replace("World", "Engineer"))
print(s.strip().split(", "))     # ['Hello', 'AI World!']
print("-".join(["a", "b", "c"])) # a-b-c
print(s.strip().startswith("Hello"), s.endswith("!  "))
print(s.find("AI"), s.find("zzz"))   # index, or -1
print(s.count("l"))
print("42".isdigit(), "abc".isalpha(), "abc1".isalnum())
print("7".zfill(3), "hi".center(8, "*"))`,
     e: "Strings are immutable, so every method returns a new string. split and join are the pair you'll use most." },
 ]},
 { q: "Reverse the order of words in a sentence.", s: [
   { t: "split + slice + join", c: String.raw`s = "I love machine learning"
print(" ".join(s.split()[::-1]))   # learning machine love I`, e: "split() with no argument splits on any whitespace and drops extra spaces." },
   { t: "Reverse each word instead", c: String.raw`s = "I love machine learning"
print(" ".join(word[::-1] for word in s.split()))`, e: "A common follow-up question. Watch which part you reverse." },
 ]},
 { q: "Check if two strings are anagrams (\"listen\" and \"silent\").", s: [
   { t: "sorted", c: String.raw`a, b = "Listen", "Silent"
print(sorted(a.lower()) == sorted(b.lower()))`, e: "Anagrams have the same letters, so sorted letter lists are equal. O(n log n)." },
   { t: "Counter", c: String.raw`from collections import Counter
a, b = "Listen", "Silent"
print(Counter(a.lower()) == Counter(b.lower()))`, e: "Compares letter counts. O(n)." },
 ]},
 { q: "Capitalise the first letter of every word.", s: [
   { t: "title()", c: String.raw`print("hello ai world".title())`, e: "Quick, but turns \"it's\" into \"It'S\"." },
   { t: "split + capitalize", c: String.raw`s = "hello ai world"
print(" ".join(w.capitalize() for w in s.split()))`, e: "Gives you full control over each word." },
 ]},
 { q: "Find the first non-repeating character in a string.", s: [
   { c: String.raw`from collections import Counter

def first_unique(s):
    counts = Counter(s)
    for ch in s:
        if counts[ch] == 1:
            return ch
    return None

print(first_unique("swiss"))      # w
print(first_unique("aabb"))       # None`,
     e: "Two passes: count everything, then walk the string in order and return the first character with count 1. O(n)." },
 ]},
 { q: "Compress a string: \"aaabbc\" → \"a3b2c1\".", s: [
   { t: "Loop", c: String.raw`def compress(s):
    if not s:
        return ""
    out, count = [], 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            out.append(f"{s[i - 1]}{count}")
            count = 1
    out.append(f"{s[-1]}{count}")
    return "".join(out)

print(compress("aaabbc"))`, e: "Build a list of pieces and join once at the end; that's faster than adding strings in a loop." },
   { t: "itertools.groupby", c: String.raw`from itertools import groupby
s = "aaabbc"
print("".join(f"{ch}{len(list(group))}" for ch, group in groupby(s)))`, e: "groupby groups consecutive equal items." },
 ]},
 { q: "Remove punctuation from a sentence and count the words.", s: [
   { t: "str.translate", c: String.raw`import string
s = "Hello, world! AI is great... isn't it?"
clean = s.translate(str.maketrans("", "", string.punctuation))
print(clean, len(clean.split()))`, e: "string.punctuation holds all ASCII punctuation; translate removes them in one pass." },
   { t: "Comprehension", c: String.raw`s = "Hello, world! AI is great"
clean = "".join(ch for ch in s if ch.isalnum() or ch.isspace())
print(clean)`, e: "Keep only letters, digits and spaces." },
 ]},
 { q: "Find the longest word in a sentence.", s: [
   { c: String.raw`s = "Deep learning transforms everything"
print(max(s.split(), key=len))     # transforms`,
     e: "max with key=len compares words by length. If there's a tie, the first one wins." },
 ]},
 { q: "Check whether a sentence is a pangram (uses every letter a-z).", s: [
   { c: String.raw`import string
s = "The quick brown fox jumps over the lazy dog"
print(set(string.ascii_lowercase) <= set(s.lower()))   # True`,
     e: "Is the set of all letters a subset of the letters in the sentence?" },
 ]},
 { q: "Caesar cipher: shift each letter by k positions.", s: [
   { c: String.raw`def caesar(text, k):
    out = []
    for ch in text:
        if ch.isalpha():
            base = ord("A") if ch.isupper() else ord("a")
            out.append(chr((ord(ch) - base + k) % 26 + base))
        else:
            out.append(ch)
    return "".join(out)

secret = caesar("Hello, World", 3)
print(secret, caesar(secret, -3))   # Khoor, Zruog Hello, World`,
     e: "ord() turns a character into its number and chr() turns it back. % 26 wraps z around to a." },
 ]},
 { q: "Use string slicing and formatting to mask an email or card number.", s: [
   { c: String.raw`email = "kamal.dev@example.com"
user, domain = email.split("@")
print(user[0] + "*" * (len(user) - 2) + user[-1] + "@" + domain)

card = "4111111111111111"
print("*" * 12 + card[-4:])`,
     e: "Slicing [-4:] grabs the last four characters. Masking like this is common in backend logging." },
 ]},
],

"w2-5": [
 { q: "Write lines to a text file, append to it, then read it back.", s: [
   { c: String.raw`lines = ["first line", "second line"]

with open("notes.txt", "w", encoding="utf-8") as f:   # w overwrites
    for line in lines:
        f.write(line + "\n")

with open("notes.txt", "a", encoding="utf-8") as f:   # a appends
    f.write("third line\n")

with open("notes.txt", encoding="utf-8") as f:        # r is the default
    print(f.read())`,
     e: "with closes the file automatically, even if an error happens. Always pass encoding=\"utf-8\" so the code behaves the same on Windows." },
 ]},
 { q: "Read a file line by line and count lines, words and characters.", s: [
   { c: String.raw`lines = words = chars = 0
with open("notes.txt", encoding="utf-8") as f:
    for line in f:                 # reads one line at a time: works on huge files
        lines += 1
        words += len(line.split())
        chars += len(line)
print(lines, words, chars)`,
     e: "Looping over the file object streams it line by line instead of loading everything into memory." },
 ]},
 { q: "Handle a missing file gracefully.", s: [
   { c: String.raw`from pathlib import Path

path = Path("config.txt")
try:
    text = path.read_text(encoding="utf-8")
except FileNotFoundError:
    print(f"{path} not found, using defaults")
    text = ""

print(path.exists())   # or check first`,
     e: "Path.read_text and write_text are one-line shortcuts. Catch the specific FileNotFoundError, never a bare except." },
 ]},
 { q: "Read a CSV file into a list of dicts, and write one.", s: [
   { c: String.raw`import csv

rows = [{"name": "asha", "score": 82}, {"name": "ben", "score": 95}]

with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)

with open("scores.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["name"], int(row["score"]))   # CSV values are always strings`,
     e: "DictReader uses the header row as keys. newline=\"\" stops blank lines appearing between rows on Windows." },
 ]},
 { q: "Save a Python dict to JSON and load it back.", s: [
   { c: String.raw`import json

data = {"model": "gpt", "epochs": 3, "tags": ["nlp", "demo"], "active": True}

with open("config.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)          # to a file

with open("config.json", encoding="utf-8") as f:
    loaded = json.load(f)                 # from a file

text = json.dumps(data)                   # to a string (s = string)
back = json.loads(text)                   # from a string
print(loaded == back, type(text))`,
     e: "dump/load work with files, dumps/loads with strings. JSON true becomes Python True, null becomes None." },
 ]},
 { q: "Find the 3 most common words in a text file.", s: [
   { c: String.raw`from collections import Counter
import re

with open("notes.txt", encoding="utf-8") as f:
    words = re.findall(r"[a-z']+", f.read().lower())

for word, n in Counter(words).most_common(3):
    print(word, n)`,
     e: "A regex pulls out just the words; Counter does the tallying. This combo is a classic take-home task." },
 ]},
],

"w2-6": [
 { q: "Two Sum: return the indexes of two numbers that add up to a target.", s: [
   { t: "Brute force O(n²)", c: String.raw`def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

print(two_sum([2, 7, 11, 15], 9))`, e: "Check every pair. Say this first, then improve it." },
   { t: "Hash map O(n)", c: String.raw`def two_sum(nums, target):
    seen = {}                       # value -> index
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))`, e: "For each number, ask 'have I already seen the number that completes it?'. The most famous interview question." },
 ]},
 { q: "Find the missing number in a list containing 1 to n with one missing.", s: [
   { t: "Sum formula", c: String.raw`nums = [1, 2, 4, 5, 6]
n = len(nums) + 1
print(n * (n + 1) // 2 - sum(nums))   # 3`, e: "Expected total minus actual total." },
   { t: "Set difference", c: String.raw`nums = [1, 2, 4, 5, 6]
print(set(range(1, len(nums) + 2)) - set(nums))`, e: "Also works if you extend it to several missing numbers." },
 ]},
 { q: "Find all duplicate values in a list.", s: [
   { t: "Seen set", c: String.raw`nums = [1, 3, 4, 3, 1, 5, 3]
seen, dupes = set(), set()
for n in nums:
    if n in seen:
        dupes.add(n)
    seen.add(n)
print(dupes)   # {1, 3}`, e: "One pass, O(n)." },
   { t: "Counter", c: String.raw`from collections import Counter
nums = [1, 3, 4, 3, 1, 5, 3]
print([n for n, c in Counter(nums).items() if c > 1])`, e: "Shorter, and you also get the counts." },
 ]},
 { q: "Valid parentheses: is \"({[]})\" balanced?", s: [
   { c: String.raw`def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

print(is_valid("({[]})"), is_valid("(]"), is_valid("(("))   # True False False`,
     e: "A list works as a stack: append pushes, pop takes the last item. Every closing bracket must match the most recent opening one." },
 ]},
 { q: "Group anagrams: [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\"] → [[eat,tea,ate],[tan,nat]].", s: [
   { c: String.raw`from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))`,
     e: "Anagrams share the same sorted letters, so use that as the dict key." },
 ]},
 { q: "Maximum subarray sum (Kadane's algorithm).", s: [
   { c: String.raw`def max_subarray(nums):
    best = current = nums[0]
    for n in nums[1:]:
        current = max(n, current + n)   # extend the run or start fresh
        best = max(best, current)
    return best

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))   # 6  (4, -1, 2, 1)`,
     e: "At each step, decide whether the running sum still helps or you should restart from this number. O(n)." },
 ]},
 { q: "Move all zeros to the end while keeping the order of the other numbers.", s: [
   { t: "New list", c: String.raw`nums = [0, 1, 0, 3, 12]
print([n for n in nums if n != 0] + [0] * nums.count(0))`, e: "Readable but uses extra memory." },
   { t: "In place, two pointers", c: String.raw`nums = [0, 1, 0, 3, 12]
pos = 0
for i in range(len(nums)):
    if nums[i] != 0:
        nums[pos], nums[i] = nums[i], nums[pos]
        pos += 1
print(nums)   # [1, 3, 12, 0, 0]`, e: "pos marks where the next non-zero belongs. What LeetCode expects." },
 ]},
 { q: "Longest common prefix of a list of words.", s: [
   { c: String.raw`def longest_prefix(words):
    if not words:
        return ""
    prefix = words[0]
    for w in words[1:]:
        while not w.startswith(prefix):
            prefix = prefix[:-1]
    return prefix

print(longest_prefix(["flower", "flow", "flight"]))   # fl`,
     e: "Start with the first word and keep trimming it until every word starts with it." },
 ]},
 { q: "Binary search: find a target in a sorted list in O(log n).", s: [
   { t: "Manual", c: String.raw`def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 7))   # 3`, e: "Halve the search range each step. Only works on sorted data." },
   { t: "bisect module", c: String.raw`import bisect
nums = [1, 3, 5, 7, 9, 11]
i = bisect.bisect_left(nums, 7)
print(i if i < len(nums) and nums[i] == 7 else -1)`, e: "The standard library's binary search; also used to insert into a sorted list." },
 ]},
 { q: "Implement bubble sort, then selection sort.", s: [
   { t: "Bubble sort", c: String.raw`def bubble_sort(nums):
    nums = nums[:]                    # don't change the caller's list
    for i in range(len(nums)):
        swapped = False
        for j in range(len(nums) - 1 - i):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swapped = True
        if not swapped:               # already sorted: stop early
            break
    return nums

print(bubble_sort([5, 2, 9, 1, 5, 6]))`, e: "Bigger values bubble to the end on each pass. O(n²)." },
   { t: "Selection sort", c: String.raw`def selection_sort(nums):
    nums = nums[:]
    for i in range(len(nums)):
        smallest = min(range(i, len(nums)), key=nums.__getitem__)
        nums[i], nums[smallest] = nums[smallest], nums[i]
    return nums

print(selection_sort([5, 2, 9, 1, 5, 6]))`, e: "Find the smallest remaining item and put it next. Also O(n²)." },
 ]},
 { q: "Implement merge sort and quick sort.", s: [
   { t: "Merge sort O(n log n)", c: String.raw`def merge_sort(nums):
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left, right = merge_sort(nums[:mid]), merge_sort(nums[mid:])
    merged, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    return merged + left[i:] + right[j:]

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`, e: "Split in half, sort each half, merge the two sorted halves." },
   { t: "Quick sort (readable version)", c: String.raw`def quick_sort(nums):
    if len(nums) <= 1:
        return nums
    pivot = nums[len(nums) // 2]
    return (quick_sort([x for x in nums if x < pivot])
            + [x for x in nums if x == pivot]
            + quick_sort([x for x in nums if x > pivot]))

print(quick_sort([38, 27, 43, 3, 9, 82, 10]))`, e: "Pick a pivot, split into smaller, equal and bigger, and recurse. In real code just call sorted(), which uses Timsort." },
 ]},
 { q: "Merge two sorted lists into one sorted list.", s: [
   { t: "Two pointers", c: String.raw`def merge(a, b):
    out, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    return out + a[i:] + b[j:]

print(merge([1, 4, 7], [2, 3, 8, 9]))`, e: "O(n + m). Leftovers from either list are already sorted, so just add them." },
   { t: "heapq.merge", c: String.raw`import heapq
print(list(heapq.merge([1, 4, 7], [2, 3, 8, 9])))`, e: "The standard-library version, lazy and memory friendly." },
 ]},
 { q: "Find the pair of elements with a given difference, and the majority element (appears more than n/2 times).", s: [
   { c: String.raw`from collections import Counter

def has_pair_with_diff(nums, k):
    s = set(nums)
    return any(n + k in s for n in nums)

def majority(nums):
    value, count = Counter(nums).most_common(1)[0]
    return value if count > len(nums) // 2 else None

print(has_pair_with_diff([5, 20, 3, 2, 50, 80], 78))   # True (2, 80)
print(majority([2, 2, 1, 1, 2, 2, 3]))                # 2`,
     e: "any() returns True as soon as one item matches. Sets and Counter turn many O(n²) questions into O(n)." },
 ]},
 { q: "Sliding window: the maximum sum of any k consecutive numbers.", s: [
   { c: String.raw`def max_window_sum(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]   # add the new item, drop the old one
        best = max(best, window)
    return best

print(max_window_sum([2, 1, 5, 1, 3, 2], 3))   # 9  (5, 1, 3)`,
     e: "Instead of re-adding k numbers each time, slide the window: one addition and one subtraction per step. O(n)." },
 ]},
 { q: "Longest substring without repeating characters.", s: [
   { c: String.raw`def longest_unique(s):
    last_seen = {}
    start = best = 0
    for i, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= start:
            start = last_seen[ch] + 1     # jump past the repeat
        last_seen[ch] = i
        best = max(best, i - start + 1)
    return best

print(longest_unique("abcabcbb"), longest_unique("pwwkew"))   # 3 3`,
     e: "A sliding window whose left edge jumps forward whenever a character repeats inside it. A very common medium-level question." },
 ]},
],

"w2-p": [
 { q: "Load contacts from a JSON file if it exists, and save after every change.", s: [
   { c: String.raw`import json
from pathlib import Path

DB = Path("contacts.json")

def load():
    if DB.exists():
        return json.loads(DB.read_text(encoding="utf-8"))
    return {}

def save(contacts):
    DB.write_text(json.dumps(contacts, indent=2), encoding="utf-8")

contacts = load()
contacts["9876543210"] = {"name": "Asha", "email": "asha@mail.com"}
save(contacts)
print(load())`,
     e: "Two small functions keep file handling in one place. Saving after every change means a crash never loses data." },
 ]},
 { q: "Build a menu loop with match/case.", s: [
   { c: String.raw`def menu():
    while True:
        choice = input("\n1) Add  2) Search  3) List  q) Quit\n> ").strip().lower()
        match choice:
            case "1":
                print("adding...")
            case "2":
                print("searching...")
            case "3":
                print("listing...")
            case "q" | "quit":
                print("Bye")
                break
            case _:
                print("Unknown option")

menu()`,
     e: "A while True menu that dispatches each choice and breaks on quit. .strip().lower() forgives stray spaces and capitals." },
 ]},
 { q: "Search contacts by partial name, case-insensitively, and validate a 10-digit phone number.", s: [
   { c: String.raw`import re

contacts = {"9876543210": {"name": "Asha Rao"}, "9123456780": {"name": "Ravi Kumar"}}

def search(term):
    term = term.lower()
    return {phone: c for phone, c in contacts.items() if term in c["name"].lower()}

def valid_phone(phone):
    return re.fullmatch(r"[6-9]\d{9}", phone) is not None

print(search("ra"))                                   # both match
print(valid_phone("9876543210"), valid_phone("12345"))   # True False`,
     e: "A dict comprehension filters the contacts. re.fullmatch checks the whole string matches the pattern, not just the start." },
 ]},
],

};
