import React, { useState, useEffect, useMemo } from 'react';

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('next'); // 'next' | 'back'
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Selections
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // 1. Branches data
  const branches = [
    {
      id: 'zenkov',
      title: 'ЗЕНКОВА 75',
      address: 'ул. Зенкова, 75',
      tagline: 'Исторический центр · Мастера высшей категории',
    },
    {
      id: 'rozybakieva',
      title: 'РОЗЫБАКИЕВА 310А',
      address: 'ул. Розыбакиева, 310А (ЖК 4YOU)',
      tagline: 'ЖК 4YOU · Премиальный сервис · Удобный паркинг',
    },
  ];

  // 2. Services data
  const services = [
    { id: 1, name: 'Мужская стрижка', duration: '1 ч', price: 'от 10 000 ₸' },
    { id: 2, name: 'Стрижка + коррекция бороды', duration: '1 ч', price: '14 000 ₸' },
    { id: 3, name: 'Стрижка + королевское бритьё', duration: '1 ч', price: '15 000 ₸' },
    { id: 4, name: 'Стрижка Отец + Сын', duration: '1.5 ч', price: '14 000 ₸' },
    { id: 5, name: 'Коррекция бороды', duration: '45 мин', price: '7 000 ₸' },
    { id: 6, name: 'Королевское бритьё', duration: '30 мин', price: '8 000 ₸' },
    { id: 7, name: 'Детская стрижка', duration: '45 мин', price: 'от 3 500 ₸' },
    { id: 8, name: 'Тонировка головы', duration: '30 мин', price: '7 000 ₸' },
    { id: 9, name: 'Тонировка бороды', duration: '30 мин', price: '5 000 ₸' },
    { id: 10, name: 'Стрижка под машинку', duration: '30 мин', price: '4 000 ₸' },
    { id: 11, name: 'VIP Комплекс', duration: '2 ч', price: '26 000 ₸' },
    { id: 12, name: 'Уход за лицом', duration: '20 мин', price: '3 000 ₸' },
  ];

  // 3. Barbers data by branch
  const barbersData = {
    zenkov: [
      { id: 'any', name: 'Любой мастер', rating: '★★★★★', reviews: '100+', isAny: true },
      { id: 'latif', name: 'Латиф', rating: '★★★★★', reviews: 9 },
      { id: 'parviz', name: 'Парвиз', rating: '★★★★☆', reviews: 43 },
      { id: 'daniil', name: 'Даниил', rating: '★★★★★', reviews: 38 },
      { id: 'albina', name: 'Альбина', rating: '★★★★☆', reviews: 221 },
      { id: 'anvar', name: 'Анвар', rating: '★★★★★', reviews: 157 },
      { id: 'azamat', name: 'Азамат', rating: '★★★★★', reviews: 139 },
    ],
    rozybakieva: [
      { id: 'any', name: 'Любой мастер', rating: '★★★★★', reviews: '100+', isAny: true },
      { id: 'angelina', name: 'Ангелина', rating: '★★★★☆', reviews: 6 },
      { id: 'erkhan', name: 'Ерхан', rating: '★★★★☆', reviews: 11 },
      { id: 'leila', name: 'Лейла', rating: '★★★★☆', reviews: 150 },
      { id: 'nurdaulet', name: 'Нурдаулет', rating: '★★★★☆', reviews: 173 },
    ],
  };

  // 4. Generate 14 days starting from today
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        id: d.toISOString().split('T')[0],
        dayOfWeek: daysOfWeek[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()],
        fullFormatted: `${d.getDate()} ${months[d.getMonth()]}, ${daysOfWeek[d.getDay()]}`,
      });
    }
    return dates;
  }, []);

  // Set default date when entering step 4 if not set
  useEffect(() => {
    if (step === 4 && !selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [step, selectedDate, availableDates]);

  // Time slots
  const allTimes = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00',
  ];

  // Helper to determine if a slot is taken
  const isTimeTaken = (timeStr) => {
    if (!selectedDate) return false;
    // Deterministic simulation based on day and time string length/char
    const hash = (selectedDate.dayNum + timeStr.charCodeAt(1) + timeStr.charCodeAt(3)) % 5;
    return hash === 0 || timeStr === '14:00' || timeStr === '18:30';
  };

  // Step Validation for "Далее"
  const canGoNext = () => {
    if (step === 1) return selectedBranch !== null;
    if (step === 2) return selectedService !== null;
    if (step === 3) return selectedMaster !== null;
    if (step === 4) return selectedDate !== null && selectedTime !== null;
    if (step === 5) return clientName.trim().length > 1 && clientPhone.trim().length >= 9;
    return false;
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    if (step < 5) {
      setDirection('next');
      setStep((prev) => prev + 1);
    } else {
      setIsConfirmed(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection('back');
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDirection('next');
    setIsConfirmed(false);
    setSelectedBranch(null);
    setSelectedService(null);
    setSelectedMaster(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientName('');
    setClientPhone('');
  };

  const currentBarbers = selectedBranch
    ? barbersData[selectedBranch.id] || []
    : [];

  const stepLabels = ['Филиал', 'Услуга', 'Мастер', 'Время', 'Контакты'];

  return (
    <div
      className="booking-widget-container"
      style={{
        maxWidth: '1040px',
        margin: '0 auto',
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        padding: 'clamp(24px, 5vw, 48px)',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative Editorial Crosshairs */}
      <span style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '11px', opacity: 0.4 }}>+</span>
      <span style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '11px', opacity: 0.4 }}>+</span>
      <span style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '11px', opacity: 0.4 }}>+</span>
      <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '11px', opacity: 0.4 }}>+</span>

      {/* CONFIRMATION SCREEN */}
      {isConfirmed ? (
        <div style={{ textAlign: 'center', padding: '40px 16px' }} className="booking-slide-right">
          {/* Animated SVG Checkmark */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="success-circle-path"
              />
              <path
                d="M 30 52 L 44 66 L 70 36"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
                className="success-check-path"
              />
            </svg>
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              fontWeight: '500',
            }}
          >
            ЗАПИСЬ ПРИНЯТА
          </h3>

          <p
            style={{
              fontSize: '14px',
              letterSpacing: '0.15em',
              opacity: 0.75,
              textTransform: 'uppercase',
              marginBottom: '36px',
            }}
          >
            Ждём вас, {clientName}! Детали вашей записи:
          </p>

          {/* Clean Receipt Box */}
          <div
            style={{
              maxWidth: '540px',
              margin: '0 auto 40px auto',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '24px',
              textAlign: 'left',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase' }}>Филиал</span>
              <span style={{ fontSize: '13px', fontWeight: '500', textAlign: 'right' }}>{selectedBranch?.title} ({selectedBranch?.address})</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase' }}>Услуга</span>
              <span style={{ fontSize: '13px', fontWeight: '500', textAlign: 'right' }}>{selectedService?.name}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase' }}>Мастер</span>
              <span style={{ fontSize: '13px', fontWeight: '500', textAlign: 'right' }}>{selectedMaster?.name}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase' }}>Дата и время</span>
              <span style={{ fontSize: '13px', fontWeight: '500', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                {selectedDate?.fullFormatted} · {selectedTime}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 4px 0' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>К оплате</span>
              <span className="font-serif" style={{ fontSize: '17px', fontWeight: '600' }}>{selectedService?.price}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="cta-button"
            style={{ padding: '14px 36px', fontSize: '12px' }}
          >
            ЗАПИСАТЬСЯ ЕЩЁ РАЗ
          </button>
        </div>
      ) : (
        <div>
          {/* STEP INDICATOR WITH HORIZONTAL PROGRESS LINE */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Horizontal Background Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '12px',
                  right: '12px',
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  zIndex: 1,
                }}
              />
              {/* Active Progress Fill Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '12px',
                  width: `${((step - 1) / 4) * 100}%`,
                  height: '1px',
                  backgroundColor: '#ffffff',
                  zIndex: 2,
                  transition: 'width 0.3s ease',
                }}
              />

              {/* 5 Step Nodes */}
              {[1, 2, 3, 4, 5].map((sNum) => {
                const isCompleted = sNum < step;
                const isCurrent = sNum === step;

                return (
                  <div
                    key={sNum}
                    style={{
                      position: 'relative',
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: isCompleted ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      if (isCompleted) {
                        setDirection('back');
                        setStep(sNum);
                      }
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: isCompleted || isCurrent ? '#ffffff' : '#000000',
                        color: isCompleted || isCurrent ? '#000000' : 'rgba(255, 255, 255, 0.4)',
                        border: '1px solid #ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isCompleted ? '✓' : sNum}
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: isCurrent ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                        fontWeight: isCurrent ? '600' : '400',
                        display: 'none',
                      }}
                      className="booking-step-label"
                    >
                      {stepLabels[sNum - 1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                opacity: 0.5,
                display: 'block',
                marginBottom: '6px',
              }}
            >
              ШАГ {step} ИЗ 5
            </span>
            <h3
              className="font-serif"
              style={{
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '500',
                margin: 0,
              }}
            >
              {step === 1 && 'ВЫБЕРИТЕ ФИЛИАЛ'}
              {step === 2 && 'ВЫБЕРИТЕ УСЛУГУ'}
              {step === 3 && 'ВЫБЕРИТЕ МАСТЕРА'}
              {step === 4 && 'ДАТА И ВРЕМЯ'}
              {step === 5 && 'ДАННЫЕ ДЛЯ ЗАПИСИ'}
            </h3>
          </div>

          {/* DYNAMIC STEP CONTENT CONTAINER (Sliding in) */}
          <div
            key={step}
            className={direction === 'next' ? 'booking-slide-right' : 'booking-slide-left'}
            style={{ minHeight: '280px' }}
          >
            {/* ---------------- STEP 1: CHOOSE BRANCH ---------------- */}
            {step === 1 && (
              <div
                className="booking-card-grid-1col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                {branches.map((b) => {
                  const isSelected = selectedBranch?.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranch(b)}
                      className={`booking-card ${isSelected ? 'selected' : ''}`}
                      style={{ padding: 'clamp(24px, 4vw, 36px)' }}
                    >
                      <div
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.25em',
                          textTransform: 'uppercase',
                          opacity: isSelected ? 0.7 : 0.5,
                          marginBottom: '14px',
                        }}
                      >
                        АЛМАТЫ · ФИЛИАЛ
                      </div>
                      <h4
                        className="font-serif"
                        style={{
                          fontSize: 'clamp(20px, 2.5vw, 24px)',
                          letterSpacing: '0.08em',
                          fontWeight: '600',
                          marginBottom: '10px',
                        }}
                      >
                        {b.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '13px',
                          opacity: isSelected ? 0.85 : 0.7,
                          marginBottom: '16px',
                          lineHeight: '1.4',
                        }}
                      >
                        {b.address}
                      </p>
                      <div
                        style={{
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          fontStyle: 'italic',
                          opacity: isSelected ? 0.7 : 0.45,
                        }}
                      >
                        {b.tagline}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ---------------- STEP 2: CHOOSE SERVICE ---------------- */}
            {step === 2 && (
              <div
                className="booking-card-grid-1col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px',
                  maxHeight: '460px',
                  overflowY: 'auto',
                  paddingRight: '6px',
                }}
              >
                {services.map((s) => {
                  const isSelected = selectedService?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`booking-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        padding: '18px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div
                          className="font-serif"
                          style={{
                            fontSize: '15px',
                            fontWeight: '600',
                            letterSpacing: '0.04em',
                            marginBottom: '4px',
                          }}
                        >
                          {s.name}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            opacity: isSelected ? 0.7 : 0.5,
                          }}
                        >
                          {s.duration}
                        </div>
                      </div>

                      <div
                        className="font-serif"
                        style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          letterSpacing: '0.05em',
                          fontVariantNumeric: 'tabular-nums',
                          whiteSpace: 'nowrap',
                          marginLeft: '12px',
                        }}
                      >
                        {s.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ---------------- STEP 3: CHOOSE MASTER ---------------- */}
            {step === 3 && (
              <div
                className="booking-card-grid-2col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {currentBarbers.map((barber) => {
                  const isSelected = selectedMaster?.id === barber.id;
                  const initial = barber.isAny ? '★' : barber.name.charAt(0);

                  return (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedMaster(barber)}
                      className={`booking-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        padding: '24px 20px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      {/* Initial Circle */}
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          border: isSelected ? '1px solid #000000' : '1px solid #ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '14px',
                          fontFamily: 'var(--font-serif)',
                        }}
                      >
                        {initial}
                      </div>

                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        {barber.name}
                      </div>

                      <div
                        style={{
                          fontSize: '11px',
                          letterSpacing: '0.1em',
                          opacity: isSelected ? 0.75 : 0.6,
                        }}
                      >
                        {barber.rating} ({barber.reviews})
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ---------------- STEP 4: DATE & TIME ---------------- */}
            {step === 4 && (
              <div>
                {/* 14-day horizontal scroll of date tiles */}
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      opacity: 0.6,
                      marginBottom: '12px',
                    }}
                  >
                    ВЫБЕРИТЕ ДАТУ:
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      overflowX: 'auto',
                      paddingBottom: '12px',
                    }}
                  >
                    {availableDates.map((item) => {
                      const isSelected = selectedDate?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedDate(item);
                            setSelectedTime(null); // Reset time when date changes
                          }}
                          className={`booking-date-tile ${isSelected ? 'selected' : ''}`}
                        >
                          <div
                            style={{
                              fontSize: '10px',
                              letterSpacing: '0.15em',
                              opacity: isSelected ? 0.7 : 0.5,
                              marginBottom: '6px',
                            }}
                          >
                            {item.dayOfWeek}
                          </div>
                          <div
                            className="font-serif"
                            style={{
                              fontSize: '22px',
                              fontWeight: '600',
                              lineHeight: '1',
                              marginBottom: '4px',
                            }}
                          >
                            {item.dayNum}
                          </div>
                          <div
                            style={{
                              fontSize: '9px',
                              letterSpacing: '0.1em',
                              opacity: isSelected ? 0.7 : 0.45,
                              textTransform: 'uppercase',
                            }}
                          >
                            {item.month}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      opacity: 0.6,
                      marginBottom: '14px',
                    }}
                  >
                    ВЫБЕРИТЕ ВРЕМЯ НА {selectedDate ? selectedDate.fullFormatted.toUpperCase() : ''}:
                  </div>

                  <div
                    className="booking-time-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(78px, 1fr))',
                      gap: '10px',
                    }}
                  >
                    {allTimes.map((timeStr) => {
                      const taken = isTimeTaken(timeStr);
                      const isSelected = selectedTime === timeStr;

                      return (
                        <button
                          key={timeStr}
                          disabled={taken}
                          onClick={() => setSelectedTime(timeStr)}
                          className={`booking-time-pill ${isSelected ? 'selected' : ''} ${taken ? 'disabled' : ''}`}
                        >
                          {timeStr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- STEP 5: CONTACT INFO & SUMMARY ---------------- */}
            {step === 5 && (
              <div
                className="booking-card-grid-1col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                  gap: '32px',
                  alignItems: 'start',
                }}
              >
                {/* Clean Summary Card */}
                <div
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    padding: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      opacity: 0.55,
                      marginBottom: '16px',
                    }}
                  >
                    ИТОГ ЗАПИСИ
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.5, display: 'block', textTransform: 'uppercase' }}>
                      Локация:
                    </span>
                    <strong style={{ fontSize: '14px', letterSpacing: '0.04em' }}>
                      {selectedBranch?.title}
                    </strong>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>{selectedBranch?.address}</div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.5, display: 'block', textTransform: 'uppercase' }}>
                      Услуга:
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{selectedService?.name}</span>
                    <span style={{ fontSize: '12px', opacity: 0.6, marginLeft: '6px' }}>({selectedService?.duration})</span>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.5, display: 'block', textTransform: 'uppercase' }}>
                      Мастер:
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{selectedMaster?.name}</span>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.15em', opacity: 0.5, display: 'block', textTransform: 'uppercase' }}>
                      Дата и время:
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500', fontVariantNumeric: 'tabular-nums' }}>
                      {selectedDate?.fullFormatted} · {selectedTime}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Стоимость:</span>
                    <span className="font-serif" style={{ fontSize: '19px', fontWeight: '600' }}>{selectedService?.price}</span>
                  </div>
                </div>

                {/* Two inputs */}
                <div>
                  <div style={{ marginBottom: '22px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        opacity: 0.7,
                        marginBottom: '8px',
                      }}
                    >
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      placeholder="Александр"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        color: '#ffffff',
                        padding: '16px 18px',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '0.04em',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#ffffff')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)')}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        opacity: 0.7,
                        marginBottom: '8px',
                      }}
                    >
                      Номер телефона
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 777 000 00 00"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        color: '#ffffff',
                        padding: '16px 18px',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '0.04em',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#ffffff')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)')}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: '11px',
                      opacity: 0.5,
                      lineHeight: '1.6',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных и бронирование времени мастера.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* NAVIGATION FOOTER */}
          <div
            style={{
              marginTop: '44px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Back Button */}
            {step > 1 ? (
              <button
                onClick={handleBack}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '12px 16px',
                  opacity: 0.75,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
              >
                ← НАЗАД
              </button>
            ) : (
              <div />
            )}

            {/* Next / Submit Button */}
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="cta-button"
              style={{
                opacity: canGoNext() ? 1 : 0.4,
                cursor: canGoNext() ? 'pointer' : 'not-allowed',
                padding: '16px 36px',
              }}
            >
              {step === 5 ? 'ПОДТВЕРДИТЬ ЗАПИСЬ' : 'ДАЛЕЕ →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
