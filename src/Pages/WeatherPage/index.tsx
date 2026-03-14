import { useState } from "react";
import SearchForm from "../../Component/SearchForm";
import WeatherCard from "../../Component/WeatherCard";
import styles from "./index.module.less";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();

    if (!trimmedCity || !trimmedCountry) {
      return;
    }

    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <div className={styles.weatherPage}>
      <div className={styles.weatherPageContainer}>
        <SearchForm
          city={city}
          country={country}
          loading={loading}
          onCityChange={setCity}
          onCountryChange={setCountry}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <div className={styles.weatherInfoContainer}>
          <div className={styles.weatherIcon}></div>
          <WeatherCard
            title={`Today's Weather`}
            temperature={26}
            location={`Johor, MY`}
            lowestTemperature={20}
            highestTemperature={30}
            formattedTime={'01-09-2022 09:41am'}
            humidity={70}
            weatherType={'Clouds'}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
