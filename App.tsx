import React, { useState, useEffect } from 'react';

// --- Types ---

interface IconWrapperProps {
  children: React.ReactNode;
  size?: number | string;
  className?: string;
}

type IconProps = Omit<IconWrapperProps, 'children'>;

interface WordItem {
  word: string;
  meaning: string;
  level: number;
  category: string;
}

interface WorldItem {
  id: number;
  name: string;
  enemy: string;
  hp: number;
  img: string;
  theme: string;
  bgPattern: string;
  desc: string;
  textColor: string;
}

interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  maxLevel: number;
  stars: Record<number, number>;
  wins: number; // PVP wins
}

type GameState = 
  | 'SPLASH' 
  | 'PROFILE_SELECT' 
  | 'PROFILE_CREATE' 
  | 'MENU' 
  | 'WORLD_SELECT' 
  | 'LEVEL_SELECT' 
  | 'PLAYING' 
  | 'VICTORY' 
  | 'DEFEAT' 
  | 'PVP_SETUP' 
  | 'PVP_PLAYING' 
  | 'PVP_VICTORY';

// --- Built-in Icons ---

const IconWrapper: React.FC<IconWrapperProps> = ({ children, size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const Heart: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </IconWrapper>
);

const Volume2: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </IconWrapper>
);

const Sword: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="19" y1="21" x2="21" y2="19" />
  </IconWrapper>
);

const Star: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </IconWrapper>
);

const Trophy: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </IconWrapper>
);

const ArrowRight: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </IconWrapper>
);

const ArrowLeft: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </IconWrapper>
);

const RefreshCcw: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M3 2v6h6" />
    <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
    <path d="M21 22v-6h-6" />
    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
  </IconWrapper>
);

const Home: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconWrapper>
);

const MapIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </IconWrapper>
);

const Lock: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconWrapper>
);

const Users: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrapper>
);

const Plus: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconWrapper>
);

const UserCheck: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </IconWrapper>
);

// --- Game Configuration & Data ---

const AVATARS = [
  "🤴", "👸", "🧙‍♂️", "🧙‍♀️", "🧚", "🧜‍♂️", "🧛‍♂️", "🧟", 
  "🧞‍♂️", "🦸‍♂️", "🦹‍♀️", "🦊", "🦁", "🐼", "🤖", "👽",
  "🐵", "🐶", "🐺", "🦄"
];

const FULL_WORD_LIST: WordItem[] = [
  // --- NUMBERS (Category: number) ---
  { word: "one", meaning: "一", level: 1, category: "number" },
  { word: "two", meaning: "二", level: 1, category: "number" },
  { word: "three", meaning: "三", level: 1, category: "number" },
  { word: "four", meaning: "四", level: 1, category: "number" },
  { word: "five", meaning: "五", level: 1, category: "number" },
  { word: "six", meaning: "六", level: 1, category: "number" },
  { word: "seven", meaning: "七", level: 2, category: "number" },
  { word: "eight", meaning: "八", level: 2, category: "number" },
  { word: "nine", meaning: "九", level: 2, category: "number" },
  { word: "ten", meaning: "十", level: 2, category: "number" },

  // --- ANIMALS (Category: animal) ---
  { word: "cat", meaning: "猫", level: 1, category: "animal" },
  { word: "dog", meaning: "狗", level: 1, category: "animal" },
  { word: "pig", meaning: "猪", level: 1, category: "animal" },
  { word: "bird", meaning: "鸟", level: 2, category: "animal" },
  { word: "fish", meaning: "鱼", level: 2, category: "animal" },
  { word: "bear", meaning: "熊", level: 3, category: "animal" },
  { word: "lion", meaning: "狮子", level: 3, category: "animal" },
  { word: "tiger", meaning: "老虎", level: 4, category: "animal" },
  { word: "zebra", meaning: "斑马", level: 4, category: "animal" },
  { word: "elephant", meaning: "大象", level: 5, category: "animal" },
  { word: "monkey", meaning: "猴子", level: 5, category: "animal" },
  { word: "panda", meaning: "熊猫", level: 5, category: "animal" },
  { word: "rabbit", meaning: "兔子", level: 5, category: "animal" },
  { word: "duck", meaning: "鸭子", level: 5, category: "animal" },

  // --- COLORS (Category: color) ---
  { word: "red", meaning: "红色", level: 2, category: "color" },
  { word: "blue", meaning: "蓝色", level: 2, category: "color" },
  { word: "green", meaning: "绿色", level: 2, category: "color" },
  { word: "yellow", meaning: "黄色", level: 3, category: "color" },
  { word: "orange", meaning: "橙色", level: 3, category: "color" },
  { word: "black", meaning: "黑色", level: 3, category: "color" },
  { word: "white", meaning: "白色", level: 3, category: "color" },
  { word: "purple", meaning: "紫色", level: 4, category: "color" },
  { word: "pink", meaning: "粉色", level: 4, category: "color" },

  // --- BODY PARTS (Category: body) ---
  { word: "eye", meaning: "眼睛", level: 4, category: "body" },
  { word: "ear", meaning: "耳朵", level: 4, category: "body" },
  { word: "nose", meaning: "鼻子", level: 4, category: "body" },
  { word: "mouth", meaning: "嘴巴", level: 4, category: "body" },
  { word: "hand", meaning: "手", level: 5, category: "body" },
  { word: "face", meaning: "脸", level: 5, category: "body" },
  { word: "foot", meaning: "脚", level: 5, category: "body" },
  { word: "leg", meaning: "腿", level: 5, category: "body" },
  { word: "arm", meaning: "手臂", level: 5, category: "body" },

  // --- FAMILY (Category: family) ---
  { word: "mom", meaning: "妈妈", level: 6, category: "family" },
  { word: "dad", meaning: "爸爸", level: 6, category: "family" },
  { word: "sister", meaning: "姐妹", level: 6, category: "family" },
  { word: "brother", meaning: "兄弟", level: 6, category: "family" },
  { word: "grandma", meaning: "奶奶/外婆", level: 7, category: "family" },
  { word: "grandpa", meaning: "爷爷/外公", level: 7, category: "family" },
  { word: "baby", meaning: "婴儿", level: 7, category: "family" },

  // --- NATURE (Category: nature) ---
  { word: "sun", meaning: "太阳", level: 3, category: "nature" },
  { word: "moon", meaning: "月亮", level: 3, category: "nature" },
  { word: "star", meaning: "星星", level: 3, category: "nature" },
  { word: "sky", meaning: "天空", level: 3, category: "nature" },
  { word: "tree", meaning: "树", level: 8, category: "nature" },
  { word: "flower", meaning: "花", level: 8, category: "nature" },
  { word: "grass", meaning: "草", level: 8, category: "nature" },
  { word: "river", meaning: "河流", level: 9, category: "nature" },
  { word: "mountain", meaning: "山", level: 9, category: "nature" },
  { word: "fire", meaning: "火", level: 9, category: "nature" },
  { word: "ice", meaning: "冰", level: 9, category: "nature" },

  // --- FOOD (Category: food) ---
  { word: "apple", meaning: "苹果", level: 10, category: "food" },
  { word: "banana", meaning: "香蕉", level: 10, category: "food" },
  { word: "milk", meaning: "牛奶", level: 10, category: "food" },
  { word: "water", meaning: "水", level: 10, category: "food" },
  { word: "bread", meaning: "面包", level: 11, category: "food" },
  { word: "cake", meaning: "蛋糕", level: 11, category: "food" },
  { word: "egg", meaning: "鸡蛋", level: 11, category: "food" },
  { word: "rice", meaning: "米饭", level: 11, category: "food" },

  // --- OBJECTS/SCHOOL (Category: object) ---
  { word: "book", meaning: "书", level: 12, category: "object" },
  { word: "pen", meaning: "钢笔", level: 12, category: "object" },
  { word: "bag", meaning: "包", level: 12, category: "object" },
  { word: "desk", meaning: "书桌", level: 12, category: "object" },
  { word: "chair", meaning: "椅子", level: 12, category: "object" },
  { word: "box", meaning: "盒子", level: 13, category: "object" },
  { word: "map", meaning: "地图", level: 13, category: "object" },
  { word: "hat", meaning: "帽子", level: 13, category: "object" },
  { word: "bus", meaning: "公交车", level: 13, category: "transport" },
  { word: "car", meaning: "汽车", level: 13, category: "transport" },
  { word: "bike", meaning: "自行车", level: 13, category: "transport" },
  { word: "train", meaning: "火车", level: 13, category: "transport" },

  // --- VERBS (Category: action) ---
  { word: "run", meaning: "跑", level: 14, category: "action" },
  { word: "jump", meaning: "跳", level: 14, category: "action" },
  { word: "swim", meaning: "游泳", level: 14, category: "action" },
  { word: "fly", meaning: "飞", level: 14, category: "action" },
  { word: "sing", meaning: "唱歌", level: 15, category: "action" },
  { word: "dance", meaning: "跳舞", level: 15, category: "action" },
  { word: "read", meaning: "读", level: 15, category: "action" },
  { word: "write", meaning: "写", level: 15, category: "action" },
  { word: "play", meaning: "玩", level: 15, category: "action" },
  { word: "sleep", meaning: "睡觉", level: 15, category: "action" },

  // --- ADJECTIVES (Category: adjective) ---
  { word: "big", meaning: "大的", level: 16, category: "adjective" },
  { word: "small", meaning: "小的", level: 16, category: "adjective" },
  { word: "long", meaning: "长的", level: 16, category: "adjective" },
  { word: "short", meaning: "短/矮的", level: 16, category: "adjective" },
  { word: "happy", meaning: "快乐", level: 17, category: "adjective" },
  { word: "sad", meaning: "悲伤", level: 17, category: "adjective" },
  { word: "hot", meaning: "热的", level: 17, category: "adjective" },
  { word: "cold", meaning: "冷的", level: 17, category: "adjective" },
  { word: "fast", meaning: "快的", level: 18, category: "adjective" },
  { word: "slow", meaning: "慢的", level: 18, category: "adjective" },
];

