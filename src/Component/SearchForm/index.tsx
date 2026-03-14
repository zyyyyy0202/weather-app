import type { ChangeEvent, KeyboardEvent } from 'react';
import styles from './index.module.less';

interface SearchFormProps {
  city: string;
  country: string;
  loading?: boolean;
  onCityChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

function SearchForm({
  city,
  country,
  loading = false,
  onCityChange,
  onCountryChange,
  onSearch,
  onClear,
}: SearchFormProps) {
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCityChange(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCountryChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !loading) {
      onSearch();
    }
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
        <button
          className={styles.searchButton}
          type="button"
          onClick={onSearch}
          disabled={loading}
          aria-label="Search"
          title="Search"
        >
          <span className={styles.searchIcon} aria-hidden="true" />
        </button>

        <button
          className={styles.clearButton}
          type="button"
          onClick={onClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
