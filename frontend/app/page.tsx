'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface Weather {
  time: string;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
}

interface WeatherResponse {
  city: string;
  country: string;
  weather: Weather;
}

export default function Home() {

  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function buscar() {
    if (!city) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      // Use localhost para evitar problemas de CORS
      const res = await fetch(`http://localhost:8000/weather?city=${city}`);
      if (!res.ok) {
        throw new Error("Cidade não encontrada");
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[90%] h-full m-auto flex items-center justify-center">
        <div className="bg-white rounded-xl p-10">

          <div
            className="bg-white/5 backdrop-blur-[3px] rounded-xl p-10 shadow-lg flex flex-col gap-4 bg-gradient-to-b from-[#6eaafa] via-[#5084f4] to-[#376af1]"
            style={{ padding: "2rem", fontFamily: "sans-serif" }}
          >

            <h1
              style={{ fontFamily: "var(--font-montserrat)" }}
              className="font-bold text-white tracking-[1px] text-4xl flex items-center justify-center"
            >Clima Tempo</h1>

            <div className="flex items-center justify-center gap-2">
              <Input
                type="text"
                placeholder="Digite a Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <Button
                className="cursor-pointer"
                onClick={buscar}
              >
                <Search />
              </Button>
            </div>

            <h2
              style={{ fontFamily: "var(--font-nunito)" }}
              className="text-white text-[18px] text-center">
              Localização</h2>

            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {data && (
              <div style={{ marginTop: "2rem" }}>
                <h2>{data.city}, {data.country}</h2>
                <p>Temperatura: {data.weather.temperature}°C</p>
                <p>Vento: {data.weather.windspeed} km/h</p>
                <p>Direção do vento: {data.weather.winddirection}°</p>
                <p>Hora: {new Date(data.weather.time).toLocaleString()}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// https://www.shutterstock.com/pt/image-illustration/modern-minimal-mobile-app-ui-interface-2132058963?trackingId=bbe44345-dfb6-47a5-ab45-c3f0d8085629
