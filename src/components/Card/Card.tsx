import styles from "./Card.module.css";

interface CardProps {
  name: string;
  answer: string;
  id: string;
  onClick: (name: string, answer: string) => void;
  isPicked: boolean;
}
const Card: React.FC<CardProps> = ({ name, answer, id, onClick, isPicked }) => {
  return (
    <div
      className={isPicked ? `${styles.picked}` : `${styles.card}`}
      onClick={() => onClick(name, answer)}
      id={id}
    >
      <span className={styles.name}> {name}</span>
    </div>
  );
};

export default Card;
