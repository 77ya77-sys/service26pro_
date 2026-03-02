# SERVICE26PRO — Roadmap лендинга

## Допущения (из discovery)

| Параметр | Значение |
|----------|----------|
| **Бизнес** | Сервисная компания (service26pro, Ставропольский край — код 26) |
| **Регион** | Пятигорск, Иноземцево, Кавказские Минеральные Воды, Ессентуки |
| **Цель лендинга** | Конверсия: звонок / заявка через форму / WhatsApp |
| **Целевая аудитория** | Жители и бизнесы КМВ, ищущие сервисные услуги |
| **Стек** | Чистый HTML + CSS + минимальный JS (бургер-меню, формы) |
| **Анимации** | Нет |
| **Деплой** | Статика (GitHub Pages / Vercel / nginx — любой) |
| **Референс** | Tubik Studio — FERRO steel site |

## Из референса берём

### Цветовая палитра
- **Фон страницы**: холодный светло-серый (#e3e5ea → #c9ccd5, radial-gradient)
- **Карточки/поверхности**: почти белый (#f5f5f7, #f9fafb)
- **Акцент**: насыщенный оранжевый (#ff6b1b) — для CTA-блоков и News-секции
- **Тёмные блоки**: глубокий тёмно-синий (#111827, #1f2937)
- **Текст основной**: #111827 (near-black, не чёрный)
- **Текст вторичный**: #6b7280
- **Текст приглушённый**: #9ca3af
- **Бордеры**: мягкие, полупрозрачные rgba(209, 213, 219, 0.8)
- **Все цвета — через градиенты**, мягкие переходы, без жёстких плоских заливок

### Типографика
- **Заголовки (display)**: Space Grotesk — геометрический гротеск, технологичный
- **Тело (body)**: Manrope — чистый, читаемый
- **Загрузка**: Google Fonts с `display=swap`
- **Иерархия**: H1 40px → H2 30px → H3 16px → Body 15px → Caption 12-13px
- **Капс + tracking**: для кикеров и подписей (letter-spacing 0.14-0.2em)

### Стилистика
- Bento-grid макет (карточки разных размеров в сетке)
- Скруглённые углы (18-24px)
- Мягкие тени (box-shadow с большим blur и низкой opacity)
- backdrop-filter: blur на хедере
- Секционная композиция: левая большая колонка + правая узкая

## Используемые скиллы

| # | Скилл | Зачем |
|---|-------|-------|
| 5 | **discovery-interview** | Сбор требований, формирование спеки перед кодом |
| 4 | **designing-beautiful-websites** | UX-структура: токены, иерархия, компонентный инвентарь, responsive |
| 13 | **landing-page-design** | Конверсионная формула: above-the-fold, CTA, social proof, section order |
| 12 | **landing-page-copywriter** | Тексты секций: PAS-фреймворк, headline-формулы, CTA-тексты |
| 9 | **frontend-ui-ux-engineer** | Визуальная полировка: glassmorphism, hover-states, карточки |

## Структура секций лендинга

Порядок секций по скиллу **landing-page-design** (proven sequence):

```
1. HEADER         — Logo + Nav + CTA-кнопка + телефон
2. HERO           — Headline + подзаголовок + CTA + регион
3. SOCIAL PROOF   — Цифры: лет работы, объектов, клиентов
4. SERVICES       — 3-6 услуг в bento-grid карточках
5. HOW IT WORKS   — 3 шага: заявка → диагностика → результат
6. ABOUT / WHY US — Почему мы, преимущества региона КМВ
7. TESTIMONIALS   — 2-3 отзыва клиентов
8. FAQ            — 5-7 вопросов, accordion на чистом CSS/JS
9. FINAL CTA      — Тёмный/оранжевый блок с формой + телефон + WhatsApp
10. FOOTER        — Контакты, адрес, регион, копирайт
```

## Структура файлов

```
service26pro_/
├── index.html          — Единственная HTML-страница
├── styles.css          — Все стили (CSS custom properties, grid, responsive)
├── script.js           — Минимальный JS: бургер-меню, FAQ-accordion, форма
├── ROADMAP.md          — Этот файл
└── images/             — Папка под изображения (пока пустая)
```

## Пошаговый план реализации

### Этап 0: Подготовка (текущий)
- [x] Discovery-интервью → допущения зафиксированы
- [x] Анализ референса → палитра, типографика, стилистика
- [x] Загрузка релевантных скиллов
- [x] Создание ROADMAP.md

### Этап 1: Design Tokens (CSS custom properties)
**Скилл**: designing-beautiful-websites
- [ ] Определить :root переменные: цвета, шрифты, spacing scale, radius, shadow
- [ ] Определить typography scale
- [ ] Определить breakpoints: 640px (mobile), 960px (tablet), 1240px (desktop)

### Этап 2: HTML-скелет
**Скиллы**: landing-page-design, designing-beautiful-websites
- [ ] Семантическая разметка: header, main, section[id], footer
- [ ] Все 10 секций с правильным порядком
- [ ] ARIA-атрибуты: aria-label на nav, aria-labelledby на секциях
- [ ] Meta-теги: viewport, description, OG-теги
- [ ] Подключение шрифтов через Google Fonts (preconnect)

### Этап 3: Контент / Копирайтинг
**Скилл**: landing-page-copywriter (PAS-фреймворк)
- [ ] Headline: outcome-focused, 6-12 слов
- [ ] CTA-тексты: action verb + value
- [ ] Тексты всех секций на русском
- [ ] Регион упомянут в hero, services, CTA, footer (SEO)

### Этап 4: CSS — Layout & Visual System
**Скиллы**: designing-beautiful-websites, frontend-ui-ux-engineer
- [ ] Mobile-first подход
- [ ] CSS Grid для bento-layout (hero, services)
- [ ] Flexbox для header, footer, простых секций
- [ ] Карточки: скругления, мягкие тени, градиентные бордеры
- [ ] Оранжевый акцентный блок (CTA / News)
- [ ] Тёмный блок footer + final CTA
- [ ] Backdrop-filter blur на sticky header

### Этап 5: Responsive
**Скилл**: designing-beautiful-websites (responsive rules)
- [ ] 640px: одна колонка, бургер, full-width CTA
- [ ] 960px: две колонки, навигация видна
- [ ] 1240px: полный bento-grid
- [ ] Touch targets ≥ 48px на мобильных
- [ ] Шрифт минимум 16px на мобильных

### Этап 6: JavaScript (минимальный)
- [ ] Бургер-меню: toggle класса, aria-expanded
- [ ] FAQ-accordion: <details>/<summary> или toggle на чистом JS
- [ ] Форма: базовая валидация, mailto/action
- [ ] Smooth scroll для якорных ссылок

### Этап 7: Валидация
**Скилл**: designing-beautiful-websites (validate)
- [ ] Glance test: за 5 секунд понятно что это и что делать
- [ ] Accessibility: контраст ≥ 4.5:1, keyboard nav, семантика
- [ ] Mobile test: нет горизонтального скролла, всё читается
- [ ] Performance: total weight < 500KB без картинок, LCP < 2s

## Performance-бюджет

| Ресурс | Лимит |
|--------|-------|
| HTML | < 20 KB |
| CSS | < 15 KB |
| JS | < 5 KB |
| Шрифты (woff2) | ~80 KB (Space Grotesk + Manrope) |
| **Итого без картинок** | **< 120 KB** |
| Картинки (если будут) | < 300 KB each, WebP, lazy load |

## Чеклист перед сдачей

- [ ] Все 10 секций на месте
- [ ] CTA-кнопка видна above the fold
- [ ] Регион (Пятигорск, Иноземцево, КМВ, Ессентуки) упомянут в 4+ местах
- [ ] Мобильная версия работает
- [ ] Нет горизонтального скролла
- [ ] Контраст текста ≥ 4.5:1
- [ ] Форма работает (хотя бы mailto)
- [ ] Телефон кликабельный (tel:)
- [ ] favicon подключён
- [ ] OG-теги для шаринга
