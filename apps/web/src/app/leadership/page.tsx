'use client';

import React from 'react';

import styles from './page.module.css';

const nationalStructure = [
  { level: 'National Council', role: 'Supreme decision-making body', members: '47 Delegates' },
  { level: 'National Executive', role: 'Strategic direction & operations', members: '12 Members' },
  { level: 'Regional Coordinators', role: '36 state-level leadership', members: '36 Coordinators' },
  { level: 'LGA Chairpersons', role: 'Local government activation', members: '774 Chairpersons' },
  { level: 'Ward Volunteers', role: 'Ground-level civic mobilization', members: '8,420+ Ward Leaders' },
];

const coordinators = [
  { name: 'Dr. Adenike Oladipo', role: 'National Coordinator', state: 'National', image: 'AO' },
  { name: 'Emeka Okonkwo', role: 'South-East Regional Lead', state: 'Enugu', image: 'EO' },
  { name: 'Aisha Ibrahim', role: 'North-Central Regional Lead', state: 'Kwara', image: 'AI' },
  { name: 'Mohammed Bello', role: 'North-West Regional Lead', state: 'Kano', image: 'MB' },
  { name: 'Chidinma Okafor', role: 'South-South Regional Lead', state: 'Rivers', image: 'CO' },
  { name: 'Olumide Ajayi', role: 'South-West Regional Lead', state: 'Lagos', image: 'OA' },
];

const advisors = [
  { name: 'Prof. Yusuf Aliyu', role: 'Civic Education Advisory', affiliation: 'University of Abuja' },
  { name: 'Hajia Rabia Musa', role: 'Women & Youth Council', affiliation: 'Northern CSO Network' },
  { name: 'Dr. Chukwuemeka Nwosu', role: 'Election Integrity Board', affiliation: 'INEC Watch' },
  { name: 'Barr. Funke Adeyemi', role: 'Legal Affairs Committee', affiliation: 'Nigerian Bar Association' },
];

export default function LeadershipPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <span className={styles.badge}>Movement Leadership</span>
          <h1 className={styles.title}>The Architecture of Civic Power</h1>
          <p className={styles.subtitle}>
            OK Movement is led by Nigerians committed to building the civic infrastructure 
            our nation deserves. From ward volunteers to national coordinators, 
            every leader is accountable to the movement.
          </p>
        </section>

        {/* Founding Statement */}
        <section className={styles.statement}>
          <h2 className={styles.sectionTitle}>Founding Declaration</h2>
          <blockquote className={styles.quote}>
            &ldquo;We did not create this movement to seek power. We created it because 
            without organized civic power, the people will always be powerless against 
            those who have captured our institutions.&rdquo;
          </blockquote>
          <cite className={styles.cite}>— National Founding Council, 2024</cite>
        </section>

        {/* Structure */}
        <section className={styles.structure}>
          <h2 className={styles.sectionTitle}>National Structure</h2>
          <div className={styles.structureGrid}>
            {nationalStructure.map((item, index) => (
              <div key={index} className={styles.structureCard}>
                <div className={styles.structureLevel}>{item.level}</div>
                <div className={styles.structureRole}>{item.role}</div>
                <div className={styles.structureMembers}>{item.members}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Coordinators */}
        <section className={styles.coordinators}>
          <h2 className={styles.sectionTitle}>Regional Leadership</h2>
          <p className={styles.sectionDesc}>
            Six regional coordinators anchor our national presence, each supported by 
            state-level teams committed to civic empowerment in their communities.
          </p>
          <div className={styles.coordinatorGrid}>
            {coordinators.map((person, index) => (
              <div key={index} className={styles.coordinatorCard}>
                <div className={styles.coordinatorAvatar}>{person.image}</div>
                <div className={styles.coordinatorName}>{person.name}</div>
                <div className={styles.coordinatorRole}>{person.role}</div>
                <div className={styles.coordinatorState}>{person.state}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisory Council */}
        <section className={styles.advisory}>
          <h2 className={styles.sectionTitle}>Civic Advisory Council</h2>
          <p className={styles.sectionDesc}>
            Respected voices from civil society, academia, and legal institutions 
            provide guidance and accountability.
          </p>
          <div className={styles.advisorList}>
            {advisors.map((advisor, index) => (
              <div key={index} className={styles.advisorItem}>
                <div className={styles.advisorInfo}>
                  <span className={styles.advisorName}>{advisor.name}</span>
                  <span className={styles.advisorRole}>{advisor.role}</span>
                </div>
                <span className={styles.advisorAffiliation}>{advisor.affiliation}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Youth Pathway */}
        <section className={styles.youth}>
          <h2 className={styles.sectionTitle}>Youth Leadership Pathway</h2>
          <div className={styles.youthContent}>
            <p>
              Young Nigerians are the backbone of OK Movement. Our youth pathway 
              provides structured opportunities for anyone under 35 to grow into 
              leadership roles — from campus organizer to regional coordinator.
            </p>
            <div className={styles.youthStats}>
              <div className={styles.youthStat}>
                <span className={styles.youthStatValue}>67%</span>
                <span className={styles.youthStatLabel}>of volunteers under 35</span>
              </div>
              <div className={styles.youthStat}>
                <span className={styles.youthStatValue}>2,341</span>
                <span className={styles.youthStatLabel}>Campus organizers</span>
              </div>
              <div className={styles.youthStat}>
                <span className={styles.youthStatValue}>156</span>
                <span className={styles.youthStatLabel}>Youth coordinators</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Join the Movement</h2>
          <p className={styles.ctaDesc}>Every level needs committed citizens.</p>
          <div className={styles.ctaButtons}>
            <a href="#join" className="ok-btn ok-btn-primary">Become a Volunteer</a>
            <a href="#donate" className="ok-btn ok-btn-secondary">Support the Work</a>
          </div>
        </section>
      </div>
    </main>
  );
}