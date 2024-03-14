import React, { useEffect, useState, useRef, MouseEventHandler } from 'react';
import Image from 'next/image';
import GamePageLayout from '../GamePageLayout/GamePageLayout';
import { useRouter } from 'next/router';
import { ClassLineType } from '@/types/game';
import Modal from '../Modal/Modal';
// http://localhost:3001/game-page/class/second

interface LineMatchProps {
  data: ClassLineType[];
  showModal: boolean;
  toggleModal: () => void;
}
const LineMatch: React.FC<LineMatchProps> = React.memo(
  ({ data, showModal, toggleModal }: LineMatchProps) => {
    const router = useRouter();
    const { asPath } = router;
    const [level, setLevel] = useState<string>('');
    const [score, setScore] = useState<number>(0);

    const pickItemsRef = useRef<string>();
    const modalDataRef = useRef<{
      title: string;
      note: string;
      explain: string;
    }>({ title: '', note: '', explain: '' });
    // canvas 相關
    const canvasRef = useRef(null);
    const canvasPositionRef = useRef<number[]>([]);
    const startPointRef = useRef<number[]>([]);
    const endPointRef = useRef<number[]>([]);

    const handlePointClick = (e: any, id: string, item: any) => {
      console.log(e.clientX, e.clientY, id, item);
      //用pickItemRef 來紀錄當前點擊的是哪一組id
      // 如果！pickItemRef的話，就是起始
      if (!pickItemsRef.current) {
        //紀錄起始座標是 [e.clientX, e.clientY]
        startPointRef.current = [e.clientX, e.clientY];
        //紀錄選擇id是哪一組
        pickItemsRef.current = id;
        return;
      }
      // 結束組邏輯 如果傳入id不是紀錄的pickItem 就是錯誤
      if (id !== pickItemsRef.current) {
        // 顯示錯誤訊息
        alert('❌錯了錯了錯了❌');
        // 將選擇的item back to init
        pickItemsRef.current = '';
        return;
      }
      //如果兩者相等，就是正確連線
      if (id === pickItemsRef.current) {
        //紀錄結束位置
        endPointRef.current = [e.clientX, e.clientY];
        // 將選擇的item back to init
        pickItemsRef.current = '';
        //畫線
        drawing();
        // handleModalData(id);
        return;
      }
    };

    const drawing = () => {
      const canvas = canvasRef.current;
      // 先檢查 起始點和終點都有值
      if (
        canvas &&
        startPointRef.current.length > 0 &&
        endPointRef.current.length > 0
      ) {
        // @ts-ignore
        const ctx = canvas.getContext('2d');
        const [startX, startY] = startPointRef.current;
        const [endX, endY] = endPointRef.current;
        const [canvasX, canvasY] = canvasPositionRef.current;
        ctx.beginPath();
        //startX-72 ＝> 減掉margin left 4.5rem
        // startY - canvasY 其實不知道為什麼但是沒有會看不到
        ctx.moveTo(startX - 72, startY - canvasY);
        ctx.lineTo(endX - 72, endY - canvasY);

        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }
    };

    const handleModalData = (id: string) => {
      const target = data.filter((data) => data.id === id)[0];
      modalDataRef.current = {
        title: target.title,
        note: target.note,
        explain: target.explain,
      };
      toggleModal();
    };

    useEffect(() => {
      const level = localStorage.getItem('level');
      setScore(Number(localStorage.getItem('score')!));
      setLevel(`${asPath.split('/')[2]}-${level}`);
    }, []);

    useEffect(() => {
      if (typeof window === 'object' && canvasRef.current !== null) {
        // @ts-ignore
        const position = canvasRef.current.getBoundingClientRect();
        canvasPositionRef.current = [position.x, position.y];
      }
    }, []);
    return (
      <>
        <div>
          <GamePageLayout
            rules={'遊戲規則： 連連看-請將相關的組合相連'}
            level={level}
            score={score}
          >
            <canvas
              ref={canvasRef}
              width={1300}
              height={500}
              style={{ marginLeft: '4.5rem', marginTop: '3rem' }}
            />
            <div
              style={{
                height: '500px',
                position: 'absolute',
                top: '30%',
                left: '10%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '3rem',
                }}
              >
                {data.map((item) => {
                  return (
                    <div key={item.id}>
                      <Image
                        src={item.src}
                        alt='連連看的圖片'
                        width={300}
                        height={300}
                      />
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '4rem',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => handlePointClick(e, item.id, item)}
                      >
                        .
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div style={{height:'200px'}}></div> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginBottom: '3rem',
                }}
              >
                {data
                  .sort(() => Math.random() - 0.5)
                  .map((item) => {
                    return (
                      <div key={item.id}>
                        <div
                          style={{
                            textAlign: 'center',
                            fontSize: '4rem',
                            cursor: 'pointer',
                          }}
                          onClick={(e) => handlePointClick(e, item.id, item)}
                        >
                          .
                        </div>
                        <span style={{ fontSize: '2rem' }}>{item.name}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </GamePageLayout>
        </div>
        {showModal && (
          <Modal
            title={modalDataRef.current.title}
            note={modalDataRef.current.note}
            explain={modalDataRef.current.explain}
          />
        )}
      </>
    );
  }
);
export default LineMatch;
