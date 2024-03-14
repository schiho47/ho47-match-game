import Link from 'next/link';
import Header from '../Header/Header';
import styles from './GamePageLayout.module.scss';
import Button from '../Button/Button';
import ScoreBar from '../ScoreBar/ScoreBar';
import { Children, ReactNode } from 'react';

interface GamePageLayoutProps {
  rules: string;
  example?: string;
  level: string;
  score: number;
  children: ReactNode;
}
const GamePageLayout: React.FC<GamePageLayoutProps> = ({
  rules,
  example,
  level,
  score,
  children,
}) => {
  return (
    <>
      <Header />
      <div className={styles.rule}>
        <h4>
          {rules}
          <br />
          {example}
        </h4>
        <div className={styles.btn}>
          <Link href='/' className='link'>
            <Button title='回首頁' size='small' />
          </Link>
        </div>
      </div>
      {/* <ScoreBar level={level} score={score} /> */}
      {children}
    </>
  );
};

export default GamePageLayout;
