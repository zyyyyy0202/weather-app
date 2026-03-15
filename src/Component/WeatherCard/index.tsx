import SunIcon from "../../assets/sun.png";
import CloudIcon from "../../assets/cloud.png";
import styles from "./index.module.less";

export interface WeatherCardProps {
  temperature?: number;
  location?: string;
  countryCode?: string;
  lowestTemperature?: number;
  highestTemperature?: number;
  formattedTime?: string;
  humidity?: number;
  weatherType?: string;
  title?: string;
}

enum WeatherType {
  Cloud = 'Clouds',
  Sun = 'Clear',
  Rain = 'Rain',
}

//Add countryCode to WeatherCard component props and display if available
function WeatherCard({
  temperature,
  location,
  countryCode,
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
  const displayWeatherData = {
    temperature: temperature != null ? `${temperature}°` : "--",
    temperatureRange:
      highestTemperature != null && lowestTemperature != null
        ? `H: ${highestTemperature}° L: ${lowestTemperature}°`
        : "H: --° L: --°",
    humidity: humidity != null ? `${humidity}%` : "--",
    formattedLocation: location ? `${location}, ${countryCode}` : "--",
    formattedTime: formattedTime || "--",
    weatherType: weatherType || "--",
  };
  
  const isCloudy = weatherType?.includes(WeatherType.Cloud);

  return (
    <section className={styles.weatherCard} aria-label="Current weather">
      {weatherType && <img
        className={styles.weatherIcon}
        src={isCloudy ? CloudIcon : SunIcon}
        alt=""
        aria-hidden="true"
      />}

      <div className={styles.header}>
        <h3 className={styles.weatherTitle}>{title}</h3>
      </div>

      <div className={styles.weatherTop}>
        <div className={styles.leftContent}>
          <div className={styles.currentTemperature}>
            {displayWeatherData.temperature}
          </div>

          <div className={styles.temperatureRange}>
            <span>{displayWeatherData.temperatureRange}</span>
          </div>
        </div>
      </div>

      <div className={styles.weatherMeta}>
        <div className={styles.location}>{displayWeatherData.formattedLocation}</div>

        <div className={styles.rightContent}>
          <div className={styles.formattedTime}>{displayWeatherData.formattedTime}</div>
          <div className={styles.humidity}>{`Humidity: ${displayWeatherData.humidity}`}</div>
          <div className={styles.weatherType}>{displayWeatherData.weatherType}</div>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;