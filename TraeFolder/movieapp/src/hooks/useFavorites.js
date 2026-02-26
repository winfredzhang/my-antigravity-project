import { useState, useEffect } from 'react';

const STORAGE_KEY = 'movie_favs';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    const toggleFavorite = (movie) => {
        const isFav = favorites.some(f => f.id === movie.id);
        let newFavs;
        if (isFav) {
            newFavs = favorites.filter(f => f.id !== movie.id);
        } else {
            newFavs = [...favorites, movie];
        }
        setFavorites(newFavs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
    };

    const isFavorite = (id) => favorites.some(f => f.id === id);

    return { favorites, toggleFavorite, isFavorite };
};
