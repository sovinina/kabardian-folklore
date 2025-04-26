import styles from './Header.module.css'
import { Link } from 'react-router';

export const Header = () => {
    return(
        <>
            <nav style={styles}>
                <Link className={styles.link} to='/'>Главная</Link>
                <Link className={styles.link} to='/about'>О проекте</Link>
                <Link className={styles.link} to='/search'>Поиск</Link>
            </nav>
        </>
    )
}

