**Covid-19 Dashboard**
Deborah, Joon, Brent, Joseph

**Data Sources:** 
https://www.programmableweb.com/api/covid-19-johns-hopkins-csse-data-unofficial
https://github.com/CSSEGISandData/COVID-19

**Visualizations:** 
Bar Graph
Heatmap
Choropleth
Markers 

**Intent:**
Show the geographic and longitudinal spread of the covid-19 novel coronavirus. Ideally end result would be a visualization similar to a weather map, that showed the movement and spread of covid over time. 

**Instructions**
*For local development, after pulling, run the local setup script in your Git Bash Terminal with '**source ./scripts/local_init.sh**'*


**Routes:**  
- **/set_global_deaths_json/**:
    reads JSON from CSV, sets dictionary obj in Mongo **^LOCAL MONGO^**
- **/get_global_deaths_json/**:
    displays JSON, converts from mongo Obj, **^LOCAL MONGO^**
- **/get_global_deaths_csv/**:
    displays CSV, converts from mongo Obj, **^LOCAL MONGO^**
- **/get_global_deaths_display/**:
    displays HTML table from Mongo Obj **^LOCAL MONGO^**
- **/heatmap/**:
    display heatmap of covid deaths on *Date* by *Dataset*
- **/line_graph/**:
    displays time series deaths by country via dropdown


**Bugs**
- Heroku mLab creates connection but refuses to authenticate.
