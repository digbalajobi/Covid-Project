from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas as pd
from scripts import load_global


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/covid_app"
mongo = PyMongo(app)





@app.route("/set_global_deaths_json/", methods=['GET'])
def data_json():
    global_deaths= mongo.db.global_deaths
    data_df = load_global.global_death_df()
    # global_deaths.update({}, data_df.to_dict(), upsert=True)
    # print(data_df.values.tolist())
    global_deaths.insert_many(data_df.to_dict("records"))
    return data_df.to_json();




@app.route("/get_global_deaths_html/", methods=['GET'])
def data_html():
    data_df = load_global.global_death_df()
    return data_df.to_html();


# @app.route('/getmsg/', methods=['GET'])
# def respond():
#     # Retrieve the name from url parameter
#     name = request.args.get("name", None)
#     # For debugging
#     print(f"got name {name}")
#     response = {}
#     # Check if user sent a name at all
#     if not name:
#         response["ERROR"] = "no name found, please send a name."
#     # Check if the user entered a number not a name
#     elif str(name).isdigit():
#         response["ERROR"] = "name can't be numeric."
#     # Now the user entered a valid name
#     else:
#         response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"
#     # Return the response in json format
#     return jsonify(response)




# @app.route('/post/', methods=['POST'])
# def post_something():
#     param = request.form.get('name')
#     print(param)
#     # You can add the test cases you made in the previous function, but in our case here you are just testing the POST functionality
#     if param:
#         return jsonify({
#             "Message": f"Welcome {name} to our awesome platform!!",
#             # Add this option to distinct the POST request
#             "METHOD" : "POST"
#         })
#     else:
#         return jsonify({
#             "ERROR": "no name found, please send a name."
#         })

# A welcome message to test our server
@app.route('/')
def index():
    return "<h1>Covid-19 Dashboard in Dev</h1>"

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
