/* Phase 6: NLP & Speech (Weeks 30-32) */
window.LESSONS = window.LESSONS || {};
Object.assign(window.LESSONS, {

/* ---------- Week 30: Classic NLP ---------- */
"w30-1": {
 m: "Text preprocessing decides what your model sees. The same ideas live on inside LLM tokenisers.",
 e: "Tokenising chops text into pieces. Stemming crudely cuts word endings (running to run). Lemmatising uses a dictionary to find the base form (better to good).",
 k: ["Word vs subword vs character tokens", "Stemming (Porter) vs lemmatisation (spaCy)", "Stop words: very common words", "Lowercasing, punctuation, numbers", "Modern transformers need little of this"],
 t: ["Tokenise 5 sentences with str.split, NLTK and spaCy; compare", "Stem and lemmatise a word list and compare", "Remove stop words and see what's left", "Note one case where removing stop words would hurt (e.g. 'not good')"],
 c: String.raw`import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp("The movies were not better than the books we were reading.")
print([(t.text, t.lemma_, t.is_stop) for t in doc])`,
 q: [["Stemming vs lemmatisation?", "Stemming chops suffixes by rules and can produce non-words; lemmatisation returns the dictionary base form using grammar."],
     ["When should you not remove stop words?", "When they carry meaning, e.g. negation in sentiment ('not good') or for transformer models."]],
 x: ["Removing 'not' before sentiment analysis"],
 d: "Comparison table of tokenisers and normalisers.",
 min: 45
},
"w30-2": {
 m: "Bag of words and TF-IDF are fast, strong baselines that still beat fancy models on many small text tasks.",
 e: "Bag of words counts each word. TF-IDF also asks how rare the word is across all documents, so 'the' counts little and 'refund' counts a lot.",
 k: ["CountVectorizer and TfidfVectorizer", "n-grams (1,2) capture phrases", "min_df and max_df to drop rare or common words", "Sparse matrices", "Cosine similarity between documents"],
 t: ["Vectorise 10 short product reviews with CountVectorizer", "Do the same with TF-IDF and show top words per document", "Add bigrams", "Find the most similar pair of reviews with cosine similarity"],
 c: String.raw`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
docs = ["battery life is great", "great camera, poor battery", "delivery was late", "late delivery and broken box"]
tf = TfidfVectorizer(ngram_range=(1, 2)); X = tf.fit_transform(docs)
print(cosine_similarity(X).round(2))`,
 q: [["What is TF-IDF?", "Term frequency times inverse document frequency: a word's weight rises with its count in a document and falls with how many documents contain it."],
     ["Limitations of bag of words?", "Ignores word order and meaning; synonyms are unrelated and vocabularies get huge."]],
 x: ["Fitting the vectoriser on test data"],
 d: "You found the most similar reviews.",
 min: 45
},
"w30-3": {
 m: "Extracting names, places and organisations from text is a common production NLP task.",
 e: "NER highlights the 'who, where, which company' in a sentence. POS tagging labels each word as noun, verb and so on.",
 k: ["spaCy pipelines: tokenizer, tagger, parser, NER", "Entity labels: PERSON, ORG, GPE, DATE, MONEY", "displacy for visualisation", "Rule-based matchers for custom patterns"],
 t: ["Run spaCy NER on 5 news headlines", "Visualise with displacy", "Extract all company names and amounts from a funding news article", "Add a custom pattern with EntityRuler for 'UPI' or product names"],
 c: String.raw`import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp("Zepto raised $350 million from Motilal Oswal in Mumbai in August 2025.")
print([(e.text, e.label_) for e in doc.ents])`,
 q: [["What is named entity recognition?", "Finding and classifying spans of text into categories like person, organisation, location, date or money."],
     ["How would you build NER for a new domain (e.g. medical)?", "Label domain examples and fine-tune a transformer NER model, or use an LLM for extraction with validation."]],
 x: ["Expecting a general model to know domain-specific entities"],
 d: "Entities extracted from real headlines.",
 min: 45
},
"w30-4": {
 m: "Sentiment analysis is the classic applied NLP task, used for reviews, social media and support tickets.",
 e: "Teach a model to read a review and say positive or negative, using TF-IDF features and logistic regression.",
 k: ["Labelled dataset (IMDB, Amazon or Flipkart reviews)", "TF-IDF + LogisticRegression pipeline", "Most positive and negative words from coefficients", "Error analysis on sarcasm and negation"],
 t: ["Load IMDB reviews or a Flipkart reviews dataset", "Train a TF-IDF + LogisticRegression pipeline", "Report F1 on the test set", "Print the top 15 positive and negative words", "Look at 10 wrong predictions and categorise why"],
 c: String.raw`from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np
pipe = make_pipeline(TfidfVectorizer(ngram_range=(1, 2), min_df=2), LogisticRegression(max_iter=2000)).fit(X_tr, y_tr)
vocab = pipe[0].get_feature_names_out(); coef = pipe[1].coef_[0]
print(vocab[np.argsort(coef)[-15:]], vocab[np.argsort(coef)[:15]])`,
 q: [["Why is sarcasm hard for sentiment models?", "The literal words are positive but the meaning is negative; it needs context and world knowledge."]],
 x: ["Ignoring neutral or mixed reviews"],
 d: "F1 reported and error categories listed.",
 min: 60
},
"w30-5": {
 m: "Regex is the Swiss Army knife for cleaning text and extracting structured bits like phone numbers and emails.",
 e: "A regex is a search pattern with wildcards, like 'any 10 digits starting with 6-9' for Indian mobile numbers.",
 k: ["Character classes \\d \\w \\s and [abc]", "Quantifiers * + ? {n,m}", "Groups and named groups", "re.findall, re.sub, re.compile", "regex101.com to test"],
 t: ["Extract Indian mobile numbers from messy text", "Extract emails and URLs", "Remove HTML tags and extra spaces", "Mask PAN-like patterns in text", "Test each pattern on regex101"],
 c: String.raw`import re
text = "Call 9876543210 or +91 91234 56789, mail kamal@test.in, visit https://x.ai <b>now</b>"
print(re.findall(r"(?:\+91[\s-]?)?[6-9]\d{4}\s?\d{5}", text))
print(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", text))
print(re.sub(r"<[^>]+>", "", text))`,
 q: [["Greedy vs lazy matching?", ".* matches as much as possible; .*? matches as little as possible."]],
 x: ["Parsing full HTML with regex instead of a parser"],
 d: "Five working patterns.",
 min: 40
},
"w30-p": {
 m: "A product-review sentiment analyser with error analysis is a clear, business-relevant NLP project.",
 e: "Classify reviews as positive, negative or neutral and show which phrases drive each prediction.",
 k: ["3-class sentiment", "TF-IDF baseline", "Explain predictions with top n-grams", "Streamlit app"],
 t: ["Use a Flipkart or Amazon reviews dataset with star ratings (map 1-2 negative, 3 neutral, 4-5 positive)", "Train TF-IDF + LogisticRegression", "Report per-class F1 and confusion matrix", "Show which words drove each prediction in the app", "README with error analysis"],
 q: [["How would a transformer compare?", "Usually better on nuance and negation, at higher cost; week 31 is where you test that."]],
 x: ["Treating 3-star reviews as positive or negative without thought"],
 d: "App explains each prediction.",
 min: 180
},

/* ---------- Week 31: Hugging Face ecosystem ---------- */
"w31-1": {
 m: "Hugging Face is the GitHub of AI models. pipeline() gets you a working model in one line.",
 e: "A pipeline bundles a tokenizer and a pretrained model for one task, so you just pass text in and get answers out.",
 k: ["pipeline(task, model=...)", "Tasks: sentiment, NER, summarisation, translation, zero-shot, question answering", "Choosing models on the Hub by downloads and task", "Running on GPU with device=0"],
 t: ["Run 6 different pipelines on your own text", "Try zero-shot classification with custom labels", "Try an Indic model from the Hub (e.g. an IndicBERT or IndicTrans model)", "Time CPU vs GPU"],
 c: String.raw`from transformers import pipeline
zs = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
print(zs("My UPI payment failed but money was debited", candidate_labels=["payments", "delivery", "account", "refund"]))`,
 q: [["What is zero-shot classification?", "Classifying into labels the model wasn't explicitly trained on, often using natural-language inference or embeddings."]],
 x: ["Using a huge model when a small one is enough"],
 d: "Six pipelines tried on your text.",
 min: 45
},
"w31-2": {
 m: "Tokenisers are how text becomes numbers for transformers. Token counts drive LLM cost and limits.",
 e: "Subword tokenisers split rare words into familiar pieces ('unhappiness' becomes 'un', 'happi', 'ness'), so any word can be represented.",
 k: ["BPE (GPT), WordPiece (BERT), SentencePiece (T5, many LLMs)", "AutoTokenizer and AutoModel", "input_ids, attention_mask", "Padding and truncation", "Non-English text often uses more tokens"],
 t: ["Tokenise the same English and Telugu sentence with 3 tokenisers", "Compare token counts", "Decode tokens back to text", "Run AutoModel and inspect last_hidden_state shape"],
 c: String.raw`from transformers import AutoTokenizer
for name in ("bert-base-uncased", "gpt2", "google/mt5-small"):
    tok = AutoTokenizer.from_pretrained(name)
    for s in ("I love Hyderabadi biryani", "నాకు హైదరాబాద్ బిర్యానీ ఇష్టం"):
        print(name, len(tok(s)["input_ids"]), tok.tokenize(s)[:8])`,
 q: [["Why do LLMs use subword tokenisation?", "It balances a manageable vocabulary with the ability to represent any word, including rare and new words."],
     ["Why can Telugu text cost more tokens?", "Tokenisers trained mostly on English split other scripts into many small pieces."]],
 x: ["Using a tokenizer that doesn't match the model"],
 d: "Token count comparison table.",
 min: 45
},
"w31-3": {
 m: "Fine-tuning a pretrained transformer on your own labels is the standard way to beat classic NLP baselines.",
 e: "Take a model that already understands language and give it a few thousand labelled examples of your task.",
 k: ["AutoModelForSequenceClassification", "Trainer and TrainingArguments", "Learning rate 2e-5 to 5e-5, 2-4 epochs", "compute_metrics for F1", "Use a GPU (Colab)"],
 t: ["Fine-tune DistilBERT on your review sentiment data", "Compare F1 with your TF-IDF model", "Try 2 learning rates", "Save the model locally"],
 c: String.raw`from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
model = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=3)
args = TrainingArguments("out", learning_rate=3e-5, num_train_epochs=3, per_device_train_batch_size=16, eval_strategy="epoch")
Trainer(model=model, args=args, train_dataset=train_ds, eval_dataset=val_ds, compute_metrics=metrics).train()`,
 q: [["How do you fine-tune BERT for classification?", "Add a classification head on the [CLS] representation and train the whole model with a small learning rate on labelled data."],
     ["Why use a small learning rate?", "Large updates destroy the pretrained knowledge (catastrophic forgetting)."]],
 x: ["Too many epochs overfitting small data"],
 d: "DistilBERT beats your TF-IDF baseline.",
 min: 90
},
"w31-4": {
 m: "The datasets and evaluate libraries make loading, processing and scoring data standard and fast.",
 e: "datasets loads huge datasets efficiently and lets you map processing over them. evaluate gives trusted metric code.",
 k: ["load_dataset from the Hub or local CSV", "Dataset.map with batched=True", "train_test_split", "evaluate.load('f1')"],
 t: ["Load a dataset from the Hub", "Load your own CSV as a Dataset", "Tokenise with map(batched=True)", "Compute F1 and accuracy with evaluate"],
 c: String.raw`from datasets import load_dataset
import evaluate
ds = load_dataset("csv", data_files="reviews.csv")["train"].train_test_split(0.2, seed=0)
ds = ds.map(lambda b: tok(b["text"], truncation=True), batched=True)
f1 = evaluate.load("f1")`,
 q: [["Why use datasets instead of pandas for training?", "Memory-mapped Arrow storage handles data bigger than RAM and integrates with tokenisers and Trainer."]],
 x: ["Tokenising row by row without batched=True"],
 d: "Your pipeline uses datasets and evaluate.",
 min: 45
},
"w31-5": {
 m: "Publishing on the Hub makes your model usable by anyone and adds a public artefact to your profile.",
 e: "Push your model with a model card so others can load it with one line.",
 k: ["huggingface-cli login", "model.push_to_hub and tokenizer.push_to_hub", "Model card: data, metrics, limitations", "Hosted inference widget"],
 t: ["Create a Hugging Face account and token", "Push your fine-tuned model", "Write a model card", "Load it from the Hub in a fresh notebook"],
 q: [["What goes in a model card?", "Intended use, training data, evaluation results, limitations, biases and licence."]],
 x: ["Pushing with no model card"],
 d: "Your model loads from the Hub by name.",
 min: 30
},
"w31-p": {
 m: "A fine-tuned, published classifier for tickets or news shows real industry-style NLP.",
 e: "Fine-tune a transformer to route support tickets or classify news topics, then publish it.",
 k: ["Real or realistic labelled data", "Fine-tuning with Trainer", "Model card and demo"],
 t: ["Pick data: AG News, or a customer support ticket dataset from Kaggle", "Fine-tune DistilBERT or a multilingual model", "Report per-class F1", "Push to the Hub with a model card", "Gradio Space demo"],
 q: [["How would this reduce support costs?", "Automatically routes tickets to the right team, cutting manual triage time; low-confidence tickets go to a human."]],
 x: ["No confidence threshold for uncertain predictions"],
 d: "Published model plus live demo.",
 min: 180
},

/* ---------- Week 32: Embeddings, semantic search, speech ---------- */
"w32-1": {
 m: "Sentence embeddings are the foundation of semantic search and RAG, the most common LLM app pattern.",
 e: "A sentence embedding turns a whole sentence into one vector, so sentences with similar meaning land close together even if they share no words.",
 k: ["sentence-transformers library", "all-MiniLM-L6-v2 (fast) and multilingual models", "Normalised embeddings and dot product", "Bi-encoder vs cross-encoder"],
 t: ["Embed 20 FAQ questions", "Embed a user query and find the closest FAQ", "Test paraphrases with no shared words", "Compare with TF-IDF on the same queries"],
 c: String.raw`from sentence_transformers import SentenceTransformer, util
m = SentenceTransformer("all-MiniLM-L6-v2")
faqs = ["How do I reset my password?", "What is the refund policy?", "How to track my order?"]
emb = m.encode(faqs, normalize_embeddings=True)
q = m.encode("I forgot my login", normalize_embeddings=True)
print(faqs[util.cos_sim(q, emb).argmax()])`,
 q: [["Bi-encoder vs cross-encoder?", "Bi-encoders embed query and document separately (fast, for retrieval); cross-encoders read them together (accurate, for re-ranking)."]],
 x: ["Comparing unnormalised embeddings with dot product"],
 d: "Paraphrased queries find the right FAQ.",
 min: 45
},
"w32-2": {
 m: "Semantic search is how chatbots find the right document before answering.",
 e: "Search by meaning: embed all documents once, embed the query, return the nearest ones.",
 k: ["Index once, query many times", "Top-k retrieval", "Cosine similarity", "Evaluation: recall@k, MRR"],
 t: ["Embed 500+ documents (e.g. news snippets or Wikipedia paragraphs)", "Build a search function returning top 5", "Create 20 test queries with the correct document", "Measure recall@5"],
 q: [["How do you evaluate a search system?", "Build a set of queries with known relevant documents and measure recall@k, precision@k or MRR."],
     ["What is MRR?", "Mean reciprocal rank: the average of 1/rank of the first relevant result."]],
 x: ["No evaluation set, just eyeballing"],
 d: "recall@5 reported.",
 min: 60
},
"w32-3": {
 m: "Vector indexes make similarity search fast over millions of items, the engine inside every vector database.",
 e: "Brute-force search compares the query with every vector. FAISS builds a smart index so it only checks likely neighbours.",
 k: ["IndexFlatIP (exact)", "IVF and HNSW (approximate)", "Trade-off: speed vs recall", "Saving and loading indexes"],
 t: ["Build an exact FAISS index on your embeddings", "Build an HNSW index", "Compare speed and recall@5 on 100k random vectors", "Save and reload the index"],
 c: String.raw`import faiss, numpy as np
d = 384; xb = np.random.rand(100_000, d).astype("float32"); faiss.normalize_L2(xb)
flat = faiss.IndexFlatIP(d); flat.add(xb)
hnsw = faiss.IndexHNSWFlat(d, 32); hnsw.add(xb)
q = xb[:5]
print(flat.search(q, 5)[1][0], hnsw.search(q, 5)[1][0])`,
 q: [["What is approximate nearest neighbour search?", "Finding very likely nearest neighbours much faster than exact search, accepting a small loss in recall."],
     ["How does HNSW work?", "A layered graph where search starts at a coarse layer and walks to closer neighbours through finer layers."]],
 x: ["Mixing inner product and L2 without normalising"],
 d: "Speed vs recall comparison.",
 min: 50
},
"w32-4": {
 m: "India has 22 official languages. Multilingual models open products to hundreds of millions more users.",
 e: "Multilingual models learn many languages in one shared space, so a Telugu question can match an English answer.",
 k: ["Multilingual embedding models (e.g. paraphrase-multilingual, LaBSE, BGE-M3)", "IndicBERT, IndicTrans2 from AI4Bharat", "Transliteration vs translation", "Code-mixed text (Tenglish, Hinglish)"],
 t: ["Embed Telugu and English versions of 10 sentences and check they match", "Translate 5 sentences with IndicTrans2 or an API", "Test a code-mixed query like 'order cancel ela cheyali'", "Note where models struggle"],
 c: String.raw`from sentence_transformers import SentenceTransformer, util
m = SentenceTransformer("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
en, te = m.encode(["Where is the railway station?", "రైల్వే స్టేషన్ ఎక్కడ ఉంది?"])
print(util.cos_sim(en, te))`,
 q: [["How do you build search for Indian languages?", "Use a multilingual embedding model, handle transliteration and code-mixing, and evaluate with native-language queries."]],
 x: ["Only testing in English"],
 d: "Cross-language matching works.",
 min: 50
},
"w32-5": {
 m: "Voice is how many Indians prefer to use technology. Speech-to-text and text-to-speech complete your NLP toolkit.",
 e: "Whisper listens to audio and writes the words. Text-to-speech does the reverse.",
 k: ["Whisper model sizes (tiny to large)", "Language detection and translation to English", "faster-whisper for speed", "TTS options: open models or cloud APIs", "Audio sample rate (16 kHz)"],
 t: ["Transcribe an English and a Telugu voice note with Whisper", "Compare tiny vs small models on accuracy and speed", "Translate Telugu speech to English text", "Generate speech from text with a TTS model"],
 c: String.raw`import whisper
model = whisper.load_model("small")
print(model.transcribe("voice_note_te.m4a", language="te")["text"])
print(model.transcribe("voice_note_te.m4a", task="translate")["text"])`,
 q: [["How does Whisper work?", "An encoder-decoder transformer trained on 680k hours of multilingual audio to predict transcripts."],
     ["What is word error rate?", "The percentage of word substitutions, deletions and insertions compared to a reference transcript."]],
 x: ["Using the largest model when a small one meets the need"],
 d: "Transcripts in two languages.",
 min: 50
},
"w32-p": {
 m: "Your Phase 6 capstone: multilingual semantic search with voice, perfect for Indian users.",
 e: "Ask a question by voice in Telugu or English, and get the most relevant documents back.",
 k: ["Whisper for speech input", "Multilingual embeddings + FAISS", "Gradio app with microphone input"],
 t: ["Collect 200+ documents in Telugu and English (government schemes, FAQs, news)", "Embed with a multilingual model and index with FAISS", "Add voice queries through Whisper", "Evaluate recall@5 with 20 test questions in both languages", "Deploy a Gradio Space"],
 q: [["What was the hardest part?", "Likely code-mixed queries and Telugu speech accuracy; explain how you measured and improved it."]],
 x: ["Not testing with real native speakers"],
 d: "Voice search demo works in both languages.",
 min: 300
}
});
