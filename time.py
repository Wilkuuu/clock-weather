from flask import Flask, render_template
from datetime import datetime
import time

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/time")
def get_time():
    now = datetime.now().strftime("%H:%M:%S")
    return now

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
