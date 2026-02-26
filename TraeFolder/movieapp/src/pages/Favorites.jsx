import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const Favorites = () => {
    const { favorites } = useFavorites();
    const [internalQuery, setInternalQuery] = useState('');
    const navigate = useNavigate();

    const filteredFavs = favorites.filter(m =>
        m.title.includes(internalQuery) || m.originalTitle.toLowerCase().includes(internalQuery.toLowerCase())
    );

    return (
        <div className="content-page page-enter">
            <header style={{ marginBottom: '32px' }}>
                <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>我的收藏</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>你标记的所有心动时刻</p>
            </header>

            {favorites.length > 0 ? (
                <>
                    <div className="search-container">
                        <SearchIcon className="search-icon" size={20} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="在收藏中搜索..."
                            value={internalQuery}
                            onChange={(e) => setInternalQuery(e.target.value)}
                        />
                    </div>

                    <div className="movie-grid">
                        {filteredFavs.map(movie => (
                            <div
                                key={movie.id}
                                className="movie-card"
                                onClick={() => navigate(`/movie/${movie.id}`)}
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

                    {filteredFavs.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text-dim)' }}>
                            未找到匹配的电影
                        </div>
                    )}
                </>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <Heart size={48} color="var(--glass-border)" style={{ marginBottom: '16px' }} />
                    <p style={{ color: 'var(--text-dim)' }}>还没有收藏任何影片</p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            marginTop: '20px',
                            padding: '12px 24px',
                            background: 'var(--gradient-main)',
                            borderRadius: '12px',
                            fontWeight: '600'
                        }}
                    >
                        去发现
                    </button>
                </div>
            )}
        </div>
    );
};

export default Favorites;
