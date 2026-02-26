/**
 * 电影数据服务
 * 针对网络限制，支持通过 Cloudflare 代理或其他 API 镜像访问
 */

// 优先从环境变量读取 API 基准地址,默认为官方地址
// 如果官方地址不可用,用户可以在 .env 中将其修改为代理地址,如: https://tmdb.xxx.workers.dev/3
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 增强模拟数据,以防用户没有立即设置 API Key
const MOCK_MOVIES = [
  {
    id: 950396,
    title: "阿凡达：水之道",
    originalTitle: "Avatar: The Way of Water",
    rating: 8.5,
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/t6Sna4vF9p9alS299p6997p9U6f.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/mY7pYs7vYI79bS7hWllunC0m9MM.jpg",
    genre: ["动作", "冒险", "科幻"],
    duration: "192分钟",
    overview: "杰克·萨利（Jake Sully）和奈蒂莉（Neytiri）在潘多拉星球上组建了家庭。然而,古老的威胁再次降临,他们不得不离开家园,在大海的奇幻世界中寻求庇护。",
    cast: [
      { id: 101, name: "萨姆·沃辛顿", role: "Jake Sully", photo: "https://image.tmdb.org/t/p/w200/ih9mZ8pS7v977v977v977v977v9.jpg", bio: "萨姆·沃辛顿是一名澳大利亚演员,因在《阿凡达》中饰演杰克·萨利而闻名。" },
      { id: 102, name: "佐伊·索尔达娜", role: "Neytiri", photo: "https://image.tmdb.org/t/p/w200/v9v9v9v9v9v9v9v9v9v9v9v9.jpg", bio: "佐伊·索尔达娜是美国著名的女演员,参演过《银河护卫队》等。" },
      { id: 103, name: "凯特·温丝莱特", role: "Ronal", photo: "https://image.tmdb.org/t/p/w200/k9k9k9k9k9k9k9k9k9k9k9k9.jpg", bio: "奥斯卡影后,代表作有《泰坦尼克号》。" }
    ]
  },
  {
    id: 502356,
    title: "超级马力欧兄弟大电影",
    originalTitle: "The Super Mario Bros. Movie",
    rating: 7.8,
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/qNBA7oc4GslS6akC2p94L7Ssh5Z.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/9n2t0LpS0SR1091KGbPZ56u2unp.jpg",
    genre: ["动画", "家庭", "冒险"],
    duration: "92分钟",
    overview: "马力欧和弟弟路易吉在修理地下管道时,意外通过神奇管道传送到了一个神秘的新世界...",
    cast: [
      { id: 73457, name: "克里斯·帕拉特", role: "Mario (voice)", photo: "https://image.tmdb.org/t/p/w200/83o3ko9SqpTeZ5u6FEZ7vC4SClA.jpg", bio: "美国演员,以《银河护卫队》中的星爵角色闻名。" }
    ]
  },
  {
    id: 822119,
    title: "流浪地球 2",
    originalTitle: "The Wandering Earth II",
    rating: 8.9,
    year: 2023,
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6vV8fOQ8I49O7T1r9Qc8zR8vV8f.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/h8v8v8v8v8v8v8v8v8v8v8v8.jpg",
    genre: ["科幻", "冒险", "灾难"],
    duration: "173分钟",
    overview: "太阳即将灭绝,人类为了生存启动了“流浪地球”计划。在移居地下的漫长岁月中,地表危机不断。",
    cast: [
      { id: 201, name: "吴京", role: "刘培强", photo: "https://image.tmdb.org/t/p/w200/w9w9w9w9w9w9w9w9w9w9w9w9.jpg", bio: "中国著名动作演员和导演。" },
      { id: 202, name: "刘德华", role: "图恒宇", photo: "https://image.tmdb.org/t/p/w200/l9l9l9l9l9l9l9l9l9l9l9l9.jpg", bio: "全能艺人,华语影坛常青树。" }
    ]
  }
];

export const searchMovies = async (query) => {
  if (!API_KEY || API_KEY === '你的_TMDB_API_KEY_在这里' || !query) {
    if (!query) return MOCK_MOVIES;
    const results = MOCK_MOVIES.filter(m =>
      m.title.includes(query) || m.originalTitle.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=zh-CN`);
    const data = await response.json();
    return (data.results || []).map(m => ({
      id: m.id,
      title: m.title,
      originalTitle: m.original_title,
      rating: m.vote_average?.toFixed(1) || '0.0',
      year: m.release_date?.split('-')[0] || '未知',
      poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
      backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : '',
    }));
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  if (!API_KEY || API_KEY === '你的_TMDB_API_KEY_在这里') {
    return MOCK_MOVIES.find(m => m.id === parseInt(id));
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=zh-CN&append_to_response=credits`);
    const m = await response.json();
    if (!m.id) return null;
    return {
      id: m.id,
      title: m.title,
      originalTitle: m.original_title,
      rating: m.vote_average?.toFixed(1) || '0.0',
      year: m.release_date?.split('-')[0] || '未知',
      poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
      backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : '',
      genre: m.genres?.map(g => g.name) || [],
      duration: `${m.runtime || 0}分钟`,
      overview: m.overview || "暂无简介",
      cast: (m.credits?.cast || []).slice(0, 10).map(c => ({
        id: c.id,
        name: c.name,
        role: c.character,
        photo: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : 'https://via.placeholder.com/200x200?text=No+Photo'
      }))
    };
  } catch (error) {
    console.error('Details error:', error);
    return null;
  }
};

export const getActorDetails = async (id) => {
  if (!API_KEY || API_KEY === '你的_TMDB_API_KEY_在这里') {
    for (const movie of MOCK_MOVIES) {
      const actor = movie.cast.find(a => a.id === parseInt(id));
      if (actor) return actor;
    }
    return null;
  }

  try {
    const response = await fetch(`${TMDB_BASE_URL}/person/${id}?api_key=${API_KEY}&language=zh-CN`);
    const a = await response.json();
    return {
      id: a.id,
      name: a.name,
      role: a.known_for_department,
      photo: a.profile_path ? `https://image.tmdb.org/t/p/w500${a.profile_path}` : 'https://via.placeholder.com/200x200?text=No+Photo',
      bio: a.biography || "暂无个人简介"
    };
  } catch (error) {
    console.error('Actor error:', error);
    return null;
  }
};
