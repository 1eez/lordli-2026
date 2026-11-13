export interface Work {
  id: string;
  title: string;
  englishTitle: string;
  category: "game" | "miniapp" | "account";
  qr: string;
  featured?: boolean;
  description?: string;
  englishDescription?: string;
}

// Array order is display order within each category; featured selects homepage work.
export const works: Work[] = [
  {
    id: "farm-garden",
    description:
      "基于 Cocos 游戏引擎，首创全新消除玩法。从核心机制到完整商业化链路，将创意表达、游戏体验与产品价值连接成一个完整系统。",
    englishDescription:
      "Built with the Cocos game engine around an original match-game mechanic. From core gameplay to a complete commercialization model, connecting creative ideas, player experience and product value.",
    title: "种菜农场花园消除",
    englishTitle: "Farm & Garden Match",
    category: "game",
    qr: "/media/works/farm-garden.jpg",
    featured: true,
  },
  {
    id: "birth-chart",
    featured: true,
    description:
      "以确定性算法构建星盘，用清晰的计算逻辑回应 AI 生成的不确定性。让排盘回归可复核的计算，让解读保留开放的空间。",
    englishDescription:
      "Deterministic algorithms give chart calculations a reproducible foundation. A considered boundary between precise computation and open-ended AI interpretation.",
    title: "星盘排盘",
    englishTitle: "Birth Chart",
    category: "miniapp",
    qr: "/media/works/birth-chart.jpg",
  },
  {
    id: "ear-training",
    description:
      "当 AI 重塑生产力，让艺术回归感知、表达与乐趣。以技术陪伴每一次听辨与练习，把音乐的主动权，重新交还给人类。",
    englishDescription:
      "As AI transforms productivity, art returns to human perception, expression and enjoyment. Technology supports listening and practice, putting the experience of music back in your hands.",
    title: "视唱练耳听音准",
    englishTitle: "Sight Singing & Ear Training",
    category: "miniapp",
    qr: "/media/works/ear-training.jpg",
    featured: true,
  },
  {
    id: "purine",
    title: "嘌呤含量查询",
    englishTitle: "Purine Query",
    category: "miniapp",
    qr: "/media/works/purine.jpg",
  },
  {
    id: "storage",
    title: "收纳空间",
    englishTitle: "Storage Space",
    category: "miniapp",
    qr: "/media/works/storage.jpg",
  },
  {
    id: "book-of-answers",
    title: "答案之书 app",
    englishTitle: "Book of Answers",
    category: "miniapp",
    qr: "/media/works/book-of-answers.jpg",
  },
  {
    id: "metronome",
    title: "息屏节拍器",
    englishTitle: "Screen-off Metronome",
    category: "miniapp",
    qr: "/media/works/metronome.jpg",
  },
  {
    id: "meme-challenge",
    title: "热梗挑战",
    englishTitle: "Meme Challenge",
    category: "miniapp",
    qr: "/media/works/meme-challenge.jpg",
  },
  {
    id: "horoscope",
    title: "看看星座",
    englishTitle: "Horoscope",
    category: "miniapp",
    qr: "/media/works/horoscope.jpg",
  },
  {
    id: "shenlai-notes",
    title: "神来之随笔",
    englishTitle: "Shenlai Notes",
    category: "account",
    qr: "/media/works/shenlai-notes.png",
  },
];

export const workCategories = [
  {
    id: "game",
    title: "小游戏",
    englishTitle: "Games",
    label: "WECHAT MINI GAME",
  },
  {
    id: "miniapp",
    title: "小程序",
    englishTitle: "Mini Programs",
    label: "WECHAT MINI PROGRAM",
  },
  {
    id: "account",
    title: "公众号",
    englishTitle: "Official Account",
    label: "WECHAT OFFICIAL ACCOUNT",
  },
] as const;
