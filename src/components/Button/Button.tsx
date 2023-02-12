import styles from "./Button.module.css";
interface ButtonProps {
  title: string;
  size: "large" | "small";
}

const Button: React.FC<ButtonProps> = ({ title, size }) => {
  return (
    <div className={size === "large" ? `${styles.large}` : `${styles.small}`}>
      {title}
    </div>
  );
};

export default Button;
