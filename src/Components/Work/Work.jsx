import { useParams } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './Work.module.css';
import { useGetWorksQuery } from '../../Services/worksApi';
import { Loading } from '../Loading/Loading';
import { useEffect, useState } from 'react';



export const Work = () =>{
    const { id }= useParams();
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
    
    const work = works.find(work => work.id === parseInt(id));
    window.scrollTo(0, 0);
    return(
        <main className={styles.main}>
            <div className={styles.container}>
                <h2>{work.title}</h2>
                <div>
                    {
                        work.content.split('\n')
                        .map((line, i) => (<p key={i}>{line}</p>))
                    }
                </div>
                
            </div>
            <Button option='back'></Button>
        </main>
    )
}

