'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, SunSnow } from "lucide-react";
import { useEffect, useState } from "react";
import Cards from "./conteudos/Cards";

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

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  async function buscar() {
    if (!city) return;

    setLoading(true);
    setError("");
    setData(null);

    try {

      const res = await fetch(`http://localhost:8000/weather?city=${city}`);
      if (!res.ok) {
        throw new Error("Localização não encontratada, tente novamente...");
      }
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[44%] h-full m-auto flex items-center justify-center">
        <div className="bg-[image:var(--bg-clima2)] rounded-4xl">

          <div
            className="rounded-xl p-10 shadow-lg flex flex-col gap-1"
            style={{ fontFamily: "sans-serif" }}
          >

            <h1
              style={{ fontFamily: "var(--font-montserrat)" }}
              className="font-semibold text-white text-2xl md:text-3xl flex items-center justify-center "
            >
              Clima Tempo
            </h1>
            <p className="flex items-center justify-center gap-2 mb-2 text-center text-[15px] text-[#757295]"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              <SunSnow size={20} />
              Temperatura |
              {!data && <span>---</span>}
              {data && (
                <p>{data.weather.temperature}°C</p>
              )}
            </p>

            <div className="flex items-center justify-center border-2 border-[#757295] ounded-2xl rounded-2xl bg-[#343062]">
              <Input
                type="text"
                placeholder="Digite sua Localização"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none border-none focus:outline-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-[#757295] font-medium"
                style={{ fontFamily: 'var(--font-nunito' }}
              />

              <Button
                className="cursor-pointer bg-transparent hover:bg-transparent group"
                onClick={buscar}
              >
                <Search
                  className="transform transition-transform duration-200 group-hover:scale-130"
                />
              </Button>
            </div>

            <h2
              style={{ fontFamily: "var(--font-nunito)" }}
              className="text-[#757295] text-[14px] text-center flex items-center justify-center gap-1">
              <MapPin size={16} />
              Localização
            </h2>

            {!data && <span className="text-center text-[#757295]">----</span>}
            {data && (
              <h2
                className="text-white text-center var(--font-montserrat)"
              >
                {data.city}, {data.country}
              </h2>
            )}

            {loading &&
              <p className="text-emerald-400">
                Carregando...
              </p>
            }
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 justify-items-center">
            <Cards
              icon="/cloudy.png"
            >
              <div className="flex flex-col w-full p-1">
                <h2
                  style={{ fontFamily: "var(--font-nunito)" }}
                  className="text-white text-[14px]"
                >
                  Temperatura
                </h2>
                {!data && <span className="text-center text-white">----</span>}
                {data && (
                  <p
                    className="text-white flex flex-col"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {data.weather.temperature}°C
                  </p>
                )}
              </div>
            </Cards>

            <Cards
              icon="/wind.png"
            >
              <div className="flex flex-col w-full p-1">
                <h2
                  style={{ fontFamily: "var(--font-nunito)" }}
                  className="text-white text-[14px]"
                >
                  Vento
                </h2>
                {!data && <span className="text-center text-white">----</span>}
                {data && (
                  <p
                    className="text-white flex flex-col"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {data.weather.windspeed} km/h
                  </p>
                )}
              </div>
            </Cards>

            <Cards
              icon="/sky.png"
            >
              <div className="flex flex-col w-full p-1">
                <h2
                  style={{ fontFamily: "var(--font-nunito)" }}
                  className="text-white text-[14px]"
                >
                  Hora
                </h2>
                {!data && <span className="text-center text-white">----</span>}
                {data && (
                  <p className="text-white flex flex-col">
                    {currentTime.toLocaleString()}
                  </p>
                )}
              </div>
            </Cards>

            <Cards
              icon="/cloudyOne.png"
            >
              <div className="flex flex-col w-full p-1">
                <h2
                  style={{ fontFamily: "var(--font-nunito)" }}
                  className="text-white text-[14px]"
                >
                  Direção <br /> do vento:
                </h2>
                {!data && <span className="text-center text-white">----</span>}
                {data && (

                  <p className="text-white flex flex-col">
                    {data.weather.winddirection}°
                  </p>
                )}
              </div>
            </Cards>
          </div>

        </div>
      </div>
    </div>
  );
}

// https://www.shutterstock.com/pt/image-illustration/modern-minimal-mobile-app-ui-interface-2132058963?trackingId=bbe44345-dfb6-47a5-ab45-c3f0d8085629
