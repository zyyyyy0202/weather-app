import styles from "./index.module.less";

interface SearchHistoryRecord {
  id: number;
  location: string;
  formattedTime: string;
  dateTime: string;
}

const MOCK_HISTORY: SearchHistoryRecord[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  location: "Johor, MY",
  formattedTime: "01-09-2022 09:41am",
  dateTime: "2022-09-01T09:41:00",
}));

interface SearchHistoryItemProps {
  location: string;
  formattedTime: string;
  dateTime: string;
}

const SearchHistoryItem = ({
  location,
  formattedTime,
  dateTime,
}: SearchHistoryItemProps) => {
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
        />
        <button
          type="button"
          className={styles.searchHistoryDeleteButton}
          aria-label={`Delete search history for ${location}`}
        />
      </div>
    </li>
  );
};

export const SearchHistory = () => {
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
          {MOCK_HISTORY.map((item) => (
            <SearchHistoryItem
              key={item.id}
              location={item.location}
              formattedTime={item.formattedTime}
              dateTime={item.dateTime}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SearchHistory;