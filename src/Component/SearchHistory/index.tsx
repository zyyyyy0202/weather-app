import styles from "./index.module.less";

const MOCK_DATA = {
  location: 'Johor, MY',
  formattedTime: '01-09-2022 09:41am',
}

const SearchHistoryItem = () => {
  return (
    <div className={styles.searchHistoryItem}>
      <div className={styles.searchHistoryLocation}>{MOCK_DATA.location}</div>
      <div className={styles.searchHistoryTime}>{MOCK_DATA.formattedTime}</div>
      <div className={styles.searchHistoryOperation}>
        <button className={styles.searchHistorySearchButton}></button>
        <button className={styles.searchHistoryDeleteButton}></button>
      </div>
    </div>
  ) 
}

export const SearchHistory = () => {
  return (
    <div className={styles.searchHistoryContainer}>
      <div className={styles.searchHistoryWrapper}>
        <div className={styles.searchHistoryTitle}>Search History</div>
        <div className={styles.searchHistoryListContainer}>
          {
            new Array(5).fill(0).map((_, index) => (
              <SearchHistoryItem key={index} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default SearchHistory;