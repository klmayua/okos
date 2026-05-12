'use client';

import React, { useState } from 'react';

import styles from './demo-access-panel.module.css';

export default function DemoAccessPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Sign In</h2>
        <p className={styles.subtext}>Enter your credentials to access the operational workspace.</p>
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = '/overview';
        }}
      >
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="operator@okos.ng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <a href="#" className={styles.link}>Forgot password?</a>
        </div>

        <button type="submit" className={styles.submit}>
          Sign In
        </button>
      </form>

      <div className={styles.footer}>
        <span>Need access?</span>
        <a href="#" className={styles.link}>Request Access</a>
      </div>
    </div>
  );
}
