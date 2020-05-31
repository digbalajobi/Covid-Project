import pandas as pd


# Improvements: could scrape github for latest version of CSV with Splinter and BS4
# https://github.com/CSSEGISandData/COVID-19/edit/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv
def global_death_df():
    global_data_path="./data/global_deaths.csv"
    global_df= pd.read_csv(global_data_path)
    return global_df;


test = global_death_df()
print(test.head(5))
