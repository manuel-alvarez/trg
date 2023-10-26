from flask import Flask, jsonify
from flask import render_template


app = Flask(__name__)

from constants import API_KEY, MAP_ID
from first import get_data as get_first_data
from second import get_data as get_second_data
from fifth import get_data as get_fifth_data
from seventh import get_data as get_seventh_data
from ninth import get_data as get_ninth_data


@app.route('/')
def index():
    return render_template('index.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/uno')
def uno():
    return render_template('first.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/dos')
def dos():
    return render_template('second.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/tres')
def tres():
    return render_template('third.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/cuatro')
def cuatro():
    return render_template('forth.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/cinco')
def cinco():
    return render_template('fifth.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/seis')
def seis():
    return render_template('sixth.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/siete')
def siete():
    return render_template('seventh.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/ocho')
def ocho():
    return render_template('eigth.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/nueve')
def nueve():
    return render_template('ninth.html', api_key=API_KEY, map_id=MAP_ID)


@app.route('/data/uno')
def uno_data():
    return jsonify(get_first_data())


@app.route('/data/dos')
def dos_data():
    return jsonify(get_second_data())


@app.route('/data/cinco')
def cinco_data():
    return jsonify(get_fifth_data())


@app.route('/data/siete')
def siete_data():
    return jsonify(get_seventh_data())


@app.route('/data/nueve')
def nueve_data():
    return jsonify(get_ninth_data())
