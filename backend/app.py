# app.py — Flask server with NLP matching logic

from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk
import string
import os

from faqs import FAQS

# ── DOWNLOAD NLTK DATA AUTOMATICALLY ──────────────────
nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('punkt_tab', quiet=True)

# ── SETUP ──────────────────────────────────────────────
app = Flask(__name__)
CORS(app)

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# ── TEXT PREPROCESSING ─────────────────────────────────
def preprocess(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = nltk.word_tokenize(text)
    tokens = [
        lemmatizer.lemmatize(word)
        for word in tokens
        if word not in stop_words
    ]
    return ' '.join(tokens)

# ── PREPARE FAQ DATA ───────────────────────────────────
faq_questions = [faq['question'] for faq in FAQS]
cleaned_faq_questions = [preprocess(q) for q in faq_questions]
vectorizer = TfidfVectorizer()
faq_matrix = vectorizer.fit_transform(cleaned_faq_questions)

# ── MATCHING FUNCTION ──────────────────────────────────
def find_best_match(user_question):
    cleaned_user_question = preprocess(user_question)
    user_vector = vectorizer.transform([cleaned_user_question])
    similarity_scores = cosine_similarity(user_vector, faq_matrix)
    best_index = similarity_scores.argmax()
    best_score = similarity_scores[0][best_index]

    if best_score < 0.1:
        return "I am sorry, I could not find an answer to that. Please contact our support team at support@company.com"

    return FAQS[best_index]['answer']

# ── FLASK ROUTES ───────────────────────────────────────
@app.route('/')
def home():
    return jsonify({ 'status': 'FAQ Chatbot API is running' })

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json

    if not data or 'question' not in data:
        return jsonify({ 'error': 'No question provided' }), 400

    user_question = data['question'].strip()

    if not user_question:
        return jsonify({ 'error': 'Question cannot be empty' }), 400

    answer = find_best_match(user_question)
    return jsonify({ 'answer': answer })

# ── START SERVER ───────────────────────────────────────
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)