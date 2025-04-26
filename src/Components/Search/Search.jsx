import styles from './Search.module.css';
import { useMemo, useState } from 'react';
import { useGetWorksQuery } from '../../Services/worksApi';
import { Link } from 'react-router';


export const Search = () => {
    const [query, setQuery] = useState('');
    const [onlyTitle, setOnlyTitle] = useState(false);
    const [period, setPeriod] = useState('');
    const arrow = (
      <div className={styles.circle}>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.44141 0.784176C7.94678 0.354692 8.69886 0.38504 9.16895 0.875973L14.1328 6.06152L14.2188 6.16113C14.5934 6.64038 14.5935 7.32645 14.2188 7.80566L14.1328 7.90527L9.16895 13.0908C8.66758 13.6143 7.84521 13.6141 7.34375 13.0908C6.85408 12.5793 6.85417 11.7586 7.34375 11.2471L10.167 8.29785H1.78027C1.0531 8.29785 0.500133 7.68862 0.5 6.98339C0.5 6.27806 1.05301 5.66894 1.78027 5.66894H10.167L7.34375 2.71972C6.85408 2.20822 6.85416 1.38752 7.34375 0.875973L7.44141 0.784176ZM8.80762 12.7441C8.78846 12.7641 8.76861 12.7833 8.74805 12.8008L8.80762 12.7441ZM7.60938 12.625C7.61291 12.6304 7.61742 12.6352 7.62109 12.6406C7.61553 12.6325 7.60974 12.6245 7.60449 12.6162L7.60938 12.625ZM7.60938 2.25488C7.61276 2.2601 7.61758 2.26437 7.62109 2.26953C7.61569 2.2616 7.6096 2.25417 7.60449 2.24609L7.60938 2.25488Z" fill="#FFF3E4"/>
        </svg>
      </div>
    );

    const { data: works, isLoading } = useGetWorksQuery();

    const filtered = useMemo(() => {
		if (!works || works.length === 0 || !query) return [];
	  
		const normalizedQuery = query.toLowerCase();
		const normalizedPeriod = parseInt(period);
	  
		return works.filter(work => {
		  const inTitle = work.title.toLowerCase().includes(normalizedQuery);
		  const inContent = work.content?.toLowerCase().includes(normalizedQuery) || false;
	  
		  const matchesPeriod = !period || period === '0' || work.epoch_id === normalizedPeriod;
	  
		  if (onlyTitle) {
			return inTitle && matchesPeriod;
		  } else {
			return (inTitle || inContent) && matchesPeriod;
		  }
		});
	}, [works, query, onlyTitle, period]);

    return(
        <main className={styles.main}>
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    className={styles.search} 
                    type="text" 
                    placeholder='Поиск...'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <label className={styles.customCheckbox}>
                    Искать только в названии
                    <input 
                        id='onlyTitle' 
                        type="checkbox" 
                        checked={onlyTitle}
                        onChange={e => setOnlyTitle(e.target.checked)}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <p>
                    Период 
                    <select 
                        className={styles.periodSelect} 
                        name="periodSelect" 
                        id="periodSelect"
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                    >
                        <option value="0">Искать везде</option>
                        <option value="1">до XVI века</option>
                        <option value="2">XVI-XVII века</option>
                        <option value="3">XVIII-XIX века</option>
                    </select>
                </p>
            </form>
            <section className={styles.section}>
              {isLoading ? (
                <p>Загрузка...</p>
              ) : filtered?.length ? (
                <ul className={styles.list}>
                  {filtered.map(work => (
                    <li key={work.id}>
                      <h3>{work.title}</h3>
                      <p>{work.content.split(' ').slice(0, 10).join(' ') + '...'}</p>
                      <div className={styles.btn}>
                        <Link to={`/work/${work.id}`}>Читать {arrow}</Link>
                      </div>
                      
                      
                    </li>
                  ))}
                </ul>
              ) : query ? (
                  <p>Ничего не найдено</p>
                ) : null}
            </section>
        </main>
    )
}