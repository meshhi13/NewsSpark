from flask import Flask
from flask_cors import CORS
from dummy_news import dummy_news

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/news', methods = ['GET'])
def news():
    return dummy_news

app.run(host='0.0.0.0', port=3100, debug=True)