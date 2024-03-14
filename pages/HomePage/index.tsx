import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Sound, { ReactSoundProps } from 'react-sound';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';

import styles from '@/styles/Home.module.scss';
import { GameTopicType } from '@/types/homePage';
import BackImage from '@/components/BackImage/BackImage';
import ScoreBar from '@/components/ScoreBar/ScoreBar';
import IndexBack from '@/components/IndexBack/IndexBack';

interface HomePageProps extends ReactSoundProps {}
const HomePage: React.FC<HomePageProps> = () => {
  const [topic, setTopic] = useState<GameTopicType[]>([]);
  // @ts-ignore
  const [playStatus, setPlayStatus] = useState(Sound.status.PLAYING);

  const getTopicService = async () => {
    const res = await fetch('/api/gameType', { method: 'GET' });
    const result = res.json();
    result.then((data) => setTopic(data));
  };

  useEffect(() => {
    getTopicService();

    const level = localStorage.getItem('level');
    const score = localStorage.getItem('score');
    if (!level && !score) {
      localStorage.setItem('level', 'start');
      localStorage.setItem('score', '500');
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.title}>
        <h3>請選擇要挑戰的主題</h3>
      </div>
      <ScoreBar level={'start'} score={0} />
      <div className={styles.main}>
        {topic.map((topic) => {
          return (
            <Link
              href={`/game-page/${topic.type}`}
              className='link'
              key={topic.type}
            >
              <Button title={topic.title} size='large' />
            </Link>
          );
        })}
      </div>
      <Sound
        url='/assets/index/Bang_Chhun_Hong.ogg'
        playStatus={playStatus}
        //@ts-ignore
        onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
      />
      <IndexBack />
    </div>
  );
};

export default HomePage;
