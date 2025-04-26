import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';
import { Link } from 'react-router';

export const Button = ({ option, links }) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
    };
    const arrow = (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM25.0607 13.0607C25.6464 12.4749 25.6464 11.5251 25.0607 10.9393L15.5147 1.3934C14.9289 0.807612 13.9792 0.807612 13.3934 1.3934C12.8076 1.97918 12.8076 2.92893 13.3934 3.51472L21.8787 12L13.3934 20.4853C12.8076 21.0711 12.8076 22.0208 13.3934 22.6066C13.9792 23.1924 14.9289 23.1924 15.5147 22.6066L25.0607 13.0607ZM2 13.5L24 13.5V10.5L2 10.5L2 13.5Z" fill="#FFF3E4"/>
        </svg>
    );
    const nextBtn = links?.next && (
        <Link className={styles.btn} to={links.next}>
            <span>
                Следующая эпоха
            </span>
            <div className={styles.circle}>
                {arrow}
            </div>
        </Link>
    );
    const prevBtn = links?.prev && (
        <Link className={styles.btn} to={links.prev}>
            <div className={`${styles.circle} ${styles.mirrored}`}>
                {arrow}
            </div>
            <span>
                Предыдущая эпоха
            </span>
        </Link>
    );
    const backBtn = (
        <button className={`${styles.btn} ${styles.back}`} onClick={handleGoBack}>
            <div className={`${styles.circle} ${styles.mirrored}`}>
                {arrow}
            </div>
            <span>
                Вернуться
            </span>
        </button>
    );

    let content;

    switch (option) {
        case 'next':
            content = (
                <>
                <div></div>
                {nextBtn}
                </>
            );
            break;
        case 'prev':
            content = (
                <>
                {prevBtn}
                <div></div>
                </>
            );
            break;
        case 'both':
            content = (
                <>
                {prevBtn}
                {nextBtn}
                </>
            );
            break;
        case 'back':
            content = (
                <>
                {backBtn}
                <div></div>
                </>
            );
            break;
        
        default:
            break;
    }
    return(
        <div className={styles.btns}>
            {content}
        </div>
    )
}


