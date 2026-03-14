import styles from "./index.module.less";

interface WeatherCardProps {
  temperature: number;
  location: string;
  lowestTemperature: number;
  highestTemperature: number;
  formattedTime: string;
  humidity: number;
  weatherType: string;
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
  return (
    <section className={styles.weatherCard} aria-label="Current weather">
      <div className={styles.header}>
        <h3 className={styles.weatherTitle}>{title}</h3>
      </div>

      <div className={styles.currentTemperature}>{temperature}°</div>

      <div className={styles.temperatureRange}>
        <span>{`H: ${highestTemperature}° L: ${lowestTemperature}°`}</span>
      </div>

      <div className={styles.weatherDetails}>
        <div className={styles.location}>{location}</div>
        <div>{formattedTime}</div>
        <div>{`Humidity: ${humidity}%`}</div>
        <div>{weatherType}</div>
      </div>
    </section>
  );
}

export default WeatherCard;