import dotenv
from flask import Flask, render_template
from dotenv import load_dotenv
from datetime import datetime
import os
import requests

app = Flask(__name__)


@app.route("/")
def index():
    print(os.getenv('API_KEY'))
    return render_template("index.html")


@app.route("/weather")
def get_weather():
#     response = requests.get(
#         "https://api.open-meteo.com/v1/forecast?latitude=53.22&longitude=18.14&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")
    load_dotenv()
    response = requests.get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aleksandrowo%2Cdobrcz?unitGroup=metric&key=" + os.getenv('API_KEY') + "&contentType=json")
    return response.json()
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
