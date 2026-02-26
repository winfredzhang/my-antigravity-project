import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Heart, Search, User, Share2 } from 'lucide-react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import Favorites from './pages/Favorites';
import './index.css';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav glass-effect">
      <Link to="/" className={isActive('/') ? 'active' : ''}>
        <HomeIcon size={24} />
        <span>首页</span>
      </Link>
      <Link to="/favorites" className={isActive('/favorites') ? 'active' : ''}>
        <Heart size={24} />
        <span>收藏</span>
      </Link>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/actor/:id" element={<ActorDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
