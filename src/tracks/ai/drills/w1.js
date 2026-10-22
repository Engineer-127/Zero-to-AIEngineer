/* Week 1 syntax drills: setup, variables, conditionals, loops, lists, tuples and the classic interview exercises.
   Shape per lesson: [{ q: problem, s: [{ t: option label, c: code, e: why it works }] }] */
export default {

"w1-1": [
 { q: "Print \"Hello, World!\" and check which Python version is running.", s: [
   { t: "print and sys", c: String.raw`import sys

print("Hello, World!")
print(sys.version)          # full version string
print(sys.version_info >= (3, 12))   # True if you are on 3.12 or newer`,
     e: "print() writes to the screen. sys is a built-in module; sys.version_info is a tuple you can compare, which is how real scripts refuse to run on old Pythons." },
 ]},
 { q: "Print several values on one line, separated by \" | \", without a newline at the end.", s: [
   { t: "sep and end", c: String.raw`print("AI", "ML", "DL", sep=" | ", end="")
print("  <- same line")`,
     e: "print takes any number of values. sep is what goes between them (default a space) and end is what goes after (default a newline)." },
 ]},
 { q: "Write single-line and multi-line comments, and a docstring for a script.", s: [
   { c: String.raw`"""hello.py: my first script.

A docstring is the first string in a file, class or function.
Tools like help() and VS Code show it.
"""

# A single-line comment starts with #
total = 10  # comments can also sit at the end of a line

print(__doc__)   # prints the docstring above`,
     e: "Python has no special multi-line comment syntax: you use several # lines. A triple-quoted string at the top is a docstring, which documents the file and is readable at runtime." },
 ]},
],

"w1-2": [
 { q: "Swap the values of two variables a and b.", s: [
   { t: "Pythonic tuple swap", c: String.raw`a, b = 5, 10
a, b = b, a
print(a, b)   # 10 5`,
     e: "The right side builds a tuple (10, 5) first, then unpacks it into a and b. This is the version interviewers expect in Python." },
   { t: "With a temporary variable", c: String.raw`a, b = 5, 10
temp = a
a = b
b = temp
print(a, b)`,
     e: "The classic way from C and Java. Good to know because you will read it in older code." },
   { t: "Arithmetic, no extra variable (numbers only)", c: String.raw`a, b = 5, 10
a = a + b   # 15
b = a - b   # 5
a = a - b   # 10
print(a, b)`,
     e: "A common trick question. Works only for numbers; in Python always prefer option 1." },
 ]},
 { q: "Read two numbers from the user and print their sum, difference, product, division, floor division, remainder and power.", s: [
   { c: String.raw`a = float(input("First number: "))
b = float(input("Second number: "))

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")`,
     e: "input() always returns a string, so convert with float() or int(). / gives a float, // rounds down, % is the remainder, ** is power. :.2f inside an f-string means 2 decimal places." },
 ]},
 { q: "Convert Celsius to Fahrenheit and back.", s: [
   { c: String.raw`c = float(input("Celsius: "))
f = c * 9 / 5 + 32
print(f"{c}°C = {f:.1f}°F")

f = float(input("Fahrenheit: "))
c = (f - 32) * 5 / 9
print(f"{f}°F = {c:.1f}°C")`,
     e: "Arithmetic follows normal maths precedence: * and / before + and -. Use brackets when you want to be explicit." },
 ]},
 { q: "Calculate simple interest and compound interest.", s: [
   { c: String.raw`principal = 100000
rate = 8        # % per year
years = 3

simple = principal * rate * years / 100
compound = principal * (1 + rate / 100) ** years - principal

print(f"Simple interest:   Rs {simple:,.2f}")
print(f"Compound interest: Rs {compound:,.2f}")`,
     e: "In a format spec, the comma adds thousands separators and .2f keeps two decimals, so 26000 prints as 26,000.00." },
 ]},
 { q: "Show the most common f-string formats: padding, alignment, percentages, thousands and debugging.", s: [
   { c: String.raw`name, score, ratio, big = "Asha", 7, 0.8734, 1234567.891

print(f"[{name:<10}]")    # left align in 10 chars
print(f"[{name:>10}]")    # right align
print(f"[{name:^10}]")    # centre
print(f"{score:03d}")     # 007  (zero pad)
print(f"{ratio:.1%}")     # 87.3%
print(f"{big:,.2f}")      # 1,234,567.89
print(f"{score=}")        # score=7  (great for debugging)`,
     e: "Everything after the colon is the format spec. f\"{x=}\" prints both the name and the value, which is the fastest way to debug." },
 ]},
 { q: "Check the type of a value, and convert between int, float, str and bool.", s: [
   { c: String.raw`x = "42"
print(type(x))            # <class 'str'>
n = int(x)                # 42
f = float(x)              # 42.0
s = str(3.5)              # '3.5'
print(bool(0), bool(""), bool([]), bool("0"))   # False False False True
print(isinstance(n, int)) # True: prefer this to type(n) == int`,
     e: "Empty things (0, \"\", [], {}, None) are falsy; everything else is truthy, even the string \"0\". isinstance is preferred because it also accepts subclasses." },
 ]},
],

"w1-3": [
 { q: "Check whether a number is even or odd.", s: [
   { t: "if / else", c: String.raw`n = int(input("Number: "))
if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
     e: "% 2 gives the remainder after dividing by 2: 0 means even." },
   { t: "One-line conditional expression", c: String.raw`n = int(input("Number: "))
print("Even" if n % 2 == 0 else "Odd")`,
     e: "value_if_true if condition else value_if_false. Use it for short, simple choices only." },
 ]},
 { q: "Check if a year is a leap year.", s: [
   { t: "Combined condition", c: String.raw`year = int(input("Year: "))
if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print("Leap year")
else:
    print("Not a leap year")`,
     e: "Divisible by 4, except centuries, unless divisible by 400. So 2000 is a leap year and 1900 is not." },
   { t: "Standard library", c: String.raw`import calendar
print(calendar.isleap(2024))   # True`,
     e: "In real code, don't re-invent what the standard library already has." },
 ]},
 { q: "Find the largest of three numbers.", s: [
   { t: "if / elif / else", c: String.raw`a, b, c = 12, 45, 7
if a >= b and a >= c:
    largest = a
elif b >= c:
    largest = b
else:
    largest = c
print(largest)`,
     e: "elif is checked only if the earlier conditions were False, so the second check only needs to compare b and c." },
   { t: "Built-in max", c: String.raw`a, b, c = 12, 45, 7
print(max(a, b, c))`,
     e: "max() accepts several values or one iterable. Interviewers usually want option 1 first, then this." },
 ]},
 { q: "Turn marks into a grade (90+ A, 75+ B, 60+ C, 40+ D, else F).", s: [
   { t: "elif chain", c: String.raw`marks = int(input("Marks: "))
if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 60:
    grade = "C"
elif marks >= 40:
    grade = "D"
else:
    grade = "F"
print(grade)`,
     e: "Order matters: check the highest band first so each elif only sees what's left." },
   { t: "match / case (Python 3.10+)", c: String.raw`marks = 82
match marks // 10:
    case 10 | 9:
        grade = "A"
    case 8 | 7 if marks >= 75:
        grade = "B"
    case 7 | 6:
        grade = "C"
    case 5 | 4:
        grade = "D"
    case _:
        grade = "F"
print(grade)`,
     e: "match/case is Python's switch statement. | means 'or', 'if' adds a guard, and _ is the default case." },
 ]},
 { q: "Print the multiplication table of a number.", s: [
   { t: "for + range", c: String.raw`n = 7
for i in range(1, 11):
    print(f"{n} x {i:2} = {n * i:3}")`,
     e: "range(1, 11) gives 1 to 10: the stop value is never included." },
   { t: "while loop", c: String.raw`n = 7
i = 1
while i <= 10:
    print(n, "x", i, "=", n * i)
    i += 1`,
     e: "A while loop needs you to change the counter yourself. Forget i += 1 and it runs forever." },
 ]},
 { q: "Find the sum of the first n natural numbers.", s: [
   { t: "Loop", c: String.raw`n = 100
total = 0
for i in range(1, n + 1):
    total += i
print(total)   # 5050`,
     e: "The accumulator pattern: start at 0 and add each item. You'll write this shape hundreds of times." },
   { t: "Built-in sum", c: String.raw`n = 100
print(sum(range(1, n + 1)))`,
     e: "sum() adds up any iterable." },
   { t: "Formula, O(1)", c: String.raw`n = 100
print(n * (n + 1) // 2)`,
     e: "Gauss's formula. Mentioning that it is O(1) instead of O(n) scores points in interviews." },
 ]},
 { q: "Find the factorial of a number.", s: [
   { t: "Loop", c: String.raw`n = 5
fact = 1
for i in range(2, n + 1):
    fact *= i
print(fact)   # 120`,
     e: "Start with 1 (not 0) because you are multiplying." },
   { t: "Recursion", c: String.raw`def factorial(n):
    if n <= 1:          # base case stops the recursion
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
     e: "A recursive function calls itself on a smaller input and must have a base case." },
   { t: "math module", c: String.raw`import math
print(math.factorial(5))`,
     e: "What you'd use in production." },
 ]},
 { q: "Print the first n Fibonacci numbers (0, 1, 1, 2, 3, 5, ...).", s: [
   { t: "Loop with tuple update", c: String.raw`n = 10
a, b = 0, 1
for _ in range(n):
    print(a, end=" ")
    a, b = b, a + b`,
     e: "_ is the name for a loop variable you don't use. a, b = b, a + b updates both at once using the old values." },
   { t: "Build a list", c: String.raw`n = 10
fib = [0, 1]
while len(fib) < n:
    fib.append(fib[-1] + fib[-2])
print(fib[:n])`,
     e: "fib[-1] is the last item and fib[-2] the one before it. Negative indexes count from the end." },
 ]},
 { q: "Reverse an integer (1234 → 4321) and count its digits.", s: [
   { t: "Maths with % and //", c: String.raw`num = 1234
rev, count = 0, 0
while num > 0:
    digit = num % 10        # last digit
    rev = rev * 10 + digit
    num //= 10              # drop last digit
    count += 1
print(rev, count)   # 4321 4`,
     e: "% 10 picks the last digit and // 10 removes it. This digit loop appears in palindrome, Armstrong and sum-of-digits questions." },
   { t: "Through a string", c: String.raw`num = 1234
print(int(str(num)[::-1]), len(str(num)))`,
     e: "Short and readable. Interviewers often then ask for option 1 'without converting to a string'." },
 ]},
 { q: "Print a right triangle and a pyramid of stars.", s: [
   { c: String.raw`n = 4
for i in range(1, n + 1):
    print("*" * i)

for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))`,
     e: "Multiplying a string repeats it: \"*\" * 3 is \"***\". Pattern questions are really about finding the formula for each row." },
 ]},
 { q: "Show break, continue and the loop else clause.", s: [
   { c: String.raw`for n in range(1, 10):
    if n % 2 == 0:
        continue          # skip even numbers
    if n > 7:
        break             # stop the loop completely
    print(n)              # 1 3 5 7

nums = [3, 5, 7]
for n in nums:
    if n == 4:
        print("Found 4")
        break
else:
    print("4 not found")  # runs only if the loop did NOT break`,
     e: "continue jumps to the next iteration; break leaves the loop. A for/while else block runs only when the loop finished without break, which is handy for searches." },
 ]},
],

"w1-4": [
 { q: "Create a list and practise indexing and slicing.", s: [
   { c: String.raw`nums = [10, 20, 30, 40, 50, 60]
print(nums[0], nums[-1])   # 10 60
print(nums[1:4])           # [20, 30, 40]   start included, stop excluded
print(nums[:3])            # [10, 20, 30]
print(nums[3:])            # [40, 50, 60]
print(nums[::2])           # [10, 30, 50]   every 2nd item
print(nums[::-1])          # reversed copy
print(len(nums))           # 6`,
     e: "Slice syntax is [start:stop:step]. Any part can be left out. The same syntax works on strings and tuples." },
 ]},
 { q: "Add, insert, remove and pop items from a list.", s: [
   { c: String.raw`items = ["a", "b"]
items.append("c")          # ['a', 'b', 'c']
items.insert(0, "z")       # ['z', 'a', 'b', 'c']
items.extend(["d", "e"])   # adds each item
items.remove("z")          # removes first matching value
last = items.pop()         # removes and returns last: 'e'
first = items.pop(0)       # removes index 0: 'a'
del items[0]               # delete by index
print(items, last, first)  # ['c', 'd'] e a
print("c" in items)        # True: membership test`,
     e: "append adds one item, extend adds many. remove works by value, pop and del by index. All of these change the list in place." },
 ]},
 { q: "Reverse a list.", s: [
   { t: "Slicing (new list)", c: String.raw`nums = [1, 2, 3, 4]
print(nums[::-1])`,
     e: "Returns a reversed copy and leaves the original alone." },
   { t: "In place", c: String.raw`nums = [1, 2, 3, 4]
nums.reverse()
print(nums)`,
     e: "reverse() changes the list itself and returns None, so never write nums = nums.reverse()." },
   { t: "Two pointers (no built-ins)", c: String.raw`nums = [1, 2, 3, 4]
left, right = 0, len(nums) - 1
while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1
print(nums)`,
     e: "The two-pointer technique: one index from each end, moving inward. It shows up in many interview problems." },
 ]},
 { q: "Find the largest and smallest numbers in a list without max() and min().", s: [
   { t: "Manual loop", c: String.raw`nums = [4, 9, 1, 17, 3]
largest = smallest = nums[0]
for n in nums[1:]:
    if n > largest:
        largest = n
    if n < smallest:
        smallest = n
print(largest, smallest)`,
     e: "Start with the first element, not 0, otherwise a list of negative numbers gives the wrong answer." },
   { t: "Built-ins", c: String.raw`nums = [4, 9, 1, 17, 3]
print(max(nums), min(nums), sum(nums) / len(nums))`,
     e: "max, min, sum and len are the four built-ins you'll use on lists every day." },
 ]},
 { q: "Find the second largest number in a list.", s: [
   { t: "Set + sort", c: String.raw`nums = [10, 40, 40, 25, 7]
unique = sorted(set(nums))
print(unique[-2])   # 25`,
     e: "set() removes duplicates so 40 isn't counted twice. Easy to read, O(n log n)." },
   { t: "Single pass, O(n)", c: String.raw`nums = [10, 40, 40, 25, 7]
first = second = float("-inf")
for n in nums:
    if n > first:
        first, second = n, first
    elif first > n > second:
        second = n
print(second)`,
     e: "float(\"-inf\") is smaller than every number. Chained comparison first > n > second means first > n and n > second." },
 ]},
 { q: "Remove duplicates from a list.", s: [
   { t: "set (order not kept)", c: String.raw`nums = [3, 1, 3, 2, 1]
print(list(set(nums)))`,
     e: "Fastest to write, but sets have no order." },
   { t: "dict.fromkeys (order kept)", c: String.raw`nums = [3, 1, 3, 2, 1]
print(list(dict.fromkeys(nums)))   # [3, 1, 2]`,
     e: "Dict keys are unique and keep insertion order, so this is the neat one-liner." },
   { t: "Loop with a seen set (order kept)", c: String.raw`nums = [3, 1, 3, 2, 1]
seen, result = set(), []
for n in nums:
    if n not in seen:
        seen.add(n)
        result.append(n)
print(result)`,
     e: "The explicit version. Checking 'in' on a set is O(1), on a list it's O(n)." },
 ]},
 { q: "Sort a list ascending, descending and by a custom key.", s: [
   { c: String.raw`nums = [5, 2, 9, 1]
print(sorted(nums))                 # new list: [1, 2, 5, 9]
print(sorted(nums, reverse=True))   # [9, 5, 2, 1]
nums.sort()                         # sorts in place, returns None

words = ["banana", "Kiwi", "apple"]
print(sorted(words, key=len))          # by length
print(sorted(words, key=str.lower))    # case-insensitive`,
     e: "sorted() returns a new list and works on any iterable; .sort() changes a list in place. key= is a function applied to each item before comparing." },
 ]},
 { q: "Rotate a list to the right by k places ([1,2,3,4,5], k=2 → [4,5,1,2,3]).", s: [
   { t: "Slicing", c: String.raw`nums, k = [1, 2, 3, 4, 5], 2
k %= len(nums)               # handles k bigger than the list
print(nums[-k:] + nums[:-k])`,
     e: "Take the last k items and put them in front. k %= len handles k = 7 on a 5-item list." },
   { t: "collections.deque", c: String.raw`from collections import deque
d = deque([1, 2, 3, 4, 5])
d.rotate(2)
print(list(d))`,
     e: "deque is a double-ended queue with a built-in rotate." },
 ]},
 { q: "Count how many times each value appears, and find the index of a value.", s: [
   { c: String.raw`nums = [1, 2, 2, 3, 2]
print(nums.count(2))      # 3
print(nums.index(3))      # 3  (raises ValueError if missing)

for i, n in enumerate(nums):
    if n == 2:
        print("2 found at index", i)`,
     e: "enumerate gives you the index and the value together, so you never need range(len(nums))." },
 ]},
 { q: "Use tuples: create, unpack, return several values and use one as a dict key.", s: [
   { c: String.raw`point = (3, 4)
x, y = point                  # unpacking
single = (5,)                 # a one-item tuple needs the comma

first, *rest = (1, 2, 3, 4)   # star unpacking
print(first, rest)            # 1 [2, 3, 4]

def min_max(nums):
    return min(nums), max(nums)   # returns a tuple
lo, hi = min_max([4, 8, 1])

distances = {(0, 0): "home", (3, 4): "office"}   # tuples can be keys
print(distances[(3, 4)])
# point[0] = 10  -> TypeError: tuples are immutable`,
     e: "Tuples are fixed records. Because they can't change, they are hashable and can be dict keys or set members; lists can't." },
 ]},
 { q: "Work with a 2D list (matrix): print it row by row and add two matrices.", s: [
   { c: String.raw`a = [[1, 2], [3, 4]]
b = [[5, 6], [7, 8]]

for row in a:
    print(" ".join(str(v) for v in row))

total = [[a[i][j] + b[i][j] for j in range(len(a[0]))] for i in range(len(a))]
print(total)   # [[6, 8], [10, 12]]

grid = [[0] * 3 for _ in range(3)]   # correct way to make a 3x3 grid
# grid = [[0] * 3] * 3  -> WRONG: three references to the same row`,
     e: "matrix[row][col] reads one cell. [[0]*3]*3 copies the same inner list three times, a classic bug." },
 ]},
],

"w1-5": [
 { q: "Check whether a word or number is a palindrome.", s: [
   { t: "Slicing", c: String.raw`text = input("Enter a word or number: ")

if text == text[::-1]:
    print("Palindrome")
else:
    print("Not a palindrome")`,
     e: "text[::-1] reverses the string. If the reversed version matches the original, it's a palindrome: \"madam\" and \"121\" are, \"hello\" is not." },
   { t: "Ignore case and spaces", c: String.raw`text = input("Enter text: ")
cleaned = text.replace(" ", "").lower()

if cleaned == cleaned[::-1]:
    print("Palindrome")
else:
    print("Not a palindrome")`,
     e: "Cleaning first means inputs like \"Madam\" or \"nurses run\" also count." },
   { t: "Number, without converting to a string", c: String.raw`num = int(input("Enter a number: "))
original = num
reverse = 0

while num > 0:
    digit = num % 10
    reverse = reverse * 10 + digit
    num //= 10

if original == reverse:
    print("Palindrome")
else:
    print("Not a palindrome")`,
     e: "The common interview version: build the reversed number digit by digit with % and //." },
   { t: "Two pointers", c: String.raw`def is_palindrome(s):
    s = "".join(ch.lower() for ch in s if ch.isalnum())
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome("A man, a plan, a canal: Panama"))   # True`,
     e: "LeetCode's 'Valid Palindrome'. isalnum() keeps only letters and digits, and two pointers avoid making a reversed copy." },
 ]},
 { q: "Reverse a string.", s: [
   { t: "Slicing", c: String.raw`s = "python"
print(s[::-1])`, e: "The idiomatic way." },
   { t: "reversed + join", c: String.raw`s = "python"
print("".join(reversed(s)))`, e: "reversed() returns an iterator; \"\".join glues the characters back into a string." },
   { t: "Loop", c: String.raw`s = "python"
result = ""
for ch in s:
    result = ch + result
print(result)`, e: "Builds the answer by putting each character in front. Shows you understand that strings are immutable and a new one is created each time." },
 ]},
 { q: "FizzBuzz: print 1 to 100, but Fizz for multiples of 3, Buzz for 5 and FizzBuzz for both.", s: [
   { t: "Classic", c: String.raw`for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`, e: "Check 15 (both) first, otherwise 15 would print just \"Fizz\"." },
   { t: "String building", c: String.raw`for i in range(1, 101):
    out = ""
    if i % 3 == 0:
        out += "Fizz"
    if i % 5 == 0:
        out += "Buzz"
    print(out or i)`, e: "An empty string is falsy, so out or i prints the number when nothing was added. Easy to extend with more rules." },
 ]},
 { q: "Check if a number is prime, and print all primes below 100.", s: [
   { t: "Square-root check", c: String.raw`def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True

print([n for n in range(100) if is_prime(n)])`, e: "Only test divisors up to √n: if n had a bigger factor it would also have a smaller one." },
   { t: "Sieve of Eratosthenes", c: String.raw`def primes_below(limit):
    is_p = [True] * limit
    is_p[0] = is_p[1] = False
    for i in range(2, int(limit ** 0.5) + 1):
        if is_p[i]:
            for j in range(i * i, limit, i):
                is_p[j] = False
    return [i for i, p in enumerate(is_p) if p]

print(primes_below(100))`, e: "Crosses out multiples of each prime. Much faster when you need many primes at once." },
 ]},
 { q: "Find the sum of the digits of a number (1234 → 10).", s: [
   { t: "Maths", c: String.raw`n, total = 1234, 0
while n > 0:
    total += n % 10
    n //= 10
print(total)`, e: "Same digit loop as reversing a number." },
   { t: "String + generator", c: String.raw`n = 1234
print(sum(int(d) for d in str(n)))`, e: "Turn the number into characters, each back into an int, and sum them." },
 ]},
 { q: "Check for an Armstrong number (153 = 1³ + 5³ + 3³).", s: [
   { c: String.raw`def is_armstrong(n):
    digits = str(n)
    power = len(digits)
    return n == sum(int(d) ** power for d in digits)

print(is_armstrong(153), is_armstrong(9474), is_armstrong(10))   # True True False
print([n for n in range(1, 1000) if is_armstrong(n)])`,
     e: "Each digit is raised to the number of digits. The function returns the comparison directly instead of if ...: return True else: return False." },
 ]},
 { q: "Count the vowels in a sentence.", s: [
   { t: "Loop", c: String.raw`text = "Machine Learning is fun"
count = 0
for ch in text.lower():
    if ch in "aeiou":
        count += 1
print(count)`, e: "'in' on a string checks if a character is inside it." },
   { t: "sum + generator", c: String.raw`text = "Machine Learning is fun"
print(sum(1 for ch in text.lower() if ch in "aeiou"))`, e: "Counts a 1 for every vowel. True also counts as 1, so sum(ch in 'aeiou' for ch in text) works too." },
   { t: "Count each vowel", c: String.raw`from collections import Counter
text = "Machine Learning is fun"
counts = Counter(ch for ch in text.lower() if ch in "aeiou")
print(counts)`, e: "Counter tallies how many times each item appears." },
 ]},
 { q: "Find the GCD (HCF) and LCM of two numbers.", s: [
   { t: "Euclid's algorithm", c: String.raw`def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

a, b = 12, 18
g = gcd(a, b)
print(g, a * b // g)   # 6 36`, e: "gcd(a, b) = gcd(b, a % b) until b is 0. LCM = a * b / GCD." },
   { t: "math module", c: String.raw`import math
print(math.gcd(12, 18), math.lcm(12, 18))`, e: "math.lcm exists since Python 3.9." },
 ]},
 { q: "Find the nth Fibonacci number.", s: [
   { t: "Iterative O(n)", c: String.raw`def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fib(10))   # 55`, e: "The version to give in an interview: fast and uses constant memory." },
   { t: "Recursive (slow)", c: String.raw`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))`, e: "Mirrors the definition but is O(2^n) because it recomputes the same values. Fix it with memoisation (Week 4: functools.cache)." },
 ]},
 { q: "Check for a perfect number (sum of its proper divisors equals the number, e.g. 28).", s: [
   { c: String.raw`def is_perfect(n):
    return n > 1 and sum(d for d in range(1, n // 2 + 1) if n % d == 0) == n

print([n for n in range(1, 10000) if is_perfect(n)])   # [6, 28, 496, 8128]`,
     e: "and short-circuits: if n > 1 is False, Python doesn't evaluate the rest." },
 ]},
 { q: "Count uppercase letters, lowercase letters, digits and spaces in a string.", s: [
   { c: String.raw`text = "Hello World 2026"
upper = lower = digits = spaces = 0
for ch in text:
    if ch.isupper():
        upper += 1
    elif ch.islower():
        lower += 1
    elif ch.isdigit():
        digits += 1
    elif ch.isspace():
        spaces += 1
print(upper, lower, digits, spaces)   # 2 8 4 2`,
     e: "String methods like isupper, isdigit, isalpha and isspace return True or False for a character." },
 ]},
 { q: "Convert a decimal number to binary and back.", s: [
   { t: "Built-ins", c: String.raw`n = 10
print(bin(n), bin(n)[2:], format(n, "b"))   # 0b1010 1010 1010
print(int("1010", 2))                        # 10
print(hex(255), oct(8))`, e: "bin() adds a 0b prefix; slicing [2:] removes it. int(text, base) parses any base." },
   { t: "Manual division by 2", c: String.raw`n, bits = 10, ""
while n > 0:
    bits = str(n % 2) + bits
    n //= 2
print(bits or "0")`, e: "Keep dividing by 2 and read the remainders backwards." },
 ]},
],

"w1-p": [
 { q: "Number-guessing game: random secret number, hints, attempt counter, and no crash on bad input.", s: [
   { c: String.raw`import random

secret = random.randint(1, 50)   # both ends included
attempts = 0

while True:
    guess_text = input("Guess (1-50): ")
    try:
        guess = int(guess_text)
    except ValueError:
        print("Please type a whole number.")
        continue
    attempts += 1
    if guess < secret:
        print("Too low")
    elif guess > secret:
        print("Too high")
    else:
        print(f"Correct! You took {attempts} attempts.")
        break`,
     e: "while True with break is the standard 'loop until done' pattern. try/except ValueError stops int('abc') from crashing the program." },
 ]},
 { q: "Write a helper that keeps asking until the user enters a valid positive number.", s: [
   { c: String.raw`def ask_positive(prompt):
    while True:
        try:
            value = float(input(prompt))
        except ValueError:
            print("Not a number, try again.")
            continue
        if value <= 0:
            print("Must be greater than 0.")
            continue
        return value

amount = ask_positive("Loan amount: ")
print(amount)`,
     e: "Putting validation in a function means you write it once and reuse it for every input: amount, rate and tenure." },
 ]},
 { q: "EMI calculator with a function and formatted output.", s: [
   { c: String.raw`def emi(principal, annual_rate, months):
    r = annual_rate / 12 / 100
    if r == 0:
        return principal / months
    return principal * r * (1 + r) ** months / ((1 + r) ** months - 1)

p, rate, n = 500000, 9.5, 60
monthly = emi(p, rate, n)
print(f"EMI:            Rs {monthly:,.0f}")
print(f"Total paid:     Rs {monthly * n:,.0f}")
print(f"Total interest: Rs {monthly * n - p:,.0f}")`,
     e: "Keep the calculation in a pure function (no input or print inside) so it's easy to test, and handle the 0% edge case that would otherwise divide by zero." },
 ]},
],

};
