/* Phase 1: Python Foundations (Weeks 1-5) */
export default {

/* ---------- Week 1: Setup and Python basics ---------- */
"w1-1": {
 m: "A clean setup means you spend your time learning Python, not fighting your computer.",
 e: "Python is the language, VS Code is the notebook you write in, and uv is the shopkeeper who fetches the libraries your project needs and keeps each project's shelf separate.",
 k: ["python3 --version tells you which Python runs", "VS Code + Python extension gives run buttons, linting and a debugger", "uv creates projects and virtual environments and installs packages fast", "A project folder should have its own environment, never install everything globally"],
 t: ["Install Python 3.12+ from python.org (or 'brew install python' on Mac)", "Install VS Code and the Python extension from Microsoft", "Install uv, then run 'uv init hello-ai' and 'cd hello-ai'", "Run 'uv run main.py' and see the output", "Change main.py to print your name and today's date, run it again"],
 c: String.raw`# terminal
python3 --version
curl -LsSf https://astral.sh/uv/install.sh | sh
uv init hello-ai && cd hello-ai
uv run main.py

# main.py
from datetime import date
print("Hi, I'm Kamal and today is", date.today())`,
 q: [["What is a virtual environment and why use one?", "An isolated folder of packages per project, so different projects can use different library versions without conflicts."],
     ["What's the difference between Python 2 and 3?", "Python 2 is dead since 2020. Python 3 has print() as a function, true division, and Unicode strings by default."],
     ["Is Python compiled or interpreted?", "CPython compiles source to bytecode, then the interpreter runs that bytecode, so it's usually called interpreted."]],
 x: ["Installing packages with sudo pip into the system Python", "Having two Pythons and not knowing which one VS Code is using (check the bottom-right interpreter picker)"],
 d: "You can create a new project with uv and run a script from both the terminal and VS Code's Run button.",
 min: 60
},
"w1-2": {
 m: "Every program is data being stored, changed and shown. Variables and strings are how you hold that data.",
 e: "A variable is a labelled box. You put a value in, read it later, or swap it for a new one. f-strings are fill-in-the-blank sentences.",
 k: ["Types: int, float, str, bool; check with type()", "Convert with int(), float(), str()", "input() always returns a string", "f-strings: f\"Total: {price * qty:.2f}\"", "Integer division //, remainder %, power **"],
 t: ["Ask the user for their name and birth year with input()", "Calculate their age this year and next year", "Print a sentence using an f-string", "Build a simple unit converter: km to miles and Celsius to Fahrenheit", "Format results to 2 decimal places"],
 c: String.raw`name = input("Name: ")
year = int(input("Birth year: "))
age = 2026 - year
print(f"{name}, you are {age} this year.")

km = float(input("Kilometres: "))
print(f"{km} km = {km * 0.621371:.2f} miles")`,
 q: [["Is Python statically or dynamically typed?", "Dynamically typed: a variable's type is decided at runtime and can change. It is also strongly typed, so '1' + 1 raises an error."],
     ["What is the difference between / and //?", "/ always returns a float; // is floor division and rounds down."],
     ["Are strings mutable in Python?", "No. String methods return new strings; the original never changes."]],
 x: ["Forgetting that input() returns a string, so '5' + '5' gives '55'", "Using + to join strings and numbers instead of an f-string"],
 d: "Your converter asks for input, handles decimals, and prints clean formatted output.",
 min: 60
},
"w1-3": {
 m: "Conditions and loops let a program make decisions and repeat work, which is what makes it more than a calculator.",
 e: "if/else is a fork in the road. A for loop is 'do this for each item'. A while loop is 'keep doing this until something changes'.",
 k: ["Indentation defines blocks in Python", "Comparison: == != < > <= >= and logic: and, or, not", "for i in range(start, stop, step)", "while loops need a condition that eventually becomes False", "break exits a loop; continue skips to the next round"],
 t: ["Write a grade calculator: marks to A/B/C/D/F with if/elif/else", "Print the multiplication table of any number with a for loop", "Build a number-guessing loop that keeps asking until the guess is right", "Count how many guesses it took and print it", "Add a max of 7 attempts using break"],
 c: String.raw`import random
secret = random.randint(1, 100)
for attempt in range(1, 8):
    guess = int(input("Guess 1-100: "))
    if guess == secret:
        print(f"Correct in {attempt} tries!")
        break
    print("Higher" if guess < secret else "Lower")
else:
    print(f"Out of tries. It was {secret}")`,
 q: [["What does the else clause on a for loop do?", "It runs only if the loop finished without hitting break."],
     ["What's the difference between break and continue?", "break leaves the loop entirely; continue skips the rest of the current iteration."],
     ["What is range(10, 0, -2)?", "10, 8, 6, 4, 2 (the stop value is excluded)."]],
 x: ["Infinite while loops because the condition never changes", "Mixing tabs and spaces for indentation"],
 d: "Your guessing game works, limits attempts, and tells the player higher or lower.",
 min: 75
},
"w1-4": {
 m: "Lists are the most-used data structure in Python and in ML. Batches of data, rows, predictions: they're all lists first.",
 e: "A list is a numbered shelf. Slicing is taking a range of items off the shelf without disturbing the shelf itself.",
 k: ["Lists are ordered and mutable; tuples are ordered and immutable", "Indexing starts at 0; -1 is the last item", "Slicing: items[start:stop:step]", "append, extend, insert, pop, remove, sort, sorted()", "len(), sum(), min(), max(), in"],
 t: ["Create a list of 10 monthly expenses", "Print the first 3, last 3, and every second month with slicing", "Find total, average, highest and lowest month", "Sort a copy of the list without changing the original", "Store (month, amount) pairs as tuples and print the costliest month"],
 c: String.raw`expenses = [12000, 9500, 15000, 8000, 11000, 13000, 9000, 10000, 14000, 12500]
print(expenses[:3], expenses[-3:], expenses[::2])
print("Avg:", sum(expenses) / len(expenses))
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"]
pairs = list(zip(months, expenses))
print(max(pairs, key=lambda p: p[1]))`,
 q: [["Difference between a list and a tuple?", "Lists are mutable and use []; tuples are immutable, use (), are hashable, and can be dict keys."],
     ["What does sort() return versus sorted()?", "list.sort() sorts in place and returns None; sorted() returns a new sorted list."],
     ["How do you reverse a list?", "items[::-1] for a copy, or items.reverse() in place."]],
 x: ["Writing x = x.sort() and getting None", "Copying a list with b = a (both names point to the same list; use a.copy())"],
 d: "You can slice, sort and summarise a list without looking anything up.",
 min: 60
},
"w1-5": {
 m: "Problem-solving is a muscle. Small exercises build the pattern recognition that interviews and real work test.",
 e: "Think of these as scales for a musician: short, repetitive drills that make the big pieces easy later.",
 k: ["Break a problem into input, process, output", "Write the steps in plain English first", "Test with edge cases: 0, 1, negative, empty", "Time yourself; aim for under 10 minutes each"],
 t: ["FizzBuzz 1-100", "Reverse a string and check if it's a palindrome", "Sum of digits of a number", "Print all primes under 100", "Count vowels in a sentence", "Find the second largest number in a list", "Do the rest on a practice site (HackerRank Python track or LeetCode easy)"],
 c: String.raw`def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True

print([n for n in range(100) if is_prime(n)])`,
 q: [["How do you check if a string is a palindrome?", "Compare it to its reverse: s == s[::-1], after lowering case and removing spaces."],
     ["Why check divisors only up to the square root for primes?", "If n has a factor bigger than its square root, it must also have one smaller, so you've already found it."],
     ["How would you find duplicates in a list?", "Use a set to track seen items, or collections.Counter and keep counts above 1."]],
 x: ["Jumping to code before understanding the problem", "Not testing edge cases like empty input"],
 d: "You've solved 20 exercises and pushed them to a practice folder on GitHub.",
 min: 120
},
"w1-6": {
 m: "Git is how every engineer saves, shares and shows work. Your GitHub is your AI portfolio.",
 e: "Git is a time machine for your folder. Each commit is a saved snapshot you can go back to. GitHub is where you store the time machine online.",
 k: ["git init, git add, git commit -m, git status, git log", "Remote: git remote add origin URL, git push -u origin main", ".gitignore keeps secrets and junk out of the repo", "Small commits with clear messages"],
 t: ["Create a repo 'python-100-days' on GitHub", "git init in your practice folder and add a .gitignore for Python", "Commit your exercises with a clear message", "Push to GitHub and open it in the browser", "Add a README.md listing what you've learned this week"],
 c: String.raw`git init
echo ".venv/\n__pycache__/\n.env" > .gitignore
git add .
git commit -m "Week 1: basics and 20 exercises"
git branch -M main
git remote add origin https://github.com/<you>/python-100-days.git
git push -u origin main`,
 q: [["Difference between git and GitHub?", "Git is the version-control tool on your machine; GitHub is a hosting service for Git repositories."],
     ["What's the difference between git add and git commit?", "add stages changes; commit saves the staged snapshot to history."],
     ["What is a merge conflict?", "When two branches change the same lines differently and Git can't decide which to keep, so you resolve it manually."]],
 x: ["Committing .env files with API keys", "Huge commits with messages like 'update'"],
 d: "Your week-1 code is on GitHub with a README.",
 min: 45
},
"w1-p": {
 m: "Shipping a small complete thing beats half-finishing a big one. This is your first shipped project.",
 e: "Two tiny apps, done properly: they run, they handle bad input, and anyone can try them from your GitHub.",
 k: ["Input validation with try/except ValueError", "Functions to separate logic from input/output", "EMI formula: P*r*(1+r)^n / ((1+r)^n - 1)"],
 t: ["Build the number-guessing game with difficulty levels (easy 1-50, hard 1-500)", "Build an EMI calculator: loan amount, annual rate, tenure in months", "Reject bad input without crashing", "Write a README with screenshots of the terminal output", "Push both to GitHub"],
 c: String.raw`def emi(principal, annual_rate, months):
    r = annual_rate / 12 / 100
    return principal * r * (1 + r) ** months / ((1 + r) ** months - 1)

print(f"EMI: Rs {emi(500000, 9.5, 60):,.0f}")`,
 q: [["Walk me through a project you built.", "Use the STAR format: the problem, what you built, one hard part you solved, and the result."],
     ["How did you handle invalid user input?", "Wrapped conversions in try/except ValueError and re-prompted the user."]],
 x: ["No README, so nobody knows what the repo does"],
 d: "Both apps run from a fresh clone and the README explains how.",
 min: 120
},

/* ---------- Week 2: Data structures and functions ---------- */
"w2-1": {
 m: "Dictionaries are how Python represents real-world records: a user, a config, a JSON API response, a model's hyperparameters.",
 e: "A dict is a phonebook: look up a name (key) and get the number (value) instantly. A set is a guest list: each name appears once and checking 'is X invited?' is instant.",
 k: ["dict: {key: value}, keys must be hashable", "get(key, default) avoids KeyError", "items(), keys(), values() for looping", "set: unique items; union |, intersection &, difference -", "Lookups in dicts and sets are O(1) on average"],
 t: ["Build a dict of 5 friends and their cities", "Loop and print 'X lives in Y'", "Count word frequency in a paragraph using a dict", "Use sets to find skills common to two job descriptions", "Find skills in job A but not in job B"],
 c: String.raw`text = "ai is the future and the future is now"
freq = {}
for w in text.split():
    freq[w] = freq.get(w, 0) + 1
print(sorted(freq.items(), key=lambda kv: -kv[1])[:3])

job_a = {"python", "sql", "pytorch", "docker"}
job_b = {"python", "aws", "docker", "react"}
print(job_a & job_b, job_a - job_b)`,
 q: [["Why must dict keys be immutable?", "Keys are hashed to find their slot. If a key could change, its hash would change and the lookup would break."],
     ["What's the time complexity of 'x in list' vs 'x in set'?", "O(n) for a list, O(1) average for a set."],
     ["How do you merge two dicts?", "a | b in Python 3.9+, or {**a, **b}."]],
 x: ["Using a list when you need fast membership checks", "Accessing d[key] without checking it exists"],
 d: "You can count, group and compare data with dicts and sets.",
 min: 60
},
"w2-2": {
 m: "Functions turn copy-pasted code into reusable tools. Every ML pipeline is functions calling functions.",
 e: "A function is a recipe card: give it ingredients (arguments), it follows the steps and hands you a dish (return value).",
 k: ["def name(params): ... return value", "Default arguments: def f(x, scale=1)", "*args collects extra positional args as a tuple", "**kwargs collects extra keyword args as a dict", "Docstrings explain what the function does"],
 t: ["Write calculate_bmi(weight_kg, height_m) that returns BMI and a category", "Write average(*numbers) that works for any count of numbers", "Write make_profile(name, **details) that returns a dict", "Add docstrings to all three", "Call each with different arguments"],
 c: String.raw`def average(*nums):
    """Return the mean of any number of values."""
    return sum(nums) / len(nums) if nums else 0

def make_profile(name, **details):
    return {"name": name, **details}

print(average(4, 8, 15))
print(make_profile("Kamal", role="AI learner", city="Hyderabad"))`,
 q: [["What are *args and **kwargs?", "*args gathers extra positional arguments into a tuple; **kwargs gathers extra keyword arguments into a dict."],
     ["What is the danger of a mutable default argument like def f(x=[])?", "The list is created once and shared across calls, so values leak between calls. Use None and create it inside."],
     ["Difference between return and print?", "return hands a value back to the caller; print only shows it on screen."]],
 x: ["Printing inside functions instead of returning values", "Using a list or dict as a default argument"],
 d: "You've written functions that take flexible arguments and return values.",
 min: 60
},
"w2-3": {
 m: "Comprehensions and lambdas are the Pythonic way to transform data in one readable line, and you'll see them everywhere in ML code.",
 e: "A comprehension is a factory line: take each item, maybe filter it, transform it, and put it in a new box.",
 k: ["Local vs global scope (LEGB rule)", "lambda x: x * 2 is a tiny unnamed function", "map(f, items) and filter(f, items)", "[x*2 for x in items if x > 0]", "{k: v for k, v in pairs}"],
 t: ["Given a list of prices, make a list with 18% GST added using a comprehension", "Filter only prices above 500", "Build a dict {product: price} from two lists", "Sort a list of (name, score) tuples by score using a lambda", "Rewrite one of your loops from week 1 as a comprehension"],
 c: String.raw`prices = [250, 800, 1200, 450, 999]
with_gst = [round(p * 1.18, 2) for p in prices]
premium = [p for p in prices if p > 500]
products = ["pen", "bag", "shoes", "cap", "watch"]
catalog = {name: price for name, price in zip(products, prices)}
scores = [("Asha", 88), ("Ravi", 95), ("Meena", 79)]
print(sorted(scores, key=lambda s: s[1], reverse=True))`,
 q: [["What is the LEGB rule?", "Python looks up names in Local, Enclosing, Global, then Built-in scope."],
     ["When should you avoid a comprehension?", "When the logic needs several steps or side effects; a normal loop is clearer."],
     ["Difference between a list comprehension and a generator expression?", "[...] builds the whole list in memory; (...) produces items lazily one at a time."]],
 x: ["Nesting comprehensions so deeply nobody can read them", "Modifying a global variable inside a function without realising"],
 d: "You naturally reach for a comprehension for simple transforms.",
 min: 60
},
"w2-4": {
 m: "Most AI work starts with text: prompts, documents, reviews. String handling is day-one NLP.",
 e: "Strings are sentences you can cut, search, clean and rebuild with built-in tools.",
 k: ["lower(), upper(), strip(), replace()", "split() and ' '.join(list)", "startswith(), endswith(), find(), in", "isdigit(), isalpha()", "String slicing works like lists"],
 t: ["Take a messy sentence with extra spaces and mixed case, clean it", "Count words, characters and sentences", "Build a simple slug maker: 'Zero to AI Engineer!' to 'zero-to-ai-engineer'", "Mask an email: kamal@example.com to k****@example.com", "Find the longest word in a paragraph"],
 c: String.raw`import re
def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    return "-".join(text.split())

print(slugify("  Zero to AI Engineer!  "))`,
 q: [["How do you reverse the words in a sentence?", "' '.join(sentence.split()[::-1])"],
     ["Why is ''.join(list) faster than += in a loop?", "Strings are immutable, so += creates a new string each time; join builds it once."],
     ["How do you check if two strings are anagrams?", "sorted(a) == sorted(b), or compare Counter(a) == Counter(b)."]],
 x: ["Forgetting that string methods return a new string", "Not normalising case before comparing"],
 d: "Your slug maker and email masker handle messy input.",
 min: 45
},
"w2-5": {
 m: "Data lives in files. CSV and JSON are the formats you'll read and write most as an AI engineer.",
 e: "Opening a file is like opening a notebook: read what's inside, write something new, and always close it (with does the closing for you).",
 k: ["with open(path, 'r' or 'w' or 'a') as f", "csv.reader / csv.DictReader / csv.writer", "json.load / json.dump / json.loads / json.dumps", "encoding='utf-8' for Indian-language text"],
 t: ["Write a list of 5 students with marks into students.csv", "Read it back and compute the class average", "Convert the CSV into a JSON file", "Load the JSON and print the topper", "Append a new student without overwriting the file"],
 c: String.raw`import csv, json
rows = [{"name": "Asha", "marks": 88}, {"name": "Ravi", "marks": 95}]
with open("students.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["name", "marks"])
    w.writeheader(); w.writerows(rows)

with open("students.csv") as f:
    data = [{"name": r["name"], "marks": int(r["marks"])} for r in csv.DictReader(f)]
json.dump(data, open("students.json", "w"), indent=2)`,
 q: [["Why use 'with' to open files?", "It closes the file automatically, even if an error happens."],
     ["Difference between json.load and json.loads?", "load reads from a file object; loads parses a string."],
     ["How would you read a 10 GB file?", "Iterate line by line (for line in f) or read in chunks, never f.read() all at once."]],
 x: ["Opening with 'w' and wiping a file you meant to append to", "Forgetting CSV values come back as strings"],
 d: "You can round-trip data between CSV and JSON.",
 min: 60
},
"w2-6": {
 m: "Practice problems make the concepts stick and are exactly what coding rounds test.",
 e: "Reps at the gym. Each problem uses dicts, sets, strings or functions you learned this week.",
 k: ["Two-sum with a dict", "Anagram groups with a dict of sorted keys", "First non-repeating character", "Remove duplicates while keeping order"],
 t: ["Solve 15 easy problems on LeetCode or HackerRank (Python)", "For each, write the time complexity in a comment", "Redo 3 of them without looking at your solution", "Push them to your practice repo"],
 c: String.raw`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i

print(two_sum([2, 7, 11, 15], 9))`,
 q: [["Solve two-sum in O(n).", "Store each number's index in a dict and check if target minus the current number is already there."],
     ["What is Big-O notation?", "A way to describe how running time or memory grows as the input grows."]],
 x: ["Looking at solutions after 2 minutes; struggle for at least 15"],
 d: "15 problems solved with complexity noted.",
 min: 120
},
"w2-p": {
 m: "A contact book is a tiny database app. It combines everything from weeks 1-2: dicts, functions, loops, files.",
 e: "A menu-driven terminal app that saves contacts to a JSON file so they're still there next time.",
 k: ["Menu loop with while True", "One function per action", "Load on start, save after every change"],
 t: ["Menu: add, search, update, delete, list, quit", "Store contacts as a dict keyed by phone number", "Save to contacts.json after every change", "Search by partial name, case-insensitive", "Validate phone numbers are 10 digits", "README with usage"],
 q: [["How would you scale this to a million contacts?", "Move from a JSON file to a database like SQLite or Postgres with an index on name and phone."],
     ["Why key by phone number instead of name?", "Phone numbers are unique; names aren't."]],
 x: ["Losing data because you only save on quit and the program crashes"],
 d: "Contacts survive restarting the program.",
 min: 150
},

/* ---------- Week 3: OOP and errors ---------- */
"w3-1": {
 m: "PyTorch models, scikit-learn estimators and LangChain tools are all classes. OOP lets you read and build them.",
 e: "A class is a blueprint (like 'Car'), an object is one real car built from it. Attributes are its data (colour), methods are what it can do (drive).",
 k: ["class Name: with __init__(self, ...)", "self refers to the current object", "Instance attributes vs class attributes", "Methods are functions that belong to a class"],
 t: ["Create a Student class with name, roll number, and a marks dict", "Add methods add_mark(subject, score), average(), and grade()", "Create 3 students and print a report card for each", "Add a class attribute school_name shared by all students"],
 c: String.raw`class Student:
    school = "Zero to AI Academy"
    def __init__(self, name, roll):
        self.name, self.roll, self.marks = name, roll, {}
    def add_mark(self, subject, score):
        self.marks[subject] = score
    def average(self):
        return sum(self.marks.values()) / len(self.marks)

s = Student("Kamal", 1); s.add_mark("Math", 90); s.add_mark("AI", 95)
print(s.name, s.average(), Student.school)`,
 q: [["What is self?", "A reference to the instance the method is called on; Python passes it automatically."],
     ["Difference between a class attribute and an instance attribute?", "Class attributes are shared by all instances; instance attributes belong to one object."],
     ["What is __init__?", "The initialiser that sets up a new object's attributes right after it's created."]],
 x: ["Forgetting self in method definitions", "Putting mutable data in class attributes so all objects share it by accident"],
 d: "You can model a real thing as a class with data and behaviour.",
 min: 75
},
"w3-2": {
 m: "Inheritance is exactly how you build a PyTorch model: class MyNet(nn.Module). Dunder methods make your objects feel native.",
 e: "Inheritance is 'is-a' (a SavingsAccount is an Account). Composition is 'has-a' (a Car has an Engine). Dunder methods teach Python how to print, compare or measure your object.",
 k: ["class Child(Parent): and super().__init__()", "Override methods to change behaviour", "Composition: store other objects as attributes", "__str__ for users, __repr__ for developers, __len__, __eq__"],
 t: ["Create Account with deposit and withdraw", "Create SavingsAccount(Account) that adds interest", "Create Bank that has a list of accounts (composition)", "Add __str__ so print(account) looks nice", "Add __len__ to Bank to return number of accounts"],
 c: String.raw`class Account:
    def __init__(self, owner, balance=0):
        self.owner, self.balance = owner, balance
    def __str__(self):
        return f"{self.owner}: Rs {self.balance:,}"

class SavingsAccount(Account):
    def __init__(self, owner, balance=0, rate=0.04):
        super().__init__(owner, balance)
        self.rate = rate
    def add_interest(self):
        self.balance += self.balance * self.rate`,
 q: [["Inheritance vs composition, which do you prefer?", "Prefer composition for flexibility; use inheritance for true is-a relationships."],
     ["What does super() do?", "Calls the parent class's method, usually to reuse its __init__."],
     ["What is method resolution order (MRO)?", "The order Python searches classes for a method in multiple inheritance, shown by Class.__mro__."]],
 x: ["Deep inheritance chains that are hard to follow", "Forgetting to call super().__init__()"],
 d: "Your bank classes use inheritance, composition and at least two dunder methods.",
 min: 75
},
"w3-3": {
 m: "Real programs fail: files are missing, APIs time out, users type nonsense. Handling errors well is what makes code production-ready.",
 e: "try is 'attempt this', except is 'if it goes wrong, do this instead', finally is 'do this no matter what'.",
 k: ["try / except SpecificError / else / finally", "Catch specific exceptions, not bare except", "raise ValueError('clear message')", "Custom exceptions: class InsufficientFunds(Exception)"],
 t: ["Make withdraw() raise InsufficientFundsError when balance is too low", "Catch it in the menu and show a friendly message", "Handle ValueError when the user types letters for an amount", "Use finally to log every transaction attempt", "Try reading a missing file and handle FileNotFoundError"],
 c: String.raw`class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(f"Need {amount}, have {balance}")
    return balance - amount

try:
    withdraw(1000, 5000)
except InsufficientFundsError as e:
    print("Sorry:", e)`,
 q: [["Why avoid a bare except:?", "It catches everything, including KeyboardInterrupt and bugs you want to see, hiding real problems."],
     ["When does the else block of try run?", "Only when no exception was raised in the try block."],
     ["Difference between an error and an exception?", "Exceptions are errors raised at runtime that you can catch; syntax errors stop the code before it runs."]],
 x: ["Catching exceptions and silently passing", "Raising generic Exception with no message"],
 d: "Your bank app never crashes on bad input.",
 min: 60
},
"w3-4": {
 m: "Real projects span many files. Modules and packages are how you organise code so it can grow.",
 e: "A module is one .py file. A package is a folder of modules. The __main__ check means 'only run this when the file is run directly, not when imported'.",
 k: ["import module, from module import name", "A folder with __init__.py is a package", "if __name__ == '__main__': guard", "Relative vs absolute imports"],
 t: ["Split your bank app into models.py, errors.py and main.py", "Put them in a package folder bank/", "Import classes into main.py", "Add the __main__ guard", "Import a function from models.py in a Python shell and confirm main code doesn't run"],
 c: String.raw`# bank/models.py
from bank.errors import InsufficientFundsError
class Account: ...

# main.py
from bank.models import Account
if __name__ == "__main__":
    acc = Account("Kamal", 1000)
    print(acc)`,
 q: [["What does if __name__ == '__main__' do?", "Runs the block only when the file is executed directly, not when it's imported."],
     ["What is __init__.py for?", "Marks a folder as a package and can run setup code or expose names."],
     ["What causes circular imports and how do you fix them?", "Two modules importing each other; fix by moving shared code to a third module or importing inside a function."]],
 x: ["Naming a file random.py or json.py and shadowing the standard library"],
 d: "Your project runs from main.py with code split into a package.",
 min: 45
},
"w3-5": {
 m: "Reproducible environments are how teams avoid 'works on my machine'. Every ML repo you clone will need this.",
 e: "A virtual environment is a private toolbox for one project. pyproject.toml is the list of tools in it, so anyone can rebuild the same toolbox.",
 k: ["uv venv creates .venv", "uv add requests adds a dependency to pyproject.toml", "uv.lock pins exact versions", "uv sync recreates the environment from the lock file"],
 t: ["Create a new project with uv init", "Add requests and rich with uv add", "Look inside pyproject.toml and uv.lock", "Delete .venv, run uv sync, and watch it rebuild", "Use rich to print your bank statement as a table"],
 c: String.raw`uv init bank-app && cd bank-app
uv add rich requests
uv run python -c "import rich; print('ok')"
rm -rf .venv && uv sync`,
 q: [["What's a lock file and why commit it?", "It pins exact versions of every dependency so everyone installs identical packages."],
     ["pip vs uv vs conda?", "pip installs packages; uv is a much faster all-in-one replacement for pip and venv; conda also manages non-Python dependencies like CUDA."]],
 x: ["Committing the .venv folder to Git"],
 d: "Someone can clone your repo and run uv sync to get the same setup.",
 min: 40
},
"w3-6": {
 m: "Type hints and dataclasses make code self-documenting and are used heavily in FastAPI and Pydantic, which power LLM apps.",
 e: "Type hints are labels on the boxes saying what should go in. A dataclass is a class that writes its own boring boilerplate for you.",
 k: ["def f(x: int) -> str:", "list[str], dict[str, int], Optional[int] or int | None", "@dataclass auto-creates __init__, __repr__, __eq__", "field(default_factory=list) for mutable defaults"],
 t: ["Add type hints to every function in your bank app", "Convert Transaction into a @dataclass with amount, type, timestamp", "Install mypy and run it on your code", "Fix any type errors mypy finds"],
 c: String.raw`from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Transaction:
    amount: float
    kind: str
    at: datetime = field(default_factory=datetime.now)

print(Transaction(500, "deposit"))`,
 q: [["Does Python enforce type hints at runtime?", "No. They're for tools like mypy and editors; libraries like Pydantic can enforce them."],
     ["When would you use a dataclass?", "For classes that mainly hold data, to avoid writing __init__ and __repr__ by hand."]],
 x: ["Thinking type hints will stop wrong types at runtime"],
 d: "mypy passes on your bank app.",
 min: 45
},
"w3-p": {
 m: "This project proves you can design a small system with classes, not just write scripts.",
 e: "A library or bank system with classes, custom errors, a package layout, type hints and tests.",
 k: ["Design classes on paper first", "One responsibility per class", "Custom exceptions for business rules"],
 t: ["Choose library (books, members, loans) or bank (accounts, transactions)", "Draw the classes and their relationships", "Implement with dataclasses and type hints", "Custom errors for rule violations (book already issued, low balance)", "A menu-driven main.py", "README with a class diagram (Mermaid works on GitHub)"],
 q: [["How did you decide which classes to create?", "Listed the nouns in the problem (book, member, loan), gave each its data and actions, and kept responsibilities separate."],
     ["What would you change to add a web interface?", "Keep the classes as-is and add a FastAPI layer that calls them, since business logic is already separate from input/output."]],
 x: ["God classes that do everything"],
 d: "The system handles rule violations cleanly and the README shows the design.",
 min: 180
},

/* ---------- Week 4: Pythonic and intermediate ---------- */
"w4-1": {
 m: "Generators let you process data too big for memory, one item at a time. PyTorch DataLoaders work on the same idea.",
 e: "A list cooks all the food at once. A generator is a chef who makes one plate each time you ask.",
 k: ["Iterables have __iter__, iterators have __next__", "yield pauses a function and returns a value", "Generator expressions: (x*x for x in range(10))", "Lazy evaluation saves memory"],
 t: ["Write a generator that yields Fibonacci numbers forever", "Take the first 20 with itertools.islice", "Write a generator that reads a big log file line by line and yields only ERROR lines", "Compare memory of a list vs generator with sys.getsizeof"],
 c: String.raw`import sys
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

from itertools import islice
print(list(islice(fib(), 20)))
print(sys.getsizeof([x for x in range(10**6)]), sys.getsizeof(x for x in range(10**6)))`,
 q: [["What is the difference between return and yield?", "return ends the function; yield pauses it and resumes from the same spot next time."],
     ["Can you iterate a generator twice?", "No, it's exhausted after one pass; create a new one."],
     ["Iterator vs iterable?", "An iterable can give you an iterator (list); an iterator produces the next item and remembers position."]],
 x: ["Converting a generator to a list and losing the memory benefit"],
 d: "You've processed a file with a generator instead of loading it all.",
 min: 60
},
"w4-2": {
 m: "Decorators power FastAPI routes, caching, retries and timing. Context managers handle files, DB connections and GPU devices safely.",
 e: "A decorator is gift wrapping: it adds something around a function without changing what's inside. A context manager is a hotel room: check in, use it, and checkout happens automatically.",
 k: ["Functions are objects and can be passed around", "A decorator takes a function and returns a new one", "functools.wraps keeps the original name", "with + __enter__/__exit__ or @contextmanager"],
 t: ["Write @timer that prints how long a function took", "Write @retry(times=3) that retries a flaky function", "Write a context manager that times a block of code", "Use functools.lru_cache on a slow Fibonacci and compare speed"],
 c: String.raw`import time, functools
def timer(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        out = fn(*args, **kwargs)
        print(f"{fn.__name__} took {time.perf_counter() - start:.3f}s")
        return out
    return wrapper

@timer
def slow():
    time.sleep(0.5)
slow()`,
 q: [["What is a decorator?", "A function that takes a function and returns a wrapped version, adding behaviour before or after it."],
     ["Why use functools.wraps?", "It copies the original function's name and docstring onto the wrapper."],
     ["How do you write a context manager?", "A class with __enter__ and __exit__, or a generator function with @contextlib.contextmanager."]],
 x: ["Forgetting to return the result from the wrapper"],
 d: "Your @timer and @retry decorators work on any function.",
 min: 75
},
"w4-3": {
 m: "The standard library solves common problems so you don't reinstall the wheel. Knowing it makes you fast.",
 e: "Python ships with a full toolbox. pathlib handles files, datetime handles time, collections has smarter containers, re finds text patterns.",
 k: ["pathlib.Path for file paths", "datetime, timedelta for dates", "collections: Counter, defaultdict, deque, namedtuple", "itertools: chain, groupby, combinations", "re: search, findall, sub"],
 t: ["List all .py files in a folder with Path.glob", "Count the most common words in a text with Counter", "Group expenses by category with defaultdict(list)", "Find all email addresses in a text with re.findall", "Calculate days until your next birthday"],
 c: String.raw`from pathlib import Path
from collections import Counter
import re
from datetime import date

print(list(Path(".").glob("**/*.py"))[:5])
text = Path("notes.txt").read_text() if Path("notes.txt").exists() else "a b a c a"
print(Counter(text.split()).most_common(3))
print(re.findall(r"[\w.]+@[\w.]+", "mail me at a@b.com or c@d.in"))`,
 q: [["When would you use defaultdict?", "When grouping or counting, so missing keys get a default value instead of raising KeyError."],
     ["What is a deque good for?", "Fast appends and pops from both ends, like a queue or a sliding window."]],
 x: ["Building file paths with string concatenation instead of pathlib"],
 d: "You solved each task with the standard library, no pip installs.",
 min: 60
},
"w4-4": {
 m: "Tests prove your code works and let you change it without fear. Every serious AI team runs tests in CI.",
 e: "A test is a tiny robot that checks one thing: 'if I give this input, do I get this output?'",
 k: ["Files named test_*.py, functions named test_*", "assert expected == actual", "pytest.raises for expected errors", "Fixtures for shared setup", "Parametrize to test many inputs"],
 t: ["uv add --dev pytest", "Write tests for your bank Account class: deposit, withdraw, errors", "Use @pytest.mark.parametrize for 5 EMI cases", "Run pytest and get all green", "Break a function on purpose and watch a test fail"],
 c: String.raw`import pytest
from bank.models import Account
from bank.errors import InsufficientFundsError

def test_deposit():
    a = Account("K", 100); a.deposit(50)
    assert a.balance == 150

def test_overdraw():
    with pytest.raises(InsufficientFundsError):
        Account("K", 10).withdraw(100)`,
 q: [["Unit test vs integration test?", "Unit tests check one small piece in isolation; integration tests check pieces working together."],
     ["What is a fixture?", "Reusable setup code pytest injects into tests, like a fresh database or object."],
     ["What is test coverage?", "The percentage of code lines executed by tests; useful, but high coverage doesn't guarantee good tests."]],
 x: ["Tests that depend on each other's order"],
 d: "pytest passes with at least 8 tests.",
 min: 75
},
"w4-5": {
 m: "Logs are how you debug code running on a server at 3 a.m. print() doesn't scale; logging does.",
 e: "Logging is a diary with importance levels: DEBUG for details, INFO for normal events, WARNING, ERROR and CRITICAL for problems.",
 k: ["logging.basicConfig(level=..., format=...)", "logger = logging.getLogger(__name__)", "Levels filter what gets shown", "Log to file and console together"],
 t: ["Replace print statements in your bank app with logging", "Log every transaction at INFO and failures at WARNING", "Write logs to bank.log with timestamps", "Switch level to DEBUG and see extra detail"],
 c: String.raw`import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    handlers=[logging.FileHandler("bank.log"), logging.StreamHandler()],
)
log = logging.getLogger("bank")
log.info("Deposit 500 to acc 1")
log.warning("Withdraw failed: insufficient funds")`,
 q: [["Why use logging instead of print?", "Levels, timestamps, multiple outputs, and you can turn detail on or off without changing code."],
     ["What should never be logged?", "Passwords, API keys, tokens and personal data."]],
 x: ["Logging secrets or full request bodies"],
 d: "Your app writes a readable log file.",
 min: 40
},
"w4-6": {
 m: "Reading errors calmly is the most underrated skill in programming. The traceback usually tells you exactly what's wrong.",
 e: "A traceback is a trail of breadcrumbs. Read it from the bottom: the last line is the error, the lines above show how you got there.",
 k: ["Read the last line first (error type and message)", "Find the first line that points to YOUR file", "Breakpoints pause code so you can inspect variables", "Step over, step into, continue", "breakpoint() in code opens the debugger"],
 t: ["Write a buggy function (off-by-one, wrong key, None return)", "Run it and read the traceback out loud", "Set a breakpoint in VS Code and inspect variables", "Fix all three bugs using only the debugger", "Search one error message on Stack Overflow and read the top answer"],
 q: [["How do you debug a program that works locally but fails in production?", "Check logs and the exact error, reproduce with the same inputs and environment, and add logging around the failing part."],
     ["What is a KeyError vs IndexError vs AttributeError?", "Missing dict key, list position out of range, and an object that doesn't have that attribute or method."]],
 x: ["Reading the top of the traceback instead of the bottom", "Changing random things until it works"],
 d: "You fixed three bugs using the debugger rather than print.",
 min: 45
},
"w4-p": {
 m: "Automating a real annoyance is how you start thinking like an engineer.",
 e: "A script that tidies a messy Downloads folder into subfolders by type and month, with tests so it never deletes anything by mistake.",
 k: ["pathlib for files", "shutil.move", "--dry-run flag to preview", "argparse for command-line options"],
 t: ["Map extensions to folders: Images, Documents, Videos, Code, Others", "Sub-folder by year-month from the file's modified date", "Add --dry-run to print moves without doing them", "Handle name clashes by adding (1), (2)", "Test with a temporary folder using pytest's tmp_path", "Log every move"],
 c: String.raw`import argparse, shutil
from pathlib import Path
TYPES = {".jpg": "Images", ".png": "Images", ".pdf": "Documents", ".mp4": "Videos", ".py": "Code"}

def organise(folder: Path, dry_run: bool):
    for f in folder.iterdir():
        if f.is_file():
            dest = folder / TYPES.get(f.suffix.lower(), "Others")
            print(("DRY " if dry_run else "") + f"{f.name} -> {dest.name}")
            if not dry_run:
                dest.mkdir(exist_ok=True); shutil.move(str(f), dest / f.name)`,
 q: [["How did you make the script safe?", "A dry-run mode, never overwriting files, logging every move, and tests on a temporary folder."]],
 x: ["Testing on your real Downloads folder first"],
 d: "Tests pass and dry-run output looks right before you run it for real.",
 min: 150
},

/* ---------- Week 5: Python for the real world ---------- */
"w5-1": {
 m: "Every LLM, weather service and payment system is an API. Calling APIs is how your code talks to the world.",
 e: "An API is a restaurant menu for software. You send a request (order), the server sends back a response (dish), usually as JSON.",
 k: ["HTTP methods: GET, POST, PUT, DELETE", "Status codes: 200 OK, 400 bad request, 401 unauthorised, 404, 429 rate limit, 500", "requests.get(url, params=..., timeout=...)", "response.json()", "Always set a timeout"],
 t: ["Call a free API (open-meteo.com weather, no key needed) for Hyderabad", "Print current temperature and wind speed", "Handle a timeout and a non-200 status", "Call a second API and combine results", "Save responses to a JSON file"],
 c: String.raw`import requests
url = "https://api.open-meteo.com/v1/forecast"
params = {"latitude": 17.38, "longitude": 78.48, "current_weather": True}
r = requests.get(url, params=params, timeout=10)
r.raise_for_status()
print(r.json()["current_weather"])`,
 q: [["What does a 429 status mean and how do you handle it?", "Too many requests; back off and retry after the time in the Retry-After header."],
     ["Difference between GET and POST?", "GET reads data with parameters in the URL; POST sends data in the body to create or process something."],
     ["What is REST?", "An API style using URLs for resources and HTTP methods for actions, usually returning JSON."]],
 x: ["No timeout, so your program hangs forever", "Hard-coding API keys in code"],
 d: "Your script prints live weather and handles failures.",
 min: 60
},
"w5-2": {
 m: "Scraping lets you collect data that has no API, which is often where your training data comes from.",
 e: "A web page is HTML, like a labelled tree. BeautifulSoup lets you walk the tree and pick out the leaves you want.",
 k: ["requests to fetch HTML", "BeautifulSoup(html, 'html.parser')", "find, find_all, select (CSS selectors)", "Respect robots.txt and rate limits"],
 t: ["Scrape quotes.toscrape.com (a practice site)", "Extract quote text, author and tags", "Follow the 'Next' link to scrape all pages", "Save to CSV", "Add a 1-second delay between requests"],
 c: String.raw`import requests, time
from bs4 import BeautifulSoup
url, rows = "https://quotes.toscrape.com", []
while url:
    soup = BeautifulSoup(requests.get(url, timeout=10).text, "html.parser")
    for q in soup.select(".quote"):
        rows.append((q.select_one(".text").text, q.select_one(".author").text))
    nxt = soup.select_one("li.next a")
    url = "https://quotes.toscrape.com" + nxt["href"] if nxt else None
    time.sleep(1)
print(len(rows))`,
 q: [["Is web scraping legal?", "It depends on the site's terms, robots.txt and local law; scrape public data politely and never personal data without consent."],
     ["What if a page loads content with JavaScript?", "Use the site's underlying API from the network tab, or a headless browser like Playwright."]],
 x: ["Hammering a site with no delay", "Relying on fragile selectors that break when the page changes"],
 d: "You have a CSV of all quotes from every page.",
 min: 60
},
"w5-3": {
 m: "LLM apps make many slow API calls. Async lets you make them at the same time instead of waiting one by one.",
 e: "Synchronous code is one cashier serving customers one at a time. Async is a cashier who takes the next order while the first one's coffee brews.",
 k: ["async def defines a coroutine", "await pauses until the result is ready", "asyncio.gather runs many at once", "Async helps I/O-bound work, not CPU-bound work", "httpx.AsyncClient for async HTTP"],
 t: ["Fetch weather for 10 Indian cities sequentially and time it", "Rewrite with asyncio and httpx.AsyncClient", "Compare the timings", "Add a semaphore to limit to 5 requests at once"],
 c: String.raw`import asyncio, httpx, time
CITIES = {"Hyderabad": (17.38, 78.48), "Delhi": (28.61, 77.21), "Chennai": (13.08, 80.27)}

async def fetch(client, name, lat, lon):
    r = await client.get("https://api.open-meteo.com/v1/forecast",
        params={"latitude": lat, "longitude": lon, "current_weather": True})
    return name, r.json()["current_weather"]["temperature"]

async def main():
    async with httpx.AsyncClient(timeout=10) as c:
        print(await asyncio.gather(*(fetch(c, n, *ll) for n, ll in CITIES.items())))
t = time.perf_counter(); asyncio.run(main()); print(time.perf_counter() - t)`,
 q: [["Concurrency vs parallelism?", "Concurrency is juggling many tasks by switching between them; parallelism is running them at literally the same time on multiple cores."],
     ["When does async NOT help?", "CPU-heavy work like number crunching; use multiprocessing for that."],
     ["What is the GIL?", "The Global Interpreter Lock lets only one thread run Python bytecode at a time in CPython, limiting CPU-bound threading."]],
 x: ["Calling a blocking function like requests.get inside async code"],
 d: "Async version is several times faster than sequential.",
 min: 75
},
"w5-4": {
 m: "FastAPI is how you'll serve ML models and LLM apps. This is the bridge from scripts to products.",
 e: "FastAPI turns your Python functions into web endpoints. Anyone (or any app) can call them over the internet.",
 k: ["@app.get and @app.post decorators define routes", "Path and query parameters", "Pydantic models validate request bodies", "Automatic docs at /docs", "Run with uvicorn"],
 t: ["uv add fastapi uvicorn", "Create GET /health returning {status: ok}", "Create POST /emi taking principal, rate, months and returning EMI", "Open http://127.0.0.1:8000/docs and test it", "Return a 422 for negative amounts using Pydantic validation"],
 c: String.raw`from fastapi import FastAPI
from pydantic import BaseModel, Field
app = FastAPI()

class Loan(BaseModel):
    principal: float = Field(gt=0)
    annual_rate: float = Field(gt=0)
    months: int = Field(gt=0)

@app.post("/emi")
def emi(loan: Loan):
    r = loan.annual_rate / 1200
    value = loan.principal * r * (1 + r) ** loan.months / ((1 + r) ** loan.months - 1)
    return {"emi": round(value, 2)}
# run: uv run uvicorn main:app --reload`,
 q: [["Why FastAPI over Flask?", "Built-in validation with Pydantic, async support, automatic docs, and high performance."],
     ["What is Pydantic?", "A library that validates and parses data using type hints."],
     ["What is uvicorn?", "An ASGI server that runs FastAPI apps."]],
 x: ["Doing heavy work inside the request so the API becomes slow"],
 d: "Your EMI API works from the /docs page and rejects bad input.",
 min: 75
},
"w5-5": {
 m: "Every LLM project needs API keys. Leaking one costs real money, so learn the safe way now.",
 e: "Secrets go in a .env file that stays on your machine. Your code reads them from the environment, and .gitignore keeps them off GitHub.",
 k: ["os.environ['KEY'] or os.getenv('KEY')", "python-dotenv loads .env into the environment", ".env in .gitignore, commit a .env.example instead", "Rotate a key immediately if it leaks"],
 t: ["Create .env with WEATHER_UNITS=metric and a fake API_KEY", "Load it with python-dotenv and print (masked) values", "Add .env to .gitignore and create .env.example", "Make the app fail with a clear message if a key is missing"],
 c: String.raw`import os
from dotenv import load_dotenv
load_dotenv()
key = os.getenv("API_KEY")
if not key:
    raise SystemExit("API_KEY missing: copy .env.example to .env and fill it in")
print("Key loaded:", key[:4] + "****")`,
 q: [["How do you manage secrets in production?", "Environment variables from a secrets manager (AWS Secrets Manager, Vercel env vars, GitHub secrets), never in code."],
     ["What do you do if you push a key to GitHub?", "Revoke and rotate it immediately; deleting the commit isn't enough because it's already exposed."]],
 x: ["Committing .env", "Printing full keys in logs"],
 d: "Your repo has .env.example and no real secrets.",
 min: 30
},
"w5-6": {
 m: "Notebooks are where data science and ML experiments happen. Knowing when to switch to scripts is what separates hobby code from engineering.",
 e: "A notebook is a lab bench for trying things and seeing results instantly. A script is the finished machine you can run again and again.",
 k: ["Jupyter cells: code and markdown", "Restart kernel and run all to check it works top to bottom", "Use notebooks to explore, scripts to reuse", "VS Code runs .ipynb files directly"],
 t: ["Open a notebook in VS Code (uv add --dev ipykernel)", "Load your students.csv and explore it cell by cell", "Add markdown cells explaining what you found", "Move the useful functions into a .py file and import them into the notebook", "Restart and run all to confirm it works"],
 q: [["What are the downsides of notebooks?", "Hidden state from running cells out of order, hard to test, messy diffs in Git."],
     ["How do you move notebook code to production?", "Refactor functions into modules, add tests, and call them from scripts or an API."]],
 x: ["Running cells out of order and trusting the results"],
 d: "Your notebook runs cleanly from top to bottom after a restart.",
 min: 45
},
"w5-p": {
 m: "Your Phase 1 capstone: a real API service with tests and docs. This is portfolio-worthy.",
 e: "A FastAPI service that wraps a public API (weather, cricket or news), adds your own logic, caches results and is fully tested.",
 k: ["FastAPI + httpx (async)", "Simple in-memory cache with expiry", "pytest with TestClient", "README with example requests"],
 t: ["Pick a public API (open-meteo weather is easiest)", "Endpoint GET /weather/{city} that returns cleaned data plus a 'what to wear' suggestion", "Cache results for 10 minutes", "Handle the upstream API failing with a clean 503", "Write tests using FastAPI's TestClient", "README with curl examples, push to GitHub"],
 c: String.raw`from fastapi.testclient import TestClient
from main import app
client = TestClient(app)

def test_health():
    assert client.get("/health").json() == {"status": "ok"}`,
 q: [["Why did you add caching?", "To avoid repeated calls to the upstream API, which makes responses faster and avoids rate limits."],
     ["How would you deploy this?", "Containerise with Docker and deploy to Render, Railway or a cloud VM with environment variables for config."]],
 x: ["Skipping tests because 'it works when I try it'"],
 d: "The API runs, tests pass, and a stranger could use it from your README.",
 min: 240
}
};
