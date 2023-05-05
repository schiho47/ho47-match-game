import styles from "./Button.module.scss";
interface ButtonProps {
  title: string;
  size: "large" | "small";
  onClick?:()=>void;
}

const Button: React.FC<ButtonProps> = ({ title, size, onClick }) => {
  return (
    <div className={size === "large" ? `${styles.large}` : `${styles.small}`} onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;