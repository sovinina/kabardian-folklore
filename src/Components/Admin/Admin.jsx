import { useState, useEffect } from 'react';
import styles from './Admin.module.css'


export const Admin = () =>{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [genreId, setGenreId] = useState('');
    const [epochId, setEpochId] = useState('');
    const [genres, setGenres] = useState([]);
    const [epochs, setEpochs] = useState([]);
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/genres`)
        .then(res => res.json())
        .then(setGenres);
      fetch(`${import.meta.env.VITE_API_URL}/api/epochs`)
        .then(res => res.json())
        .then(setEpochs);
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage('');
      const token = localStorage.getItem('token');
  
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/works`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, genre_id: genreId, epoch_id: epochId }),
        });
  
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Ошибка при добавлении');
        }
  
        setTitle('');
        setContent('');
        setGenreId('');
        setEpochId('');
        setMessage('Произведение успешно добавлено!');
      } catch (err) {
        setMessage(err.message);
      }
    };
  
    return (
      <main>
        <h2>Добавить произведение</h2>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Содержание"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
            <option value="">Выберите жанр</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <select value={epochId} onChange={(e) => setEpochId(e.target.value)}>
            <option value="">Выберите эпоху</option>
            {epochs.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          <button type="submit">Добавить</button>
        </form>
        {message && <p>{message}</p>}
      </main>
    );
}