import React from 'react';
import styles from './Pass.module.scss';
import Link from 'next/link';
import Button from '../Button/Button';

type PassProps = {
  asPath: string;
  toNextLevel: () => void;
};
const Pass: React.FC<PassProps> = ({ asPath, toNextLevel }) => {
  return (
    <div className={styles.success}>
      <h1>恭喜破關! 👍讃</h1>
      <div>
        <Link href={`${asPath}/second`} className='link'>
          <Button title={'前往下一關'} size='large' onClick={toNextLevel} />
        </Link>
        <Link href={`${asPath}/details`} className='link'>
          <Button
            title={'查看詳解'}
            size='large'
            onClick={toNextLevel}
            type={'normal'}
          />
        </Link>
      </div>
    </div>
  );
};

export default Pass;
