from flask import Flask, render_template, request, redirect, url_for, session
from flask_cors import CORS
from dummy_news import dummy_news
from accounts import sign_up, sign_in

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/news', methods = ['GET'])
def news():
    return dummy_news

@app.route('/account/signup', methods = ["POST"])
def signup():
    name, email, password =  request.get_json()["name"], request.get_json()["email"], request.get_json()["password"] 
    return {"STATE": sign_up(name, email, password)}

@app.route('/account/signin', methods = ["POST"])
def signin():
    email, password = request.get_json()["email"], request.get_json()["password"]
    return {"STATE": sign_in(email, password)}

app.run(host='0.0.0.0', port=3100, debug=True)