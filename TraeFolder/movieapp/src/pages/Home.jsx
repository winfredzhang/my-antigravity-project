import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, TrendingUp } from 'lucide-react';
import { searchMovies } from '../services/api';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const results = await searchMovies(query);
            setMovies(results);
        };
        fetchMovies();
    }, [query]);

    return (
        <div className="content-page page-enter">
            <header style={{ marginBottom: '32px' }}>
                <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>发现</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>探索你喜欢的电影和演员</p>
            </header>

            <div className="search-container">
                <SearchIcon className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="搜索电影、演职员..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <TrendingUp size={20} color="var(--primary)" />
                    <h2 style={{ fontSize: '18px' }}>推荐影片</h2>
                </div>

                <div className="movie-grid">
                    {movies.map(movie => (
                        <div
                            key={movie.id}
                            className="movie-card"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="movie-rating">★ {movie.rating}</div>
                            <img src={movie.poster} alt={movie.title} />
                            <div className="movie-card-info">
                                <h3 style={{ fontSize: '14px', marginBottom: '4px' }}>{movie.title}</h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{movie.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
