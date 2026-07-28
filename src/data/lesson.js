export const words = [
 {word:'cherry',phonetic:'/ˈtʃeri/',meaning:'樱桃',spelling:['ch','e','rr','y'],image:'/assets/docx/image1.jpeg',sentence:'This is my cherry.'},
 {word:'lemon',phonetic:'/ˈlemən/',meaning:'柠檬',spelling:['l','e','m','o','n'],image:'/assets/docx/image2.png',sentence:"I don't like lemons."},
 {word:'mango',phonetic:'/ˈmæŋɡəʊ/',meaning:'芒果',spelling:['m','a','n','g','o'],image:'/assets/docx/image3.png',sentence:'The mango is yellow.'},
 {word:'melon',phonetic:'/ˈmelən/',meaning:'瓜；甜瓜',spelling:['m','e','l','o','n'],image:'/assets/docx/image4.png',sentence:'There is a melon.'},
 {word:'strawberry',phonetic:'/ˈstrɔːberi/',meaning:'草莓',spelling:['s','tr','aw','b','e','rr','y'],image:'/assets/docx/image5.png',sentence:'This strawberry is so red.'},
];
export const questions = [
 {sentence:'This is a lemon.',image:words[1].image,answer:'yes'}, {sentence:'I can see some oranges.',image:words[2].image,answer:'no'}, {sentence:'This is a mango.',image:words[2].image,answer:'yes'}, {sentence:'This is a cherry.',image:words[0].image,answer:'no'}, {sentence:'This is a banana.',image:words[1].image,answer:'no'}, {sentence:'This is a melon.',image:words[3].image,answer:'yes'}, {sentence:"This isn't a strawberry.",image:words[4].image,answer:'no'}, {sentence:'There are some mangoes.',image:words[2].image,answer:'yes'},
];
export const shopItems = [
 {id:'song-lamb',title:'Mary Had a Little Lamb',category:'儿歌',points:30,media:'lamb.mp4'}, {id:'phonetic-i',title:'/ɪ/ 音标发音',category:'音标发音',points:20,media:'phonetic-i.mp4'}, {id:'letter-a',title:'Aa 字母启蒙',category:'字母',points:25,media:'a.mp4'}, {id:'beach',title:'At the Beach',category:'动画',points:40,media:'beach.mp4'},
];
