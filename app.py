from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas as pd
from scripts import load_global

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/covid_app"
mongo = PyMongo(app)



@app.route("/set_global_deaths_dict/", methods=['GET'])
def data_to_mongo():
    global_deaths= mongo.db.global_deaths
    data_df = load_global.global_death_df()
    global_deaths.insert_many(data_df.to_dict("records"));


# needs to pull from PyMongo
@app.route("/get_global_deaths_json/", methods=['GET'])
def data_from_mongo():
    data_df = load_global.global_death_df()
    # global_deaths= mongo.db.global_deaths
    # global_deaths.find_all()
    return data_df.to_json();




@app.route("/get_global_deaths_display/", methods=['GET'])
def data_html():
    data_df = load_global.global_death_df()
    return data_df.to_html();



# A welcome message to test our server
@app.route('/')
def index():
    return "<h1>Covid-19 Dashboard in Dev</h1>"

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
