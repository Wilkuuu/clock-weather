import dotenv
from flask import Flask, render_template
from dotenv import load_dotenv
from datetime import datetime
import os
import requests
from pathlib import Path
dotenv_path = Path('/home/wilk/Desktop/clock-weather/.env')
load_dotenv(dotenv_path=dotenv_path)


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/weather")
def get_weather():
#     response = requests.get(
#         "https://api.open-meteo.com/v1/forecast?latitude=53.22&longitude=18.14&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")
    response = requests.get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aleksandrowo%2Cdobrcz?unitGroup=metric&key=" + os.getenv('API_KEY') + "&contentType=json")
    return response.json()
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
