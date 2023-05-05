import style from './ScoreBar.module.scss';

interface ScoreBarProps{
    level:string;
    score:number;
}
const ScoreBar:React.FC<ScoreBarProps> = ({level,score}) => {
    return ( 
        <div className={style.score}>
            <div>Level：{level}</div>
            <div>分數：{score}</div>
        </div>
     );
}
 
export default ScoreBar;