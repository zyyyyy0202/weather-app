import { useState } from 'react';
import { Button } from 'antd';
import type { ChangeEvent, KeyboardEvent } from 'react';
import styles from './index.module.less';

interface SearchFormProps {
  loading?: boolean;
  onSearch: (city: string, country: string) => void;
}

function SearchForm({
  loading = false,
  onSearch,
}: SearchFormProps) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleSearch = () => {
    onSearch(city, country);
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !loading) {
      handleSearch();
    }
  };

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchForm}>
        <div className={styles.searchField}>
          <label className={styles.searchLabel} htmlFor="city">
            City
          </label>
          <input
            id="city"
            className={styles.searchInput}
            type="text"
            value={city}
            placeholder="Search city"
            onChange={handleCityChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoFocus
          />
        </div>
        <div className={styles.searchField}>
          <label className={styles.searchLabel} htmlFor="country">
            Country
          </label>
          <input
            id="country"
            className={styles.searchInput}
            type="text"
            value={country}
            placeholder="Search country"
            onChange={handleCountryChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>
      </div>
      <div className={styles.actionGroup}>
        <Button
          className={styles.searchButton}
          onClick={handleSearch}
          disabled={loading}
          aria-label="Search"
          title="Search"
        >
          {loading ? <span className={styles.buttonSpinner} /> : <span className={styles.searchIcon} aria-hidden="true" />}
        </Button>

        <Button
          className={styles.clearButton}
          onClick={handleClear}
          loading={loading}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
