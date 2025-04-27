import styles from './Footer.module.css'
import { Link } from 'react-router';

export const Footer = () => {
    return(
        <footer>
            <div className={styles.container}>
                <div className={styles.cont}>
                    <div className={styles.links}>
                        <Link className={styles.linkBiger} to='/'>Главная</Link>
                        <Link className={styles.linkBiger} to='/about'>О проекте</Link>
                        <Link className={styles.linkBiger} to='/search'>Поиск</Link>
                        <Link className={styles.linkBiger} to='/fairytales'>Сборник сказок</Link>
                    </div>
                    <div className={styles.epochs}>
                        <Link className={styles.linkBiger} to='/'>Эпохи</Link>
                        <Link className={styles.link} to='/ancient-folklore'>До XVI века</Link>
                        <Link className={styles.link} to='/XVI-XVII-folklore'>XVI-XVII века</Link>
                        <Link className={styles.link} to='/XVIII-XIX-folklore'>XVIII-XIX века</Link>
                    </div>
                    <div className={styles.contacts}>
                        <p>Контакты:</p>
                    </div>
                    <div className={styles.contact}>
                        <a href="mailto:kokova03@mail.ru">kokova03@mail.ru</a>
                    </div>
                    <div className={styles.about}>
                        <p>
                            Проект создан с целью сохранения и популяризации кабардинского фольклора среди широкой аудитории.
                        </p>
                        <p>
                            Основным источником материалов является издание Г.И. Бройдо «Кабардинский фольклор» («ACADEMIA», 1936 г.)
                        </p>
                        
                    </div>
                </div>
                
                <p className={styles.copyrights}>© 2025 Иллюстрации и авторские материалы защищены авторским правом. Фольклорные тексты – общественное достояние.</p>
            </div>
            
        </footer>
    )
}

