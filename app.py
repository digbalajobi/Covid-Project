from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas as pd
from scripts import load_global
import urllib
import os

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/covid_app"
mongo = PyMongo(app)


# need to just use postgres 

is_prod =os.environ['PWD'] == "/app"
if(is_prod):
    print("is prod")
    app.config["MAPBOX_KEY"] = os.environ['MAPBOX_KEY']
#     app.config["MONGO_URI"] = urllib.parse.quote_plus('')
#         # os.environ['MLAB_URI'])
#     mongo = PyMongo(app)
else:
    print("not prod")
    key = pd.read_csv("./key.csv")
    app.config["MAPBOX_KEY"] = key.columns[0]
#     print(key.columns[0])
 
    




@app.route("/set_global_deaths_dict/", methods=['GET'])
def data_to_mongo():
    global_deaths= mongo.db.global_deaths
    data_df = load_global.global_death_df()
    global_deaths.insert_many(data_df.to_dict("records"));


@app.route("/get_global_deaths_json/", methods=['GET'])
def json_data_from_mongo():
    # ASSUMING THAT THE DATA HAS ALREADY BEEN LOADED INTO MONGO
    global_deaths= mongo.db.global_deaths
    global_data = global_deaths.find({})
    global_data= pd.DataFrame([str(x) for x in global_data])    
    return global_data.to_json()

@app.route("/get_global_deaths_csv/", methods=['GET'])
def csv_data_from_mongo():
    # ASSUMING THAT THE DATA HAS ALREADY BEEN LOADED INTO MONGO
    global_deaths= mongo.db.global_deaths
    global_data = global_deaths.find({})
    global_data= pd.DataFrame([str(x) for x in global_data])    
    return global_data.to_csv(index=False)

@app.route("/get_global_deaths_display/", methods=['GET'])
def data_html():
    global_deaths= mongo.db.global_deaths
    global_data = global_deaths.find({})
    global_data= pd.DataFrame([str(x) for x in global_data])    
    return global_data.to_html();


@app.route("/get_confirmed_us", methods=['GET'])
def confirmed_us():
    confirmed_us_path="./data/confirmed_US.csv"
    confirmed_us_df= pd.read_csv(confirmed_us_path)
    return confirmed_us_df.to_csv()


@app.route("/heatmap/", methods=['GET'])
def heatmap():
    print()
    return render_template("index_heatmap.html", MBKEY = app.config["MAPBOX_KEY"])


# A welcome message to test our server
@app.route('/')
def index():
    return "<h1>Covid-19 Dashboard in Dev</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)