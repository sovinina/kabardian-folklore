import { epochs } from "../EpochList/data";
import styles from './EpochPage.module.css';
import { Button } from '../Button/Button';
import { useGetWorksQuery } from "../../Services/worksApi";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { useEffect, useState } from "react";

export const EpochPage = ({ id }) => {
    const epoch = epochs.find(epoch => epoch.id === id);
    const epochIndex = epochs.indexOf(epoch);
    const option = epochIndex !== 0 && epochIndex !== epochs.length-1 ? 'both' : epochIndex == 0 ? 'next' : 'prev';
    const links ={
        prev: epochs[epochIndex - 1] ? epochs[epochIndex - 1].link : '',
        next: epochs[epochIndex + 1] ? epochs[epochIndex + 1].link : ''
    }
    window.scrollTo(0, 0);


    const { data: works, error, isLoading } = useGetWorksQuery();
    
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
    useEffect(() => {
        let timeout;
        if (isLoading) {
            timeout = setTimeout(() => {
                setShowTimeoutMessage(true);
            }, 5000);
        } else {
            setShowTimeoutMessage(false);
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    if (isLoading) return <Loading showTimeoutMessage={showTimeoutMessage} />;

    if (error) return <p>Ошибка при загрузке данных</p>;

   
    return(
        <main className={styles.page}>
            <h1>{epoch.title}</h1>
            <div className={styles.container}>
                <h2 className={styles.h2}>Историко-культурный фон</h2>
                <p>{epoch.historicalBackground}</p>
            </div>
            <div className={styles.container}>
                <h2 className={styles.h2}>Особенности</h2>
                <p>{epoch.specifiy}</p>
            </div>
            <div className={styles.container}>
                <h2 className={styles.h2}>Обычаи и традиции</h2>
                {epoch.traditions.map(tradition => (<p key={tradition}>{tradition}</p>))}
            </div>
            <div className={styles.container}>
                <h2 className={styles.h2}>Произведения</h2>
                <h3>Легенды</h3>
                <ul className={styles.works}>
                    {[...works]
                        .filter(work => work.epoch_id === id && work.genre_id === 1)
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map(work => (
                            <li className={styles.work} key={work.id}>
                                <span className={styles.title}>{work.title}</span>
                                <span className={styles.dots}></span>
                                <Link to={`/work/${work.id}`}>Читать</Link>
                            </li>
                        ))
                    }
                </ul>
                <h3>Песни</h3>
                <ul className={styles.works}>
                    {[...works]
                        .filter(work => work.epoch_id === id && work.genre_id === 2)
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map(work => (
                            <li className={styles.work} key={work.id}>
                                <span className={styles.title}>{work.title}</span>
                                <span className={styles.dots}></span>
                                <Link to={`/work/${work.id}`}>Читать</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <Button option={option} links={links}></Button>
        </main>
    )
}