const WORLDS: WorldItem[] = [
  { 
    id: 1, 
    name: "Goblin Forest", 
    enemy: "Goblin", 
    hp: 30, 
    img: "👺", 
    theme: "bg-green-600", 
    bgPattern: "bg-green-500", 
    desc: "Thieves in the woods!",
    textColor: "text-green-100"
  },
  { 
    id: 2, 
    name: "Bone Pit", 
    enemy: "Wall Breaker", 
    hp: 50, 
    img: "💀", 
    theme: "bg-slate-600", 
    bgPattern: "bg-slate-500", 
    desc: "Explosive skeletons!",
    textColor: "text-slate-100"
  },
  { 
    id: 3, 
    name: "Barbarian Bowl", 
    enemy: "Barbarian", 
    hp: 70, 
    img: "😡", 
    theme: "bg-orange-700", 
    bgPattern: "bg-orange-600", 
    desc: "Rage and fury!",
    textColor: "text-orange-100"
  },
  { 
    id: 4, 
    name: "Spell Valley", 
    enemy: "Wizard", 
    hp: 90, 
    img: "🧙‍♂️", 
    theme: "bg-purple-600", 
    bgPattern: "bg-purple-500", 
    desc: "Magic is in the air.",
    textColor: "text-purple-100"
  },
  { 
    id: 5, 
    name: "Builder's Base", 
    enemy: "Battle Machine", 
    hp: 110, 
    img: "🔨", 
    theme: "bg-stone-700", 
    bgPattern: "bg-stone-600", 
    desc: "Master construction!",
    textColor: "text-stone-100"
  },
  { 
    id: 6, 
    name: "P.E.K.K.A's House", 
    enemy: "P.E.K.K.A", 
    hp: 130, 
    img: "🤖", 
    theme: "bg-indigo-800", 
    bgPattern: "bg-indigo-700", 
    desc: "Butterfly chaser?",
    textColor: "text-indigo-100"
  },
  { 
    id: 7, 
    name: "Royal Arena", 
    enemy: "Royal Ghost", 
    hp: 150, 
    img: "👻", 
    theme: "bg-yellow-600", 
    bgPattern: "bg-yellow-500", 
    desc: "For the King!",
    textColor: "text-yellow-100"
  },
  { 
    id: 8, 
    name: "Frozen Peak", 
    enemy: "Ice Golem", 
    hp: 170, 
    img: "⛄", 
    theme: "bg-cyan-600", 
    bgPattern: "bg-cyan-500", 
    desc: "Stay frosty.",
    textColor: "text-cyan-100"
  },
  { 
    id: 9, 
    name: "Jungle Arena", 
    enemy: "Dart Goblin", 
    hp: 190, 
    img: "🌿", 
    theme: "bg-emerald-800", 
    bgPattern: "bg-emerald-700", 
    desc: "Wild wilderness.",
    textColor: "text-emerald-100"
  },
  { 
    id: 10, 
    name: "Hog Mountain", 
    enemy: "Hog Rider", 
    hp: 210, 
    img: "🐷", 
    theme: "bg-rose-700", 
    bgPattern: "bg-rose-600", 
    desc: "Hog Rider!!!",
    textColor: "text-rose-100"
  },
  { 
    id: 11, 
    name: "Electro Valley", 
    enemy: "Electro Dragon", 
    hp: 230, 
    img: "⚡", 
    theme: "bg-blue-700", 
    bgPattern: "bg-blue-600", 
    desc: "Zap zap zap!",
    textColor: "text-blue-100"
  },
  { 
    id: 12, 
    name: "Legendary Arena", 
    enemy: "Lava Hound", 
    hp: 250, 
    img: "🌋", 
    theme: "bg-purple-900", 
    bgPattern: "bg-purple-800", 
    desc: "The ultimate test.",
    textColor: "text-purple-100"
  }
];

const LEVELS_PER_WORLD = 10;
const QUESTIONS_PER_LEVEL = 10;
const TOTAL_LEVELS = 120; // 12 Worlds * 10 Levels

