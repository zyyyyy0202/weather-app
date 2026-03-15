import { Popconfirm } from "antd";
import type { WeatherDataVO } from "../../interface/WeatherInterface";
import emptyIcon from "../../assets/emptyIcon.png";
import styles from "./index.module.less";

interface SearchHistoryItemProps {
  id: string;
  location: string;
  formattedTime: string;
  onDelete: (id: string) => void | Promise<void>;
  onSearch: (city: string, country: string, skipSaveHistory?: boolean) => void | Promise<void>;
}

const SearchHistoryItem = ({
  location,
  formattedTime,
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
      <div className={styles.searchHistoryItemContent}>
        <div className={styles.searchHistoryLocation}>{location}</div>
        <div className={styles.searchHistoryTime}>{formattedTime}</div>
      </div>

      <div className={styles.searchHistoryOperation}>
        <button
          type="button"
          className={styles.searchHistorySearchButton}
          aria-label={`Search weather for ${location}`}
          onClick={() => onSearch(city.trim(), country.trim(), true)}
        />
        <Popconfirm
          title="Delete this search history?"
          okText="Yes"
          okType="danger"
          onConfirm={() => onDelete(id)}
          
        >
          <button
            type="button"
            className={styles.searchHistoryDeleteButton}
            aria-label={`Delete search history for ${location}`}
          />
        </Popconfirm>
      </div>
    </li>
  );
};

interface SearchHistoryProps {
  weatherHistoryList: WeatherDataVO[];
  onDelete: (id: string) => void | Promise<void>;
  onSearch: (city: string, country: string, skipSaveHistory?: boolean) => void | Promise<void>;
  isHistoryInitialized: boolean;
}

export const SearchHistory = ({ weatherHistoryList, onDelete, onSearch, isHistoryInitialized }: SearchHistoryProps) => {
  if (!isHistoryInitialized) return null;
  
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
          {hasHistory ? weatherHistoryList.map((item) => (
            <SearchHistoryItem
              key={item.id}
              id={item.id}
              location={item.location}
              formattedTime={item.formattedTime}
              onDelete={onDelete}
              onSearch={onSearch}
            />
          )) : (
            <li className={styles.searchHistoryEmpty}>
              <img src={emptyIcon} alt="No search history" />
              No search history
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default SearchHistory;
