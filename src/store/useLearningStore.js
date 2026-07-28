import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shopItems } from '../data/lesson';
export const useLearningStore = create()(persist((set,get)=>({videoDone:false,reviewScore:0,spellingScore:0,matchingScore:0,speakingScore:null,points:120,redeemed:[],completeVideo:()=>set({videoDone:true}),setReviewScore:n=>set({reviewScore:n}),setSpellingScore:n=>set({spellingScore:n}),setMatchingScore:n=>set({matchingScore:n}),setSpeakingScore:n=>set({speakingScore:n}),redeem:ids=>{const cost=ids.reduce((sum,id)=>sum+(shopItems.find(x=>x.id===id)?.points??0),0);if(cost<=get().points)set(s=>({points:s.points-cost,redeemed:[...new Set([...s.redeemed,...ids])]}));}}),{name:'bobo-learning-demo'}));
