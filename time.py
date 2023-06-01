from flask import Flask, render_template, request
from datetime import datetime
import requests
import logging

app = Flask(__name__)
logging.basicConfig(filename='example.log', level=logging.INFO,
                     format='%(asctime)s:%(levelname)s:%(message)s')

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/log', methods=['POST'])
def log():
    log_data = request.get_json()
    print(log_data)
    logger.info(log_data.get('message'))
    return 'OK'

@app.route("/weather")
def get_weather():
#     response = requests.get(
#         "https://api.open-meteo.com/v1/forecast?latitude=53.22&longitude=18.14&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")
    response = requests.get(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aleksandrowo%2Cdobrcz?unitGroup=metric&key=CA9MXP5FRAKJLRMPQ8L6G8T2B&contentType=json")
#     logging.info(response.json())
    return response.json()
# CA9MXP5FRAKJLRMPQ8L6G8T2B
# L47MMDSK79SLHF4F38VSZN2G7
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
