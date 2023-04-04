from flask import Flask, render_template
from datetime import datetime
import requests

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/time")
def get_time():
    now = [datetime.now().strftime("%H:%M"), datetime.now().weekday(), datetime.now().strftime("%d.%m.%Y")]
    return now


@app.route("/weather")
def get_weather():
    response = requests.get(
        "https://api.open-meteo.com/v1/forecast?latitude=53.22&longitude=18.14&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")
    print(response.json())
    return response.json()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
