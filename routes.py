from flask import Flask, jsonify, render_template, request
import os, datetime

app = Flask(__name__)
app.config["DEBUG"] = True  # Only include this while you are testing your app`

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    user = User(request.form['username'], request.form['message'])
    db.session.add(user)
    db.session.commit()
    return "Fill this"

if __name__ == "__main__":
    app.run(host="0.0.0.0")
