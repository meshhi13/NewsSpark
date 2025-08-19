from flask import Flask, render_template, request, redirect, url_for, session
from flask_cors import CORS
from dummy_news import dummy_news
from accounts import sign_up, sign_in
from saved import get_saved, send_saved_article, clear_article
import json

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/news', methods = ['GET'])
def news():
    return dummy_news

@app.route('/account/signup', methods = ["POST"])
def signup():
    name, email, password =  request.get_json()["name"], request.get_json()["email"], request.get_json()["password"] 
    return {"state": sign_up(name, email, password)}

@app.route('/account/signin', methods = ["POST"])
def signin():
    email, password = request.get_json()["email"], request.get_json()["password"]
    return {"state": sign_in(email, password)}

@app.route('/api/saved/<email>', methods = ['GET'])
def saved(email):
    return {"articles": get_saved(email)}

@app.route('/api/saved/<email>', methods = ['POST'])
def save_article(email):
    article = request.get_json()["article"]
    return send_saved_article(email, article)

@app.route('/api/saved/clear/<email>', methods = ['POST'])
def clear_saved_articles(email):
    return clear_article(email)


app.run(host='0.0.0.0', port=3100, debug=True)