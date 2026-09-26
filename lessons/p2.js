/* Phase 2: Data & Math for AI (Weeks 6-10) */
window.LESSONS = window.LESSONS || {};
Object.assign(window.LESSONS, {

/* ---------- Week 6: NumPy ---------- */
"w6-1": {
 m: "Every image, sentence embedding and model weight is a NumPy-style array. This is the data format of AI.",
 e: "A NumPy array is a grid of numbers of the same type. A 1D array is a row, 2D is a spreadsheet, 3D is a stack of spreadsheets (like an RGB image).",
 k: ["np.array, np.zeros, np.ones, np.arange, np.linspace", "shape, ndim, dtype, size", "Indexing a[i, j] and slicing a[:, 1]", "Boolean masks: a[a > 5]"],
 t: ["Create a 5x4 array of student marks with np.random.randint", "Print its shape, dtype and the 3rd student's marks", "Get the marks of subject 2 for all students", "Find all marks above 80 using a boolean mask", "Replace marks below 35 with 35 (grace marks)"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(42)
marks = rng.integers(20, 100, size=(5, 4))
print(marks.shape, marks.dtype)
print(marks[2], marks[:, 1])
print(marks[marks > 80])
marks[marks < 35] = 35`,
 q: [["Why is NumPy faster than Python lists?", "Arrays store one data type in contiguous memory and operations run in optimised C code, not Python loops."],
     ["What is the shape of a batch of 32 RGB images of 224x224?", "(32, 224, 224, 3) in NumPy/TensorFlow order, or (32, 3, 224, 224) in PyTorch."],
     ["Difference between a view and a copy?", "Slicing returns a view that shares memory with the original; .copy() makes an independent array."]],
 x: ["Modifying a slice and accidentally changing the original array"],
 d: "You can index, slice and mask a 2D array confidently.",
 min: 60
},
"w6-2": {
 m: "Broadcasting is how neural networks add biases and normalise batches without a single loop.",
 e: "Broadcasting stretches a smaller array to match a bigger one, like applying one discount to every item in a cart at once.",
 k: ["Element-wise ops: a + b, a * b, np.sqrt(a)", "Broadcasting rules: compare shapes from the right; dims must match or be 1", "Vectorised code replaces for loops", "Universal functions (ufuncs)"],
 t: ["Normalise each subject's marks: subtract column mean, divide by column std", "Add a different bonus per subject using a (4,) array", "Compute each student's total and percentage without loops", "Try adding a (5,) array to a (5,4) array, read the error, fix it with reshape(-1, 1)"],
 c: String.raw`import numpy as np
marks = np.random.default_rng(0).integers(30, 100, (5, 4)).astype(float)
z = (marks - marks.mean(axis=0)) / marks.std(axis=0)
bonus = np.array([2, 0, 5, 1])
print(marks + bonus)
per_student = np.array([1, 2, 3, 4, 5])
print(marks + per_student.reshape(-1, 1))`,
 q: [["Explain broadcasting.", "NumPy aligns shapes from the right and stretches dimensions of size 1 so arrays of different shapes can be combined element-wise."],
     ["What shape results from (3,1) + (1,4)?", "(3,4)."]],
 x: ["Shape mismatch errors from forgetting reshape(-1, 1)"],
 d: "You normalised a 2D array without any Python loop.",
 min: 60
},
"w6-3": {
 m: "Reshaping and axis operations are what you do all day when feeding data to models.",
 e: "Reshape rearranges the same numbers into a new grid. axis=0 means 'down the rows', axis=1 means 'across the columns'.",
 k: ["reshape, flatten, ravel, transpose (.T)", "np.stack, np.concatenate, np.vstack, np.hstack", "sum/mean/max with axis=0 or 1", "np.newaxis / expand_dims to add a dimension"],
 t: ["Reshape np.arange(24) into (2,3,4), then (4,6), then (-1, 2)", "Flatten a 28x28 'image' into 784 values like MNIST", "Stack 3 grayscale images into a (3, 28, 28) batch", "Compute max per row and per column", "Add a batch dimension to a single image"],
 c: String.raw`import numpy as np
a = np.arange(24)
print(a.reshape(2, 3, 4).shape, a.reshape(-1, 2).shape)
img = np.random.rand(28, 28)
print(img.flatten().shape)
batch = np.stack([img, img, img])
print(batch.shape, img[np.newaxis].shape)`,
 q: [["What does -1 mean in reshape?", "Let NumPy calculate that dimension from the total size."],
     ["Difference between flatten and ravel?", "flatten always returns a copy; ravel returns a view when possible."]],
 x: ["Confusing axis=0 and axis=1"],
 d: "You can move between image, batch and flat shapes without guessing.",
 min: 45
},
"w6-4": {
 m: "Random seeds make ML experiments reproducible. Without them you can't tell if a change helped or you got lucky.",
 e: "A seed is the starting point of the random number recipe. Same seed, same 'random' numbers every time.",
 k: ["rng = np.random.default_rng(seed)", "rng.random, rng.integers, rng.normal, rng.choice", "rng.permutation to shuffle", "Set seeds in NumPy, Python random and PyTorch for full reproducibility"],
 t: ["Generate 1000 normal numbers with mean 170, std 10 (heights)", "Plot or print their mean and std", "Shuffle an array of 10 indices and split 8/2 into train/test", "Run twice with the same seed and confirm identical output", "Simulate 10,000 dice rolls and check each face is about 1/6"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(7)
heights = rng.normal(170, 10, 1000)
print(heights.mean().round(1), heights.std().round(1))
idx = rng.permutation(10)
train, test = idx[:8], idx[8:]
rolls = rng.integers(1, 7, 10_000)
print(np.bincount(rolls)[1:] / len(rolls))`,
 q: [["Why set a random seed?", "So experiments are reproducible and you can compare runs fairly."],
     ["Is a seeded result truly random?", "No, it's pseudo-random: deterministic given the seed, but statistically random-looking."]],
 x: ["Setting the seed in one library but not the others"],
 d: "You can create a reproducible train/test split.",
 min: 40
},
"w6-5": {
 m: "Matrix multiplication is the single most important operation in deep learning. A neural network layer is just X @ W + b.",
 e: "Matrix multiplication combines rows of one grid with columns of another. It's how a layer mixes every input feature into every output.",
 k: ["A @ B requires A's columns == B's rows", "(m, n) @ (n, p) gives (m, p)", "Element-wise * is different from @", "np.dot, np.matmul, @"],
 t: ["Create X of shape (4, 3): 4 samples, 3 features", "Create weights W of shape (3, 2) and bias b of shape (2,)", "Compute X @ W + b: that's a neural network layer!", "Apply ReLU with np.maximum(0, out)", "Check the output shape is (4, 2)"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(0)
X = rng.normal(size=(4, 3))
W = rng.normal(size=(3, 2))
b = np.zeros(2)
out = np.maximum(0, X @ W + b)   # a dense layer with ReLU
print(out.shape, out)`,
 q: [["Difference between * and @ in NumPy?", "* multiplies element by element; @ is matrix multiplication."],
     ["What are the shape rules for matrix multiplication?", "Inner dimensions must match: (m,n) @ (n,p) gives (m,p)."],
     ["Is matrix multiplication commutative?", "No, A @ B is generally not equal to B @ A."]],
 x: ["Using * when you meant @"],
 d: "You built a one-layer neural network forward pass in NumPy.",
 min: 50
},
"w6-6": {
 m: "Seeing the speed difference yourself convinces you to always vectorise.",
 e: "A race between a Python loop and NumPy. NumPy usually wins by 50-100x.",
 k: ["time.perf_counter or %timeit in notebooks", "Vectorised versions of sum, distance, normalisation", "np.where for vectorised if/else"],
 t: ["Loop vs NumPy: sum of squares of 1 million numbers", "Loop vs NumPy: Euclidean distance between two 1000-dim vectors", "Loop vs NumPy: label values > 0 as 1 else 0 (np.where)", "Loop vs NumPy: pairwise distances between 500 points", "Write the speedups in a table in your README"],
 c: String.raw`import numpy as np, time
x = np.random.rand(1_000_000)
t = time.perf_counter(); s = sum(v * v for v in x); loop = time.perf_counter() - t
t = time.perf_counter(); s2 = np.sum(x ** 2); vec = time.perf_counter() - t
print(f"loop {loop:.3f}s, numpy {vec:.4f}s, {loop / vec:.0f}x faster")`,
 q: [["What does vectorisation mean?", "Replacing explicit loops with array operations that run in compiled code."],
     ["How would you compute pairwise distances without loops?", "Use broadcasting: diff = A[:, None, :] - B[None, :, :], then norm along the last axis."]],
 x: ["Using np.vectorize and expecting it to be fast (it's still a loop)"],
 d: "Your table shows big speedups for all five tasks.",
 min: 60
},
"w6-p": {
 m: "Images are just arrays. Proving that to yourself makes computer vision far less mysterious later.",
 e: "Load a photo, then flip, crop, grayscale, brighten and blur it using only NumPy maths.",
 k: ["Image shape (H, W, 3), dtype uint8, values 0-255", "Grayscale = 0.299R + 0.587G + 0.114B", "np.clip to keep values in range"],
 t: ["Load a photo with Pillow and convert to a NumPy array", "Flip horizontally and vertically with slicing", "Crop the centre square", "Grayscale using the weighted formula", "Brighten by 40 with np.clip", "Save all versions and show them side by side in your README"],
 c: String.raw`import numpy as np
from PIL import Image
img = np.array(Image.open("photo.jpg"))
flipped = img[:, ::-1]
gray = (img @ [0.299, 0.587, 0.114]).astype(np.uint8)
bright = np.clip(img.astype(int) + 40, 0, 255).astype(np.uint8)
Image.fromarray(gray).save("gray.jpg")`,
 q: [["Why convert to int before adding brightness?", "uint8 overflows and wraps around past 255, so you'd get dark pixels instead of bright ones."]],
 x: ["uint8 overflow producing weird colours"],
 d: "Five transformed images saved and shown in the README.",
 min: 120
},

/* ---------- Week 7: Pandas ---------- */
"w7-1": {
 m: "Pandas is the Excel of Python. Almost every ML project starts with a DataFrame.",
 e: "A DataFrame is a spreadsheet in Python: rows, named columns, and superpowers. A Series is one column.",
 k: ["pd.read_csv, pd.read_excel", "df.head(), df.info(), df.describe(), df.shape", "df['col'] returns a Series", "df.columns, df.dtypes"],
 t: ["Download the Titanic CSV from Kaggle", "Load it and print head, info and describe", "How many rows and columns? Which columns have missing values?", "Get the Age column and compute its mean", "Load an Excel file you have (or make one) with read_excel"],
 c: String.raw`import pandas as pd
df = pd.read_csv("titanic.csv")
print(df.shape)
df.info()
print(df.describe())
print(df["Age"].mean())`,
 q: [["Difference between a Series and a DataFrame?", "A Series is one labelled column; a DataFrame is a table of Series sharing an index."],
     ["What does df.describe() show?", "Count, mean, std, min, quartiles and max for numeric columns."]],
 x: ["Not checking dtypes and treating numbers stored as strings as numbers"],
 d: "You can describe a new dataset in 2 minutes.",
 min: 45
},
"w7-2": {
 m: "Selecting and filtering the right rows is 50% of data work.",
 e: "loc picks by labels ('rows where...', 'column named...'). iloc picks by position ('row 5, column 2').",
 k: ["df.loc[row_labels, col_labels]", "df.iloc[row_pos, col_pos]", "Boolean filters: df[df.Age > 30]", "Combine with & and |, wrap each in brackets", "sort_values, query()"],
 t: ["Get passengers older than 60", "Get female passengers in first class who survived", "Select only Name, Age, Fare for children under 10", "Sort by Fare descending and show top 10", "Rewrite one filter using df.query()"],
 c: String.raw`import pandas as pd
df = pd.read_csv("titanic.csv")
print(df[df.Age > 60].shape)
f1 = df[(df.Sex == "female") & (df.Pclass == 1) & (df.Survived == 1)]
print(df.loc[df.Age < 10, ["Name", "Age", "Fare"]])
print(df.sort_values("Fare", ascending=False).head(10))
print(df.query("Age < 10 and Pclass == 3").shape)`,
 q: [["loc vs iloc?", "loc selects by label, iloc by integer position."],
     ["Why use & instead of 'and' in pandas filters?", "'and' works on single booleans; & works element-wise on Series."]],
 x: ["Forgetting brackets around each condition", "SettingWithCopyWarning from chained indexing"],
 d: "You answered five questions about the data with filters.",
 min: 50
},
"w7-3": {
 m: "Real data is messy. Models trained on dirty data give confident wrong answers.",
 e: "Cleaning is washing vegetables before cooking: remove the bad bits, fix what you can, and note what you changed.",
 k: ["isna().sum() to count missing", "fillna (mean, median, mode) or dropna", "astype to fix dtypes, pd.to_datetime", "duplicated(), drop_duplicates()", "str methods for text columns"],
 t: ["Count missing values per column in Titanic", "Fill Age with the median by passenger class", "Fill Embarked with the most common value", "Drop the Cabin column (too many missing) and explain why", "Check and remove duplicates", "Extract title (Mr, Mrs, Miss) from Name with str.extract"],
 c: String.raw`df["Age"] = df.groupby("Pclass")["Age"].transform(lambda s: s.fillna(s.median()))
df["Embarked"] = df["Embarked"].fillna(df["Embarked"].mode()[0])
df = df.drop(columns=["Cabin"]).drop_duplicates()
df["Title"] = df["Name"].str.extract(r",\s*([^\.]+)\.")
print(df.isna().sum())`,
 q: [["How do you handle missing values?", "Depends on why they're missing and how many: drop if few, impute with mean/median/mode or a model, or add a 'was missing' flag."],
     ["Mean vs median for imputation?", "Median is robust to outliers, so it's safer for skewed data like income or fare."]],
 x: ["Filling missing values using statistics from the whole dataset including test data (leakage)"],
 d: "No missing values remain and every choice is written down.",
 min: 60
},
"w7-4": {
 m: "groupby answers business questions: survival by class, sales by region, churn by plan.",
 e: "groupby is 'split, apply, combine': split rows into groups, compute something for each, and put the results back together.",
 k: ["df.groupby('col')['target'].mean()", "agg with multiple functions", "pivot_table for 2-way summaries", "value_counts(normalize=True)"],
 t: ["Survival rate by Sex", "Survival rate by Pclass and Sex together", "Average fare by Embarked port", "A pivot table: rows Pclass, columns Sex, values Survived mean", "Write 3 insights in plain English"],
 c: String.raw`print(df.groupby("Sex")["Survived"].mean())
print(df.groupby(["Pclass", "Sex"])["Survived"].agg(["mean", "count"]))
print(df.pivot_table(index="Pclass", columns="Sex", values="Survived", aggfunc="mean"))`,
 q: [["Explain split-apply-combine.", "Split data into groups by a key, apply a function to each group, and combine the results into a new table."],
     ["groupby vs pivot_table?", "pivot_table is a groupby reshaped into a 2D grid, handy for two grouping keys."]],
 x: ["Reading averages without checking the group sizes"],
 d: "You wrote three data-backed insights.",
 min: 45
},
"w7-5": {
 m: "Real data lives in several tables. Joining them correctly is essential and a classic interview topic.",
 e: "merge is like SQL JOIN: match rows from two tables on a shared key. concat just stacks tables on top of or next to each other.",
 k: ["pd.merge(a, b, on='key', how='inner'/'left'/'right'/'outer')", "pd.concat([a, b]) stacks rows", "Check row counts before and after a merge", "validate='one_to_one' catches bad keys"],
 t: ["Create customers.csv (id, name, city) and orders.csv (order_id, customer_id, amount)", "Inner join and left join; compare row counts", "Find customers with no orders", "Total spend per city", "Concat January and February orders into one table"],
 c: String.raw`import pandas as pd
customers = pd.DataFrame({"id": [1, 2, 3], "city": ["Hyd", "Blr", "Hyd"]})
orders = pd.DataFrame({"customer_id": [1, 1, 2], "amount": [500, 300, 900]})
m = customers.merge(orders, left_on="id", right_on="customer_id", how="left")
print(m[m.amount.isna()])
print(m.groupby("city")["amount"].sum())`,
 q: [["Inner vs left join?", "Inner keeps only matching rows; left keeps all rows from the left table and fills missing matches with NaN."],
     ["Why might a merge increase row count unexpectedly?", "Duplicate keys on one or both sides create a many-to-many match."]],
 x: ["Merging on a key with duplicates and silently multiplying rows"],
 d: "You found customers with no orders using a left join.",
 min: 50
},
"w7-6": {
 m: "Kaggle's free course gives you structured practice and a certificate for your LinkedIn.",
 e: "Short, interactive lessons with exercises that auto-check your code.",
 k: ["Creating, reading and writing", "Indexing, selecting, assigning", "Summary functions and maps", "Grouping, sorting, data types, renaming, combining"],
 t: ["Complete all 6 lessons of Kaggle Learn Pandas", "Do every exercise without peeking at hints first", "Download the certificate", "Add it to LinkedIn"],
 q: [["What does apply do and why can it be slow?", "Runs a Python function on each row or value; it's a loop in disguise, so vectorised methods are faster."],
     ["How do you rename columns?", "df.rename(columns={'old': 'new'})."]],
 x: ["Using apply for things that have a vectorised method"],
 d: "Certificate earned.",
 min: 180
},
"w7-p": {
 m: "Cleaning a dataset end to end and documenting decisions is exactly what junior data jobs look like.",
 e: "Take a genuinely messy public dataset and produce a clean version plus a cleaning log.",
 k: ["Keep raw data untouched; write cleaned data to a new file", "Log every decision and its reason", "Before/after summary table"],
 t: ["Pick a messy dataset (Zomato restaurants, used cars, or Indian startup funding on Kaggle)", "List all problems: missing, wrong types, duplicates, inconsistent text, outliers", "Fix each and write why in a CLEANING.md", "Save clean.csv", "Show before/after missing counts and dtypes in the notebook"],
 q: [["Tell me about a time you cleaned messy data.", "Describe the dataset, the problems found, how you fixed each, and how it improved the analysis."]],
 x: ["Overwriting the raw file"],
 d: "A clean CSV and a cleaning log someone else could follow.",
 min: 180
},

/* ---------- Week 8: Visualisation, EDA, SQL ---------- */
"w8-1": {
 m: "A chart shows in seconds what a table hides. You'll plot loss curves and results for the rest of your career.",
 e: "Matplotlib is the paintbrush: figure is the canvas, axes are the individual plots on it.",
 k: ["fig, ax = plt.subplots()", "ax.plot, ax.bar, ax.scatter, ax.hist", "Titles, labels, legend", "Subplots grid: plt.subplots(2, 2)", "fig.savefig('chart.png', dpi=150)"],
 t: ["Line chart of monthly expenses", "Bar chart of passengers per class", "Histogram of ages", "Scatter of Age vs Fare coloured by Survived", "Combine all four in one 2x2 figure and save it"],
 c: String.raw`import matplotlib.pyplot as plt, pandas as pd
df = pd.read_csv("titanic.csv")
fig, ax = plt.subplots(2, 2, figsize=(10, 8))
df["Pclass"].value_counts().sort_index().plot.bar(ax=ax[0, 0], title="Class")
ax[0, 1].hist(df["Age"].dropna(), bins=30); ax[0, 1].set_title("Age")
ax[1, 0].scatter(df.Age, df.Fare, c=df.Survived, cmap="coolwarm", s=10)
fig.tight_layout(); fig.savefig("overview.png", dpi=150)`,
 q: [["Which chart for which question?", "Line for trends over time, bar for comparing categories, histogram for distributions, scatter for relationships."],
     ["Why not use pie charts much?", "People compare angles badly; a bar chart shows the same data more accurately."]],
 x: ["Charts without axis labels or titles"],
 d: "A saved 2x2 figure with labelled charts.",
 min: 50
},
"w8-2": {
 m: "Seaborn makes statistical charts in one line, perfect for quick EDA.",
 e: "Seaborn sits on top of Matplotlib and knows about DataFrames, so it groups and colours for you.",
 k: ["sns.histplot, kdeplot for distributions", "sns.boxplot, violinplot to compare groups", "sns.heatmap(df.corr()) for correlations", "sns.pairplot for all pairs", "hue= to colour by a category"],
 t: ["Histogram of Age with hue=Survived", "Boxplot of Fare by Pclass", "Correlation heatmap of numeric columns with annotations", "Pairplot of 4 columns coloured by Survived", "Write one insight per chart"],
 c: String.raw`import seaborn as sns, matplotlib.pyplot as plt
sns.histplot(df, x="Age", hue="Survived", multiple="stack"); plt.show()
sns.boxplot(df, x="Pclass", y="Fare"); plt.show()
sns.heatmap(df.select_dtypes("number").corr(), annot=True, fmt=".2f", cmap="vlag"); plt.show()`,
 q: [["What does a box plot show?", "Median, quartiles (the box), the typical range (whiskers) and outliers as dots."],
     ["What does correlation of -0.8 mean?", "A strong negative linear relationship: as one goes up the other tends to go down."]],
 x: ["Reading correlation as causation"],
 d: "Four charts, four written insights.",
 min: 45
},
"w8-3": {
 m: "EDA stops you from building models on data you don't understand. It's the step senior people never skip.",
 e: "EDA is detective work: ask a question, look at a chart, note the clue, ask the next question.",
 k: ["Start with shape, types, missing values", "Univariate (one column), bivariate (two), multivariate", "Look for outliers, skew, imbalance, leakage", "Write down questions and answers"],
 t: ["Write 5 questions about the Titanic data before plotting", "Answer each with one chart or table", "Note any surprising finding", "Note which features look useful for predicting survival", "Summarise in 5 bullet points at the top of your notebook"],
 q: [["What do you do first with a new dataset?", "Check shape, types, missing values, duplicates and target distribution, then look at key relationships."],
     ["What is data leakage?", "When information that wouldn't be available at prediction time sneaks into training, giving unrealistically good results."]],
 x: ["Making random charts without a question"],
 d: "Your notebook opens with a 5-bullet summary.",
 min: 60
},
"w8-4": {
 m: "Mistaking correlation for causation leads to bad business decisions and embarrassing interview answers.",
 e: "Ice cream sales and drowning both rise in summer. Ice cream doesn't cause drowning; heat causes both. That hidden cause is a confounder.",
 k: ["Correlation measures linear association, not cause", "Confounders, reverse causation, coincidence", "Randomised experiments (A/B tests) show causation", "Simpson's paradox: a trend reverses when you split groups"],
 t: ["Find a spurious correlation example (tylervigen.com) and explain the confounder", "In Titanic, Fare correlates with Survival: explain why using Pclass", "Show survival by Fare within each Pclass", "Write a paragraph: does paying more cause survival?"],
 q: [["Correlation vs causation?", "Correlation means two things move together; causation means one directly changes the other. You need experiments or causal analysis to show causation."],
     ["What is a confounding variable?", "A hidden factor that influences both variables, creating a misleading correlation."],
     ["Explain Simpson's paradox.", "A trend that appears in combined data reverses or disappears when the data is split into groups."]],
 x: ["Claiming a feature 'causes' the target because the model uses it"],
 d: "You can explain a confounder with your own example.",
 min: 40
},
"w8-5": {
 m: "SQL is asked in almost every data and AI interview, and most company data sits in databases.",
 e: "SQL is how you ask a database questions: 'SELECT these columns FROM this table WHERE this is true'.",
 k: ["SELECT, FROM, WHERE, ORDER BY, LIMIT", "GROUP BY with COUNT, SUM, AVG and HAVING", "INNER and LEFT JOIN", "pandas.read_sql to pull results into Python"],
 t: ["Complete Kaggle Learn Intro to SQL", "Load titanic.csv into SQLite with pandas to_sql", "Query survival rate by class in SQL", "Write a JOIN between customers and orders tables", "Compare one SQL answer with the same pandas answer"],
 c: String.raw`import sqlite3, pandas as pd
con = sqlite3.connect("data.db")
pd.read_csv("titanic.csv").to_sql("titanic", con, if_exists="replace", index=False)
q = """SELECT Pclass, ROUND(AVG(Survived), 2) AS rate, COUNT(*) AS n
       FROM titanic GROUP BY Pclass HAVING n > 100 ORDER BY rate DESC"""
print(pd.read_sql(q, con))`,
 q: [["WHERE vs HAVING?", "WHERE filters rows before grouping; HAVING filters groups after aggregation."],
     ["What is a LEFT JOIN?", "Returns all rows from the left table and matching rows from the right, with NULLs where there's no match."],
     ["Find the second highest salary.", "SELECT MAX(salary) FROM emp WHERE salary < (SELECT MAX(salary) FROM emp), or use DENSE_RANK()."]],
 x: ["Selecting non-aggregated columns that aren't in GROUP BY"],
 d: "You can answer the same question in SQL and pandas.",
 min: 90
},
"w8-6": {
 m: "Communicating findings is what gets your work used. Data storytelling is a job skill, not decoration.",
 e: "Five charts in an order that tells one story, each with a headline that states the finding.",
 k: ["Chart titles that state the insight ('Women survived 4x more')", "One message per chart", "Order charts from context to conclusion", "Highlight the key bar or line in a strong colour"],
 t: ["Choose one story: 'Who survived the Titanic and why'", "Make 5 charts that build the story", "Give each a finding-style title", "Grey out everything except the key comparison", "Export as images for a LinkedIn post"],
 q: [["How would you present findings to a non-technical manager?", "Lead with the conclusion, show one clear chart per point, avoid jargon and end with a recommendation."]],
 x: ["Titles like 'Chart 1' that say nothing"],
 d: "Someone can understand your story from the chart titles alone.",
 min: 60
},
"w8-p": {
 m: "A published EDA notebook is the first thing data-team recruiters look at.",
 e: "A full EDA of IPL, Zomato or Titanic data, published on Kaggle or GitHub with a clear story.",
 k: ["Intro, data description, cleaning, analysis, conclusions", "Markdown explanations between code", "Clean, labelled charts"],
 t: ["Pick one dataset from Kaggle", "Clean it (reuse week 7 skills)", "Ask and answer 8 questions with charts", "Write a conclusions section", "Publish on Kaggle and link it in your GitHub README"],
 q: [["Walk me through your EDA project.", "State the question, data size, cleaning steps, the 2-3 most interesting findings and what you'd do next."]],
 x: ["A notebook that's all code and no explanation"],
 d: "Published and linked.",
 min: 240
},

/* ---------- Week 9: Linear algebra and calculus ---------- */
"w9-1": {
 m: "Embeddings, search and recommendations all rely on vectors and similarity. This is the maths behind RAG.",
 e: "A vector is an arrow with a direction and length. The dot product measures how much two arrows point the same way.",
 k: ["Vector: an ordered list of numbers", "Dot product a·b = sum of a_i * b_i", "Norm (length) ||a|| = sqrt(a·a)", "Cosine similarity = a·b / (||a|| ||b||), from -1 to 1"],
 t: ["Represent 4 movies as vectors of [action, romance, comedy] scores", "Compute cosine similarity between every pair", "Find the most similar movie to your favourite", "Implement cosine similarity yourself, then check with sklearn", "Watch 3Blue1Brown linear algebra episodes 1-3"],
 c: String.raw`import numpy as np
movies = {"RRR": [9, 2, 3], "Baahubali": [9, 3, 2], "Jathi Ratnalu": [2, 2, 9], "Sita Ramam": [2, 9, 2]}
def cos(a, b):
    a, b = np.array(a), np.array(b)
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))
for m in movies:
    print("RRR vs", m, round(cos(movies["RRR"], movies[m]), 3))`,
 q: [["What is cosine similarity and why is it used for embeddings?", "The cosine of the angle between two vectors; it measures direction, not length, so documents of different lengths can be compared by meaning."],
     ["What does a dot product of zero mean?", "The vectors are orthogonal (perpendicular), so unrelated in that space."]],
 x: ["Using raw dot product when vector lengths vary a lot"],
 d: "Your mini recommender finds similar movies.",
 min: 60
},
"w9-2": {
 m: "Every layer in a neural network is a matrix. Understanding matrices means understanding what a model does to data.",
 e: "A matrix is a machine that transforms vectors: rotate, stretch, squash or mix them.",
 k: ["Matrix-vector product transforms a vector", "Transpose flips rows and columns", "Identity matrix does nothing", "Inverse undoes a transformation (if it exists)", "Solving Ax = b"],
 t: ["Create a 2D rotation matrix and rotate the point (1, 0) by 90 degrees", "Create a scaling matrix that doubles x", "Multiply two transformations and apply them together", "Solve a 2x2 linear system with np.linalg.solve", "Watch 3Blue1Brown episodes 3-7"],
 c: String.raw`import numpy as np
theta = np.pi / 2
R = np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])
print(R @ [1, 0])
A = np.array([[2, 1], [1, 3]]); b = np.array([5, 10])
print(np.linalg.solve(A, b), np.linalg.inv(A))`,
 q: [["When is a matrix not invertible?", "When its determinant is zero, meaning it squashes space into a lower dimension."],
     ["What is the transpose used for in ML?", "Aligning shapes for multiplication, e.g. computing gradients X.T @ error."]],
 x: ["Using inv(A) @ b instead of solve(A, b), which is slower and less stable"],
 d: "You can explain a matrix as a transformation.",
 min: 60
},
"w9-3": {
 m: "PCA, which compresses data and powers visualisations, is built on eigenvectors.",
 e: "Eigenvectors are the special directions a transformation only stretches, not turns. The eigenvalue is how much it stretches.",
 k: ["Av = λv", "np.linalg.eig", "Covariance matrix of data", "PCA: eigenvectors of the covariance matrix are the main directions of variation"],
 t: ["Compute eigenvalues and eigenvectors of a 2x2 matrix", "Verify A @ v equals λ * v", "Create correlated 2D data, compute its covariance matrix", "Find its eigenvectors and plot them on top of the data", "Watch 3Blue1Brown on eigenvectors"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(0)
x = rng.normal(size=500); data = np.c_[x, 2 * x + rng.normal(scale=0.5, size=500)]
cov = np.cov(data.T)
vals, vecs = np.linalg.eig(cov)
print(vals, vecs)   # biggest eigenvalue = main direction of spread`,
 q: [["What are eigenvectors intuitively?", "Directions that a matrix only scales, without rotating."],
     ["How does PCA use eigenvectors?", "It projects data onto the eigenvectors of the covariance matrix with the largest eigenvalues, keeping most variance in fewer dimensions."]],
 x: ["Memorising formulas without the picture"],
 d: "Your plot shows the principal direction over the data.",
 min: 60
},
"w9-4": {
 m: "Training a model means nudging weights to reduce error. Derivatives tell you which way to nudge.",
 e: "A derivative is the slope: how much the output changes if you change the input a tiny bit. The chain rule handles functions inside functions.",
 k: ["d/dx x^2 = 2x", "Partial derivative: slope with respect to one variable, others fixed", "Chain rule: d/dx f(g(x)) = f'(g(x)) * g'(x)", "Numerical derivative: (f(x+h) - f(x-h)) / 2h"],
 t: ["Compute derivatives of x^2, 3x^3, sin(x) by hand", "Check them numerically in Python", "Compute partial derivatives of f(x, y) = x^2 * y + y^3", "Apply the chain rule to sigmoid(2x + 1)", "Watch 3Blue1Brown calculus episodes 1-4"],
 c: String.raw`import numpy as np
def numeric_grad(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)
sigmoid = lambda z: 1 / (1 + np.exp(-z))
f = lambda x: sigmoid(2 * x + 1)
x = 0.5
analytic = sigmoid(2 * x + 1) * (1 - sigmoid(2 * x + 1)) * 2
print(numeric_grad(f, x), analytic)`,
 q: [["Why does the chain rule matter in deep learning?", "Backpropagation is the chain rule applied layer by layer to get each weight's gradient."],
     ["What is the derivative of sigmoid?", "sigmoid(x) * (1 - sigmoid(x))."]],
 x: ["Skipping the intuition and memorising rules only"],
 d: "Your numeric and hand-derived gradients match.",
 min: 60
},
"w9-5": {
 m: "Gradient descent is how nearly every model learns. Coding it once makes deep learning click.",
 e: "You're on a foggy hill and want the valley. Feel the slope under your feet (gradient) and take a small step downhill (learning rate). Repeat.",
 k: ["Gradient = vector of partial derivatives, points uphill", "Update: w = w - lr * gradient", "Learning rate too big overshoots, too small is slow", "Loss curve should go down"],
 t: ["Minimise f(x) = (x - 3)^2 starting from x = 10", "Print x and loss every 10 steps", "Try learning rates 0.01, 0.1, 1.1 and see what happens", "Minimise a 2D function f(x, y) = x^2 + 10y^2", "Plot the path on a contour plot"],
 c: String.raw`x, lr = 10.0, 0.1
for step in range(50):
    grad = 2 * (x - 3)
    x -= lr * grad
    if step % 10 == 0:
        print(step, round(x, 4), round((x - 3) ** 2, 6))`,
 q: [["Explain gradient descent.", "An optimisation method that repeatedly moves parameters opposite to the gradient of the loss to reduce it."],
     ["What happens if the learning rate is too high?", "Updates overshoot the minimum and the loss bounces or diverges."],
     ["Batch vs stochastic vs mini-batch gradient descent?", "Full data per step, one sample per step, or a small batch per step (the usual choice)."]],
 x: ["Not plotting the loss, so you can't tell if it's learning"],
 d: "You've seen divergence with a too-large learning rate.",
 min: 60
},
"w9-6": {
 m: "3Blue1Brown builds visual intuition that textbooks don't. It's the best free maths teacher for ML.",
 e: "Watch, pause, and draw what you see. Intuition first, formulas second.",
 k: ["Essence of Linear Algebra: vectors, span, matrices, determinants, eigenvectors", "Essence of Calculus: derivatives, chain rule, integrals"],
 t: ["Finish the linear algebra series (16 videos)", "Finish calculus episodes 1-6", "Write a one-line summary per video in a notes file", "Explain the determinant to a friend in 30 seconds"],
 q: [["What does the determinant tell you?", "How much a matrix scales area or volume; zero means it collapses space."]],
 x: ["Watching passively without pausing to think"],
 d: "Notes file with a line per video.",
 min: 240
},
"w9-p": {
 m: "Fitting a line with gradient descent from scratch is the 'hello world' of machine learning.",
 e: "Generate points around a line, then let gradient descent discover the slope and intercept.",
 k: ["Model: y = w*x + b", "Loss: mean squared error", "Gradients: dw = mean(2*(pred - y)*x), db = mean(2*(pred - y))"],
 t: ["Generate 100 points: y = 3x + 7 + noise", "Initialise w = 0, b = 0", "Run gradient descent for 1000 steps", "Plot the loss curve", "Plot data with the learned line", "Compare with np.polyfit"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(1)
x = rng.uniform(0, 10, 100); y = 3 * x + 7 + rng.normal(0, 2, 100)
w = b = 0.0; lr = 0.01; losses = []
for _ in range(1000):
    pred = w * x + b; err = pred - y
    w -= lr * (2 * err * x).mean(); b -= lr * (2 * err).mean()
    losses.append((err ** 2).mean())
print(round(w, 2), round(b, 2), np.polyfit(x, y, 1))`,
 q: [["Derive the gradient of MSE for linear regression.", "dL/dw = mean(2*(wx+b-y)*x), dL/db = mean(2*(wx+b-y))."]],
 x: ["Unscaled features making the learning rate hard to pick"],
 d: "Your learned w and b are close to 3 and 7.",
 min: 120
},

/* ---------- Week 10: Probability and statistics ---------- */
"w10-1": {
 m: "Summary statistics are the first lens on any data, and the basis of normalisation and anomaly detection.",
 e: "Mean is the balance point, median is the middle person in line, standard deviation is how spread out people are.",
 k: ["Mean, median, mode", "Variance and standard deviation", "Percentiles and IQR", "Skew: mean is pulled toward the long tail"],
 t: ["Compute mean and median salary for a small list with one CEO salary", "See how the mean moves and the median doesn't", "Compute std and IQR", "Flag outliers with the 1.5*IQR rule", "Use np and pandas describe to confirm"],
 c: String.raw`import numpy as np
salaries = np.array([6, 7, 8, 8, 9, 10, 12, 150]) * 1e5
print(salaries.mean(), np.median(salaries))
q1, q3 = np.percentile(salaries, [25, 75]); iqr = q3 - q1
print(salaries[(salaries < q1 - 1.5 * iqr) | (salaries > q3 + 1.5 * iqr)])`,
 q: [["When would you use the median over the mean?", "When the data is skewed or has outliers, like income or house prices."],
     ["What is standard deviation?", "The typical distance of values from the mean."]],
 x: ["Reporting averages of skewed data without the median"],
 d: "You found the outlier with the IQR rule.",
 min: 45
},
"w10-2": {
 m: "Bayes' theorem is how you update beliefs with evidence, the foundation of spam filters and medical tests.",
 e: "A test for a rare disease is 99% accurate. You test positive. Are you probably sick? Bayes says often not, because the disease is so rare.",
 k: ["P(A and B), P(A or B)", "Conditional probability P(A|B) = P(A and B) / P(B)", "Bayes: P(A|B) = P(B|A) P(A) / P(B)", "Base rates matter"],
 t: ["Solve the disease test problem: 1% prevalence, 99% sensitivity, 95% specificity", "Simulate it with 100,000 random people in NumPy and check", "Compute P(spam | contains 'free') from a small table", "Explain the result in one sentence"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(0); n = 100_000
sick = rng.random(n) < 0.01
positive = np.where(sick, rng.random(n) < 0.99, rng.random(n) < 0.05)
print("P(sick | positive) =", round(sick[positive].mean(), 3))`,
 q: [["State Bayes' theorem.", "P(A|B) = P(B|A) * P(A) / P(B): the updated probability of A after seeing B."],
     ["Why is Naive Bayes called naive?", "It assumes features are independent given the class, which is rarely true but works well anyway."]],
 x: ["Ignoring the base rate"],
 d: "Simulation matches your hand calculation (about 17%).",
 min: 60
},
"w10-3": {
 m: "Knowing distributions tells you which model, loss and test to use.",
 e: "A distribution is the shape of how values are spread: bell curve (normal), coin flips (binomial), arrivals per hour (Poisson).",
 k: ["Normal: heights, measurement error", "Binomial: number of successes in n tries", "Uniform: every value equally likely", "Poisson: counts of rare events in a time window", "68-95-99.7 rule for normal"],
 t: ["Sample from each distribution with NumPy and plot histograms", "Check the 68-95-99.7 rule on normal samples", "Model 'customers per hour' with Poisson(lambda=4)", "Probability of 8+ heads in 10 flips with scipy.stats.binom"],
 c: String.raw`import numpy as np
from scipy import stats
x = np.random.default_rng(0).normal(0, 1, 100_000)
print([np.mean(abs(x) < k) for k in (1, 2, 3)])
print(1 - stats.binom.cdf(7, 10, 0.5))`,
 q: [["What is the normal distribution and why is it common?", "The bell curve; sums of many small independent effects tend toward it (central limit theorem)."],
     ["Give an example of a Poisson process.", "Number of calls to a support centre per minute."]],
 x: ["Assuming everything is normally distributed"],
 d: "You can name a real example of each distribution.",
 min: 50
},
"w10-4": {
 m: "You almost never have all the data. Sampling theory tells you how much to trust your estimates.",
 e: "Taste one spoon of well-stirred soup and you know the whole pot. The central limit theorem says averages of samples behave like a bell curve.",
 k: ["Population vs sample", "Sampling distribution of the mean", "Central limit theorem", "Standard error = std / sqrt(n)", "95% confidence interval ≈ mean ± 1.96 * SE"],
 t: ["Create a skewed 'population' (exponential)", "Take 1000 samples of size 50 and plot their means", "See the bell shape appear", "Compute a 95% CI for the mean from one sample", "Repeat 100 times and count how many CIs contain the true mean"],
 c: String.raw`import numpy as np
rng = np.random.default_rng(0)
pop = rng.exponential(10, 1_000_000); true = pop.mean(); hits = 0
for _ in range(100):
    s = rng.choice(pop, 50)
    se = s.std(ddof=1) / np.sqrt(50)
    hits += s.mean() - 1.96 * se <= true <= s.mean() + 1.96 * se
print(hits, "of 100 intervals contain the true mean")`,
 q: [["Explain the central limit theorem.", "The mean of many independent samples is approximately normally distributed, whatever the original distribution, as sample size grows."],
     ["What does a 95% confidence interval mean?", "If you repeated the sampling many times, about 95% of such intervals would contain the true value."]],
 x: ["Saying 'there's a 95% chance the true mean is in this interval'"],
 d: "About 95 of your 100 intervals hit the true mean.",
 min: 60
},
"w10-5": {
 m: "A/B tests decide which product changes ship. Every product company expects you to read one.",
 e: "Show version A to half the users and B to the other half. A hypothesis test asks: is B's better number real, or just luck?",
 k: ["Null hypothesis: no difference", "p-value: chance of seeing this result if there's no real difference", "Significance level α = 0.05", "Two-proportion z-test / chi-square for conversion rates", "Statistical vs practical significance"],
 t: ["A: 200 conversions from 5000 users. B: 250 from 5000", "Run a two-proportion z-test with statsmodels", "Interpret the p-value", "Compute the lift and a confidence interval", "Write a one-paragraph recommendation"],
 c: String.raw`from statsmodels.stats.proportion import proportions_ztest
stat, p = proportions_ztest([250, 200], [5000, 5000])
print(round(p, 4), "lift:", round((250 / 5000) / (200 / 5000) - 1, 3))`,
 q: [["What is a p-value?", "The probability of seeing a result at least this extreme if the null hypothesis were true."],
     ["Type I vs Type II error?", "Type I: false positive (rejecting a true null). Type II: false negative (missing a real effect)."],
     ["What is p-hacking?", "Trying many tests or stopping early until something is significant, which inflates false positives."]],
 x: ["Stopping the test as soon as p < 0.05"],
 d: "Your recommendation cites the p-value and the lift.",
 min: 60
},
"w10-6": {
 m: "Maximum likelihood is why we use cross-entropy loss. It connects statistics to deep learning.",
 e: "Given the data you saw, which settings of the model make that data most likely? Pick those.",
 k: ["Likelihood: probability of the data given parameters", "MLE for a coin = heads / flips", "Log-likelihood turns products into sums", "Minimising cross-entropy = maximising likelihood"],
 t: ["Flip a biased coin 100 times (p = 0.7) in NumPy", "Plot the likelihood for p from 0 to 1", "Find the p that maximises it", "Show it equals heads / 100", "Compute binary cross-entropy for a few predictions"],
 c: String.raw`import numpy as np
flips = np.random.default_rng(0).random(100) < 0.7
ps = np.linspace(0.01, 0.99, 99)
loglik = flips.sum() * np.log(ps) + (~flips).sum() * np.log(1 - ps)
print(ps[loglik.argmax()], flips.mean())`,
 q: [["What is maximum likelihood estimation?", "Choosing parameters that make the observed data most probable."],
     ["How does cross-entropy relate to likelihood?", "Minimising cross-entropy loss is the same as maximising the log-likelihood of the correct labels."]],
 x: ["Multiplying many small probabilities (underflow) instead of summing logs"],
 d: "Your likelihood peak matches the observed heads ratio.",
 min: 45
},
"w10-p": {
 m: "An A/B test report shows you can turn statistics into a business decision.",
 e: "Analyse a real A/B test dataset and recommend ship, don't ship, or test longer.",
 k: ["Check sample ratio and data quality first", "Test, effect size and confidence interval", "Plain-English recommendation"],
 t: ["Use the Kaggle 'A/B testing' dataset (e.g. landing page or cookie cats)", "Check group sizes are balanced", "Compute conversion rates and a z-test", "Compute a 95% CI for the difference", "Write REPORT.md: question, method, result, recommendation, caveats"],
 q: [["How long should an A/B test run?", "Until it reaches a sample size computed in advance from the minimum effect you care about, usually at least a full weekly cycle."]],
 x: ["Recommending a change based on a tiny, noisy difference"],
 d: "REPORT.md gives a clear recommendation with numbers.",
 min: 180
}
});
