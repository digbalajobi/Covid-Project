from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas as pd
from scripts import load_global
import urllib
import os

# from scripts.dash_choropleth import app as dash_choro
# from werkzeug.wsgi import DispatcherMiddleware
 # from scripts import global_choropleth


app_flask = Flask(__name__)

is_prod =os.environ['PWD'] == "/app"
if(is_prod):
    print("is prod")
    print(os.environ)
    app_flask.config["MAPBOX_KEY"] = os.environ['MAPBOX_KEY']
else:
    print("not prod")
    key = pd.read_csv("./key.csv")
    app_flask.config["MAPBOX_KEY"] = key.columns[0]
    app_flask.config["MONGO_URI"] = "mongodb://localhost:27017/covid_app"
    mongo = PyMongo(app_flask)


@app_flask.route("/set_global_deaths_dict/", methods=['GET'])
def data_to_mongo():
    global_deaths= mongo.db.global_deaths
    data_df = load_global.global_death_df()
    global_deaths.insert_many(data_df.to_dict("records"));


@app_flask.route("/get_global_deaths_json/", methods=['GET'])
def json_data_from_mongo():
    global_deaths= mongo.db.global_deaths
    global_data = global_deaths.find({})
    global_data= pd.DataFrame([str(x) for x in global_data])    
    return global_data.to_json()

@app_flask.route("/get_global_deaths_csv/", methods=['GET'])
def csv_data_from_mongo():
    global_data_path="./data/global_deaths.csv"
    global_df= pd.read_csv(global_data_path)
    global_df=global_df.groupby(['CountryRegion']).sum()
    return global_df.to_csv(index=True)
    

@app_flask.route("/get_global_deaths_display/", methods=['GET'])
def data_html():
    global_deaths= mongo.db.global_deaths
    global_data = global_deaths.find({})
    global_data= pd.DataFrame([str(x) for x in global_data])    
    return global_data.to_html();


@app_flask.route("/get_confirmed_us", methods=['GET'])
def confirmed_us():
    confirmed_us_path="./data/confirmed_US.csv"
    confirmed_us_df= pd.read_csv(confirmed_us_path)
    return confirmed_us_df.to_csv()


@app_flask.route("/get_confirmed_global", methods=['GET'])
def confirmed_global():
    confirmed_global_path="./data/confirmed_global.csv"
    confirmed_global_df= pd.read_csv(confirmed_global_path)
    confirmed_global_df=confirmed_global_df.groupby(['CountryRegion']).sum()
    return confirmed_global_df.to_csv(index=True)
    

@app_flask.route("/get_us_deaths", methods=['GET'])
def deaths_us():
    us_deaths_path="./data/us_deaths.csv"
    us_deaths_df= pd.read_csv(us_deaths_path)
    return us_deaths_df.to_csv()


@app_flask.route("/heatmap/", methods=['GET'])
def heatmap():
    print()
    return render_template("index_heatmap.html", MBKEY = app_flask.config["MAPBOX_KEY"])


@app_flask.route("/linegraph/", methods=['GET'])
def linegraph():
    print()
    return render_template("index_linegraph.html")


# @app_flask.route("/covid_data/", methods=['GET'])
# def covid_data_1():
#     covid_data_path="./data/covid_19_data.csv"
#     covid_df= pd.read_csv(covid_data_path)
    # return covid_df.to_csv()

@app_flask.route("/bubble/", methods=['GET'])
def bubblegraph():
    return render_template("index_bubble.html")

# @app_flask.route("/dash_choro/",methods=['GET'])
# def choro():
@app_flask.route("/dash/")
def dash():
    import plotly
from plotly.graph_objs import *
import pandas as pd
import numpy as np
from flask import Flask
import os
from datetime import datetime as dt
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, State 



mainflename = "http://covidtracking.com/api/states/daily.csv"
globdf = pd.read_csv(mainflename).fillna(0)
rmlst = ['MP','PR','GU','VI'] 
globdf = globdf[~globdf['state'].isin(rmlst)]
globdf['date'] = pd.to_datetime(globdf['date'],format='%Y%m%d')
globdf['ratio'] = (globdf['positive']/(globdf['positive']+globdf['negative'])).fillna(0)  
globdf['negative'] = (globdf['positive']+globdf['negative']).fillna(0)  # make negative total

stdf = pd.pivot_table(globdf,values='death',index='date',columns='state').fillna(0.)
server = app_flask

app_dash = dash.Dash('__name__,',server=server, routes_pathname_prefix='/choro/')
print("ran dash server")

app_dash.layout = html.Div([
    html.Div([
    
    html.Div(id='dd-output-container')
        ], className="row"
    ),
    html.Div([
 
        html.Div([
            dcc.Graph(id='my-graph'),
            html.H4('Date Slider (drag forward to see future dates)'),
            dcc.Slider(
                id='slide',
                min=0,
                max=len(stdf.index)-1,
                value=0,
                
                # len(stdf.index)-1,
            ),
        ], 
        className='twelve columns wind-speed'),
    ], 
    className='row wind-speed-row'),
], 
style={'padding': '0px 10px 15px 10px',
          'marginLeft': 'auto', 'marginRight': 'auto', "width": "600px",
          'boxShadow': '0px 0px 5px 5px rgba(204,204,204,0.4)'})

@app_dash.callback(Output('my-graph','figure'),[Input('slide','value')])
def update_graph(slide):
    tmpdf = pd.pivot_table(globdf,values='death',index='date',columns='state').fillna(0.)
    tmpdf = pd.DataFrame(tmpdf.iloc[slide,:])
    maxval = np.max(tmpdf)

    title_str = 'COVID-19 ' + "Deaths" + ' on ' + str(stdf.index[slide].date())

    tmpdf.columns = ['Del_Per']

    scl = [[0.0, 'aqua'],[0.2, 'red'],[0.4, 'orange'],\
           [0.6, 'darkblue'],[0.8, 'purple'],[1.0, 'black']]

    data_dict = [ dict(
             type='choropleth',
             z = tmpdf['Del_Per'],
             locationmode = 'USA-states',
             locations = tmpdf.index,
             zmin = maxval,
             zmax = 0.,
             colorscale = scl,
             autocolorscale = False,
             showscale=True,
             colorbar = dict(
             autotick = False,
             ),
             font = dict(size=12),

             text = tmpdf.index,
             hovertemplate =  "<b>State: %{text}</b><br>" +
             "Value: %{z:.3f}<br>" +
            "<extra></extra>"
             ,

            ) 
        ]

    layout_dict = dict(
    title = title_str,
    font=dict(size=18),
    geo = dict(
    scope='usa',
    projection=dict( type='albers usa' ),
    showlakes = True,
    lakecolor = 'rgb(255, 255, 255)'),
    width = 600,
    height = 600,
    )

    return {
        'data':data_dict,
        'layout':layout_dict,
    }


# A welcome message to test our server
@app_flask.route('/')
def index():
    return render_template("index_main.html")


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app_flask.run(threaded=True, port=5000)
    app_flask.config['TEMPLATES_AUTO_RELOAD'] = True
