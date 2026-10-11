import React, { useState, useEffect } from 'react';
import BackgroundAnimation from './components/BackgroundAnimation.jsx';
import BookingWidget from './components/BookingWidget.jsx';

const BOOKING_URL = 'https://b699297.alteg.io/select-city/36/select-branch';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShowPreloader(false);
      return;
    }

    // Step 5: Start slide up exit after 2.2s
    const exitTimer = setTimeout(() => {
      setIsPreloaderExiting(true);
    }, 2200);

    // Step 6: Complete unmount after 2.8s
    const removeTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const allServices = [
    { name: 'Мужская стрижка', price: 'от 10 000 ₸', category: 'hair' },
    { name: 'Стрижка + коррекция бороды', price: '14 000 ₸', category: 'hair' },
    { name: 'Стрижка + королевское бритьё', price: '15 000 ₸', category: 'hair' },
    { name: 'Стрижка Отец + Сын', price: '14 000 ₸', category: 'hair' },
    { name: 'Коррекция бороды', price: '7 000 ₸', category: 'beard' },
    { name: 'Королевское бритьё', price: '8 000 ₸', category: 'beard' },
    { name: 'Детская стрижка', price: 'от 3 500 ₸', category: 'hair' },
    { name: 'Тонировка головы', price: '7 000 ₸', category: 'hair' },
    { name: 'Тонировка бороды', price: '5 000 ₸', category: 'beard' },
    { name: 'Стрижка под машинку', price: '4 000 ₸', category: 'hair' },
    { name: 'VIP Комплекс', price: '26 000 ₸', category: 'care' },
    { name: 'Уход за лицом', price: '3 000 ₸', category: 'care' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  const branches = [
    {
      id: 'zenkov',
      name: 'ФИЛИАЛ НА ЗЕНКОВА',
      address: 'ул. Зенкова, 75',
      mapUrl: 'https://2gis.kz/almaty/search/ул.%20Зенкова%2C%2075',
      barbers: ['Латиф', 'Парвиз', 'Даниил', 'Альбина', 'Анвар', 'Азамат'],
    },
    {
      id: 'rozybakieva',
      name: 'ФИЛИАЛ НА РОЗЫБАКИЕВА',
      address: 'ул. Розыбакиева, 310А (ЖК 4YOU)',
      mapUrl: 'https://2gis.kz/almaty/search/ул.%20Розыбакиева%2C%20310А',
      barbers: ['Ангелина', 'Ерхан', 'Лейла', 'Нурдаулет'],
    },
  ];

  const galleryItems = [
    { id: '01', title: 'CLASSIC FADE' },
    { id: '02', title: 'BEARD SCULPTING' },
    { id: '03', title: 'ROYAL SHAVE' },
    { id: '04', title: 'TEXTURED CROP' },
    { id: '05', title: 'SCISSOR WORK' },
    { id: '06', title: 'VIP GROOMING' },
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/bonkers_barbershop' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@bonkersbarbershop' },
    { name: 'Threads', url: 'https://www.threads.com/@bonkers_barbershop' },
    { name: 'YouTube', url: 'https://m.youtube.com/watch?v=udFL5KMMcho' },
  ];

  const marqueeText1 = [
    'BONKERS & CO',
    'БАРБЕРШОП АЛМАТЫ',
    'ИДЕАЛЬНЫЙ ФЕЙД',
    'КОРОЛЕВСКОЕ БРИТЬЁ',
    'KASPI RED 0-0-12',
    'ЗЕНКОВА 75',
    'РОЗЫБАКИЕВА 310А',
    'СКИДКА −15%',
    'ОНЛАЙН-ЗАПИСЬ 24/7',
  ];

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff' }}>
      {/* BACKGROUND CANVAS ANIMATION */}
      <BackgroundAnimation />

      {/* 0. INTRO ANIMATION PRELOADER */}
      {showPreloader && (
        <div
          onClick={() => setShowPreloader(false)}
          className={`preloader-overlay ${isPreloaderExiting ? 'exiting' : ''}`}
          style={{ cursor: 'pointer' }}
          title="Кликните для пропуска"
        >
          <div style={{ textAlign: 'center', maxWidth: '360px', padding: '20px' }}>
            {/* SVG Scissors Stroke Animation */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <svg
                width="72"
                height="72"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 30 18 L 50 50 L 68 76 C 75 85 64 96 55 89 C 48 83 55 72 61 74 L 50 50"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  className="preloader-scissors-path"
                />
                <path
                  d="M 70 18 L 50 50 L 32 76 C 25 85 36 96 45 89 C 52 83 45 72 39 74 L 50 50"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  className="preloader-scissors-path"
                />
                <circle cx="50" cy="50" r="3" fill="#ffffff" />
              </svg>
            </div>

            <h1
              className="font-serif preloader-bonkers"
              style={{
                fontSize: '44px',
                letterSpacing: '0.04em',
                lineHeight: '1',
                margin: '0 0 6px 0',
                fontWeight: '700',
              }}
            >
              Bonkers
            </h1>

            <div
              className="font-serif preloader-co"
              style={{
                fontSize: '20px',
                fontStyle: 'italic',
                letterSpacing: '0.12em',
                marginBottom: '10px',
              }}
            >
              &amp; Co
            </div>

            <div
              className="font-sans preloader-barbershop"
              style={{
                fontSize: '11px',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                opacity: '0.85',
              }}
            >
              barbershop
            </div>
          </div>
        </div>
      )}

      {/* MINIMAL STICKY NAV + RUNNING MARQUEE PINNED AT VERY TOP */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: isScrolled ? '#000000' : 'rgba(0, 0, 0, 0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <header
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Left: "BONKERS & CO" text only (no EST. no tagline) */}
            <a
              href="#hero"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-serif)',
              }}
            >
              BONKERS &amp; CO
            </a>

            {/* Right: one button "ЗАПИСЬ" */}
            <a
              href="#booking"
              className="cta-button cta-button-sm"
              style={{ padding: '8px 20px', fontSize: '11px', letterSpacing: '0.2em' }}
            >
              ЗАПИСЬ
            </a>
          </div>
        </header>

        {/* БЕГУЩАЯ ЛЕНТА ПРИКРЕПЛЕНА НА САМЫЙ ВЕРХ ПОД NAV БЛОК */}
        <div
          className="marquee-container"
          style={{
            borderTop: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
            backgroundColor: '#000000',
            height: '32px',
          }}
        >
          <div className="marquee-content">
            {[...marqueeText1, ...marqueeText1].map((text, idx) => (
              <div
                key={idx}
                className="marquee-item"
                style={{ fontSize: '10px', letterSpacing: '0.22em', padding: '0 20px' }}
              >
                <span>{text}</span>
                <span style={{ opacity: 0.35 }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. HERO (Only 3 elements centered, transparent to show background canvas animation) */}
      <section
        id="hero"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100dvh',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'transparent',
          borderBottom: '1px solid #ffffff',
          boxSizing: 'border-box',
          paddingTop: '78px',
        }}
      >
        {/* Center: floating 3 elements */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '440px',
            width: '100%',
            gap: '36px',
            padding: '0 24px',
          }}
        >
          {/* 1. Logo image — large, ~320px wide on desktop */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/assets/bonkers-logo.png"
              alt="Bonkers & Co barbershop"
              style={{
                width: 'min(76vw, 320px)',
                height: 'auto',
                display: 'block',
                mixBlendMode: 'screen',
                filter: 'brightness(1.08)',
              }}
            />
          </div>

          {/* 2. One single line below: "БАРБЕРШОП · АЛМАТЫ" */}
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: '400',
              fontFamily: 'var(--font-sans)',
              lineHeight: 1,
            }}
          >
            БАРБЕРШОП · АЛМАТЫ
          </div>

          {/* 3. One button below that: "ЗАПИСАТЬСЯ" */}
          <div>
            <a
              href="#booking"
              className="cta-button"
              style={{
                height: '48px',
                padding: '0 48px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                letterSpacing: '0.22em',
                lineHeight: '48px',
              }}
            >
              ЗАПИСАТЬСЯ
            </a>
          </div>
        </div>
      </section>

      {/* 2. PROMO SECTION (Full-width, high impact −15%) */}
      <section
        id="promo"
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid #ffffff',
          padding: 'clamp(70px, 12vh, 130px) 24px',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ maxWidth: '940px', margin: '0 auto', position: 'relative' }}>
          {/* Водяной знак на фоне для глубины */}
          <div
            className="font-serif"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(140px, 30vw, 320px)',
              fontWeight: '900',
              opacity: 0.03,
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.05em',
            }}
          >
            BONKERS
          </div>

          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              opacity: 0.6,
              display: 'block',
              marginBottom: '16px',
            }}
          >
            СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
          </span>

          {/* Гигантский текст: −15% */}
          <div
            className="font-serif promo-giant-text"
            style={{
              fontSize: 'clamp(96px, 19vw, 175px)',
              fontWeight: '800',
              lineHeight: '0.85',
              letterSpacing: '-0.03em',
              margin: '0 0 24px 0',
              userSelect: 'none',
            }}
          >
            −15%
          </div>

          {/* Подзаголовок */}
          <h3
            className="font-serif promo-subheading"
            style={{
              fontSize: 'clamp(18px, 3.2vw, 28px)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: '500',
              margin: '0 0 20px 0',
            }}
          >
            НА ПЕРВОЕ ПОСЕЩЕНИЕ
          </h3>

          {/* Описание */}
          <p
            className="promo-desc"
            style={{
              fontSize: 'clamp(13px, 1.8vw, 16px)',
              fontWeight: '300',
              lineHeight: '1.8',
              maxWidth: '580px',
              margin: '0 auto 40px auto',
              opacity: 0.85,
            }}
          >
            Запишись онлайн — получи скидку на первый визит в любом из наших филиалов
          </p>

          {/* Кнопка с промо */}
          <a
            href="#booking"
            className="cta-button cta-button-lg"
          >
            ЗАПИСАТЬСЯ СО СКИДКОЙ
          </a>
        </div>
      </section>

      {/* ONLINE BOOKING SECTION (embedded, interactive, multi-step) */}
      <section
        id="booking"
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid #ffffff',
          padding: 'clamp(70px, 12vh, 120px) 24px',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                opacity: 0.6,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              ИНТЕРАКТИВНЫЙ ВИДЖЕТ
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '400',
                margin: '0 0 14px 0',
              }}
            >
              ОНЛАЙН-ЗАПИСЬ
            </h2>
            <p
              style={{
                fontSize: 'clamp(12px, 1.6vw, 14px)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.65,
                maxWidth: '560px',
                margin: '0 auto',
                fontWeight: '300',
              }}
            >
              Выберите филиал, услугу, мастера, дату и время в 5 простых шагов
            </p>
          </div>

          {/* 5-step Booking Widget */}
          <BookingWidget />

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#ffffff',
                opacity: 0.5,
                textDecoration: 'none',
                borderBottom: '1px dotted rgba(255, 255, 255, 0.4)',
                paddingBottom: '2px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
            >
              Или открыть запись через внешнюю страницу Altegio ↗
            </a>
          </div>
        </div>
      </section>

      {/* 3. УСЛУГИ (Services - clean two-column list with interactive tabs) */}
      <section
        id="services"
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid #ffffff',
          padding: 'clamp(70px, 12vh, 120px) 24px',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                opacity: 0.6,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              ПРАЙС-ЛИСТ
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '400',
                margin: 0,
              }}
            >
              УСЛУГИ
            </h2>
          </div>

          {/* Категории фильтра */}
          <div
            className="service-tabs-container"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '44px',
            }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`tab-button ${activeCategory === 'all' ? 'active' : ''}`}
            >
              ВСЕ ({allServices.length})
            </button>
            <button
              onClick={() => setActiveCategory('hair')}
              className={`tab-button ${activeCategory === 'hair' ? 'active' : ''}`}
            >
              СТРИЖКИ
            </button>
            <button
              onClick={() => setActiveCategory('beard')}
              className={`tab-button ${activeCategory === 'beard' ? 'active' : ''}`}
            >
              БОРОДА И БРИТЬЁ
            </button>
            <button
              onClick={() => setActiveCategory('care')}
              className={`tab-button ${activeCategory === 'care' ? 'active' : ''}`}
            >
              УХОД И VIP
            </button>
          </div>

          {/* Список услуг с тонкими линиями и hover-инверсией */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.25)',
              marginBottom: '56px',
            }}
          >
            {filteredServices.map((item, index) => (
              <a
                key={index}
                href="#booking"
                className="service-row"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="service-name"
                  style={{
                    fontSize: 'clamp(14px, 1.8vw, 17px)',
                    fontWeight: '400',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.name}
                </div>
                <div className="service-dots" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    className="font-serif service-price"
                    style={{
                      fontSize: 'clamp(15px, 2vw, 19px)',
                      fontWeight: '500',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.price}
                  </span>
                  <span className="service-arrow">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* CTA под списком */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="#booking"
              className="cta-button cta-button-lg"
            >
              ЗАПИСАТЬСЯ
            </a>
          </div>
        </div>
      </section>

      {/* 4. ФИЛИАЛЫ (Two branches side by side) */}
      <section
        id="branches"
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid #ffffff',
          padding: 'clamp(70px, 12vh, 120px) 24px',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                opacity: 0.6,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              ЛОКАЦИИ В АЛМАТЫ
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '400',
                margin: 0,
              }}
            >
              ФИЛИАЛЫ
            </h2>
          </div>

          {/* Сетка филиалов */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {branches.map((b) => (
              <div key={b.id} className="branch-card">
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                        opacity: 0.6,
                      }}
                    >
                      АЛМАТЫ
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.18em',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '4px 10px',
                        textTransform: 'uppercase',
                      }}
                    >
                      10:00 — 21:00
                    </span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 26px)',
                      fontWeight: '500',
                      letterSpacing: '0.06em',
                      marginBottom: '14px',
                      lineHeight: '1.3',
                    }}
                  >
                    {b.address}
                  </h3>

                  <div style={{ marginBottom: '24px' }}>
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ffffff',
                        fontSize: '11px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        opacity: 0.7,
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
                        paddingBottom: '2px',
                      }}
                    >
                      ОТКРЫТЬ В 2GIS ↗
                    </a>
                  </div>

                  <div
                    style={{
                      height: '1px',
                      width: '48px',
                      backgroundColor: '#ffffff',
                      marginBottom: '26px',
                    }}
                  />

                  {/* Список мастеров */}
                  <div style={{ marginBottom: '36px' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: 0.6,
                        marginBottom: '12px',
                      }}
                    >
                      МАСТЕРА:
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      {b.barbers.map((barber, bIdx) => (
                        <span
                          key={bIdx}
                          style={{
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            padding: '6px 12px',
                            fontSize: '13px',
                            fontWeight: '300',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {barber}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href="#booking"
                    className="cta-button"
                    style={{ width: '100%' }}
                  >
                    ЗАПИСАТЬСЯ
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY PLACEHOLDER (НАШИ РАБОТЫ) */}
      <section
        id="gallery"
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid #ffffff',
          padding: 'clamp(70px, 12vh, 120px) 24px',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                opacity: 0.6,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              ПОРТФОЛИО
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '400',
                margin: 0,
              }}
            >
              НАШИ РАБОТЫ
            </h2>
          </div>

          {/* 6 empty placeholder squares with high-fashion crosshair aesthetic */}
          <div
            className="gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            {galleryItems.map((item) => (
              <div key={item.id} className="gallery-card">
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    opacity: 0.4,
                  }}
                >
                  NO. {item.id}
                </div>

                <div
                  className="font-serif"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    opacity: 0.35,
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                    opacity: 0.7,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
                    paddingBottom: '4px',
                  }}
                >
                  фото скоро
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: 'center',
              fontSize: '12px',
              letterSpacing: '0.15em',
              opacity: 0.4,
              fontStyle: 'italic',
            }}
          >
            (gallery images will be added later)
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(60px, 10vh, 100px) 24px 60px 24px',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Logo (small version) centered */}
          <div style={{ marginBottom: '36px' }}>
            <img
              src="/assets/bonkers-logo.png"
              alt="Bonkers & Co barbershop"
              style={{
                maxWidth: '180px',
                height: 'auto',
                display: 'inline-block',
                opacity: 0.95,
                mixBlendMode: 'screen',
              }}
            />
          </div>

          {/* Social icons row (simple text links) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '28px',
              marginBottom: '36px',
            }}
          >
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  opacity: 0.75,
                  borderBottom: '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'opacity 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.75';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {s.name}
              </a>
            ))}
          </div>

          {/* Addresses */}
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '0.18em',
              opacity: 0.75,
              marginBottom: '28px',
              lineHeight: '1.8',
            }}
          >
            ул. Зенкова 75 &nbsp;|&nbsp; ул. Розыбакиева 310А
          </div>

          <div
            style={{
              width: '60px',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              margin: '0 auto 28px auto',
            }}
          />

          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              opacity: 0.45,
            }}
          >
            © 2026 BONKERS &amp; CO | БАРБЕРШОП · АЛМАТЫ
          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE STICKY CTA (Отображается только на телефонах для мгновенной записи) */}
      <div className="mobile-sticky-cta">
        <a
          href="#booking"
          className="cta-button cta-button-solid"
        >
          ЗАПИСАТЬСЯ ОНЛАЙН · −15%
        </a>
      </div>
    </div>
  );
}
