import styles from './EpochList.module.css';
import { Link } from 'react-router';
import { epochs } from './data';
import { EpochItem } from '../EpochItem/EpochItem';
import React from 'react';

export const EpochList = () => {
    window.scrollTo(0, 0);
    return(
            <main>
                <div className={styles.imgContainer}>
                    <div className={styles.container}>
                        <div className={styles.shape}></div>
                        <div className={styles.nav}>
                            <a href='#ancient'>до XVI</a>
                            <a href='#XVI-XVII'>XVI-XVII</a>
                            <a href='#XVIII-XIX'>XVIII-XIX</a>
                            <Link to='/fairytales'>Сборник сказок</Link>
                        </div>
                        <div className={styles.shape}></div>
                    </div>
                </div>
                <div className={styles.main}>
                    {
                        epochs.map((epoch, index) => {
                            if(index === 0){
                                return (
                                    <React.Fragment key={epoch.id}>
                                        <div className={styles.line}></div>
                                        <EpochItem epoch={epoch}/>
                                        <div className={styles.line}></div>
                                    </React.Fragment>
                                )
                            }
                            else {
                                return(
                                    <React.Fragment key={epoch.id}>
                                        <EpochItem epoch={epoch}/>
                                        <div className={styles.line}></div>
                                    </React.Fragment>
                                )
                            }
                        })
                    }
                </div>
                    
            </main>
    )
}

