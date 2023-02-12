import { useEffect, useState } from "react";
import { game1, game1Type } from "../../data/game";
import Card from "../../components/Card/Card";
import styles from "./GamePage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
interface GamePageProps {
  type: string;
}
const GamePage: React.FC<GamePageProps> = ({ type }) => {
  const [matchGroup, setMatchGroup] = useState<
    { name: string; answer: string }[]
  >([]);
  const [gameData, setGameData] = useState(game1);

  const handlePickAnswer = (name: string, answer: string) => {
    if (matchGroup.length > 2) return;
    setMatchGroup((prev) => [...prev, { name, answer }]);
  };

  const handleCheckAnswer = () => {
    if (
      matchGroup.length === 2 &&
      matchGroup[0].answer === matchGroup[1].answer
    ) {
      setGameData((prev) =>
        prev.map((data) =>
          data.active === true && data.answer === matchGroup[0].answer
            ? { ...data, active: false }
            : data
        )
      );
      setMatchGroup([]);
    }
    if (
      matchGroup.length === 2 &&
      matchGroup[0].answer !== matchGroup[1].answer
    ) {
      alert("❌錯了錯了錯了❌");
      setMatchGroup([]);
    }
  };

  useEffect(() => {
    if (matchGroup.length === 2) handleCheckAnswer();
  }, [matchGroup]);

  return (
    <div>
      <Header />
      <div className={styles.rule}>
        遊戲規則：請選出與人名有關聯的相對應詞彙
        <div className={styles.btn}>
          <Link to="/" className="link">
            <Button title={"回上一頁"} size="small" />
          </Link>
        </div>
      </div>
      {gameData.filter(
        (data: game1Type) => data.type === type && data.active === true
      ).length === 0 && (
        <div className={styles.success}>
          <h1>恭喜破關! 👍讃</h1>
        </div>
      )}
      <div className={styles.cardContainer}>
        {gameData
          .filter(
            (data: game1Type) => data.type === type && data.active === true
          )
          .map((card: game1Type) => {
            return (
              <Card
                name={card.name}
                answer={card.answer}
                id={card.id}
                key={card.id}
                onClick={() => handlePickAnswer(card.name, card.answer)}
                isPicked={
                  matchGroup.length > 0 && card.name === matchGroup[0].name
                    ? true
                    : false
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default GamePage;
