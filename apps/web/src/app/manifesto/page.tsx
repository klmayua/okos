'use client';

import React from 'react';

import styles from './page.module.css';

export default function ManifestoPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.badge}>The OK Movement</span>
          <h1 className={styles.title}>Manifesto</h1>
          <p className={styles.subtitle}>
            A call for national renewal through civic empowerment and accountability.
          </p>
        </header>

        {/* Content */}
        <article className={styles.article}>
          {/* Preamble */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Preamble</h2>
            <p className={styles.paragraph}>
              We believe that Nigeria&apos;s future cannot be left to chance, to fortune, 
              or to the goodwill of those in power. It must be built — deliberately, 
              collectively, and with unwavering commitment by the people themselves.
            </p>
            <p className={styles.paragraph}>
              The OK Movement exists to organize that building. To create the infrastructure 
              through which citizens can reclaim their agency, demand accountability, 
              and shape the nation they deserve.
            </p>
          </section>

          {/* Diagnosis */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>The Diagnosis</h2>
            <p className={styles.paragraph}>
              Nigeria does not lack potential. We are a nation of extraordinary people — 
              entrepreneurs, innovators, farmers, teachers, healers, leaders in every field. 
              What we lack is institutional infrastructure that translates that potential 
              into systemic change.
            </p>
            <div className={styles.quote}>
              <blockquote>
                &ldquo;We have the people. We have the resources. What we do not have 
                is the organized civic architecture to translate will into reality.&rdquo;
              </blockquote>
            </div>
          </section>

          {/* Principles */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Core Principles</h2>
            <ul className={styles.principles}>
              <li>
                <strong>Civic Sovereignty</strong> — The power to shape Nigeria&apos;s future 
                belongs to its citizens, not to any party, government, or elite.
              </li>
              <li>
                <strong>Radical Transparency</strong> — Every resource, decision, and outcome 
                must be visible to the public it serves.
              </li>
              <li>
                <strong>People-Powered Coordination</strong> — Systemic change happens when 
                organized people replace organized money.
              </li>
              <li>
                <strong>Intergenerational Justice</strong> — We do not inherit Nigeria from our 
                parents; we borrow it from our children.
              </li>
            </ul>
          </section>

          {/* Pledge */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>The Pledge</h2>
            <p className={styles.paragraph}>
              We commit to building the civic infrastructure that empowers every Nigerian 
              to participate meaningfully in the democratic process — not just on election day, 
              but every day.
            </p>
            <p className={styles.paragraph}>
              We commit to transparency that makes corruption impossible to hide.
            </p>
            <p className={styles.paragraph}>
              We commit to organizing at scale — across every state, every LGA, every community — 
              so that no citizen stands alone.
            </p>
          </section>

          {/* Call To Arms */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Call To Arms</h2>
            <p className={styles.paragraph}>
              This is not a moment for spectators. The future of Nigeria will be determined 
              by those who show up — not with optimism alone, but with organization, 
              sacrifice, and sustained action.
            </p>
            <p className={styles.paragraph}>
              Join the movement. Not as a follower, but as a builder. Not as a spectator, 
              but as an owner of Nigeria&apos;s next chapter.
            </p>
          </section>
        </article>

        {/* CTA */}
        <div className={styles.cta}>
          <a href="#join" className="ok-btn ok-btn-primary">
            Join the Movement
          </a>
          <a href="#donate" className="ok-btn ok-btn-secondary">
            Support This Work
          </a>
        </div>
      </div>
    </main>
  );
}