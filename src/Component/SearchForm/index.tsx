import { useState } from "react";
import styles from "./index.module.less";

interface SearchFormProps {
  onSearch: (city: string, country: string) => void;
  loading?: boolean;
}

function SearchForm({ loading = false, onSearch }: SearchFormProps) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loading) {
      onSearch(city, country);
    }
  };

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
      <div className={styles.searchForm}>
        <div className={styles.searchField}>
          <label className={styles.searchLabel}>
            City
          </label>
          <input
            id="city"
            className={styles.searchInput}
            type="text"
            value={city}
            placeholder="Search city"
            onChange={handleCityChange}
            disabled={loading}
            autoFocus
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel}>
            Country
          </label>
          <input
            id="country"
            className={styles.searchInput}
            type="text"
            value={country}
            placeholder="Search country"
            onChange={handleCountryChange}
            disabled={loading}
          />
        </div>
      </div>

      <div className={styles.actionGroup}>
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading}
          aria-label="Search"
          title="Search"
        >
          {loading ? (
            <span className={styles.buttonSpinner} />
          ) : (
            <span className={styles.searchIcon} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          disabled={loading}
          aria-label="Clear"
          title="Clear"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchForm;