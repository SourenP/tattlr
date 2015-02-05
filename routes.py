from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
app.config["DEBUG"] = True  # Only include this while you are testing your app

@app.route("/")
def home():
    return "Home Page"

@app.route("/map")
def map():
    return render_template('index.html')

@app.route("/signup")
def signup():
	return render_template('signup.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0")
