import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getActorDetails } from '../services/api';

const ActorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [actor, setActor] = useState(null);

    useEffect(() => {
        const fetchActor = async () => {
            const data = await getActorDetails(id);
            setActor(data);
        };
        fetchActor();
    }, [id]);

    if (!actor) return <div className="content-page">加载中...</div>;

    return (
        <div className="content-page page-enter">
            <header style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={() => navigate(-1)} className="icon-btn glass-effect">
                    <ChevronLeft size={24} />
                </button>
                <h1 style={{ fontSize: '20px' }}>演职员详情</h1>
            </header>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <img
                    src={actor.photo}
                    alt={actor.name}
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '4px solid var(--primary)' }}
                />
                <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{actor.name}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{actor.role}</p>
            </div>

            <section className="info-section">
                <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>人物简介</h2>
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#ccc' }}>{actor.bio}</p>
            </section>

            <section className="info-section" style={{ marginTop: '32px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>代表作品</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>该模块正在整理中...</p>
            </section>
        </div>
    );
};

export default ActorDetail;
