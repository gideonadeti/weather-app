import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";

import { H1, Muted, P } from "./components/custom-tags";
import weatherData from "../../public/weather-data.json";

export default function Home() {
  return (
    <div className="flex-grow grid grid-cols-4 px-4 space-x-4">
      <div className="col-span-3 grid grid-rows-3 gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <H1>
                {weatherData.location.name}, {weatherData.location.region},{" "}
                {weatherData.location.country}
              </H1>
              <Muted>
                Last updated:{" "}
                {formatDistanceToNow(weatherData.current.last_updated, {
                  addSuffix: true,
                })}
              </Muted>
              <Muted>
                Current time: {format(weatherData.location.localtime, "h:mm a")}
              </Muted>
              <Muted>Condition: {weatherData.current.condition.text}</Muted>
            </div>
            <H1 className="justify-self-end">{weatherData.current.temp_c}°C</H1>
          </div>
          <Image
            src={`https:${weatherData.current.condition.icon}`}
            width={150}
            height={150}
            alt={weatherData.current.condition.text}
            className="self-start"
          />
        </div>
        <div className="border rounded-lg p-4 flex justify-between">
          <div>
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
          </div>
          <div>
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
          <div>
            <Muted>
              AIR QUALITY (µg/m<sup>3</sup>)
            </Muted>
            <div>
              <div>
                <P>Carbon monoxide(CO): {weatherData.current.air_quality.co}</P>
              </div>
              <div>
                <P>
                  Nitrogen dioxide (NO<sub>2</sub>):{" "}
                  {weatherData.current.air_quality.no2}
                </P>
              </div>
              <div>
                <P>
                  Ozone (O<sub>3</sub>): {weatherData.current.air_quality.o3}
                </P>
              </div>
              <div>
                <P>
                  Sulphur dioxide (SO<sub>2</sub>):{" "}
                  {weatherData.current.air_quality.so2}
                </P>
              </div>
            </div>
          </div>
          <div>
            <Muted>UV INDEX</Muted>
            <P>{weatherData.current.uv}</P>
          </div>
        </div>
        <div className="border rounded-lg mb-4"></div>
      </div>
      <div className="border rounded-lg my-4"></div>
    </div>
  );
}
