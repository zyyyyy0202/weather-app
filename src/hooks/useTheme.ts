import { useState } from "react";

/**
 * Custom hook to manage theme preference (dark mode).
 * This hook use localStorage to store the theme preference for long storage.
 *
 * @returns {Object} - An object containing:
 *   - isDarkMode: A boolean indicating whether dark mode is enabled.
 *   - onChangeThemeMode: A function to toggle the theme mode.
 */

const IS_DARK_MODE_KEY = "isDarkMode";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const storedIsDarkMode = localStorage.getItem(IS_DARK_MODE_KEY);
      return storedIsDarkMode ? JSON.parse(storedIsDarkMode) : false;
    } catch (error) {
      console.error("Error loading theme preference:", error);
      return false;
    }
  });

  const onChangeThemeMode = (checked: boolean) => {
    setIsDarkMode(checked);
    try {
      localStorage.setItem(IS_DARK_MODE_KEY, JSON.stringify(checked));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  return {
    isDarkMode,
    onChangeThemeMode,
  };
};

export default useTheme;