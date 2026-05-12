'use client';

import React from 'react';

import styles from './page.module.css';

const pathways = [
  {
    title: 'Volunteer',
    description: 'Join your local ward team and contribute to civic mobilization.',
    commitment: '4 hours/month',
    members: '47,230',
    icon: '🤝',
  },
  {
    title: 'Chapter Organizer',
    description: 'Lead a community chapter in your LGA or constituency.',
    commitment: '8 hours/month',
    members: '2,841',
    icon: '🏛️',
  },
  {
    title: 'Civic Verifier',
    description: 'Verify PVC registrations and electoral information.',
    commitment: 'As needed',
    members: '12,456',
    icon: '✓',
  },
  {
    title: 'Campus Ambassador',
    description: 'Organize university and college students across Nigeria.',
    commitment: '6 hours/month',
    members: '3,127',
    icon: '🎓',
  },
  {
    title: 'Steward',
    description: 'Oversee regional coordination and volunteer management.',
    commitment: '15 hours/month',
    members: '892',
    icon: '⭐',
  },
  {
    title: 'Regional Coordinator',
    description: 'Lead state-level movement strategy and execution.',
    commitment: 'Full-time',
    members: '36',
    icon: '🌍',
  },
];

const stages = [
  { stage: 'Observer', description: 'Learn about the movement', color: '#6B7280' },
  { stage: 'Student', description: 'Complete civic education', color: '#0D5C46' },
  { stage: 'Citizen', description: 'Attend community events', color: '#0F7B5F' },
  { stage: 'Volunteer', description: 'Contribute regularly', color: '#164D3D' },
  { stage: 'Steward', description: 'Lead a team', color: '#C8A44D' },
  { stage: 'Guardian', description: 'Regional leadership', color: '#D4A64F' },
];

export default function JoinPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <span className={styles.badge}>Join The Movement</span>
          <h1 className={styles.title}>Your Country Needs You</h1>
          <p className={styles.subtitle}>
            OK Movement is built by citizens who decided to stop waiting for change. 
            Find your place in the structure that is rebuilding Nigeria.
          </p>
        </section>

        {/* Pathway Timeline */}
        <section className={styles.timeline}>
          <h2 className={styles.sectionTitle}>Civic Progression Path</h2>
          <div className={styles.stages}>
            {stages.map((item, index) => (
              <div key={index} className={styles.stage}>
                <div 
                  className={styles.stageDot} 
                  style={{ backgroundColor: item.color }}
                />
                <div className={styles.stageName}>{item.stage}</div>
                <div className={styles.stageDesc}>{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Participation Pathways */}
        <section className={styles.pathways}>
          <h2 className={styles.sectionTitle}>Ways to Participate</h2>
          <div className={styles.pathwayGrid}>
            {pathways.map((pathway, index) => (
              <div key={index} className={styles.pathwayCard}>
                <div className={styles.pathwayIcon}>{pathway.icon}</div>
                <h3 className={styles.pathwayTitle}>{pathway.title}</h3>
                <p className={styles.pathwayDesc}>{pathway.description}</p>
                <div className={styles.pathwayMeta}>
                  <span className={styles.pathwayCommitment}>{pathway.commitment}</span>
                  <span className={styles.pathwayMembers}>{pathway.members} members</span>
                </div>
                <button className={styles.pathwayBtn}>Apply Now</button>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className={styles.impact}>
          <h2 className={styles.sectionTitle}>Movement Impact</h2>
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>2.4M</span>
              <span className={styles.impactLabel}>PVCs Verified</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>8,420</span>
              <span className={styles.impactLabel}>Wards Active</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>47K</span>
              <span className={styles.impactLabel}>Volunteers</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>36</span>
              <span className={styles.impactLabel}>States Covered</span>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className={styles.whatsapp}>
          <h2 className={styles.whatsappTitle}>Questions? Join the Conversation</h2>
          <p className={styles.whatsappDesc}>
            Connect directly with movement coordinators on WhatsApp.
          </p>
          <a 
            href="https://wa.me/2349055666355" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.whatsappIcon}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}