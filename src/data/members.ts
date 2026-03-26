import type { Member } from '@/types/member'

export const members: Member[] = [
  {
    id: 'rm',
    name: { en: 'RM', ko: '알엠' },
    fullName: { en: 'Kim Namjoon', ko: '김남준' },
    role: { en: 'Leader, Main Rapper', ua: 'Лідер, головний репер' },
    birthDate: '1994-09-12',
    height: 181,
    zodiac: 'virgo',
    nickname: 'Joon',
    color: '#6A0DAD',
    photos: ['rm-1.jpg', 'rm-2.jpg', 'rm-3.jpg', 'rm-4.jpg', 'rm-5.jpg'],
    audio: { song: 'rm-song.mp3', songTitle: 'Wild Flower', voice: 'rm-voice.mp3', voiceSource: 'NPR Tiny Desk 2022' },
    facts: [
      { en: 'Has an IQ of 148', ua: 'Має IQ 148' },
      { en: 'Learned English by watching Friends', ua: 'Вивчив англійську дивлячись серіал Friends' },
      { en: 'Changed his stage name from Rap Monster to RM in 2017', ua: 'Змінив сценічне імʼя з Rap Monster на RM у 2017' },
      { en: 'Known for breaking everything — nicknamed "God of Destruction"', ua: 'Відомий тим, що все ламає — прізвисько "Бог руйнування"' },
      { en: 'Passionate about art and visits museums worldwide', ua: 'Захоплюється мистецтвом і відвідує музеї по всьому світу' }
    ],
    soloProjects: [
      { name: 'RM (mixtape)', year: 2015 },
      { name: 'mono.', year: 2018 },
      { name: 'Indigo', year: 2022 },
      { name: 'Right Place, Wrong Person', year: 2024 }
    ],
    hobbies: [
      { en: 'Visiting art museums', ua: 'Відвідування музеїв мистецтва' },
      { en: 'Cycling', ua: 'Велоспорт' },
      { en: 'Reading', ua: 'Читання' }
    ],
    favorites: {
      en: { color: 'Black', food: 'Korean knife-cut noodles' },
      ua: { color: 'Чорний', food: 'Корейська локшина кальгуксу' }
    }
  },
  {
    id: 'jin',
    name: { en: 'Jin', ko: '진' },
    fullName: { en: 'Kim Seokjin', ko: '김석진' },
    role: { en: 'Vocalist', ua: 'Вокаліст' },
    birthDate: '1992-12-04',
    height: 179,
    zodiac: 'sagittarius',
    nickname: 'Worldwide Handsome',
    color: '#FF69B4',
    photos: ['jin-1.jpg', 'jin-2.jpg', 'jin-3.jpg', 'jin-4.jpg', 'jin-5.jpg'],
    audio: { song: 'jin-song.mp3', songTitle: 'The Astronaut', voice: 'jin-voice.mp3', voiceSource: 'Tonight Show 2024' },
    facts: [
      { en: 'Eldest member of BTS, born in 1992', ua: 'Найстарший учасник BTS, народився у 1992' },
      { en: 'Studied acting at Konkuk University', ua: 'Вивчав акторську майстерність в університеті Конкук' },
      { en: 'Famous for his dad jokes and "Worldwide Handsome" title', ua: 'Відомий своїми жартами та титулом "Всесвітній красень"' },
      { en: 'Was street-casted by Big Hit while in college', ua: 'Був помічений скаутом Big Hit коли навчався в коледжі' },
      { en: 'Loves cooking and has a talent for fishing', ua: 'Любить готувати і має талант до рибалки' }
    ],
    soloProjects: [
      { name: 'The Astronaut', year: 2022 },
      { name: 'Happy', year: 2024 }
    ],
    hobbies: [
      { en: 'Cooking', ua: 'Готування' },
      { en: 'Fishing', ua: 'Рибалка' },
      { en: 'Playing video games', ua: 'Відеоігри' }
    ],
    favorites: {
      en: { color: 'Pink', food: 'Lobster' },
      ua: { color: 'Рожевий', food: 'Лобстер' }
    }
  },
  {
    id: 'suga',
    name: { en: 'SUGA', ko: '슈가' },
    fullName: { en: 'Min Yoongi', ko: '민윤기' },
    role: { en: 'Lead Rapper, Producer', ua: 'Лід-репер, продюсер' },
    birthDate: '1993-03-09',
    height: 174,
    zodiac: 'pisces',
    nickname: 'Lil Meow Meow',
    color: '#FFFFFF',
    photos: ['suga-1.jpg', 'suga-2.jpg', 'suga-3.jpg', 'suga-4.jpg', 'suga-5.jpg'],
    audio: { song: 'suga-song.mp3', songTitle: 'Daechwita', voice: 'suga-voice.mp3', voiceSource: 'Suchwita Ep.1' },
    facts: [
      { en: 'Produces music under the alias Agust D', ua: 'Продюсує музику під псевдонімом Agust D' },
      { en: 'Started making music at age 13', ua: 'Почав створювати музику у 13 років' },
      { en: 'Known for his savage personality and dry humor', ua: 'Відомий гострим характером та сухим гумором' },
      { en: 'Has produced songs for other artists including IU', ua: 'Продюсував пісні для інших артистів, включаючи IU' },
      { en: 'Loves basketball and is a fan of the Chicago Bulls', ua: 'Любить баскетбол і є фанатом Chicago Bulls' }
    ],
    soloProjects: [
      { name: 'Agust D (mixtape)', year: 2016 },
      { name: 'D-2', year: 2020 },
      { name: 'D-DAY', year: 2023 }
    ],
    hobbies: [
      { en: 'Producing music', ua: 'Продюсування музики' },
      { en: 'Basketball', ua: 'Баскетбол' },
      { en: 'Photography', ua: 'Фотографія' }
    ],
    favorites: {
      en: { color: 'White', food: 'Meat (especially pork belly)' },
      ua: { color: 'Білий', food: 'Мʼясо (особливо свиняча грудинка)' }
    }
  },
  {
    id: 'jhope',
    name: { en: 'J-Hope', ko: '제이홉' },
    fullName: { en: 'Jung Hoseok', ko: '정호석' },
    role: { en: 'Main Dancer, Rapper', ua: 'Головний танцюрист, репер' },
    birthDate: '1994-02-18',
    height: 177,
    zodiac: 'aquarius',
    nickname: 'Hobi',
    color: '#FFD700',
    photos: ['jhope-1.jpg', 'jhope-2.jpg', 'jhope-3.jpg', 'jhope-4.jpg', 'jhope-5.jpg'],
    audio: { song: 'jhope-song.mp3', songTitle: 'Chicken Noodle Soup', voice: 'jhope-voice.mp3', voiceSource: 'Tonight Show 2025' },
    facts: [
      { en: 'Was a street dancer before joining BTS', ua: 'Був вуличним танцюристом до приєднання до BTS' },
      { en: 'Known as the mood maker and sunshine of the group', ua: 'Відомий як душа компанії та сонечко групи' },
      { en: 'First BTS member to release a solo album on Billboard 200', ua: 'Перший учасник BTS, чий сольний альбом потрапив у Billboard 200' },
      { en: 'His stage name means he is the hope of the group', ua: 'Його сценічне імʼя означає, що він — надія групи' },
      { en: 'Headlined Lollapalooza 2022 as a solo artist', ua: 'Був хедлайнером Lollapalooza 2022 як сольний артист' }
    ],
    soloProjects: [
      { name: 'Hope World', year: 2018 },
      { name: 'Jack In The Box', year: 2022 },
      { name: 'HOPE ON THE STREET Vol.1', year: 2024 }
    ],
    hobbies: [
      { en: 'Dancing', ua: 'Танці' },
      { en: 'Collecting figures', ua: 'Колекціонування фігурок' },
      { en: 'Fashion', ua: 'Мода' }
    ],
    favorites: {
      en: { color: 'Green', food: 'Kimchi' },
      ua: { color: 'Зелений', food: 'Кімчі' }
    }
  },
  {
    id: 'jimin',
    name: { en: 'Jimin', ko: '지민' },
    fullName: { en: 'Park Jimin', ko: '박지민' },
    role: { en: 'Lead Vocalist, Main Dancer', ua: 'Лід-вокаліст, головний танцюрист' },
    birthDate: '1995-10-13',
    height: 173,
    zodiac: 'libra',
    nickname: 'Chimmy',
    color: '#FFD700',
    photos: ['jimin-1.jpg', 'jimin-2.jpg', 'jimin-3.jpg', 'jimin-4.jpg', 'jimin-5.jpg'],
    audio: { song: 'jimin-song.mp3', songTitle: 'Like Crazy', voice: 'jimin-voice.mp3', voiceSource: 'Tonight Show 2023' },
    facts: [
      { en: 'Studied contemporary dance before joining BTS', ua: 'Вивчав сучасний танець до приєднання до BTS' },
      { en: 'His solo track "Lie" is one of the most popular B-sides', ua: 'Його сольний трек "Lie" — один з найпопулярніших B-side' },
      { en: 'Known for his incredible flexibility', ua: 'Відомий своєю неймовірною гнучкістю' },
      { en: 'Was the last member to join BTS', ua: 'Був останнім учасником, хто приєднався до BTS' },
      { en: 'His "FACE" album debuted at #1 on Billboard 200', ua: 'Його альбом "FACE" дебютував на #1 у Billboard 200' }
    ],
    soloProjects: [
      { name: 'FACE', year: 2023 },
      { name: 'MUSE', year: 2024 }
    ],
    hobbies: [
      { en: 'Dancing', ua: 'Танці' },
      { en: 'Singing', ua: 'Спів' },
      { en: 'Watching movies', ua: 'Перегляд фільмів' }
    ],
    favorites: {
      en: { color: 'Blue and Black', food: 'Pork and duck' },
      ua: { color: 'Синій та чорний', food: 'Свинина та качка' }
    }
  },
  {
    id: 'v',
    name: { en: 'V', ko: '뷔' },
    fullName: { en: 'Kim Taehyung', ko: '김태형' },
    role: { en: 'Vocalist', ua: 'Вокаліст' },
    birthDate: '1995-12-30',
    height: 179,
    zodiac: 'capricorn',
    nickname: 'Tae Tae',
    color: '#008000',
    photos: ['v-1.jpg', 'v-2.jpg', 'v-3.jpg', 'v-4.jpg', 'v-5.jpg'],
    audio: { song: 'v-song.mp3', songTitle: 'Slow Dancing', voice: 'v-voice.mp3', voiceSource: 'Vogue Japan 2025' },
    facts: [
      { en: 'Has a unique deep baritone voice', ua: 'Має унікальний глибокий баритон' },
      { en: 'Acted in the K-drama "Hwarang" (2016)', ua: 'Знімався в дорамі "Хваран" (2016)' },
      { en: 'His solo song "Stigma" showcased his jazz vocal abilities', ua: 'Його сольна пісня "Stigma" продемонструвала його джазові вокальні здібності' },
      { en: 'Known for his art and photography skills', ua: 'Відомий своїми навичками у мистецтві та фотографії' },
      { en: 'His dog Yeontan is famous among ARMY fans', ua: 'Його пес Йонтан відомий серед фанатів ARMY' }
    ],
    soloProjects: [
      { name: 'Layover', year: 2023 }
    ],
    hobbies: [
      { en: 'Photography', ua: 'Фотографія' },
      { en: 'Drawing', ua: 'Малювання' },
      { en: 'Playing saxophone', ua: 'Гра на саксофоні' }
    ],
    favorites: {
      en: { color: 'Green', food: 'Japchae (glass noodles)' },
      ua: { color: 'Зелений', food: 'Чапче (скляна локшина)' }
    }
  },
  {
    id: 'jungkook',
    name: { en: 'Jungkook', ko: '정국' },
    fullName: { en: 'Jeon Jungkook', ko: '전정국' },
    role: { en: 'Main Vocalist, Lead Dancer, Sub Rapper', ua: 'Головний вокаліст, лід-танцюрист, саб-репер' },
    birthDate: '1997-09-01',
    height: 179,
    zodiac: 'virgo',
    nickname: 'JK / Golden Maknae',
    color: '#9400D3',
    photos: ['jungkook-1.jpg', 'jungkook-2.jpg', 'jungkook-3.jpg', 'jungkook-4.jpg', 'jungkook-5.jpg'],
    audio: { song: 'jungkook-song.mp3', songTitle: 'Seven', voice: 'jungkook-voice.mp3', voiceSource: 'GOLDEN Press 2023' },
    facts: [
      { en: 'Youngest member (maknae) of BTS', ua: 'Наймолодший учасник (макне) BTS' },
      { en: 'Nicknamed "Golden Maknae" for being good at everything', ua: 'Прізвисько "Золотий макне" бо він хороший у всьому' },
      { en: 'Chose Big Hit over 7 other agencies after seeing RM', ua: 'Обрав Big Hit серед 7 інших агенцій побачивши RM' },
      { en: 'His cover songs regularly trend worldwide', ua: 'Його кавери регулярно потрапляють у світові тренди' },
      { en: '"Seven" debuted at #1 on Billboard Hot 100', ua: '"Seven" дебютував на #1 у Billboard Hot 100' }
    ],
    soloProjects: [
      { name: 'Golden', year: 2023 }
    ],
    hobbies: [
      { en: 'Working out', ua: 'Тренування' },
      { en: 'Drawing', ua: 'Малювання' },
      { en: 'Singing covers', ua: 'Спів каверів' }
    ],
    favorites: {
      en: { color: 'Black', food: 'Pizza' },
      ua: { color: 'Чорний', food: 'Піца' }
    }
  }
]
