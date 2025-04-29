import { Button } from '../Button/Button';
import styles from './About.module.css';


export const About = () => {
    return(
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2>О проекте</h2>
                    <p className={styles.text}>
                        Проект создан с целью сохранить и представить богатое устное народное творчество кабардинского народа в удобном цифровом формате. Он подчёркивает уникальность и значимость фольклора в истории, культуре и самобытности народов Кавказа. На сайте размещены произведения, распределённые по историческим эпохам: до XVI века, XVI–XVII века и XVIII–XIX века.
                    </p>
                </div>
                <img className={styles.img} src="/img/about.webp" alt="" />
            </div>
            <Button option='back'/>
        </main>
    )
}