import { Block } from "@/components/ui/Block"
import { Feedback } from "@/components/ui/Feedback"
import { __ } from "@/helpers"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Button } from "@mui/material"

import { ADVANTAGES, FEEDBACKS } from "./const"
import mainImage from "./images/main_image.png"
import styles from "./Main.module.scss"

export function Main() {
  return (
    <div className={styles.base}>
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.textWrapper}>
            <h1 className={styles.title}>
              Курсы по <br />{" "}
              <span className={styles.secondTextColor}>
                иностранным языкам!
              </span>
            </h1>
            <span className={styles.subtitle}>
              Открывай новые горизонты с Lingo Talk!
            </span>
          </div>
          <Button className={styles.mainButton} variant="contained">
            Начать изучение <ArrowForwardIcon />
          </Button>
        </div>
        <img className={styles.mainImage} src={mainImage} />
      </div>
      <div className={styles.advantages}>
        {__.map(ADVANTAGES, (advantage) => {
          return (
            <Block
              key={advantage.title}
              title={advantage.title}
              image={
                <img className={styles.advantageImage} src={advantage.image} />
              }
              text={advantage.text}
            />
          )
        })}
      </div>
      <div className={styles.feedbacks}>
        <div className={styles.feedbackTitle}>Отзывы наших пользователей</div>
        <div className={styles.feedbackBlocks}>
          {__.map(FEEDBACKS, (feedback) => {
            return <Feedback key={feedback.name} {...feedback} />
          })}
        </div>
      </div>
    </div>
  )
}
