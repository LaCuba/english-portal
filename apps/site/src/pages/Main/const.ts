import learningVideo from "./images/learning_video.png"
import chat from "./images/chat.png"
import learningMaterials from "./images/check_homework.png"
import artem from "./images/artem.jpg"
import alena from "./images/alena.jpg"
import masha from "./images/masha.jpg"

export const ADVANTAGES = [
  {
    title: "Видео уроки",
    image: learningVideo,
    text: "Смотри и изучай свой язык по интересным видео урокам.",
  },
  {
    title: "Учебный чат",
    image: chat,
    text: "Сможешь общаться в чате и учить язык на практике.",
  },
  {
    title: "Учебный материалы",
    image: learningMaterials,
    text: "Много различных материалов на изучаемом языке, которые постоянно пополняются.",
  },
] as const

export const FEEDBACKS = [
  {
    name: "Женя",
    text: "Курс очень удобный: видеоуроки короткие и понятные, а чат помогает практиковаться. Материалы помогают углубить знания, и обучение проходит легко и увлекательно.",
  },
  {
    name: "Алёна",
    text: "Очень крутой курс! Видеоуроки простые и понятные, а общение в чате помогает быстрее начать говорить на языке. Полезные материалы — отдельный плюс!",
    avatar: alena,
  },
  {
    name: "Дима",
    text: "Курс отличный! Видеоуроки понятны и доступны, а чат помогает быстро освоить язык через общение. Очень нравится, что есть много дополнительных материалов для закрепления знаний.",
  },
  {
    name: "Маша",
    text: "Удобный формат обучения: есть и видеоуроки, и чат для практики. Материалы помогают разобраться в сложных темах. Прогресс заметен уже через пару недель!",
    avatar: masha,
  },
  {
    name: "Даша",
    text: "Мне очень нравится, что обучение не ограничивается только видеоуроками. Чат для практики и дополнительные материалы сделали обучение гораздо более эффективным. Рекомендую!",
  },
  {
    name: "Артем",
    text: "Понравилось всё: чат, где можно общаться и практиковаться, видеоуроки и дополнительные материалы. Легко учиться и не терять мотивацию!",
    avatar: artem,
  },
]
