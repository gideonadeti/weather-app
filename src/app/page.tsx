"use client";

import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { H1, Muted, P } from "./components/custom-tags";
import { WeatherData } from "./types";

export default function Page() {
  const { data: weatherData } = useQuery<WeatherData>({
    queryKey: ["weatherData"],
    enabled: false,
  });

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  return (
    <div className="flex-grow px-4 space-y-4">
      <H1>
        {location.name}, {location.region}, {location.country}
      </H1>
      <div className="flex items-center gap-4">
        <H1>{current.temp_c}°C</H1>
        <Image
          src={`https:${current.condition.icon}`}
          width={60}
          height={60}
          alt={current.condition.text}
        />
      </div>
      <div className="weather-data">
        <div>
          <Muted>LOCAL TIME</Muted>
          <P>{format(location.localtime, "h:mm a")}</P>
        </div>
        <div>
          <Muted>LAST UPDATED</Muted>
          <P>
            {formatDistanceToNow(current.last_updated, { addSuffix: true })}
          </P>
        </div>
        <div>
          <Muted>CONDITION</Muted>
          <P>{current.condition.text}</P>
        </div>
        <div>
          <Muted>WIND SPEED</Muted>
          <P>{weatherData.current.wind_kph} km/h</P>
        </div>
        <div>
          <Muted>PRESSURE</Muted>
          <P>{weatherData.current.pressure_mb} hPa</P>
        </div>
        <div>
          <Muted>PRECIPITATION</Muted>
          <P>{weatherData.current.precip_mm} mm</P>
        </div>
        <div>
          <Muted>HUMIDITY</Muted>
          <P>{weatherData.current.humidity}%</P>
        </div>
        <div>
          <Muted>FEELS LIKE</Muted>
          <P>{weatherData.current.feelslike_c} °C</P>
        </div>
        <div>
          <Muted>VISIBILITY</Muted>
          <P>{weatherData.current.vis_km} km</P>
        </div>
      </div>
    </div>
  );
}
