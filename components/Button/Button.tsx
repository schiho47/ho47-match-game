import styles from './Button.module.scss';
interface ButtonProps {
  title: string;
  size: 'large' | 'small';
  onClick?: () => void;
  type?: 'primary' | 'normal';
}

const Button: React.FC<ButtonProps> = ({
  title,
  size,
  onClick,
  type = 'primary',
}) => {
  return (
    <div
      className={`${styles.basicButton} ${
        size === 'large' ? `${styles.large}` : `${styles.small}`
      } ${styles[type]}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Button;
