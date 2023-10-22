from flask import Flask
from flask import render_template


app = Flask(__name__)

from constants import API_KEY, MAP_ID


@app.route('/')
def index():
    return render_template('index.html', api_key=API_KEY, map_id=MAP_ID)
