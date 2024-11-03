"use client";

import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { H1, Muted, P } from "./components/custom-tags";
import { WeatherData } from "./types";
import { useTempStore } from "./stores/temp";
import { useWindStore } from "./stores/wind";
import { usePressureStore } from "./stores/pressure";
import { usePrecipStore } from "./stores/precip";

export default function Page() {
  const { data: weatherData } = useQuery<WeatherData>({
    queryKey: ["weatherData"],
  });
  const { temp } = useTempStore();
  const { wind } = useWindStore();
  const { pressure } = usePressureStore();
  const { precip } = usePrecipStore();

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
        <H1>
          {temp === "temp_c" ? `${current.temp_c} °C` : `${current.temp_f} °F`}
        </H1>
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
          <P>
            {wind === "wind_mph"
              ? `${current.wind_mph} mph`
              : `${current.wind_kph} km/h`}
          </P>
        </div>
        <div>
          <Muted>PRESSURE</Muted>
          <P>
            {pressure === "pressure_mb"
              ? `${current.pressure_mb} mb`
              : `${current.pressure_in} in`}
          </P>
        </div>
        <div>
          <Muted>PRECIPITATION</Muted>
          <P>
            {precip === "precip_mm"
              ? `${current.precip_mm} mm`
              : `${current.precip_in} in`}
          </P>
        </div>
        <div>
          <Muted>HUMIDITY</Muted>
          <P>{weatherData.current.humidity}%</P>
        </div>
        <div>
          <Muted>FEELS LIKE</Muted>
          <P>
            {temp === "temp_c"
              ? `${current.feelslike_c} °C`
              : `${current.feelslike_f} °F`}
          </P>
        </div>
        <div>
          <Muted>VISIBILITY</Muted>
          <P>{weatherData.current.vis_km} km</P>
        </div>
      </div>
    </div>
  );
}
