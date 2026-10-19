/* Phase 3: Machine Learning (Weeks 11-17) */
export default {

/* ---------- Week 11: ML fundamentals ---------- */
"w11-1": {
 m: "Knowing which kind of learning fits a problem is the first decision on every ML project.",
 e: "Supervised: learning with an answer key. Unsupervised: finding groups with no answer key. Reinforcement: learning by trial, reward and penalty, like training a pet.",
 k: ["Supervised: regression (numbers) and classification (categories)", "Unsupervised: clustering, dimensionality reduction", "Reinforcement: agent, environment, reward", "Self-supervised: labels come from the data itself (how LLMs are pre-trained)"],
 t: ["List 10 real problems (spam, house price, customer groups, game AI...)", "Label each as supervised/unsupervised/RL and regression/classification", "For 3 of them, say what the features and target would be", "Find one Indian company example for each type"],
 q: [["Supervised vs unsupervised learning?", "Supervised learns from labelled examples to predict a target; unsupervised finds structure in unlabelled data."],
     ["Is predicting tomorrow's temperature regression or classification?", "Regression, because the output is a continuous number."],
     ["How are LLMs trained: supervised or unsupervised?", "Pre-training is self-supervised (predict the next token), then supervised fine-tuning and reinforcement learning from feedback."]],
 x: ["Calling every problem 'AI' without naming the task type"],
 d: "Your table of 10 problems is correctly labelled.",
 min: 40
},
"w11-2": {
 m: "Splitting data correctly is how you know a model works on new data, not just data it memorised.",
 e: "Training data is the textbook, validation is the practice test you use while studying, test is the final exam you only see once.",
 k: ["Features (X) and target (y)", "train_test_split with random_state and stratify", "Validation set for choosing settings", "Test set touched only at the end", "Typical split: 70/15/15 or 80/20 plus cross-validation"],
 t: ["Load Titanic, choose 5 features and the target Survived", "Split 80/20 with stratify=y", "Check the survival rate is the same in both splits", "Split train again into train/validation", "Write in a comment why the test set must stay untouched"],
 c: String.raw`from sklearn.model_selection import train_test_split
X = df[["Pclass", "Age", "Fare", "SibSp", "Parch"]]; y = df["Survived"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
print(y_tr.mean().round(3), y_te.mean().round(3))`,
 q: [["Why have a separate validation and test set?", "Validation is used to tune choices, so it becomes optimistic; the untouched test set gives an honest final estimate."],
     ["What does stratify do?", "Keeps class proportions the same in each split."]],
 x: ["Tuning on the test set", "Splitting time-series data randomly"],
 d: "Your splits have matching class balance.",
 min: 40
},
"w11-3": {
 m: "Overfitting is the most common reason models fail in the real world. Spotting it is a core skill.",
 e: "Underfitting is a student who didn't study. Overfitting is a student who memorised last year's paper word for word and fails on new questions.",
 k: ["Bias: error from wrong assumptions (too simple)", "Variance: error from sensitivity to training data (too complex)", "Training vs validation error gap shows overfitting", "Fixes: more data, regularisation, simpler model, early stopping"],
 t: ["Fit polynomials of degree 1, 3 and 15 to 20 noisy points", "Plot each fit", "Compare train and test error for each", "Identify which underfits and which overfits", "Plot a learning curve with sklearn's learning_curve"],
 c: String.raw`import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
rng = np.random.default_rng(0); x = np.sort(rng.uniform(0, 1, 20)); y = np.sin(2 * np.pi * x) + rng.normal(0, .2, 20)
for d in (1, 3, 15):
    m = make_pipeline(PolynomialFeatures(d), LinearRegression()).fit(x[:, None], y)
    print(d, round(m.score(x[:, None], y), 3))`,
 q: [["Explain the bias-variance trade-off.", "Simple models have high bias and underfit; complex models have high variance and overfit. The goal is the balance that minimises test error."],
     ["How do you detect overfitting?", "Training performance is much better than validation performance."],
     ["Name 4 ways to reduce overfitting.", "More data, regularisation, simpler model or fewer features, early stopping, dropout, data augmentation."]],
 x: ["Celebrating 100% training accuracy"],
 d: "You can point at your plots and say which model overfits.",
 min: 60
},
"w11-4": {
 m: "scikit-learn's consistent API means once you know fit/predict you can use 50+ algorithms.",
 e: "Every sklearn model has the same buttons: fit to learn, predict to answer, score to grade. Transformers have fit and transform.",
 k: ["Estimator: fit(X, y), predict(X), score(X, y)", "Transformer: fit, transform, fit_transform", "Pipeline chains transformers and a model", "Never fit a transformer on test data"],
 t: ["Train a LogisticRegression on your Titanic split", "Score it on the test set", "Add a StandardScaler in a Pipeline", "Swap the model for a DecisionTree with one line", "Print predict_proba for 5 passengers"],
 c: String.raw`from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
pipe = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression())
pipe.fit(X_tr, y_tr)
print(pipe.score(X_te, y_te), pipe.predict_proba(X_te[:5]))`,
 q: [["Why fit the scaler only on training data?", "Fitting on test data leaks information about the test distribution into training."],
     ["What's the benefit of a Pipeline?", "Bundles preprocessing and model so they're applied consistently and safely in cross-validation and production."]],
 x: ["Calling fit_transform on the test set"],
 d: "A working pipeline scoring on the test set.",
 min: 50
},
"w11-5": {
 m: "Andrew Ng's course is the most trusted ML foundation in the world. It explains the why behind every algorithm.",
 e: "Structured lectures plus labs. You're taking it alongside the building, not instead of it.",
 k: ["Course 1: supervised learning, regression, classification", "Cost functions and gradient descent", "Regularisation"],
 t: ["Enrol in the Machine Learning Specialization (audit is free)", "Finish Course 1, week 1", "Do the optional labs in the browser", "Write the 3 things you learned in your notes"],
 q: [["What is a cost function?", "A measure of how wrong the model's predictions are across the training data, which training tries to minimise."]],
 x: ["Only watching videos without doing labs"],
 d: "Course 1 week 1 complete.",
 min: 180
},
"w11-6": {
 m: "Google's crash course frames ML the way product teams think about it.",
 e: "Short, practical lessons with interactive exercises from Google engineers.",
 k: ["Framing a problem as ML", "Loss and how models reduce it", "Is ML the right tool here?"],
 t: ["Do the 'Framing' and 'Linear regression / loss' modules", "Try the interactive exercises", "Write one problem at your workplace that ML could help, framed as input, output and success metric"],
 q: [["When should you NOT use ML?", "When simple rules work, data is scarce, errors are very costly and unexplainable, or the pattern doesn't exist in the data."]],
 x: ["Reaching for ML when an if-statement would do"],
 d: "One real problem framed with a success metric.",
 min: 90
},
"w11-p": {
 m: "Explaining every line of your first model proves you understand it, not just copied it.",
 e: "Train a classifier on the Iris flower dataset and annotate every step.",
 k: ["load_iris, split, fit, predict, evaluate", "Confusion matrix", "Comments that explain why, not what"],
 t: ["Load Iris from sklearn.datasets", "Split with stratify", "Train LogisticRegression and KNN", "Print accuracy and a confusion matrix for both", "Comment every line in your own words", "Push with a README explaining which model won and why"],
 c: String.raw`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)
knn = KNeighborsClassifier(5).fit(X_tr, y_tr)
print(knn.score(X_te, y_te)); print(confusion_matrix(y_te, knn.predict(X_te)))`,
 q: [["Walk me through training a classifier.", "Load data, split, preprocess, fit, evaluate on held-out data, and look at errors."]],
 x: ["Only reporting accuracy"],
 d: "Every line commented and pushed.",
 min: 90
},

/* ---------- Week 12: Regression ---------- */
"w12-1": {
 m: "Building linear regression from scratch shows you exactly what every ML library does under the hood.",
 e: "Find the straight line that is closest to all the points, by repeatedly tilting and shifting it to reduce the error.",
 k: ["Prediction ŷ = Xw + b", "Loss: mean squared error", "Gradients for w and b", "Vectorised updates for many features"],
 t: ["Extend your week-9 code to multiple features (matrix X)", "Train on the California housing dataset (3 features)", "Plot the loss curve", "Compare coefficients with sklearn's LinearRegression"],
 c: String.raw`import numpy as np
def fit(X, y, lr=0.01, steps=2000):
    w, b = np.zeros(X.shape[1]), 0.0
    for _ in range(steps):
        err = X @ w + b - y
        w -= lr * 2 * X.T @ err / len(y)
        b -= lr * 2 * err.mean()
    return w, b`,
 q: [["What assumptions does linear regression make?", "Linear relationship, independent errors, constant error variance, and roughly normal errors; features not highly collinear."],
     ["Closed-form vs gradient descent for linear regression?", "The normal equation solves it directly but is slow for many features; gradient descent scales better."]],
 x: ["Forgetting to scale features, so gradient descent crawls"],
 d: "Your coefficients match sklearn's closely.",
 min: 75
},
"w12-2": {
 m: "Linear regression is the baseline every regression model must beat.",
 e: "Same idea, now in two lines with sklearn.",
 k: ["LinearRegression().fit(X, y)", "coef_ and intercept_", "Interpreting coefficients (with scaled features)", "Residual plots"],
 t: ["Train on California housing (all features)", "Print coefficients next to feature names", "Plot predicted vs actual", "Plot residuals and look for patterns", "Write which feature matters most and whether that makes sense"],
 c: String.raw`from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
import pandas as pd
data = fetch_california_housing(as_frame=True)
m = LinearRegression().fit(data.data, data.target)
print(pd.Series(m.coef_, index=data.data.columns).sort_values())`,
 q: [["How do you interpret a coefficient?", "The expected change in the target for a one-unit increase in that feature, holding others fixed."],
     ["What does a pattern in the residual plot mean?", "The model is missing structure, e.g. a non-linear relationship."]],
 x: ["Comparing coefficients of unscaled features"],
 d: "You can explain the top feature's effect.",
 min: 45
},
"w12-3": {
 m: "Regularisation is the main tool against overfitting, and L1/L2 is a favourite interview question.",
 e: "Regularisation adds a penalty for big weights, like a teacher docking marks for over-complicated answers. Lasso can push weights to exactly zero, which selects features.",
 k: ["PolynomialFeatures to model curves", "Ridge (L2): shrinks weights", "Lasso (L1): sets some weights to zero", "alpha controls penalty strength", "ElasticNet mixes both"],
 t: ["Fit a degree-10 polynomial with plain LinearRegression: see overfitting", "Fit Ridge and Lasso with different alphas", "Compare test scores", "Count how many Lasso coefficients are zero", "Plot coefficients vs alpha"],
 c: String.raw`from sklearn.linear_model import Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline
for model in (Ridge(alpha=1.0), Lasso(alpha=0.01, max_iter=10000)):
    p = make_pipeline(PolynomialFeatures(3), StandardScaler(), model).fit(X_tr, y_tr)
    print(type(model).__name__, round(p.score(X_te, y_te), 3))`,
 q: [["L1 vs L2 regularisation?", "L1 adds the sum of absolute weights and creates sparse models; L2 adds the sum of squared weights and shrinks all weights smoothly."],
     ["Why scale features before regularisation?", "The penalty treats all weights equally, so features on bigger scales would be unfairly penalised."]],
 x: ["Regularising without scaling"],
 d: "You've seen Lasso zero out features.",
 min: 60
},
"w12-4": {
 m: "Choosing the right metric is how you tell stakeholders if a model is good enough.",
 e: "MAE: average miss in real units. RMSE: punishes big misses more. R²: how much of the variation the model explains.",
 k: ["MAE = mean |y - ŷ|", "MSE and RMSE", "R² from 0 (useless) to 1 (perfect), can be negative", "MAPE for percentage error"],
 t: ["Compute MAE, RMSE and R² for your housing model with sklearn.metrics", "Compute them by hand with NumPy and compare", "Add one huge error and see how RMSE jumps more than MAE", "Explain each number to a non-technical friend"],
 c: String.raw`from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
pred = m.predict(X_te)
print("MAE", mean_absolute_error(y_te, pred))
print("RMSE", mean_squared_error(y_te, pred) ** 0.5)
print("R2", r2_score(y_te, pred))`,
 q: [["MAE vs RMSE?", "MAE treats all errors equally; RMSE squares them, so large errors count much more."],
     ["What does a negative R² mean?", "The model is worse than just predicting the mean."]],
 x: ["Reporting R² alone without an error in real units"],
 d: "You can explain what your MAE means in rupees or dollars.",
 min: 40
},
"w12-5": {
 m: "Unscaled features break gradient descent, KNN, SVM and regularisation. Scaling is a one-line fix people forget.",
 e: "If one feature is in lakhs and another is 0-5, the big one shouts over the small one. Scaling puts them on the same volume.",
 k: ["StandardScaler: mean 0, std 1", "MinMaxScaler: 0 to 1", "RobustScaler: uses median and IQR (outliers)", "Trees don't need scaling"],
 t: ["Train KNN on unscaled vs scaled data and compare", "Try all three scalers", "Plot a feature before and after scaling", "Note which models care about scaling"],
 c: String.raw`from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.pipeline import make_pipeline
print("raw", KNeighborsRegressor().fit(X_tr, y_tr).score(X_te, y_te))
for s in (StandardScaler(), MinMaxScaler(), RobustScaler()):
    print(type(s).__name__, make_pipeline(s, KNeighborsRegressor()).fit(X_tr, y_tr).score(X_te, y_te))`,
 q: [["Standardisation vs normalisation?", "Standardisation makes mean 0 and std 1; normalisation (min-max) rescales to a fixed range like 0-1."],
     ["Which models don't need scaling?", "Tree-based models like decision trees, random forests and gradient boosting."]],
 x: ["Scaling before the train/test split"],
 d: "Scaled KNN clearly beats unscaled.",
 min: 40
},
"w12-p": {
 m: "House price prediction is the classic regression portfolio project, and error analysis makes yours stand out.",
 e: "Predict house prices on Kaggle, then study where and why the model gets it wrong.",
 k: ["Log-transform skewed targets", "Handle missing and categorical data", "Error analysis by segment"],
 t: ["Join Kaggle 'House Prices: Advanced Regression'", "Clean data and one-hot encode categoricals", "Train Linear, Ridge and Lasso on log(SalePrice)", "Submit to Kaggle and note your score", "Find the 20 worst predictions and look for patterns", "Write ERRORS.md with what you found"],
 q: [["Why log-transform the price?", "Prices are right-skewed; logs make errors relative and the relationship more linear."],
     ["What did error analysis teach you?", "Name the segment it fails on (e.g. very large or unusual houses) and what feature or data would fix it."]],
 x: ["Stopping at the leaderboard score"],
 d: "Kaggle submission plus an error analysis.",
 min: 240
},

/* ---------- Week 13: Classification ---------- */
"w13-1": {
 m: "Logistic regression is the baseline for every classification problem and the building block of a neural network neuron.",
 e: "Take a linear score and squash it through the sigmoid into a probability between 0 and 1. Above 0.5, predict yes.",
 k: ["sigmoid(z) = 1 / (1 + e^-z)", "Outputs probabilities", "Log loss (binary cross-entropy)", "Decision threshold, default 0.5", "Softmax for multiple classes"],
 t: ["Plot the sigmoid function", "Train LogisticRegression on Titanic", "Look at predict_proba outputs", "Change the threshold to 0.3 and 0.7 and see predictions change", "Interpret coefficients as odds ratios with np.exp"],
 c: String.raw`import numpy as np
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(max_iter=1000).fit(X_tr_clean, y_tr)
proba = clf.predict_proba(X_te_clean)[:, 1]
for t in (0.3, 0.5, 0.7):
    print(t, (proba > t).mean().round(3))
print(np.exp(clf.coef_))`,
 q: [["Why is it called regression if it classifies?", "It regresses the log-odds of the class linearly, then a threshold turns probabilities into classes."],
     ["What loss does logistic regression use?", "Log loss (binary cross-entropy)."],
     ["Why not use MSE for classification?", "With sigmoid it creates a non-convex, badly behaved loss; log loss gives stronger gradients for confident wrong answers."]],
 x: ["Treating 0.5 as the only possible threshold"],
 d: "You can move the threshold and explain the trade-off.",
 min: 60
},
"w13-2": {
 m: "Simple models are fast baselines and often surprisingly strong, especially Naive Bayes on text.",
 e: "KNN: you're like your nearest neighbours. Naive Bayes: count how often each word appears in spam vs not spam, then multiply the odds.",
 k: ["KNN: choose k, needs scaling, slow at prediction", "Naive Bayes: fast, great for text, assumes independence", "MultinomialNB for word counts, GaussianNB for continuous"],
 t: ["Train KNN on Iris for k = 1 to 20 and plot accuracy", "Pick the best k", "Train MultinomialNB on a small spam dataset with CountVectorizer", "Show the top 10 spammy words"],
 c: String.raw`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
texts = ["win free money now", "meeting at 5", "free prize claim", "lunch tomorrow?"]
labels = [1, 0, 1, 0]
vec = CountVectorizer(); X = vec.fit_transform(texts)
nb = MultinomialNB().fit(X, labels)
print(nb.predict(vec.transform(["claim your free money"])))`,
 q: [["How does KNN choose k?", "Try values with cross-validation; small k overfits, large k underfits."],
     ["Why does Naive Bayes work well for text?", "It handles many features cheaply, needs little data, and the independence assumption hurts ranking less than you'd expect."]],
 x: ["KNN on unscaled features"],
 d: "Both models trained and compared.",
 min: 60
},
"w13-3": {
 m: "SVMs teach the idea of margins and kernels, which still shows up in interviews and small-data problems.",
 e: "Draw the widest possible road between two groups of points. The kernel trick lets you draw curved roads by imagining the data in a higher dimension.",
 k: ["Maximum-margin hyperplane", "Support vectors are the points on the edge of the road", "C trades margin width vs misclassification", "Kernels: linear, RBF, polynomial", "Needs scaling"],
 t: ["Make moons data with make_moons", "Train linear SVM and RBF SVM", "Plot both decision boundaries", "Try C = 0.1, 1, 100 and gamma values", "Write what C does in one line"],
 c: String.raw`from sklearn.datasets import make_moons
from sklearn.svm import SVC
X, y = make_moons(300, noise=0.2, random_state=0)
for k in ("linear", "rbf"):
    print(k, SVC(kernel=k, C=1).fit(X, y).score(X, y))`,
 q: [["What is the kernel trick?", "Computing similarity as if data were mapped to a higher-dimensional space, without actually doing the mapping, so linear separators become curved."],
     ["What does the C parameter do?", "High C tries to classify every point correctly (narrow margin, risk of overfitting); low C allows mistakes for a wider margin."]],
 x: ["Using SVM on huge datasets (it scales poorly)"],
 d: "You've plotted a curved RBF boundary.",
 min: 60
},
"w13-4": {
 m: "Accuracy lies on imbalanced data. Picking the right metric is what real ML teams argue about.",
 e: "Precision: of the ones I flagged, how many were right? Recall: of all the real ones, how many did I catch?",
 k: ["Confusion matrix: TP, FP, TN, FN", "Precision = TP / (TP + FP)", "Recall = TP / (TP + FN)", "F1 = harmonic mean of precision and recall", "ROC-AUC: ranking quality across all thresholds"],
 t: ["Compute the confusion matrix for your Titanic model", "Compute precision, recall and F1 by hand, then with classification_report", "Plot ROC and precision-recall curves", "Decide: for cancer screening, fraud or spam, which metric matters most and why"],
 c: String.raw`from sklearn.metrics import classification_report, roc_auc_score, ConfusionMatrixDisplay
pred = clf.predict(X_te_clean)
print(classification_report(y_te, pred))
print("AUC", roc_auc_score(y_te, clf.predict_proba(X_te_clean)[:, 1]))
ConfusionMatrixDisplay.from_predictions(y_te, pred)`,
 q: [["Precision vs recall, when does each matter?", "Precision when false positives are costly (spam filter hiding real mail); recall when false negatives are costly (missing cancer or fraud)."],
     ["Why is accuracy misleading on imbalanced data?", "With 99% negatives, predicting 'no' always scores 99% accuracy but catches nothing."],
     ["What does an AUC of 0.5 mean?", "The model ranks no better than random guessing."]],
 x: ["Reporting accuracy on a 1% fraud dataset"],
 d: "You can pick a metric for any problem and justify it.",
 min: 60
},
"w13-5": {
 m: "Real problems (fraud, disease, churn) are imbalanced. Handling that is a daily task.",
 e: "If only 1 in 100 transactions is fraud, the model learns to always say 'not fraud'. You rebalance so it pays attention to the rare class.",
 k: ["class_weight='balanced'", "Undersampling the majority, oversampling the minority", "SMOTE creates synthetic minority examples", "Tune the threshold", "Use PR-AUC and recall, not accuracy"],
 t: ["Download the Kaggle credit card fraud dataset", "Check the class ratio", "Train LogisticRegression plain vs class_weight='balanced'", "Try SMOTE from imbalanced-learn (only on training data)", "Compare recall and PR-AUC"],
 c: String.raw`from imblearn.over_sampling import SMOTE
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score
X_res, y_res = SMOTE(random_state=0).fit_resample(X_tr, y_tr)
for name, (Xa, ya, cw) in {"plain": (X_tr, y_tr, None), "balanced": (X_tr, y_tr, "balanced"), "smote": (X_res, y_res, None)}.items():
    m = LogisticRegression(max_iter=2000, class_weight=cw).fit(Xa, ya)
    print(name, round(average_precision_score(y_te, m.predict_proba(X_te)[:, 1]), 3))`,
 q: [["How do you handle class imbalance?", "Class weights, resampling like SMOTE, threshold tuning, and evaluation with precision, recall or PR-AUC."],
     ["Why apply SMOTE only to training data?", "Synthetic samples in the test set would give a fake, optimistic evaluation."]],
 x: ["Oversampling before splitting"],
 d: "You've improved recall on the fraud class.",
 min: 75
},
"w13-p": {
 m: "A spam classifier with a clear precision/recall chart shows you understand trade-offs, not just training.",
 e: "Classify SMS messages as spam or ham and let the user pick a threshold.",
 k: ["TF-IDF + Logistic Regression or Naive Bayes", "Precision-recall curve", "Threshold choice with justification"],
 t: ["Use the UCI SMS Spam Collection dataset", "TfidfVectorizer + LogisticRegression pipeline", "Plot the precision-recall curve", "Pick a threshold where precision is at least 0.98 and report recall", "Build a tiny Gradio or Streamlit box to test messages", "README with the chart"],
 q: [["Why prefer high precision for a spam filter?", "Sending a real message to spam (false positive) annoys users more than letting one spam through."]],
 x: ["No explanation of the chosen threshold"],
 d: "Demo app plus chart in README.",
 min: 180
},

/* ---------- Week 14: Trees and ensembles ---------- */
"w14-1": {
 m: "Decision trees are readable models and the building block of the most-used algorithms on tabular data.",
 e: "A tree plays 20 questions with your data: 'Is age > 30? Is fare > 50?' until it reaches an answer.",
 k: ["Splits chosen to make groups purer", "Gini impurity and entropy", "max_depth, min_samples_leaf control complexity", "Trees overfit easily", "plot_tree / export_text to read the rules"],
 t: ["Train a DecisionTreeClassifier on Titanic", "Plot the tree with max_depth=3", "Read the top 3 rules in plain English", "Compare train vs test accuracy for depths 2 to 20", "Find the depth where overfitting starts"],
 c: String.raw`from sklearn.tree import DecisionTreeClassifier, export_text
for d in (2, 4, 8, 16):
    t = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_tr_clean, y_tr)
    print(d, round(t.score(X_tr_clean, y_tr), 3), round(t.score(X_te_clean, y_te), 3))
print(export_text(DecisionTreeClassifier(max_depth=3).fit(X_tr_clean, y_tr), feature_names=list(X_tr_clean.columns)))`,
 q: [["How does a decision tree choose a split?", "It tries candidate splits and picks the one that most reduces impurity (Gini or entropy) in the child nodes."],
     ["Gini vs entropy?", "Both measure impurity; results are usually very similar, Gini is slightly faster."],
     ["Why do trees overfit?", "They can keep splitting until each leaf holds one sample, memorising noise."]],
 x: ["Using an unlimited-depth tree"],
 d: "You can read your tree's rules aloud.",
 min: 50
},
"w14-2": {
 m: "Random forests are a strong, low-effort default for tabular data.",
 e: "Ask 500 slightly different trees and take a vote. Each tree sees a random sample of rows and features, so their mistakes cancel out.",
 k: ["Bagging: bootstrap samples + averaging", "Random feature subsets at each split", "n_estimators, max_depth, max_features", "Out-of-bag score as a free validation", "Reduces variance vs a single tree"],
 t: ["Train RandomForestClassifier on Titanic", "Compare with a single tree", "Turn on oob_score=True and compare with test score", "Plot accuracy vs n_estimators (10 to 500)", "Show feature_importances_"],
 c: String.raw`from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=300, oob_score=True, random_state=0, n_jobs=-1).fit(X_tr_clean, y_tr)
print(rf.oob_score_, rf.score(X_te_clean, y_te))`,
 q: [["Bagging vs boosting?", "Bagging trains models independently on random samples and averages them (reduces variance); boosting trains models in sequence, each fixing the last one's errors (reduces bias)."],
     ["What is the out-of-bag score?", "Accuracy on the rows each tree didn't see in its bootstrap sample, a built-in validation estimate."]],
 x: ["Expecting more trees to fix a bad feature set"],
 d: "Forest beats the single tree on test data.",
 min: 50
},
"w14-3": {
 m: "Gradient boosting (XGBoost, LightGBM, CatBoost) wins most tabular-data competitions and powers many production systems.",
 e: "Build a small tree, look at what it got wrong, build the next tree to fix those errors, and repeat hundreds of times.",
 k: ["Sequential trees fitting residuals", "learning_rate and n_estimators trade off", "max_depth small (3-8)", "Early stopping on a validation set", "LightGBM is fast; CatBoost handles categoricals natively"],
 t: ["Train XGBoost, LightGBM and CatBoost on the same data", "Use early stopping with a validation set", "Compare scores and training time", "Pass categorical columns directly to CatBoost"],
 c: String.raw`import lightgbm as lgb, xgboost as xgb, time
for name, model in {"xgb": xgb.XGBClassifier(n_estimators=500, learning_rate=0.05, early_stopping_rounds=30),
                    "lgb": lgb.LGBMClassifier(n_estimators=500, learning_rate=0.05, verbose=-1)}.items():
    t = time.time(); model.fit(X_tr_clean, y_tr, eval_set=[(X_val, y_val)])
    print(name, round(model.score(X_te_clean, y_te), 3), round(time.time() - t, 2), "s")`,
 q: [["How does gradient boosting work?", "It adds trees one at a time, each trained to predict the remaining errors (gradients of the loss) of the ensemble so far."],
     ["XGBoost vs LightGBM?", "Both are gradient boosting; LightGBM grows trees leaf-wise with histogram binning and is usually faster on large data."],
     ["What is early stopping?", "Stop adding trees when the validation score stops improving, to avoid overfitting."]],
 x: ["High learning rate with many trees, overfitting fast"],
 d: "Three boosters compared in a small table.",
 min: 75
},
"w14-4": {
 m: "Stakeholders ask 'why did the model say that?'. SHAP gives an answer they can trust.",
 e: "SHAP splits a prediction into contributions from each feature, like splitting a restaurant bill fairly among friends.",
 k: ["Built-in feature_importances_ can be biased", "Permutation importance", "SHAP values: global and per-prediction", "Summary plot and waterfall plot"],
 t: ["Compute permutation importance for your forest", "Install shap and compute SHAP values for your LightGBM model", "Make a summary plot", "Make a waterfall plot for one passenger", "Explain one prediction in plain English"],
 c: String.raw`import shap
explainer = shap.TreeExplainer(model)
sv = explainer(X_te_clean)
shap.plots.beeswarm(sv)
shap.plots.waterfall(sv[0])`,
 q: [["How would you explain a model's prediction to a business user?", "Use SHAP to show which features pushed this prediction up or down and by how much."],
     ["Why can impurity-based feature importance mislead?", "It favours high-cardinality and continuous features and is computed on training data."]],
 x: ["Treating importance as causation"],
 d: "You explained one prediction in plain English.",
 min: 60
},
"w14-5": {
 m: "Tuning squeezes out the last few percent, and knowing how to do it efficiently saves hours of compute.",
 e: "Grid search tries every combination. Random search tries random ones (usually just as good, much faster). Optuna learns which areas look promising.",
 k: ["GridSearchCV", "RandomizedSearchCV", "Optuna: Bayesian-style search with pruning", "Always tune with cross-validation", "Tune the biggest levers first"],
 t: ["Grid search a random forest (max_depth, n_estimators)", "Random search the same space with 20 iterations", "Tune LightGBM with Optuna for 50 trials", "Compare best scores and time taken", "Plot Optuna's optimisation history"],
 c: String.raw`import optuna, lightgbm as lgb
from sklearn.model_selection import cross_val_score
def objective(trial):
    m = lgb.LGBMClassifier(n_estimators=trial.suggest_int("n", 100, 800),
        learning_rate=trial.suggest_float("lr", 0.01, 0.3, log=True),
        num_leaves=trial.suggest_int("leaves", 8, 128), verbose=-1)
    return cross_val_score(m, X_tr_clean, y_tr, cv=5).mean()
study = optuna.create_study(direction="maximize"); study.optimize(objective, n_trials=50)
print(study.best_params)`,
 q: [["Grid vs random search?", "Grid tries every combination; random samples combinations and usually finds good settings faster when only a few parameters matter."],
     ["Why not tune on the test set?", "The test score would become optimistic and no longer measure real performance."]],
 x: ["Tuning tiny parameters before fixing data problems"],
 d: "Optuna found better settings than your defaults.",
 min: 75
},
"w14-p": {
 m: "Churn prediction is one of the most common ML use cases in industry, and SHAP makes it actionable.",
 e: "Predict which telecom customers will leave and explain why, so the business knows who to call.",
 k: ["Telco Customer Churn dataset (Kaggle)", "LightGBM or CatBoost", "SHAP per customer", "Business framing: cost of a lost customer vs a retention offer"],
 t: ["Clean the data and encode categoricals", "Train a boosted model with cross-validation", "Report ROC-AUC and recall at a chosen threshold", "SHAP summary plus 3 individual explanations", "Write 3 retention recommendations backed by SHAP", "README with charts"],
 q: [["How would the business use your churn model?", "Score customers monthly, target the highest-risk ones with offers, and use SHAP reasons to choose the offer."]],
 x: ["Stopping at AUC with no business recommendation"],
 d: "Model, explanations and recommendations in one README.",
 min: 240
},

/* ---------- Week 15: Unsupervised ---------- */
"w15-1": {
 m: "Clustering finds natural groups, used for customer segments, topic discovery and anomaly spotting.",
 e: "K-means drops k pins on the map, assigns each point to its nearest pin, moves the pins to the middle of their groups, and repeats.",
 k: ["Choose k, init centroids, assign, update, repeat", "Inertia (within-cluster distance)", "Elbow method", "Silhouette score (-1 to 1)", "Scale features first"],
 t: ["Make blobs with make_blobs (4 centres)", "Run KMeans for k = 2 to 8", "Plot the elbow curve and silhouette scores", "Pick k and plot the clusters", "Try k-means on the Mall Customers dataset"],
 c: String.raw`from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.datasets import make_blobs
X, _ = make_blobs(500, centers=4, random_state=0)
for k in range(2, 9):
    km = KMeans(k, n_init="auto", random_state=0).fit(X)
    print(k, round(km.inertia_), round(silhouette_score(X, km.labels_), 3))`,
 q: [["How does k-means work?", "Randomly place k centroids, assign points to the nearest one, move centroids to the mean of their points, repeat until stable."],
     ["How do you choose k?", "Elbow method, silhouette score, and whether the clusters make business sense."],
     ["Limitations of k-means?", "Assumes round, similar-sized clusters, needs k in advance, sensitive to scale and outliers."]],
 x: ["Clustering unscaled data"],
 d: "You picked k with two methods that agree.",
 min: 60
},
"w15-2": {
 m: "Not all groups are round blobs. DBSCAN finds odd shapes and flags noise automatically.",
 e: "DBSCAN says: a crowded area is a cluster, and anyone standing alone is noise. Hierarchical clustering builds a family tree of groups.",
 k: ["Agglomerative clustering and dendrograms", "DBSCAN: eps (radius) and min_samples", "Label -1 means noise", "No need to choose k in DBSCAN"],
 t: ["Run k-means and DBSCAN on make_moons and compare", "Tune eps until moons separate", "Draw a dendrogram with scipy for 30 points", "Cut the dendrogram at 3 clusters"],
 c: String.raw`from sklearn.datasets import make_moons
from sklearn.cluster import DBSCAN, KMeans
X, _ = make_moons(400, noise=0.07, random_state=0)
print(set(DBSCAN(eps=0.2, min_samples=5).fit_predict(X)))
print(set(KMeans(2, n_init="auto").fit_predict(X)))`,
 q: [["When would you use DBSCAN over k-means?", "When clusters have irregular shapes, you don't know k, or you want outliers flagged as noise."]],
 x: ["Using one eps for data with very different densities"],
 d: "DBSCAN separates the moons where k-means fails.",
 min: 50
},
"w15-3": {
 m: "PCA compresses data, speeds up models and lets you visualise high-dimensional data.",
 e: "PCA finds the few directions where the data varies most and describes everything using just those, like summarising a movie in 3 sentences.",
 k: ["Principal components are orthogonal directions of max variance", "explained_variance_ratio_", "Choose components to keep 90-95% variance", "Scale before PCA"],
 t: ["Load the digits dataset (64 features)", "Scale and run PCA", "Plot cumulative explained variance", "How many components keep 95%?", "Plot digits in 2D coloured by label", "Train a classifier on PCA features and compare speed and accuracy"],
 c: String.raw`from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np
X, y = load_digits(return_X_y=True)
p = PCA().fit(StandardScaler().fit_transform(X))
print(np.argmax(np.cumsum(p.explained_variance_ratio_) >= 0.95) + 1, "components for 95%")`,
 q: [["What does PCA do?", "Projects data onto orthogonal directions that capture the most variance, reducing dimensions while keeping most information."],
     ["Is PCA supervised?", "No, it ignores labels."],
     ["Drawbacks of PCA?", "Components are hard to interpret and it only captures linear structure."]],
 x: ["Forgetting to scale, so large-unit features dominate"],
 d: "You know how many components keep 95% of variance.",
 min: 50
},
"w15-4": {
 m: "t-SNE and UMAP make stunning 2D maps of embeddings, perfect for exploring what a model has learned.",
 e: "They squash high-dimensional data into 2D while trying to keep neighbours close, like flattening a globe into a map.",
 k: ["t-SNE: great local structure, slow, perplexity parameter", "UMAP: faster, keeps more global structure", "Only for visualisation, not features", "Distances between far clusters aren't meaningful"],
 t: ["Run t-SNE on digits and plot coloured by label", "Run UMAP (umap-learn) on the same data", "Compare the two plots and timings", "Change perplexity (5, 30, 50) and observe"],
 c: String.raw`from sklearn.manifold import TSNE
import umap, matplotlib.pyplot as plt
emb = TSNE(perplexity=30, random_state=0).fit_transform(X)
plt.scatter(*emb.T, c=y, cmap="tab10", s=5); plt.show()
emb2 = umap.UMAP(random_state=0).fit_transform(X)
plt.scatter(*emb2.T, c=y, cmap="tab10", s=5); plt.show()`,
 q: [["PCA vs t-SNE?", "PCA is linear, fast and keeps global variance; t-SNE is non-linear, slow, and preserves local neighbourhoods for visualisation."]],
 x: ["Reading cluster sizes and gaps in t-SNE as meaningful"],
 d: "Two plots showing digit clusters.",
 min: 45
},
"w15-5": {
 m: "Anomaly detection catches fraud, faults and attacks, often without labels.",
 e: "Isolation Forest randomly slices the data. Weird points get isolated in very few slices, so they're flagged.",
 k: ["IsolationForest and contamination parameter", "Anomaly score", "Local Outlier Factor", "Evaluate with labels if you have them"],
 t: ["Generate normal data plus 20 outliers", "Fit IsolationForest and plot flagged points", "Apply it to the credit card fraud dataset without using labels", "Check how many flagged points were actual fraud"],
 c: String.raw`import numpy as np
from sklearn.ensemble import IsolationForest
rng = np.random.default_rng(0)
X = np.r_[rng.normal(0, 1, (500, 2)), rng.uniform(-6, 6, (20, 2))]
flags = IsolationForest(contamination=0.04, random_state=0).fit_predict(X)
print((flags == -1).sum(), "flagged")`,
 q: [["How does Isolation Forest detect anomalies?", "Anomalies are easier to isolate with random splits, so they have shorter average path lengths in the trees."],
     ["How do you evaluate anomaly detection without labels?", "Manual review of top flagged cases, stability checks, and domain expert feedback."]],
 x: ["Setting contamination without thinking about the real rate"],
 d: "You measured how many flagged points were real fraud.",
 min: 45
},
"w15-p": {
 m: "Customer segmentation is a common business ask. Turning clusters into personas is what makes it useful.",
 e: "Cluster retail customers and describe each group like a marketing persona.",
 k: ["RFM features: recency, frequency, monetary", "Scale, cluster, profile", "Give each cluster a name and action"],
 t: ["Use the Online Retail dataset (UCI) or Mall Customers", "Build RFM features per customer", "Scale and cluster with k-means, pick k", "Profile each cluster (averages, sizes)", "Name them (e.g. 'Loyal big spenders', 'At-risk')", "Recommend one action per segment"],
 q: [["How do you validate a segmentation?", "Check cluster separation metrics, stability across samples, and whether segments are distinct and actionable for the business."]],
 x: ["Clusters with no names or actions"],
 d: "Personas with actions in the README.",
 min: 180
},

/* ---------- Week 16: Feature engineering & workflow ---------- */
"w16-1": {
 m: "Models only understand numbers. Encoding categories well often matters more than the algorithm.",
 e: "One-hot turns 'city' into yes/no columns. Ordinal numbers ordered things (small < medium < large). Target encoding replaces a category with its average outcome.",
 k: ["OneHotEncoder(handle_unknown='ignore')", "OrdinalEncoder for ordered categories", "Target encoding: risk of leakage, use cross-fitting", "High-cardinality categories need care"],
 t: ["One-hot encode Embarked and Sex", "Ordinal encode a 'size' column", "Target-encode a high-cardinality column with sklearn's TargetEncoder", "Compare model scores with each approach"],
 c: String.raw`from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, TargetEncoder
ohe = OneHotEncoder(handle_unknown="ignore", sparse_output=False).fit(df[["Embarked", "Sex"]])
print(ohe.get_feature_names_out())
ordinal = OrdinalEncoder(categories=[["small", "medium", "large"]])
te = TargetEncoder(target_type="binary")`,
 q: [["One-hot vs label encoding?", "One-hot creates a column per category with no fake order; label/ordinal encoding uses integers and implies order, fine for trees or truly ordered data."],
     ["What's the risk with target encoding?", "Leaking the target into features; use out-of-fold encoding and smoothing."]],
 x: ["Label-encoding city names for a linear model"],
 d: "You compared three encodings.",
 min: 50
},
"w16-2": {
 m: "Cross-validation gives a trustworthy score. Leakage is the silent killer of ML projects.",
 e: "Cross-validation rotates which slice is the test set, so every row gets tested once. Leakage is when the model accidentally peeks at the answers.",
 k: ["KFold and StratifiedKFold", "cross_val_score, cross_validate", "Leakage: preprocessing on full data, future information, duplicates across splits", "Group K-fold when rows belong to the same person"],
 t: ["Compare one train/test score vs 5-fold CV mean and std", "Create leakage on purpose: scale before splitting, add a feature derived from the target", "See the inflated score", "Fix it with a Pipeline inside CV"],
 c: String.raw`from sklearn.model_selection import cross_val_score, StratifiedKFold
cv = StratifiedKFold(5, shuffle=True, random_state=0)
scores = cross_val_score(pipe, X, y, cv=cv, scoring="roc_auc")
print(scores.mean().round(3), scores.std().round(3))`,
 q: [["What is k-fold cross-validation?", "Split data into k parts, train on k-1 and test on the remaining one, rotating k times and averaging."],
     ["Give three examples of data leakage.", "Scaling on all data before splitting, using a feature only known after the outcome, and the same customer in both train and test."]],
 x: ["Feature selection on the full dataset before CV"],
 d: "You caught and fixed leakage you created.",
 min: 60
},
"w16-3": {
 m: "A ColumnTransformer pipeline is the professional way to preprocess mixed data, and it deploys cleanly.",
 e: "One machine with separate lanes: numeric columns get imputed and scaled, categorical columns get imputed and one-hot encoded, then everything goes to the model.",
 k: ["ColumnTransformer with named transformers", "Pipeline(preprocess + model)", "make_column_selector by dtype", "Whole pipeline is one object to save and load"],
 t: ["Build a ColumnTransformer for Titanic numeric and categorical columns", "Wrap it with a model in a Pipeline", "Run cross_val_score on the raw DataFrame", "Swap models inside the pipeline", "Print the pipeline diagram in a notebook"],
 c: String.raw`from sklearn.compose import ColumnTransformer, make_column_selector as sel
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import HistGradientBoostingClassifier
pre = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), sel(dtype_include="number")),
    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"), OneHotEncoder(handle_unknown="ignore")), sel(dtype_include="object"))])
model = Pipeline([("pre", pre), ("clf", HistGradientBoostingClassifier())])`,
 q: [["Why put preprocessing inside the pipeline?", "So it's fitted only on training folds during CV and applied identically at prediction time."]],
 x: ["Preprocessing outside the pipeline, then forgetting to repeat it in production"],
 d: "Raw DataFrame in, predictions out, one object.",
 min: 60
},
"w16-4": {
 m: "Sales, demand and stock prices are time series. Random splits give fake-good results on them.",
 e: "With time, you must train on the past and test on the future, just like real life.",
 k: ["Lag features (yesterday's value)", "Rolling means and windows", "Date parts: day of week, month, holiday", "TimeSeriesSplit, never shuffle", "Baseline: 'tomorrow = today'"],
 t: ["Load a daily sales or temperature dataset", "Create lag_1, lag_7 and a 7-day rolling mean", "Add day-of-week and month", "Split by date: train before, test after", "Beat the naive 'yesterday' baseline"],
 c: String.raw`s = df.set_index("date")["sales"]
feat = pd.DataFrame({"lag1": s.shift(1), "lag7": s.shift(7), "roll7": s.shift(1).rolling(7).mean(),
                     "dow": s.index.dayofweek, "y": s}).dropna()
train, test = feat[:"2024-06"], feat["2024-07":]`,
 q: [["How do you validate a time-series model?", "Walk-forward validation (TimeSeriesSplit): always train on earlier data and test on later data."],
     ["Why shift before rolling?", "So today's value isn't included in its own feature, which would leak the answer."]],
 x: ["Rolling windows that include the current value"],
 d: "Your model beats the naive baseline.",
 min: 60
},
"w16-5": {
 m: "A model is useless until you can save it and load it in another program.",
 e: "joblib freezes your whole pipeline to a file so an API can thaw it later and make predictions.",
 k: ["joblib.dump(model, 'model.joblib')", "joblib.load", "Save library versions with the model", "Never load pickles from untrusted sources"],
 t: ["Save your Titanic pipeline", "Load it in a fresh Python session and predict on one new passenger dict", "Write a predict.py script that takes JSON input", "Record sklearn version in a metadata JSON"],
 c: String.raw`import joblib, pandas as pd, sklearn, json
joblib.dump(model, "titanic.joblib")
json.dump({"sklearn": sklearn.__version__}, open("meta.json", "w"))
m = joblib.load("titanic.joblib")
print(m.predict_proba(pd.DataFrame([{"Pclass": 1, "Sex": "female", "Age": 29, "Fare": 80, "Embarked": "S"}])))`,
 q: [["Why is loading an untrusted pickle dangerous?", "Pickle can execute arbitrary code when loading."],
     ["How do you serve a model?", "Load it once at startup in an API (e.g. FastAPI) and call predict per request."]],
 x: ["Different sklearn versions at save and load time"],
 d: "A fresh session predicts from the saved file.",
 min: 40
},
"w16-6": {
 m: "Finishing the specialization gives you solid theory to back your projects in interviews.",
 e: "Courses 2 and 3: neural networks basics, decision trees, and unsupervised learning plus recommenders.",
 k: ["Advice for applying ML: bias/variance diagnosis", "Decision trees and ensembles", "Recommender systems and RL intro"],
 t: ["Finish Course 2 and Course 3", "Do the labs", "Write your top 5 insights", "Post a LinkedIn update about finishing"],
 q: [["How do you decide what to try next when a model underperforms?", "Diagnose bias vs variance with train/validation errors, then pick fixes that target the actual problem."]],
 x: ["Rushing videos without labs"],
 d: "Specialization complete.",
 min: 360
},
"w16-p": {
 m: "Rebuilding a messy notebook into one clean pipeline is exactly the refactor teams do before production.",
 e: "Turn your week-12 house price work into a single, cross-validated pipeline.",
 k: ["ColumnTransformer + model in one Pipeline", "Cross-validated score with std", "Saved model plus predict script"],
 t: ["Move all cleaning into transformers", "Use TransformedTargetRegressor for the log target", "5-fold CV and report mean ± std", "Save with joblib", "predict.py that reads a CSV and writes predictions", "Compare with your week-12 score"],
 q: [["What did refactoring into a pipeline change?", "No leakage, reproducible results, and one object to deploy."]],
 x: ["Keeping manual steps outside the pipeline"],
 d: "One command reproduces training and predictions.",
 min: 180
},

/* ---------- Week 17: Kaggle and ML capstone ---------- */
"w17-1": {
 m: "Kaggle gives real problems, real leaderboards and a public record of your skill.",
 e: "A competition is a shared exam: everyone gets the same data and is scored on hidden test data.",
 k: ["Read the overview, data and evaluation metric pages first", "Public vs private leaderboard", "Submission format", "Playground Series are beginner-friendly monthly competitions"],
 t: ["Join Titanic or the current Playground Series", "Make a baseline submission in the first hour", "Record the score", "Improve once with a better model and submit again"],
 q: [["What is the difference between public and private leaderboard?", "Public uses part of the test data during the contest; final ranking uses the hidden private part, so overfitting the public board backfires."]],
 x: ["Chasing the public leaderboard"],
 d: "Two submissions made.",
 min: 90
},
"w17-2": {
 m: "Reading top notebooks is the fastest way to learn practical tricks from experts.",
 e: "It's like watching game replays of champions.",
 k: ["Look at feature engineering ideas", "Validation strategy they used", "Ensembling and stacking"],
 t: ["Read the 3 highest-voted notebooks for your competition", "List 5 techniques you didn't know", "Try 2 of them in your own notebook", "Upvote and comment on one"],
 q: [["What's the most useful technique you learned from Kaggle?", "Pick one (e.g. target encoding with folds, or group features) and explain why it helped."]],
 x: ["Copying notebooks without understanding"],
 d: "Two new techniques tried.",
 min: 90
},
"w17-3": {
 m: "Tracking experiments stops you from forgetting what worked. It's the start of MLOps.",
 e: "A lab notebook for models: what you changed, the CV score, and whether it helped.",
 k: ["One row per experiment: date, change, CV mean, CV std, LB score", "Change one thing at a time", "Trust CV over leaderboard"],
 t: ["Create experiments.csv", "Log every run with a small helper function", "Run 8 experiments changing one thing each time", "Plot CV score over experiments"],
 c: String.raw`import csv, datetime
def log_run(change, cv_mean, cv_std, lb=None):
    with open("experiments.csv", "a", newline="") as f:
        csv.writer(f).writerow([datetime.datetime.now().isoformat(timespec="minutes"), change, round(cv_mean, 4), round(cv_std, 4), lb])`,
 q: [["How do you know an improvement is real?", "It beats the previous CV score by more than the CV standard deviation, ideally across several seeds."]],
 x: ["Changing five things at once"],
 d: "8 logged experiments.",
 min: 60
},
"w17-4": {
 m: "A UI turns a model into something people can try, which is what makes a portfolio memorable.",
 e: "Streamlit and Gradio turn a Python script into a web app with sliders, boxes and buttons, no HTML needed.",
 k: ["Streamlit: st.slider, st.selectbox, st.button, st.write", "Gradio: gr.Interface(fn, inputs, outputs)", "Load the model once with caching", "Deploy free on Hugging Face Spaces"],
 t: ["Build a Streamlit app for your Titanic model: inputs for class, sex, age, fare", "Show survival probability with a progress bar", "Try the same in Gradio", "Pick one to keep"],
 c: String.raw`import streamlit as st, joblib, pandas as pd
model = st.cache_resource(lambda: joblib.load("titanic.joblib"))()
pclass = st.selectbox("Class", [1, 2, 3]); sex = st.radio("Sex", ["male", "female"])
age = st.slider("Age", 1, 80, 30); fare = st.slider("Fare", 0, 500, 50)
p = model.predict_proba(pd.DataFrame([dict(Pclass=pclass, Sex=sex, Age=age, Fare=fare, Embarked="S")]))[0, 1]
st.metric("Survival chance", f"{p:.0%}")
# run: streamlit run app.py`,
 q: [["Streamlit vs Gradio?", "Streamlit is better for dashboards and multi-page apps; Gradio is quickest for model demos and integrates tightly with Hugging Face."]],
 x: ["Loading the model on every interaction"],
 d: "Your app runs locally.",
 min: 60
},
"w17-5": {
 m: "A README is your project's sales pitch. Recruiters read it before any code.",
 e: "Tell the story: problem, data, approach, results, how to run, what's next.",
 k: ["One-line summary and a demo link at the top", "Screenshot or GIF", "Results table", "How to run in 3 commands", "Limitations and next steps"],
 t: ["Rewrite the README for your best ML project using that structure", "Add a screenshot of the app", "Add a results table comparing models", "Ask a friend to follow the run steps and fix what confuses them"],
 q: [["What would you improve with more time?", "Name concrete next steps: more data, better features, a different model, monitoring."]],
 x: ["READMEs that are just 'pip install -r requirements.txt'"],
 d: "A friend understood your project from the README alone.",
 min: 45
},
"w17-p": {
 m: "Your Phase 3 capstone: an end-to-end ML app that anyone can use online.",
 e: "Loan-default (or similar) prediction: clean data, pipeline, tuned model, SHAP explanations and a live app on Hugging Face Spaces.",
 k: ["Full pipeline + tuned boosting model", "SHAP explanation per prediction in the UI", "Hosted demo"],
 t: ["Pick a dataset (Kaggle loan default, credit risk or insurance claims)", "Clean, build a pipeline, tune with Optuna", "Evaluate with CV and the right metric", "Streamlit or Gradio app that shows the prediction and top 3 reasons (SHAP)", "Deploy to Hugging Face Spaces", "Polished README with demo link"],
 q: [["Walk me through your end-to-end ML project.", "Problem and metric, data and cleaning, pipeline and model choice, validation, results, explanation, deployment, and what you'd do next."],
     ["How would you monitor it in production?", "Track input data drift, prediction distribution and actual outcomes when they arrive, and retrain when performance drops."]],
 x: ["Deploying without explaining predictions"],
 d: "A live link you can share.",
 min: 360
}
};
