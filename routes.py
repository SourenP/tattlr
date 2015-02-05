from flask import Flask, jsonify, render_template, request
from flask.ext.sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
app.config["DEBUG"] = True  # Only include this while you are testing your app

from models import *

@app.route("/")
def home():
    return "Home Page"

@app.route("/map")
def map():
    return render_template('index.html')


@app.route('/signup', methods=['POST'])
def signup():
    user = User(request.form['username'], request.form['message'])
    db.session.add(user)
    db.session.commit()
    return "Fill this"

if __name__ == "__main__":
    app.run(host="0.0.0.0")
