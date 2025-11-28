from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite qualquer origem (frontend)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Busca Latitude e Longitude pelo Nome da Cidade
def get_lat_lon(city: str):
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1"
    r = requests.get(url)

    if r.status_code != 200:
        raise HTTPException(status_code=500, detail="Erro ao consultar geocoding")

    data = r.json()

    # Caso não encontre Resultado
    if "results" not in data:
        raise HTTPException(status_code=404, detail="Cidade não encontrada")

    result = data["results"][0]

    return {
        "city": result["name"],
        "country": result.get("country", ""),
        "lat": result["latitude"],
        "lon": result["longitude"]
    }

# Busca o Clima pela Latitude e Longitude
def get_weather(lat, lon):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    r = requests.get(url)

    if r.status_code != 200:
        raise HTTPException(status_code=500, detail="Erro ao consultar clima")

    data = r.json()
    return data["current_weather"]

# Rota principal que recebe a cidade e retorna o clima
@app.get("/weather")
def weather(city: str):
    location = get_lat_lon(city)
    weather = get_weather(location["lat"], location["lon"])
    return {
        "city": location["city"],
        "country": location["country"],
        "weather": weather
    }

#rodarbackend python -m uvicorn main:app --reload