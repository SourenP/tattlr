from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
app.config["DEBUG"] = True  # Only include this while you are testing your app

@app.route("/")
def home():
    return "Home Page"

@app.route("/map")
def map():
    return render_template('index.html')

@app.route('/echo/', methods=['GET'])
def echo():
    ret_data = {"value": request.args.get('echoValue')}
    return jsonify(ret_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