// --- Audio Engine ---
const AudioEngine = {
  ctx: null as AudioContext | null,
  init: function() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  playTone: function(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },
  playAttack: function() {
    this.init();
    // Sharper, higher pitch "Ping" sound for correct answer
    this.playTone(600, 'sine', 0.1, 0.2); 
    setTimeout(() => this.playTone(800, 'sine', 0.1, 0.2), 50); 
    setTimeout(() => this.playTone(1200, 'square', 0.05, 0.1), 100); 
  },
  playDamage: function() {
    this.init();
    this.playTone(100, 'sawtooth', 0.2, 0.4); // Deeper Oof
    setTimeout(() => this.playTone(80, 'sawtooth', 0.2, 0.4), 100);
  },
  playWin: function() {
    this.init();
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.3, 0.2), i * 150);
    });
  },
  playFail: function() {
    this.init();
    this.playTone(300, 'sawtooth', 0.4, 0.3);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.4, 0.3), 300);
    setTimeout(() => this.playTone(200, 'sawtooth', 0.6, 0.3), 600);
  },
  speak: function(text: string) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Helper Components ---

interface ProgressBarProps {
  current: number;
  max: number;
  color: string;
  label: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, color, label, className="" }) => {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));
  return (
    <div className={`w-full relative h-6 bg-gray-900 rounded-full border-2 border-gray-700 overflow-hidden shadow-lg ${className}`}>
      <div 
        className={`h-full transition-all duration-300 ease-out ${color}`} 
        style={{ width: `${percent}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white shadow-black drop-shadow-md tracking-wider select-none">
        {label}: {current}/{max}
      </div>
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-amber-50 border-b-8 border-r-4 border-amber-800 rounded-xl shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "danger" | "success" | "secondary" | "blue" | "outline";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = "primary", className = "", disabled = false }) => {
  const baseStyle = "transform active:scale-95 transition-transform font-bold py-3 px-6 rounded-xl border-b-4 uppercase tracking-wider text-sm md:text-base select-none touch-manipulation";
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-yellow-900 border-yellow-700",
    danger: "bg-red-500 hover:bg-red-400 text-white border-red-800",
    success: "bg-green-500 hover:bg-green-400 text-white border-green-800",
    secondary: "bg-gray-200 hover:bg-gray-100 text-gray-700 border-gray-400",
    blue: "bg-blue-500 hover:bg-blue-400 text-white border-blue-800",
    outline: "bg-transparent border-2 border-gray-400 text-gray-600 hover:bg-gray-50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Main Game Component ---

function App() {
  // Game States
  const [gameState, setGameState] = useState<GameState>('SPLASH');
  
  // Players System
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  
  // Profile Creation State
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAvatar, setNewPlayerAvatar] = useState(AVATARS[0]);

  // PVP Setup State
  const [pvpP1Id, setPvpP1Id] = useState<string | null>(null);
  const [pvpP2Id, setPvpP2Id] = useState<string | null>(null);
  const [pickingFor, setPickingFor] = useState<'p1' | 'p2' | null>(null);

  // Load Players from Storage on Mount
  useEffect(() => {
    const stored = localStorage.getItem('cow_players');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPlayers(parsed);
        if (parsed.length > 0) {
          // Check for last active player
          const lastActive = localStorage.getItem('cow_last_active');
          if (lastActive && parsed.find((p: PlayerProfile) => p.id === lastActive)) {
            setActivePlayerId(lastActive);
          }
        }
      } catch (e) {
        console.error("Failed to load players", e);
      }
    }
  }, []);

  const savePlayers = (updatedPlayers: PlayerProfile[]) => {
    setPlayers(updatedPlayers);
    localStorage.setItem('cow_players', JSON.stringify(updatedPlayers));
  };

  const createProfile = () => {
    if (!newPlayerName.trim()) return;
    const newPlayer: PlayerProfile = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      avatar: newPlayerAvatar,
      maxLevel: 1,
      stars: {},
      wins: 0
    };
    const updated = [...players, newPlayer];
    savePlayers(updated);
    setActivePlayerId(newPlayer.id);
    localStorage.setItem('cow_last_active', newPlayer.id);
    setGameState('MENU');
    setNewPlayerName("");
    setNewPlayerAvatar(AVATARS[0]);
  };

  // Helper to get active player object
  const activePlayer = players.find(p => p.id === activePlayerId);
  const maxUnlockedLevel = activePlayer?.maxLevel || 1;
  const levelStars = activePlayer?.stars || {};

  // Progress State
  const [selectedWorld, setSelectedWorld] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  
  // Battle State (Single Player)
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [enemyMaxHp, setEnemyMaxHp] = useState(100);
  const [wordList, setWordList] = useState<WordItem[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [message, setMessage] = useState("");
  const [shakeScreen, setShakeScreen] = useState(false);
  const [attackAnim, setAttackAnim] = useState<'player' | 'enemy' | null>(null);
  
  // PVP State
  const [pvpPlayer1Hp, setPvpPlayer1Hp] = useState(100);
  const [pvpPlayer2Hp, setPvpPlayer2Hp] = useState(100);
  const [pvpWinner, setPvpWinner] = useState<1 | 2 | null>(null);
  const [isRoundActive, setIsRoundActive] = useState(true);

  // Scoring State
  const [mistakesInLevel, setMistakesInLevel] = useState(0);

  // Initialize Level Data (Single Player)
  const startLevel = (globalLevel: number) => {
    AudioEngine.init();
    
    let levelWords = FULL_WORD_LIST.filter(w => w.level === globalLevel);
    
    // Fallback fill
    if (levelWords.length < QUESTIONS_PER_LEVEL) {
        const remainingCount = QUESTIONS_PER_LEVEL - levelWords.length;
        const otherWords = FULL_WORD_LIST.sort(() => 0.5 - Math.random()).slice(0, remainingCount);
        levelWords = [...levelWords, ...otherWords];
    }
    
    // Shuffle final list
    levelWords = levelWords.sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_LEVEL);
    
    setWordList(levelWords);
    setCurrentWordIndex(0);
    setMistakesInLevel(0); 
    
    // Setup Enemy based on World
    const worldId = Math.ceil(globalLevel / LEVELS_PER_WORLD);
    const worldConfig = WORLDS.find(w => w.id === worldId) || WORLDS[0];
    
    const levelInWorld = (globalLevel - 1) % LEVELS_PER_WORLD; 
    const hp = worldConfig.hp + (levelInWorld * 5); 
    
    setEnemyMaxHp(hp);
    setEnemyHp(hp);
    setPlayerHp(100); 
    
    setCurrentLevel(globalLevel);
    setGameState('PLAYING');
    setMessage("");
  };

  // Initialize PVP Match
  const startPvp = () => {
    if (!pvpP1Id || !pvpP2Id) return; // Should be handled by UI
    AudioEngine.init();
    setPvpPlayer1Hp(100);
    setPvpPlayer2Hp(100);
    setPvpWinner(null);
    setIsRoundActive(true);
    
    // Generate endless random words
    const pvpWords = FULL_WORD_LIST.sort(() => 0.5 - Math.random()).slice(0, 50);
    setWordList(pvpWords);
    setCurrentWordIndex(0);
    
    setGameState('PVP_PLAYING');
    setMessage("");
  };

  // Generate Current Question Effect
  useEffect(() => {
    const isPlayingSingle = gameState === 'PLAYING';
    const isPlayingPvp = gameState === 'PVP_PLAYING';
    
    if ((isPlayingSingle || isPlayingPvp) && wordList.length > 0) {
      if (currentWordIndex >= wordList.length) {
        if (isPlayingSingle) handleWin();
        else {
           // PVP endless? Reshuffle if run out
           const moreWords = FULL_WORD_LIST.sort(() => 0.5 - Math.random()).slice(0, 50);
           setWordList(moreWords);
           setCurrentWordIndex(0);
        }
        return;
      }
      generateOptions();
      // Auto speak
      setTimeout(() => {
         AudioEngine.speak(wordList[currentWordIndex].word);
      }, 500);
    }
  }, [currentWordIndex, gameState, wordList]);

  // Option Generation
  const generateOptions = () => {
    const currentWord = wordList[currentWordIndex];
    
    let categoryDistractors = FULL_WORD_LIST.filter(w => 
      w.category === currentWord.category && 
      w.word !== currentWord.word
    );
    
    let distractors: WordItem[] = [];
    
    if (categoryDistractors.length >= 3) {
       distractors = categoryDistractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    } else {
       const needed = 3 - categoryDistractors.length;
       const randomDistractors = FULL_WORD_LIST
         .filter(w => w.word !== currentWord.word && !categoryDistractors.includes(w))
         .sort(() => 0.5 - Math.random())
         .slice(0, needed);
         
       distractors = [...categoryDistractors, ...randomDistractors];
    }
    
    const allOptions = [...distractors, currentWord].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  const handleAnswer = (selectedWord: WordItem) => {
    const target = wordList[currentWordIndex];
    
    if (selectedWord.word === target.word) {
      // Correct
      AudioEngine.playAttack();
      setAttackAnim('player');
      
      const damage = Math.ceil(enemyMaxHp / QUESTIONS_PER_LEVEL * 1.1); 
      setEnemyHp(prev => Math.max(0, prev - damage));
      setMessage("EXCELLENT!");
      
      setTimeout(() => {
        setAttackAnim(null);
        if (enemyHp - damage <= 0) {
          handleWin();
        } else {
          setCurrentWordIndex(prev => prev + 1);
          setMessage("");
        }
      }, 800);
      
    } else {
      // Incorrect
      AudioEngine.playDamage();
      setShakeScreen(true);
      setAttackAnim('enemy');
      
      const newMistakes = mistakesInLevel + 1;
      setMistakesInLevel(newMistakes);
      
      const damage = 34; 
      
      setPlayerHp(prev => {
        const newHp = Math.max(0, prev - damage);
        return newHp;
      });
      
      setMessage(`Oops! That was ${selectedWord.word}.`);
      
      setTimeout(() => {
        setShakeScreen(false);
        setAttackAnim(null);
        
        if (playerHp - damage <= 0) {
          handleLose();
        } else {
          generateOptions();
        }
      }, 800);
    }
  };

  const handlePvpAnswer = (player: 1 | 2, selectedWord: WordItem) => {
    if (!isRoundActive) return;

    const target = wordList[currentWordIndex];

    if (selectedWord.word === target.word) {
      // CORRECT
      setIsRoundActive(false);
      AudioEngine.playAttack();
      
      // Damage opponent
      const damage = 15;
      if (player === 1) {
        setPvpPlayer2Hp(prev => Math.max(0, prev - damage));
        setAttackAnim('player'); // P1 attacks
      } else {
        setPvpPlayer1Hp(prev => Math.max(0, prev - damage));
        setAttackAnim('enemy'); // P2 (Top) attacks
      }

      setTimeout(() => {
        setAttackAnim(null);
        // Check win condition
        if ((player === 1 && pvpPlayer2Hp - damage <= 0) || (player === 2 && pvpPlayer1Hp - damage <= 0)) {
           setPvpWinner(player);
           // Update win stats
           const winnerId = player === 1 ? pvpP1Id : pvpP2Id;
           const updatedPlayers = players.map(p => {
             if (p.id === winnerId) return { ...p, wins: (p.wins || 0) + 1 };
             return p;
           });
           savePlayers(updatedPlayers);
           
           setGameState('PVP_VICTORY');
           AudioEngine.playWin();
        } else {
           setCurrentWordIndex(prev => prev + 1);
           setIsRoundActive(true);
        }
      }, 800);

    } else {
      // WRONG - Penalty
      AudioEngine.playDamage();
      const penalty = 5;
      if (player === 1) {
        setPvpPlayer1Hp(prev => Math.max(0, prev - penalty));
      } else {
        setPvpPlayer2Hp(prev => Math.max(0, prev - penalty));
      }
      
      // Check self-KO
      if ((player === 1 && pvpPlayer1Hp - penalty <= 0)) {
        setPvpWinner(2);
        // P2 wins
        const winnerId = pvpP2Id;
        const updatedPlayers = players.map(p => {
           if (p.id === winnerId) return { ...p, wins: (p.wins || 0) + 1 };
           return p;
        });
        savePlayers(updatedPlayers);
        
        setGameState('PVP_VICTORY');
        AudioEngine.playWin();
      } else if ((player === 2 && pvpPlayer2Hp - penalty <= 0)) {
        setPvpWinner(1);
        // P1 wins
        const winnerId = pvpP1Id;
        const updatedPlayers = players.map(p => {
           if (p.id === winnerId) return { ...p, wins: (p.wins || 0) + 1 };
           return p;
        });
        savePlayers(updatedPlayers);

        setGameState('PVP_VICTORY');
        AudioEngine.playWin();
      }
    }
  };

  const handleWin = () => {
    AudioEngine.playWin();
    
    let stars = 0;
    if (mistakesInLevel === 0) stars = 3;
    else if (mistakesInLevel === 1) stars = 2;
    else if (mistakesInLevel === 2) stars = 1;
    else stars = 0; 

    // Update Player Stats
    if (activePlayer && activePlayerId) {
        const currentBest = activePlayer.stars[currentLevel] || 0;
        let newStars = activePlayer.stars;
        
        if (stars > currentBest) {
            newStars = { ...activePlayer.stars, [currentLevel]: stars };
        }
        
        let newMaxLevel = activePlayer.maxLevel;
        if (stars >= 1) {
            if (currentLevel === activePlayer.maxLevel && currentLevel < TOTAL_LEVELS) {
                newMaxLevel = currentLevel + 1;
            }
        }
        
        const updatedPlayers = players.map(p => 
           p.id === activePlayerId 
             ? { ...p, stars: newStars, maxLevel: newMaxLevel } 
             : p
        );
        savePlayers(updatedPlayers);
    }

    setGameState('VICTORY');
  };

  const handleLose = () => {
    AudioEngine.playFail();
    setGameState('DEFEAT');
  };

  // --- Render Functions ---
  
  // 0. SPLASH SCREEN & PLAYER ROUTING
  if (gameState === 'SPLASH') {
      return (
          <div className="h-[100dvh] w-full bg-amber-500 flex flex-col items-center justify-center animate-fadeIn select-none overflow-hidden">
              <div className="text-8xl mb-6 animate-bounce drop-shadow-2xl">
                  ⚔️
              </div>
              <h1 className="text-4xl font-black text-white uppercase tracking-widest drop-shadow-md mb-2">
                  Clash of Words
              </h1>
              <div className="text-amber-800 font-bold uppercase tracking-wide text-sm mb-8">
                  English Hero RPG
              </div>
              <div className="w-48 h-2 bg-amber-700/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white animate-[width_2s_ease-out_forwards]" style={{width: '0%'}}></div>
              </div>
              <button 
                onClick={() => {
                   if (players.length === 0) setGameState('PROFILE_CREATE');
                   else if (!activePlayerId) setGameState('PROFILE_SELECT');
                   else setGameState('MENU');
                }}
                className="mt-12 text-white/80 uppercase font-bold text-sm animate-pulse"
              >
                Tap to Start
              </button>
          </div>
      );
  }

  // 0.1 PROFILE SELECTION
  if (gameState === 'PROFILE_SELECT') {
      return (
        <div className="h-[100dvh] bg-sky-100 flex flex-col items-center p-4">
             <h2 className="text-3xl font-black text-sky-900 mt-8 mb-2">WHO IS PLAYING?</h2>
             <p className="text-sky-600 font-bold mb-8">Select your hero profile</p>
             
             <div className="grid grid-cols-2 gap-4 w-full max-w-lg overflow-y-auto pb-20 px-2">
                {players.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => {
                        setActivePlayerId(p.id);
                        localStorage.setItem('cow_last_active', p.id);
                        setGameState('MENU');
                    }}
                    className="bg-white p-4 rounded-xl border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center shadow-lg"
                  >
                     <div className="text-6xl mb-2">{p.avatar}</div>
                     <div className="font-black text-xl text-gray-800 truncate w-full">{p.name}</div>
                     <div className="text-xs font-bold text-gray-400 mt-1 uppercase">Lvl {p.maxLevel} • {Object.keys(p.stars).length} Stars</div>
                  </button>
                ))}
                
                <button 
                  onClick={() => setGameState('PROFILE_CREATE')}
                  className="bg-sky-200 border-2 border-dashed border-sky-400 p-4 rounded-xl flex flex-col items-center justify-center text-sky-500 hover:bg-sky-200 transition-colors min-h-[160px]"
                >
                   <Plus size={48} className="mb-2" />
                   <span className="font-bold uppercase">New Hero</span>
                </button>
             </div>
        </div>
      );
  }

  // 0.2 PROFILE CREATION
  if (gameState === 'PROFILE_CREATE') {
      return (
        <div className="h-[100dvh] bg-amber-50 flex flex-col items-center p-4 pt-12">
           <Card className="w-full max-w-md p-6 bg-white">
              <h2 className="text-2xl font-black text-amber-900 mb-6 text-center">CREATE HERO</h2>
              
              <div className="mb-6">
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hero Name</label>
                 <input 
                   type="text" 
                   value={newPlayerName}
                   onChange={(e) => setNewPlayerName(e.target.value.slice(0, 12))}
                   placeholder="Enter Name..."
                   className="w-full text-2xl font-black p-3 bg-gray-100 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none text-center"
                 />
              </div>

              <div className="mb-8">
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2 text-center">Choose Avatar</label>
                 <div className="grid grid-cols-5 gap-2">
                    {AVATARS.map(av => (
                       <button
                         key={av}
                         onClick={() => setNewPlayerAvatar(av)}
                         className={`text-3xl p-2 rounded-lg transition-transform hover:scale-110 ${newPlayerAvatar === av ? 'bg-amber-200 ring-2 ring-amber-400 scale-110' : 'bg-gray-50'}`}
                       >
                         {av}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="flex gap-2">
                  {players.length > 0 && (
                      <Button onClick={() => setGameState('PROFILE_SELECT')} variant="secondary" className="flex-1">
                          Cancel
                      </Button>
                  )}
                  <Button onClick={createProfile} disabled={!newPlayerName.trim()} className="flex-1">
                      Start Adventure
                  </Button>
              </div>
           </Card>
        </div>
      );
  }

  // 1. MENU
  if (gameState === 'MENU') {
    return (
      <div className="h-[100dvh] bg-sky-400 font-sans flex items-center justify-center p-4 overflow-hidden select-none relative">
        
        {/* Top Bar: Current Player */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pointer-events-none">
           <div className="pointer-events-auto bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-lg border-b-4 border-gray-200 flex items-center gap-3">
              <div className="text-3xl">{activePlayer?.avatar}</div>
              <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Playing As</div>
                  <div className="font-black text-gray-800 leading-none">{activePlayer?.name}</div>
              </div>
              <button onClick={() => setGameState('PROFILE_SELECT')} className="ml-2 p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                  <RefreshCcw size={16} />
              </button>
           </div>
        </div>

        <Card className="max-w-md w-full p-6 sm:p-8 text-center border-amber-900 bg-orange-100 flex flex-col h-full sm:h-auto justify-center mt-12">
          <div className="mb-6 flex justify-center">
            <div className="w-28 h-28 bg-amber-400 rounded-3xl border-4 border-amber-700 flex items-center justify-center text-6xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              ⚔️
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-amber-900 mb-2 uppercase tracking-tighter drop-shadow-sm">
            Clash of Words
          </h1>
          <p className="text-amber-800 mb-8 font-bold text-lg">English Hero RPG</p>
          
          <div className="space-y-4">
            <Button onClick={() => setGameState('WORLD_SELECT')} className="w-full text-xl py-4 shadow-xl">
              ADVENTURE (1P)
            </Button>
            <Button onClick={() => {
                // Default P1 to active player if possible, else first in list
                setPvpP1Id(activePlayerId || players[0]?.id);
                // Default P2 to someone else if possible
                const other = players.find(p => p.id !== activePlayerId);
                setPvpP2Id(other?.id || players[0]?.id);
                setGameState('PVP_SETUP');
            }} variant="blue" className="w-full text-xl py-4 shadow-xl flex items-center justify-center gap-2">
              <Users size={24} /> VERSUS DUEL (2P)
            </Button>
            <div className="text-sm text-amber-700 mt-4 font-bold">
              12 WORLDS • 120 LEVELS
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // 1.1 PVP SETUP
  if (gameState === 'PVP_SETUP') {
      // If picking a player for a slot
      if (pickingFor) {
          return (
            <div className="h-[100dvh] bg-sky-900 flex flex-col p-4">
               <div className="flex justify-between items-center mb-6 text-white">
                  <h2 className="text-2xl font-black uppercase">Select {pickingFor === 'p1' ? 'Player 1' : 'Player 2'}</h2>
                  <button onClick={() => setPickingFor(null)} className="p-2 bg-white/20 rounded-full"><ArrowLeft /></button>
               </div>
               <div className="grid grid-cols-2 gap-4 overflow-y-auto">
                   {players.map(p => (
                       <button 
                         key={p.id}
                         onClick={() => {
                             if (pickingFor === 'p1') setPvpP1Id(p.id);
                             else setPvpP2Id(p.id);
                             setPickingFor(null);
                         }}
                         className={`p-4 rounded-xl flex flex-col items-center bg-white border-b-4 border-gray-300 ${(pvpP1Id === p.id || pvpP2Id === p.id) ? 'opacity-50 ring-4 ring-red-500' : ''}`}
                       >
                           <div className="text-5xl mb-2">{p.avatar}</div>
                           <div className="font-bold text-gray-800">{p.name}</div>
                           <div className="text-xs text-gray-500 font-bold uppercase mt-1">Wins: {p.wins || 0}</div>
                       </button>
                   ))}
                   <button 
                      onClick={() => {
                          setGameState('PROFILE_CREATE');
                          setPickingFor(null); 
                      }}
                      className="bg-white/10 border-2 border-dashed border-white/30 text-white rounded-xl flex flex-col items-center justify-center min-h-[140px]"
                   >
                       <Plus size={32} />
                       <span className="font-bold mt-2">New</span>
                   </button>
               </div>
            </div>
          )
      }

      const p1 = players.find(p => p.id === pvpP1Id);
      const p2 = players.find(p => p.id === pvpP2Id);

      return (
        <div className="h-[100dvh] bg-sky-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
             {/* VS Background Text */}
             <div className="absolute text-[20rem] font-black text-white/5 select-none pointer-events-none">VS</div>

             <div className="w-full max-w-lg z-10 flex flex-col gap-6">
                 {/* P1 Card */}
                 <div className="bg-amber-500 p-1 rounded-2xl shadow-xl transform rotate-1">
                     <div className="bg-amber-600 p-2 rounded-t-xl text-center font-black text-amber-900 uppercase tracking-widest text-sm">Challenger 1</div>
                     <button onClick={() => setPickingFor('p1')} className="w-full bg-white p-6 rounded-xl flex flex-col items-center active:bg-gray-50 transition-colors">
                         <div className="text-7xl mb-2">{p1?.avatar || "?"}</div>
                         <div className="text-2xl font-black text-gray-800">{p1?.name || "Select Player"}</div>
                         <div className="text-sm font-bold text-gray-400 uppercase mt-1">Tap to Change</div>
                     </button>
                 </div>

                 <div className="text-center">
                     <div className="text-6xl font-black text-white italic drop-shadow-lg text-stroke">VS</div>
                 </div>

                 {/* P2 Card */}
                 <div className="bg-blue-500 p-1 rounded-2xl shadow-xl transform -rotate-1">
                     <div className="bg-blue-600 p-2 rounded-t-xl text-center font-black text-blue-900 uppercase tracking-widest text-sm">Challenger 2</div>
                     <button onClick={() => setPickingFor('p2')} className="w-full bg-white p-6 rounded-xl flex flex-col items-center active:bg-gray-50 transition-colors">
                         <div className="text-7xl mb-2">{p2?.avatar || "?"}</div>
                         <div className="text-2xl font-black text-gray-800">{p2?.name || "Select Player"}</div>
                         <div className="text-sm font-bold text-gray-400 uppercase mt-1">Tap to Change</div>
                     </button>
                 </div>

                 <Button 
                    onClick={startPvp} 
                    disabled={!p1 || !p2 || p1.id === p2.id}
                    className="mt-4 py-4 text-xl shadow-2xl"
                    variant={(!p1 || !p2 || p1.id === p2.id) ? "secondary" : "success"}
                 >
                    {(!p1 || !p2) ? "Select Players" : (p1.id === p2.id ? "Select Different Players" : "FIGHT!")}
                 </Button>
                 
                 <button onClick={() => setGameState('MENU')} className="mt-2 text-white/60 font-bold uppercase text-sm">Cancel</button>
             </div>
        </div>
      );
  }


  // 2. WORLD SELECT
  if (gameState === 'WORLD_SELECT') {
    return (
      <div className="h-[100dvh] bg-sky-800 flex flex-col overflow-hidden select-none">
        {/* Fixed Header */}
        <div className="flex-none bg-sky-900 p-4 border-b-4 border-sky-950 shadow-lg text-white z-10">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setGameState('MENU')} 
              className="flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-600 rounded-lg transition-colors border-b-4 border-sky-900 active:border-b-0 active:translate-y-1 touch-manipulation"
            >
              <Home size={24} />
            </button>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-wider drop-shadow-md truncate mx-2">Select World</h2>
            <div className="flex items-center gap-2 bg-sky-950/50 px-3 py-2 rounded-lg whitespace-nowrap">
               <Trophy className="text-yellow-400" size={20} />
               <span className="font-bold text-lg">{maxUnlockedLevel - 1}/{TOTAL_LEVELS}</span>
            </div>
          </div>
        </div>

        {/* Scrollable World Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-sky-800">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
             {WORLDS.map((world) => {
               const worldStartLevel = (world.id - 1) * 10 + 1;
               // World is "unlocked" if its first level is unlocked
               const isWorldUnlocked = maxUnlockedLevel >= worldStartLevel;
               
               return (
                 <button
                   key={world.id}
                   onClick={() => {
                     // Allow entering unlocked worlds OR the very next world to unlock
                     if (isWorldUnlocked || world.id === 1) { 
                       setSelectedWorld(world.id);
                       setGameState('LEVEL_SELECT');
                     }
                   }}
                   disabled={!isWorldUnlocked && world.id !== 1} // Strict locking, only World 1 starts open
                   className={`relative group overflow-hidden rounded-2xl border-b-8 transition-all duration-300 transform touch-manipulation w-full text-left
                     ${isWorldUnlocked || world.id === 1
                       ? `${world.theme} border-black/20 active:scale-95 active:border-b-4 active:translate-y-1` 
                       : 'bg-gray-600 border-gray-800 opacity-80 cursor-not-allowed grayscale'
                     }`}
                 >
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                   
                   <div className="relative p-4 sm:p-6 flex flex-col items-center text-white h-full min-h-[180px]">
                     <div className="text-6xl sm:text-7xl mb-3 drop-shadow-2xl">
                       {isWorldUnlocked || world.id === 1 ? world.img : <Lock size={60} className="text-gray-400" />}
                     </div>
                     
                     <h3 className="text-2xl sm:text-3xl font-black uppercase mb-1 drop-shadow-md text-center leading-none">{world.name}</h3>
                     <p className={`text-sm font-bold mb-4 opacity-90 uppercase tracking-widest ${world.textColor}`}>{world.desc}</p>
                     
                     <div className="mt-auto w-full bg-black/30 rounded-lg p-3 flex justify-between items-center text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                       <span>Levels {worldStartLevel}-{worldStartLevel + 9}</span>
                       <span className={`px-2 py-0.5 rounded ${isWorldUnlocked ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-300'}`}>
                         {isWorldUnlocked ? 'OPEN' : 'LOCKED'}
                       </span>
                     </div>
                   </div>
                 </button>
               );
             })}
          </div>
        </div>
      </div>
    );
  }

  // 3. LEVEL SELECT
  if (gameState === 'LEVEL_SELECT') {
    const worldData = WORLDS.find(w => w.id === selectedWorld) || WORLDS[0];
    const startLvl = (selectedWorld - 1) * 10 + 1;
    const levels = Array.from({ length: 10 }, (_, i) => startLvl + i);

    return (
      <div className={`h-[100dvh] ${worldData.theme} flex flex-col overflow-hidden select-none`}>
        {/* Fixed Header */}
        <div className="flex-none bg-black/30 p-4 border-b-4 border-black/50 shadow-lg text-white backdrop-blur-md z-10">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setGameState('WORLD_SELECT')} 
              className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors border-b-2 border-black/20 touch-manipulation"
            >
              <MapIcon size={20} />
              <span className="font-bold uppercase hidden sm:inline">Map</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-black uppercase drop-shadow-md truncate mx-2">{worldData.name}</h2>
            <div className="text-4xl drop-shadow-lg">{worldData.img}</div>
          </div>
        </div>

        {/* Scrollable Level Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto grid grid-cols-3 sm:grid-cols-5 gap-4 pb-20">
            {levels.map((level, index) => {
              // Level Locking Logic: Strict sequential
              const isUnlocked = level <= maxUnlockedLevel;
              const isCurrent = level === maxUnlockedLevel;
              const stars = levelStars[level] || 0;
              
              return (
                <button
                  key={level}
                  onClick={() => isUnlocked && startLevel(level)}
                  disabled={!isUnlocked}
                  className={`
                    aspect-square flex flex-col items-center justify-center rounded-2xl border-b-8 font-black text-2xl transition-all shadow-xl relative overflow-hidden group touch-manipulation
                    ${!isUnlocked 
                      ? 'bg-gray-400 border-gray-600 text-gray-200' 
                      : isCurrent 
                        ? 'bg-amber-400 border-amber-600 text-amber-900 animate-pulse ring-4 ring-white/50 scale-105 z-10'
                        : 'bg-orange-50 border-orange-200 text-orange-800 active:scale-95 active:border-b-4 active:translate-y-1'}
                  `}
                >
                  <span className="relative z-10 mb-2">{level}</span>
                  
                  {/* Star Display */}
                  <div className="flex gap-0.5 absolute bottom-3 z-10">
                    {[1, 2, 3].map(s => (
                        <Star 
                            key={s} 
                            size={10} 
                            className={s <= stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300/50 fill-gray-300/50"} 
                        />
                    ))}
                  </div>

                  {!isUnlocked && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Lock size={24} className="text-white/50" /></div>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. PVP GAMEPLAY
  if (gameState === 'PVP_PLAYING') {
    const currentWord = wordList[currentWordIndex] || { word: '...', meaning: '...' };
    const p1 = players.find(p => p.id === pvpP1Id);
    const p2 = players.find(p => p.id === pvpP2Id);

    return (
      <div className="h-[100dvh] bg-gray-800 flex flex-col overflow-hidden select-none">
        
        {/* PLAYER 2 (TOP, ROTATED) */}
        <div className="flex-1 bg-blue-600 relative rotate-180 flex flex-col p-4 border-t-8 border-blue-800">
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-white">
                <div className="bg-blue-800 p-2 rounded-lg text-2xl">{p2?.avatar}</div>
                <span className="font-bold">{p2?.name}</span>
              </div>
              <div className="w-1/2">
                 <ProgressBar current={pvpPlayer2Hp} max={100} color="bg-blue-300" label="HP" className="border-blue-900 bg-blue-900"/>
              </div>
           </div>
           
           {/* P2 Buttons */}
           <div className="grid grid-cols-2 gap-3 flex-1">
             {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePvpAnswer(2, opt)}
                  className="bg-blue-100 border-b-4 border-blue-300 rounded-xl text-blue-900 font-black text-2xl active:scale-95 active:bg-blue-200 transition-transform touch-manipulation flex items-center justify-center"
                >
                  {opt.meaning}
                </button>
             ))}
           </div>
           
           {/* P2 Damage FX */}
           {attackAnim === 'enemy' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                 <div className="text-6xl animate-bounce">⚔️</div>
              </div>
           )}
        </div>

        {/* CENTER ARENA (WORD) */}
        <div className="h-24 bg-gray-900 flex items-center justify-center relative z-10 border-y-4 border-gray-700 shadow-2xl">
           <button 
             onClick={() => setGameState('PVP_SETUP')}
             className="absolute left-4 bg-gray-700 p-2 rounded text-white"
           >
             <ArrowLeft size={16}/>
           </button>
           
           <div className="text-3xl sm:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
             {currentWord.word}
           </div>
           
           <button 
              onClick={() => AudioEngine.speak(currentWord.word)}
              className="absolute right-4 bg-gray-700 p-2 rounded text-white"
           >
              <Volume2 size={20} />
           </button>
        </div>

        {/* PLAYER 1 (BOTTOM) */}
        <div className="flex-1 bg-amber-600 relative flex flex-col p-4 border-b-8 border-amber-800">
           {/* P1 Damage FX */}
           {attackAnim === 'player' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mb-20">
                 <div className="text-6xl animate-bounce">⚔️</div>
              </div>
           )}
        
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-white">
                <div className="bg-amber-800 p-2 rounded-lg text-2xl">{p1?.avatar}</div>
                <span className="font-bold">{p1?.name}</span>
              </div>
              <div className="w-1/2">
                 <ProgressBar current={pvpPlayer1Hp} max={100} color="bg-amber-300" label="HP" className="border-amber-900 bg-amber-900"/>
              </div>
           </div>
           
           {/* P1 Buttons */}
           <div className="grid grid-cols-2 gap-3 flex-1">
             {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePvpAnswer(1, opt)}
                  className="bg-amber-100 border-b-4 border-amber-300 rounded-xl text-amber-900 font-black text-2xl active:scale-95 active:bg-amber-200 transition-transform touch-manipulation flex items-center justify-center"
                >
                  {opt.meaning}
                </button>
             ))}
           </div>
        </div>

      </div>
    );
  }

  // 5. PVP VICTORY SCREEN
  if (gameState === 'PVP_VICTORY') {
    const winnerName = pvpWinner === 1 
        ? players.find(p => p.id === pvpP1Id)?.name 
        : players.find(p => p.id === pvpP2Id)?.name;
        
    return (
      <div className={`h-[100dvh] flex flex-col items-center justify-center p-8 select-none ${pvpWinner === 1 ? 'bg-amber-600' : 'bg-blue-600'}`}>
         <Card className="w-full max-w-sm p-8 text-center bg-white border-gray-900">
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h1 className="text-4xl font-black mb-2 uppercase text-gray-900">
              {winnerName} WINS!
            </h1>
            <p className="text-gray-500 font-bold mb-8">Victory achieved</p>
            <div className="space-y-4">
              <Button onClick={() => startPvp()} variant="success" className="w-full">
                REMATCH
              </Button>
              <Button onClick={() => setGameState('PVP_SETUP')} variant="secondary" className="w-full">
                CHANGE FIGHTERS
              </Button>
            </div>
         </Card>
      </div>
    );
  }

  // 6. SINGLE PLAYER GAMEPLAY
  const currentWorldConfig = WORLDS.find(w => w.id === Math.ceil(currentLevel / LEVELS_PER_WORLD)) || WORLDS[0];
  const currentWord = wordList[currentWordIndex] || { word: '...', meaning: '...' };

  return (
    <div className={`h-[100dvh] bg-sky-200 flex flex-col overflow-hidden select-none ${shakeScreen ? 'animate-shake' : ''}`}>
      {/* Top HUD */}
      <div className="flex-none bg-gray-900 text-white p-2 px-4 flex justify-between items-center shadow-2xl z-20 border-b-4 border-gray-950">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setGameState('LEVEL_SELECT')} 
            className="flex items-center gap-1 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors font-bold uppercase text-xs sm:text-sm border border-gray-700 touch-manipulation"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Exit</span>
          </button>
          <div className="flex items-center gap-2 font-black text-yellow-400 uppercase tracking-widest text-lg">
            <Trophy size={20} className="fill-current" />
            <span className="hidden sm:inline">Level</span>
            <span>{currentLevel}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-black/50 px-4 py-1.5 rounded-full border border-gray-700">
           {/* Hearts/Mistakes Indicator */}
           <div className="flex gap-1">
             {[1, 2, 3].map(h => (
               <Heart 
                 key={h} 
                 size={16} 
                 className={h <= (3 - mistakesInLevel) ? "text-red-500 fill-red-500" : "text-gray-600 fill-gray-600"} 
               />
             ))}
           </div>
        </div>
      </div>

      {/* Battlefield (Flexible Height) */}
      <div className={`flex-1 relative flex items-center justify-between px-2 sm:px-12 py-2 ${currentWorldConfig.bgPattern} overflow-hidden`}>
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '20px 20px' }}></div>

        {/* Player (Custom Avatar) */}
        <div className={`relative flex flex-col items-center transition-transform duration-200 ${attackAnim === 'player' ? 'translate-x-12 sm:translate-x-40 scale-110 z-20' : ''}`}>
          <div className="w-24 sm:w-32 mb-1 sm:mb-2">
            <ProgressBar current={playerHp} max={100} color="bg-amber-400" label={activePlayer?.name || "HERO"} />
          </div>
          <div className={`w-20 h-20 sm:w-36 sm:h-36 bg-amber-500 border-4 border-amber-800 rounded-3xl flex items-center justify-center text-5xl sm:text-7xl shadow-2xl relative transform rotate-2`}>
             <span className="drop-shadow-lg">{activePlayer?.avatar || "🤴"}</span>
             {attackAnim === 'enemy' && (
                <div className="absolute inset-0 flex items-center justify-center animate-ping text-red-600 font-black text-4xl sm:text-5xl z-50">POW!</div>
             )}
          </div>
          <div className="w-24 sm:w-32 h-3 sm:h-4 bg-black/20 rounded-full mt-2 blur-sm"></div>
        </div>

        {/* Floating Message */}
        {message && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-black/80 text-yellow-400 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-black text-lg sm:text-xl animate-bounce z-30 whitespace-nowrap border-2 border-yellow-500 shadow-xl uppercase tracking-wider pointer-events-none">
            {message}
          </div>
        )}

        {/* Enemy */}
        <div className={`relative flex flex-col items-center transition-transform duration-200 ${attackAnim === 'enemy' ? '-translate-x-12 sm:-translate-x-40 scale-110 z-20' : ''}`}>
          <div className="w-24 sm:w-32 mb-1 sm:mb-2">
            <ProgressBar current={enemyHp} max={enemyMaxHp} color="bg-red-500" label={currentWorldConfig.enemy.toUpperCase()} />
          </div>
          <div className={`w-20 h-20 sm:w-36 sm:h-36 ${currentWorldConfig.theme} border-4 border-black/30 rounded-3xl flex items-center justify-center text-5xl sm:text-7xl shadow-2xl relative transform -rotate-2`}>
            <span className="drop-shadow-lg">{currentWorldConfig.img}</span>
             {attackAnim === 'player' && (
                <div className="absolute inset-0 flex items-center justify-center animate-ping text-yellow-300 font-black text-4xl sm:text-5xl z-50">HIT!</div>
             )}
          </div>
          <div className="w-24 sm:w-32 h-3 sm:h-4 bg-black/20 rounded-full mt-2 blur-sm"></div>
        </div>
      </div>

      {/* Control Deck (Fixed Bottom) */}
      <div className="flex-none bg-gray-100 p-3 sm:p-4 border-t-8 border-gray-300 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] relative z-10 pb-8 sm:pb-4">
        <div className="max-w-4xl mx-auto">
          {/* Question Display */}
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-8">
             <div className="text-5xl sm:text-8xl font-black text-amber-900 mb-2 sm:mb-4 tracking-widest drop-shadow-md lowercase transform scale-100 cursor-default font-sans">
               {currentWord.word}
             </div>
             <button 
                onClick={() => AudioEngine.speak(currentWord.word)}
                className="flex items-center gap-3 bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-blue-400 active:scale-95 transition-all font-black text-base sm:text-xl border-b-4 border-blue-700 uppercase tracking-wide touch-manipulation"
             >
               <Volume2 size={24} />
               <span>Tap to Listen</span>
             </button>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {options.map((opt, idx) => (
              <Button 
                key={idx} 
                onClick={() => handleAnswer(opt)}
                variant="secondary"
                className="h-20 sm:h-32 text-lg sm:text-xl normal-case hover:-translate-y-1 hover:shadow-xl transition-all border-b-8 active:border-b-4 active:translate-y-1"
              >
                <span className="text-gray-900 font-black text-2xl sm:text-5xl drop-shadow-sm">{opt.meaning}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Victory/Defeat Overlay */}
      {(gameState === 'VICTORY' || gameState === 'DEFEAT') && (
        <div className="absolute inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className={`max-w-sm w-full p-8 text-center border-4 animate-scaleIn ${gameState === 'VICTORY' ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-200 border-gray-600'}`}>
            <div className="text-8xl mb-4 filter drop-shadow-xl animate-bounce">
              {gameState === 'VICTORY' ? '🏆' : '💀'}
            </div>
            
            {/* Stars Display on Victory */}
            {gameState === 'VICTORY' && (
                <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3].map(s => {
                        // Calculate stars earned this round based on mistakes
                        let starsEarned = 0;
                        if (mistakesInLevel === 0) starsEarned = 3;
                        else if (mistakesInLevel === 1) starsEarned = 2;
                        else if (mistakesInLevel === 2) starsEarned = 1;
                        
                        return (
                            <Star 
                                key={s} 
                                size={40} 
                                className={`${s <= starsEarned ? "text-yellow-400 fill-yellow-400" : "text-gray-600 fill-gray-600"} drop-shadow-lg`} 
                            />
                        )
                    })}
                </div>
            )}

            <h2 className={`text-4xl font-black mb-2 uppercase tracking-tighter ${gameState === 'VICTORY' ? 'text-amber-600' : 'text-gray-700'}`}>
              {gameState === 'VICTORY' ? 'Victory!' : 'Defeated'}
            </h2>
            <p className="text-gray-500 mb-8 font-bold uppercase tracking-widest">
              {gameState === 'VICTORY' ? 'Level Complete!' : 'Try Again!'}
            </p>
            
            <div className="flex flex-col gap-4">
              {gameState === 'VICTORY' ? (
                 <Button onClick={() => setGameState('LEVEL_SELECT')} variant="success" className="py-4 text-xl">
                   Continue <ArrowRight className="inline ml-2" size={24} />
                 </Button>
              ) : (
                 <Button onClick={() => startLevel(currentLevel)} variant="primary" className="py-4 text-xl">
                   Retry Level <RefreshCcw className="inline ml-2" size={24} />
                 </Button>
              )}
              <Button onClick={() => setGameState('LEVEL_SELECT')} variant="secondary">
                Return to Map
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;