import { useState } from "react";
import styles from "./index.module.less";
import SearchForm from "../../Component/SearchForm";

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
        <h1>Today's Weather</h1>
        <SearchForm
          city={city}
          country={country}
          loading={loading}
          onCityChange={setCity}
          onCountryChange={setCountry}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}

export default WeatherPage;