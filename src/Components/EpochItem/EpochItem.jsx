import styles from './EpochItem.module.css';
import { Link } from 'react-router';

export const EpochItem = ({epoch}) => {
    return(
        <div id={epoch.htmlId} className={styles.container}>
            <div className={styles.textContent}>
                <img src={epoch.img} className={styles.mobileImg} alt='Иллюстрация к эпохе' />
                <h2>{epoch.title}</h2>
                <p>{epoch.shorttext}</p>
            </div>
            <div className={styles.media}>
                <img src={epoch.img} className={styles.img} alt="" />
                <Link className={styles.link} to={epoch.link}>
                    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM25.0607 13.0607C25.6464 12.4749 25.6464 11.5251 25.0607 10.9393L15.5147 1.3934C14.9289 0.807612 13.9792 0.807612 13.3934 1.3934C12.8076 1.97918 12.8076 2.92893 13.3934 3.51472L21.8787 12L13.3934 20.4853C12.8076 21.0711 12.8076 22.0208 13.3934 22.6066C13.9792 23.1924 14.9289 23.1924 15.5147 22.6066L25.0607 13.0607ZM2 13.5L24 13.5V10.5L2 10.5L2 13.5Z" fill="#FFF3E4"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}