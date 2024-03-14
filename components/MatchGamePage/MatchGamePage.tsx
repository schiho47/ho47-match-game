import { useEffect, useState } from 'react';
import styles from './MatchGame.module.scss';
import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import { CommonGameDataType } from '@/types/game';
import Card from '../Card/Card';
import ScoreBar from '../ScoreBar/ScoreBar';
import { useRouter } from 'next/router';
import BackImage from '../BackImage/BackImage';
import GamePageLayout from '../GamePageLayout/GamePageLayout';
import Pass from '../Pass/Pass';

interface MatchGamePageProps {
  data: CommonGameDataType[];
  propsLevel: string;
}
const MatchGamePage: React.FC<MatchGamePageProps> = ({ data, propsLevel }) => {
  const router = useRouter();
  const { asPath } = router;

  const [matchGroup, setMatchGroup] = useState<
    { name: string; answer: string }[]
  >([]);
  const [gameData, setGameData] = useState<CommonGameDataType[]>(data);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<string>(propsLevel);
  const [permission, setPermission] = useState(false);
  const thisLevel = `${asPath.split('/')[2]} ${level}`;

  const handlePickAnswer = (name: string, answer: string) => {
    if (matchGroup.length > 2) return;
    if (matchGroup.length === 2) handleCheckAnswer();
    if (matchGroup.length === 1 && matchGroup[0].name === name) {
      setMatchGroup([]);
    } else {
      setMatchGroup((prev) => [...prev, { name, answer }]);
    }
  };

  const answerIsCorrect = () => {
    setGameData((prev) =>
      prev.map((data) =>
        data.active === true && data.answer === matchGroup[0].answer
          ? { ...data, active: false }
          : data
      )
    );
    setScore((prev) => prev + 500);
    setMatchGroup([]);
  };

  const answerIsWrong = () => {
    if (score >= 300) {
      alert('❌錯了錯了錯了❌ 分數-300');
      setScore((prev) => prev - 300);
      return;
    }

    if (score < 300) {
      setGameData(data);
      alert('❌錯太多了❌ 請從頭再來');
      setScore(0);
      return;
    }
  };

  const handleCheckAnswer = () => {
    if (
      matchGroup.length === 2 &&
      matchGroup[0].answer === matchGroup[1].answer &&
      matchGroup[0].name !== matchGroup[1].name
    ) {
      answerIsCorrect();
    }

    if (
      matchGroup.length === 2 &&
      matchGroup[0].answer !== matchGroup[1].answer
    ) {
      answerIsWrong();
    }
    setMatchGroup([]);
  };

  const toNextLevel = () => {
    localStorage.setItem('level', `second`);
    localStorage.setItem('score', `${score}`);
    localStorage.setItem('hasPassed', `${[thisLevel]}`);
  };

  // const checkPermission = () => {
  //   const hasPassed = localStorage.getItem('hasPassed');

  //   if (!hasPassed) {
  //     setPermission(true);
  //     return;
  //   }

  //   if (hasPassed) {
  //     const hasPassedArray = JSON.parse(hasPassed);
  //
  //   }
  // };

  useEffect(() => {
    setGameData(data);
  }, [data]);

  useEffect(() => {
    setScore(Number(localStorage.getItem('score')!));
    setLevel(`${asPath.split('/')[2]}-${propsLevel}`);
  }, []);

  return (
    <div>
      <GamePageLayout
        rules={'遊戲規則： 請先選一個詞彙後，於頁面尋找有關連的對應詞彙。'}
        example={'例：Ho47-本遊戲作者'}
        level={level}
        score={0}
      >
        {/* <BackImage /> */}
        <div className={styles.cardContainer}>
          {gameData.filter((data) => data.active === true).length === 0 && (
            <Pass asPath={asPath} toNextLevel={toNextLevel} />
          )}
          {gameData
            .filter((data) => data.active === true)
            .map((card) => {
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
      </GamePageLayout>
    </div>
  );
};

export default MatchGamePage;
