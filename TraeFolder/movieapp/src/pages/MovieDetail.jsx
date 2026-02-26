import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, Star, Clock, Calendar } from 'lucide-react';
import { getMovieDetails } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { toggleFavorite, isFavorite } = useFavorites();
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await getMovieDetails(id);
            setMovie(data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) return <div className="content-page">加载中...</div>;

    const handleShare = () => {
        // 模拟微信分享
        setShowShareModal(true);
        setTimeout(() => {
            alert(`已生成分享卡片: ${movie.title}\n正在跳转至微信...`);
            setShowShareModal(false);
        }, 1500);
    };

    return (
        <div className="movie-detail-container page-enter">
            {/* 沉浸式背景 */}
            <div className="backdrop-container">
                <div className="backdrop-overlay"></div>
                <img src={movie.backdrop} alt={movie.title} className="backdrop-img" />

                <div className="header-actions">
                    <button className="icon-btn glass-effect" onClick={() => navigate(-1)}>
                        <ChevronLeft size={24} />
                    </button>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="icon-btn glass-effect" onClick={handleShare}>
                            <Share2 size={24} />
                        </button>
                        <button
                            className={`icon-btn glass-effect ${isFavorite(movie.id) ? 'fav-active' : ''}`}
                            onClick={() => toggleFavorite(movie)}
                        >
                            <Heart size={24} fill={isFavorite(movie.id) ? "var(--primary)" : "none"} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="detail-content">
                <div className="main-info">
                    <img src={movie.poster} alt={movie.title} className="small-poster" />
                    <div className="title-section">
                        <h1>{movie.title}</h1>
                        <p className="original-title">{movie.originalTitle}</p>
                        <div className="meta-tags">
                            <span><Star size={12} fill="#ffb800" color="#ffb800" /> {movie.rating}</span>
                            <span><Clock size={12} /> {movie.duration}</span>
                            <span><Calendar size={12} /> {movie.year}</span>
                        </div>
                    </div>
                </div>

                <section className="info-section">
                    <h2>简介</h2>
                    <p className="overview">{movie.overview}</p>
                </section>

                <section className="info-section">
                    <h2>主要演职员</h2>
                    <div className="cast-scroll">
                        {movie.cast.map(actor => (
                            <div key={actor.id} className="cast-item" onClick={() => navigate(`/actor/${actor.id}`)}>
                                <img src={actor.photo} alt={actor.name} />
                                <p className="cast-name">{actor.name}</p>
                                <p className="cast-role">{actor.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {showShareModal && (
                <div className="share-overlay">
                    <div className="share-card glass-effect">
                        <h3>正在通过微信分享</h3>
                        <div className="share-preview">
                            <img src={movie.poster} alt="" />
                            <div>
                                <h4>{movie.title}</h4>
                                <p>推荐指数: ★★★★☆</p>
                            </div>
                        </div>
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        .movie-detail-container {
          min-height: 100vh;
          background: var(--bg-dark);
          position: relative;
          z-index: 1;
        }
        .backdrop-container {
          height: 45vh;
          position: relative;
        }
        .backdrop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .backdrop-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15,16,20,0.3) 0%, rgba(15,16,20,1) 100%);
        }
        .header-actions {
          position: absolute;
          top: calc(var(--safe-area-top) + 20px);
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          z-index: 10;
        }
        .icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fav-active {
          color: var(--primary);
        }
        .detail-content {
          margin-top: -60px;
          padding: 0 20px 40px;
          position: relative;
          z-index: 5;
        }
        .main-info {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        .small-poster {
          width: 120px;
          aspect-ratio: 2/3;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.5);
        }
        .title-section h1 {
          font-size: 24px;
          margin-bottom: 4px;
        }
        .original-title {
          font-size: 14px;
          color: var(--text-dim);
          margin-bottom: 12px;
        }
        .meta-tags {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: var(--text-dim);
        }
        .meta-tags span {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--glass);
          padding: 4px 8px;
          border-radius: 6px;
        }
        .info-section {
          margin-bottom: 30px;
        }
        .info-section h2 {
          font-size: 18px;
          margin-bottom: 12px;
        }
        .overview {
          font-size: 14px;
          line-height: 1.6;
          color: #d0d0d0;
        }
        .cast-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 10px;
        }
        .cast-item {
          flex: 0 0 80px;
          text-align: center;
        }
        .cast-item img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 8px;
          border: 2px solid var(--glass-border);
        }
        .cast-name {
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cast-role {
          font-size: 10px;
          color: var(--text-dim);
        }
        .share-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }
        .share-card {
          width: 100%;
          max-width: 300px;
          padding: 24px;
          border-radius: 24px;
          text-align: center;
        }
        .share-preview {
          margin: 20px 0;
          display: flex;
          gap: 12px;
          text-align: left;
          background: rgba(255,255,255,0.05);
          padding: 12px;
          border-radius: 12px;
        }
        .share-preview img {
          width: 60px;
          border-radius: 8px;
        }
      `}} />
        </div>
    );
};

export default MovieDetail;
