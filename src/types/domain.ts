export type VocabularyWord = { word: string; phonetic: string; meaning: string; spelling: string[]; image: string; sentence: string };
export type ReviewQuestion = { sentence: string; image: string; answer: 'yes' | 'no' };
export type ShopItem = { id: string; title: string; category: string; points: number; media: string; redeemed?: boolean };
