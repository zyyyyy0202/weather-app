import SunIcon from "../../assets/sun.png";
import CloudIcon from "../../assets/cloud.png";
import styles from "./index.module.less";

export interface WeatherCardProps {
  temperature?: number;
  location?: string;
  lowestTemperature?: number;
  highestTemperature?: number;
  formattedTime?: string;
  humidity?: number;
  weatherType?: string;
  title?: string;
}

function WeatherCard({
  temperature,
  location,
  lowestTemperature,
  highestTemperature,
  formattedTime,
  humidity,
  weatherType,
  title = "Today's Weather",
}: WeatherCardProps) {

  /*
   * Normalize weather data into display-friendly values,
   * so the UI can safely handle empty or undefined fields.
   */
  const safeDisplayWeatherData = {
    temperature: temperature != null ? `${temperature}°` : "--",
    location: location || "--",
    temperatureRange:
      highestTemperature != null && lowestTemperature != null
        ? `H: ${highestTemperature}° L: ${lowestTemperature}°`
        : "H: --° L: --°",
    formattedTime: formattedTime || "--",
    humidity: humidity != null ? `${humidity}%` : "--%",
    weatherType: weatherType || "--",
  };

  const isCloudy = weatherType?.toLowerCase().includes('cloud');

  return (
    <section className={styles.weatherCard} aria-label="Current weather">
  <img
    className={styles.weatherIcon}
    src={isCloudy ? CloudIcon : SunIcon}
    alt=""
    aria-hidden="true"
  />

  <div className={styles.header}>
    <h3 className={styles.weatherTitle}>{title}</h3>
  </div>

  <div className={styles.weatherBody}>
    <div className={styles.leftContent}>
      <div className={styles.currentTemperature}>
        {safeDisplayWeatherData.temperature}
      </div>

      <div className={styles.temperatureRange}>
        <span>{safeDisplayWeatherData.temperatureRange}</span>
      </div>

      <div className={styles.location}>{safeDisplayWeatherData.location}</div>
    </div>

    <div className={styles.rightContent}>
      <div>{safeDisplayWeatherData.weatherType}</div>
      <div>{`Humidity: ${safeDisplayWeatherData.humidity}`}</div>
      <div className={styles.formattedTime}>{safeDisplayWeatherData.formattedTime}</div>
    </div>
  </div>
</section>
  );
}

export default WeatherCard;