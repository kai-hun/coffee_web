import { useState, useEffect } from 'react';
import './App.css';
import './index.css';

const products = [
  { id: 1, name: "아메리카노", image: process.env.PUBLIC_URL + "/img/아메리카노.png" },
  { id: 2, name: "에스프레소", image: process.env.PUBLIC_URL + "/img/에스프레소.png" },
  { id: 3, name: "카페라떼", image: process.env.PUBLIC_URL + "/img/카페라떼.png" },
  { id: 4, name: "딸기라떼", image: process.env.PUBLIC_URL + "/img/딸기라떼.png" },
  { id: 5, name: "초코라떼", image: process.env.PUBLIC_URL + "/img/초코라떼.png" },
  { id: 6, name: "아이스티", image: process.env.PUBLIC_URL + "/img/아이스티.png" },
  { id: 7, name: "아샷추", image: process.env.PUBLIC_URL + "/img/아샷추.png" },
  { id: 8, name: "카푸치노", image: process.env.PUBLIC_URL + "/img/카푸치노.png" },
  { id: 9, name: "카페모카", image: process.env.PUBLIC_URL + "/img/카페모카.png" },
  { id: 10, name: "망고스무디", image: process.env.PUBLIC_URL + "/img/망고스무디.png" },
];

const sellersData = {};
for (let i = 1; i <= 10; i++) {
  sellersData[i] = Array.from({ length: 10 }, (_, idx) => ({
    name: `판매처${idx + 1}`,
    price: `${1000 + idx * 100}원`,
  }));
}

