import type { WeatherDataVO } from "../../interface/WeatherInterface";
import styles from "./index.module.less";

interface SearchHistoryItemProps {
  id: string;
  location: string;
  formattedTime: string;
  dateTime: string;
  onDelete: (id: string) => void | Promise<void>;
  onSearch: (city: string, country: string) => void | Promise<void>;
}

const SearchHistoryItem = ({
  location,
  formattedTime,
  dateTime,
  onDelete,
  onSearch,
  id,
}: SearchHistoryItemProps) => {
  const [
    city = '',
    country = '',
  ] = location.split(',');
  return (
    <li className={styles.searchHistoryItem}>
      <span className={styles.searchHistoryLocation}>{location}</span>

      <time className={styles.searchHistoryTime} dateTime={dateTime}>
        {formattedTime}
      </time>

      <div className={styles.searchHistoryOperation}>
        <button
          type="button"
          className={styles.searchHistorySearchButton}
          aria-label={`Search weather for ${location}`}
          onClick={() => onSearch(city.trim(), country.trim())}
        />
        <button
          type="button"
          className={styles.searchHistoryDeleteButton}
          aria-label={`Delete search history for ${location}`}
          onClick={() => onDelete(id)}
        />
      </div>
    </li>
  );
};

interface SearchHistoryProps {
  weatherHistoryList: WeatherDataVO[];
  onDelete: (id: string) => void | Promise<void>;
  onSearch: (city: string, country: string) => void | Promise<void>;
}

export const SearchHistory = ({ weatherHistoryList, onDelete, onSearch }: SearchHistoryProps) => {
 
  const hasHistory = Array.isArray(weatherHistoryList) && weatherHistoryList.length > 0;

  return (
    <section
      className={styles.searchHistoryContainer}
      aria-labelledby="search-history-title"
    >
      <div className={styles.searchHistoryWrapper}>
        <h2 id="search-history-title" className={styles.searchHistoryTitle}>
          Search History
        </h2>

        <ul className={styles.searchHistoryListContainer}>
          {hasHistory ? weatherHistoryList?.map((item) => (
            <SearchHistoryItem
              key={item.id}
              id={item.id}
              location={item.location}
              formattedTime={item.formattedTime}
              dateTime={item.formattedTime}
              onDelete={onDelete}
              onSearch={onSearch}
            />
          )) : (
            <li className={styles.searchHistoryEmpty}>No search history</li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default SearchHistory;
