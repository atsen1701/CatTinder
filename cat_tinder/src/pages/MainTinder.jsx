//IMPORT FOR THE CSS of MainTinder.css
import '../css/MainTinder.css'
import { useEffect, useState, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'
import { FaCat, FaHeart } from 'react-icons/fa';

// Array of the catNames
const catNames = [
    'Tam',
    'Oyen',
    'Hitam',
    'Simba',
    'Bulan',
    'Ali',
    'Manja',
    'Kuning',
    'Putih',
    'Comel',
    'Nala',
    'Cik Putih',
    'Milo',
    'Harimau',
    'Kasut',
    'Labu',
    'Kunyit',
    'Kelabu',
    'Tomey',
    'Bunga'
];
//Array of the catLocations 
const catLocations = [
    'Sungai Petani, Kedah',
    'Simpang Ampat, Penang',
    'Gurun, Kedah',
    'Sik, Kedah',
    'Bayan Lepas, Penang',
    'Kuala Lumpur',
    'Shah Alam, Selangor',
    'Ipoh, Perak',
    'Johor Bahru, Johor',
    'Kota Bharu, Kelantan'
];
//Array of the catBios
const catBios = [
    'Suka tidur bawah cahaya matahari one.',
    'Pantang nampak laser, terus zoom-zoom!',
    'Kalau happy, purring sampai jiran boleh dengar.',
    'Mesti panjat langsir, tak boleh tahan.',
    'Tuna lagi sedap than ayam, confirm!',
    'Meow dia lain macam, macam DJ remix.',
    'Suka sangat kalau orang gosok perut dia.',
    'Asyik tengok burung luar tingkap je.',
    'Semua benda nak explore, sibuk betul.',
    'Melekat kat riba orang, macam kucing manja VIP.'

];

//function to fetch the random set of array from the above array(combination)
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//function for MainTinder which is gonna be triggered when the "Get Started" is trigger
function MainTinder() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [swipeFeedback, setSwipeFeedback] = useState(null); // 'like' or 'dislike'
    const [animating, setAnimating] = useState(false);
    const feedbackTimeout = useRef(null);
    const [swipeCount, setSwipeCount] = useState(0);

    const fetchCats = async (count = 6) => {
        setLoading(true);
        const catData = [];
        for (let i = 0; i < count; i++) {
            const url = `https://cataas.com/cat?width=300&height=300&json=true&_=${Date.now()}${i}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                catData.push({
                    img: data.url.startsWith('/')
                        ? `https://cataas.com${data.url}`
                        : data.url,
                    name: getRandom(catNames),
                    location: getRandom(catLocations),
                    info: getRandom(catBios)
                });
            } catch (e) {
                catData.push({
                    img: 'https://cataas.com/cat/says/Meow?width=300&height=300',
                    name: getRandom(catNames),
                    location: getRandom(catLocations),
                    info: getRandom(catBios)
                });
            }
        }
        setCats(prev => [...prev, ...catData]);
        setLoading(false);
    };

    useEffect(() => {
        fetchCats();
        // eslint-disable-next-line
    }, []);

    // Remove top card and record like/dislike
    const handleSwipe = (dir) => {
        if (animating || cats.length === 0 || swipeCount >= 10) return;
        setAnimating(true);
        setSwipeFeedback(dir);
        feedbackTimeout.current = setTimeout(() => {
            setSwipeFeedback(null);
            setAnimating(false);
            if (dir === 'like') setLikes(prev => [...prev, cats[0]]);
            if (dir === 'dislike') setDislikes(prev => [...prev, cats[0]]);
            setCats(prev => prev.slice(1));
            setSwipeCount(prev => prev + 1);
        }, 500);
    };

    // Fetch more cats if stack is low and not at swipe limit
    useEffect(() => {
        if (!loading && cats.length < 3 && swipeCount < 10) fetchCats();
        // eslint-disable-next-line
    }, [cats, loading, swipeCount]);

    // Clean up feedback timeout
    useEffect(() => () => clearTimeout(feedbackTimeout.current), []);

    // Restart function
    const handleRestart = () => {
        setLikes([]);
        setDislikes([]);
        setCats([]);
        setSwipeCount(0); 
        setLoading(true);
        fetchCats();
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('dislike'),
        onSwipedRight: () => handleSwipe('like'),
        trackMouse: true,
        preventDefaultTouchmoveEvent: true,
    });

    return (
        <div className="tinder-bg">
            <div className="tinder-title-row">
                <h2 className="tinder-title">CatTinder</h2>
                <span className="cat-kiss-icon" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FaCat style={{ transform: 'scaleX(1)', fontSize: '2rem', verticalAlign: 'middle' }} />
                    <FaHeart color="#ef4444" style={{ fontSize: '2.1rem', verticalAlign: 'middle' }} />
                    <FaCat style={{ transform: 'scaleX(-1)', fontSize: '2rem', verticalAlign: 'middle' }} />
                </span>
            </div>
            {(swipeCount >= 10) ? (
                <div className="tinder-summary">
                    <h3>You have liked {likes.length} cat{likes.length !== 1 ? 's' : ''}!</h3>
                    <div className="tinder-liked-cats">
                        {likes.length === 0 ? (
                            <p>No cats liked this round. Try again!</p>
                        ) : (
                            likes.map((cat, idx) => (
                                <div className="tinder-liked-card" key={cat.img + cat.name + idx}>
                                    <img src={cat.img} alt={cat.name} className="tinder-cat-img" />
                                    <div className="tinder-card-info">
                                        <h4>{cat.name}</h4>
                                        <p className="tinder-location">{cat.location}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <button className="tinder-next-btn" onClick={handleRestart}>Restart</button>
                </div>
            ) : (
                <div className="tinder-stack">
                    {cats.slice(0, 3).reverse().map((cat, idx) => {
                        const isTop = idx === 2;
                        return (
                            <div
                                key={cat.img + cat.name}
                                className={`tinder-card-stack${isTop ? ' top' : ''}${animating && isTop ? ` swipe-${swipeFeedback}` : ''}`}
                                style={{ zIndex: idx + 1 }}
                                {...(isTop ? swipeHandlers : {})}
                            >
                                <img src={cat.img} alt={cat.name} className="tinder-cat-img" />
                                <div className="tinder-card-info">
                                    <h3>{cat.name}</h3>
                                    <p className="tinder-location">{cat.location}</p>
                                    <p className="tinder-desc">{cat.info}</p>
                                </div>
                                {isTop && swipeFeedback && (
                                    <div className={`swipe-feedback ${swipeFeedback}`}>{swipeFeedback === 'like' ? 'Liked!' : 'Disliked!'}</div>
                                )}
                                {isTop && (
                                    <>
                                        <button className="tinder-arrow left" onClick={() => handleSwipe('dislike')} disabled={animating || swipeCount >= 10}>&#8592;</button>
                                        <button className="tinder-arrow right" onClick={() => handleSwipe('like')} disabled={animating || swipeCount >= 10}>&#8594;</button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                    {loading && <div className="tinder-loading">Loading cats...</div>}
                </div>
            )}
        </div>
    );
}

export default MainTinder