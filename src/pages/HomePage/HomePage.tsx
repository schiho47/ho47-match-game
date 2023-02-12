import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import { Type } from "../../data/game";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  const topic = [
    // { title: "歷史課本", type: Type.Class },
    { title: "文學", type: Type.Writer },
    // { title: "藝術", type: Type.Art },
    { title: "音樂", type: Type.Music },
    { title: "政治", type: Type.Politics },
    { title: "白色恐佈", type: Type.WhiteTerror },
    { title: "棒球", type: Type.CPBL },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.title}>
        <h3>請選擇要挑戰的主題</h3>
      </div>
      <div className={styles.main}>
        {topic.map((topic) => {
          return (
            <Link to={`/${topic.type}`} className="link">
              <Button title={topic.title} size="large" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
