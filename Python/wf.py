import requests

headers_harsh = {
    'x-rapidapi-key': "331ba359cdmshfbe6d85fe4cd5e5p11a46fjsn264a3aff03cd",
    'x-rapidapi-host': "weatherapi-com.p.rapidapi.com"
    }
headers_rishabh = {
    'x-rapidapi-key': "6c197cd1fbmshecc3b0b6c3b8dcdp196a49jsnd6a739d34edb",
    'x-rapidapi-host': "weatherapi-com.p.rapidapi.com"
    }


def querystring(city,days=None,language=None):
    if(days is not None or language is not None):
        querystring = {"q":city,"days":days,"lang":language}
    else:
        querystring = {"q":city}
    response = requests.request("GET", url, headers=headers_rishabh, params=querystring)
    # print(response.text)
    resp=response.json()
    return resp,int(days)

url = "https://weatherapi-com.p.rapidapi.com/forecast.json"
#resp,days=querystring("london",3)



def get_weather_data(response,days):
    try:
        info=displayinfo(response)
        curr_w=display_current_weather(response)
        fore_w=display_forecasted_weather(response,days)
        return info,curr_w,fore_w
    except:
        #print(response["error"]["message"])
        #get_weather_data(response,days)
        return response["error"]["message"]

def displayinfo(response):
    lst=[]
    location=response['location']
    name=location['name']
    country=location['country']
    lst.append("City: "+str(name))
    lst.append("Country: "+str(country))
    #print("Name: ",name,"\ncountry:",country)
    return lst

def display_current_weather(response):
    lst=[]
    current=response["current"]
    temp=current['temp_c']
    wind_speed= current['wind_kph']
    weather= current['condition']['text']
    lst.append("Temp: "+str(temp))
    lst.append("\nWind_Speed: "+str(wind_speed))
    lst.append("\nWeather:"+str(weather))
    return lst

def display_forecasted_weather(response,days):
    f_list=[]
    for day in range(days):
        forecast=response["forecast"]["forecastday"][day]["day"]["condition"]["text"]
        temp=response["forecast"]["forecastday"][day]["day"]["avgtemp_c"]
        #print("Day:",day,"\n","Weather forecast:",forecast,"\nTemperature on that day:",temp)
        f_list.append(("Day"+str(day),"Temperature:"+str(temp),"Weather"+forecast))
    return f_list
