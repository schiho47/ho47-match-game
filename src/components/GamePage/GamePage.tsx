import { useEffect, useState } from "react";
import { game1, game1Type } from "../../data/game";
import Card from "../Card/Card";
import styles from "./GamePage.module.css";
const GamePage = () => {
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
    <div className={styles.container}>
      {gameData.filter((data: game1Type) => data.active === true).length ===
        0 && (
        <div>
          <h1>恭喜破關!</h1>
        </div>
      )}
      {gameData
        .filter((data: game1Type) => data.active === true)
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
  );
};

export default GamePage;
