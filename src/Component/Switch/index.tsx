import classNames from "classnames";
import styles from "./index.module.less";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  const handleToggle = () => {
    if (disabled) {
      return;
    }
    onChange(!checked);
  };

  return (
    <button
      type="button"
      className={classNames(styles.switch, {
        [styles.switchChecked]: checked,
      })}
      role="switch"
      aria-checked={checked}
      aria-label={checked ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggle}
      disabled={disabled}
    >
      <span className={styles.switchTrack} />
      <span className={styles.switchThumb}>
        <span className={styles.switchIcon}>{checked ? "🌙" : "☀️"}</span>
      </span>
    </button>
  );
}

export default Switch;
