'use client';

import React, { useEffect, useState } from 'react';

import styles from './pvc-card.module.css';

export default function PVCCard() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 45);
    target.setHours(0, 0, 0, 0);

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setCountdown({ days, hours, minutes });
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.card} role="article" aria-label="PVC Registration Card">
      {/* PVC Visual */}
      <div className={styles.visual}>
        <div className={styles.pvcPlaceholder} aria-label="Permanent Voter Card illustration">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <rect x="8" y="12" width="64" height="56" rx="8" stroke="white" strokeWidth="3" strokeOpacity="0.4" />
            <rect x="18" y="24" width="20" height="20" rx="4" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
            <line x1="46" y1="28" x2="62" y2="28" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
            <line x1="46" y1="36" x2="58" y2="36" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
            <line x1="18" y1="56" x2="62" y2="56" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          </svg>
          <span className={styles.pvcLabel}>PVC</span>
        </div>
      </div>

      {/* Official Notice */}
      <div className={styles.notice}>
        <span className={styles.noticeBadge} aria-hidden="true">★</span>
        <span className={styles.noticeText}>Official INEC Registration Portal</span>
      </div>

      {/* Countdown */}
      <div className={styles.countdown}>
        <span className={styles.countdownLabel}>Registration closes in</span>
        <div className={styles.countdownValues}>
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{countdown.days}</span>
            <span className={styles.countdownUnitLabel}>Days</span>
          </div>
          <span className={styles.countdownSeparator}>:</span>
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{countdown.hours}</span>
            <span className={styles.countdownUnitLabel}>Hours</span>
          </div>
          <span className={styles.countdownSeparator}>:</span>
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{countdown.minutes}</span>
            <span className={styles.countdownUnitLabel}>Mins</span>
          </div>
        </div>
      </div>

      {/* Registration CTA */}
      <a
        href="https://cvr.inecnigeria.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={`ok-btn ok-btn-premium ${styles.cta}`}
      >
        Get Your PVC
      </a>

      {/* INEC Link */}
      <a
        href="https://cvr.inecnigeria.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.inecLink}
      >
        cvr.inecnigeria.org
      </a>

      {/* Trust Indicators */}
      <div className={styles.trustIndicators}>
        <div className={styles.trustIndicator}>
          <span className={styles.trustCheck} aria-hidden="true">✓</span>
          <span>Secure</span>
        </div>
        <div className={styles.trustIndicator}>
          <span className={styles.trustCheck} aria-hidden="true">✓</span>
          <span>Official</span>
        </div>
        <div className={styles.trustIndicator}>
          <span className={styles.trustCheck} aria-hidden="true">✓</span>
          <span>Free</span>
        </div>
      </div>
    </div>
  );
}