const cafes = [
  { name: "스타벅스 숭실대점", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.4966749971296!2d126.95269177654808!3d37.49598237205719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9de19d14f76b%3A0xf0be3886d182f1e1!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOyLnOygleuMgOygkA!5e0!3m2!1sko!2skr!4v1624022343241!5m2!1sko!2skr" },
  { name: "컴포즈커피 숭실대점", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.4297073022147!2d126.95387061543172!3d37.49728247981253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9de2059bc7cb%3A0x6749dcfdb53f1a8f!2z7J2867aA7ZqMIOyLoOybkOyImCDspJHqsJXrj5kg67aA7IqkIOq0gOq1rCDsoJA!5e0!3m2!1sko!2skr!4v1624022511499!5m2!1sko!2skr" },
  { name: "투썸플레이스 상도역점", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.3904105594063!2d126.94880301543173!3d37.49812397981281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ddfab5e499f%3A0x1b7196461cb6a20c!2z7ZSE7IKw7ISc7Jq47Yq567OE7IucIOyEnOu2hO2YuCDquIjtmZTrj5kg6rOg7ZSE7JqUIOyLoOyLnA!5e0!3m2!1sko!2skr!4v1624022587630!5m2!1sko!2skr" }
];

function SellerList({ sellers, isOpen }) {
  return (
    <div className={`seller-list-inline ${isOpen ? 'open' : ''}`}>
      <ul>
        {sellers.map((seller, idx) => (
          <li key={idx}>
            {seller.name} - {seller.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductItem({ product, sellers, isSelected, onToggle }) {
  return (
    <div className="product-item" onClick={() => onToggle(product.id)}>
      <img src={product.image} alt={product.name} className="product-img" />
      <p className="product-name">{product.name}</p>
      <SellerList sellers={sellers} isOpen={isSelected} />
    </div>
  );
}

function CoffeePriceComparison({ onBack }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <button className="rounded-button" onClick={onBack}>← 메인으로</button>
      <h2>☕ 커피 가격 비교</h2>
      <div className="product-list">
        {products.map((p) => (
          <ProductItem
            key={p.id}
            product={p}
            sellers={sellersData[p.id]}
            isSelected={selectedIds.includes(p.id)}
            onToggle={toggleProduct}
          />
        ))}
      </div>
    </div>
  );
}

function CafeRecommendationPage({ onBack }) {
  const [mode, setMode] = useState('distance');

  const cafes = [
    { name: "카페솔트", distance: 150, tags: ["제휴", "조용한", "콘센트많음"] },
    { name: "커피빈 숭실대점", distance: 300, tags: ["프랜차이즈", "데이트", "제휴"] },
    { name: "블루보틀 흑석점", distance: 200, tags: ["조용한", "공부용"] },
    { name: "메가커피 상도점", distance: 120, tags: ["프랜차이즈", "가성비"] }
  ];

  let filtered = [...cafes];
  if (mode === 'distance') {
    filtered.sort((a, b) => a.distance - b.distance);
  } else if (mode === 'promotion') {
    filtered = filtered.filter(c => c.tags.includes("제휴"));
  } else if (mode === 'theme') {
    filtered = filtered.filter(c => c.tags.includes("조용한") || c.tags.includes("공부용"));
  }

  return (
    <div>
      <button className="rounded-button" onClick={onBack}>← 메인으로</button>
      <h2>📌 카페 추천</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button className="rounded-button" onClick={() => setMode('distance')}>📏 거리 기준</button>
        <button className="rounded-button" onClick={() => setMode('promotion')}>🎁 제휴 행사</button>
        <button className="rounded-button" onClick={() => setMode('theme')}>🌈 테마별</button>
      </div>
      <ul>
        {filtered.map((cafe, idx) => (
          <li key={idx} style={{ marginBottom: '12px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
            <strong>{cafe.name}</strong><br />
            거리: {cafe.distance}m<br />
            태그: {cafe.tags.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}


function BulletinBoard({ posts, setPosts, onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdatePost = () => {
    if (!title.trim() || !content.trim()) return;
    if (editIndex !== null) {
      const updated = [...posts];
      updated[editIndex] = { title, content };
      setPosts(updated);
      setEditIndex(null);
    } else {
      setPosts([...posts, { title, content }]);
    }
    setTitle('');
    setContent('');
  };

  const handleDelete = (index) => {
    const updated = [...posts];
    updated.splice(index, 1);
    setPosts(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(posts[index].title);
    setContent(posts[index].content);
  };

  return (
    <div>
      <button className="rounded-button" onClick={onBack}>← 메인으로</button>
      <h2>📝 게시판</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          style={{ padding: '8px', width: '300px', marginBottom: '5px' }}
        /><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={4}
          style={{ padding: '8px', width: '300px' }}
        /><br />
        <button className="rounded-button" onClick={addOrUpdatePost} style={{ marginTop: '8px' }}>
          {editIndex !== null ? '수정 완료' : '작성'}
        </button>
      </div>

      <ul>
        {posts.map((post, idx) => (
          <li key={idx} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <div style={{ marginTop: '5px' }}>
              <button className="rounded-button" style={{ marginRight: '10px' }} onClick={() => handleEdit(idx)}>수정</button>
              <button className="rounded-button" onClick={() => handleDelete(idx)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('bulletinPosts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bulletinPosts', JSON.stringify(posts));
  }, [posts]);

  return (
    <div className="app-container">
      <h1>메인 페이지</h1>
      {currentPage === null && (
        <div className="menu-button-grid">
          <button className="rounded-button large-button" onClick={() => setCurrentPage('coffee')}>1. ☕ 커피 가격 비교</button>
          <button className="rounded-button large-button" onClick={() => setCurrentPage('recommend')}>2. 📌 카페 추천</button>
          <button className="rounded-button large-button" onClick={() => setCurrentPage('board')}>3. 📝 게시판</button>
          <button className="rounded-button large-button" onClick={() => alert('아직 준비 중입니다.')}>4. 🔧 빈 메뉴</button>
        </div>
      )}
      {currentPage === 'coffee' && <CoffeePriceComparison onBack={() => setCurrentPage(null)} />}
      {currentPage === 'recommend' && (<CafeRecommendationPage onBack={() => setCurrentPage(null)} />)}
      {currentPage === 'board' && (<BulletinBoard posts={posts} setPosts={setPosts} onBack={() => setCurrentPage(null)}/>)}
    </div>
  );
}

export default App;
