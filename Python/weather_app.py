import requests
from flask import Flask, request, url_for ,render_template
import wf
app = Flask(__name__,template_folder=r'C:\Users\HARSH TYAGI\Australia\templates')
@app.route('/')
def home():
    return render_template('indexfile.html') 
@app.route("/prediction", methods=["GET", "POST"]) 
def get_data():
    if(request.method=="POST"):
        try:
            city,days = request.form.values()
            response,days=wf.querystring(city,days)
            city_name,country=wf.get_weather_data(response,days)[0]
            curr_temp,wind_speed,curr_weather=wf.get_weather_data(response,days)[1]
            forecasted_info=wf.get_weather_data(response,days)[2]
            render=render_template('indexfile.html',city_name=city_name,country=country,curr_temp=curr_temp,curr_weather=curr_weather,wind_speed=wind_speed,fw=forecasted_info)
        except:
            city,days = request.form.values()
            response,days=wf.querystring(city,days)
            err=wf.get_weather_data(response,days)
            render=render_template('error.html',error_msg=err)
    else:
        render=render_template('indexfile.html')
    
    return render
if __name__ == "__main__":
    app.run()