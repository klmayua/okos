'use client';

import React from 'react';

import styles from './page.module.css';

const transparencyMetrics = [
  { label: 'Funds Raised', value: '₦847M', change: '+12%', verified: true },
  { label: 'Projects Funded', value: '234', change: '+18', verified: true },
  { label: 'PVC Mobilizations', value: '2.4M', change: '+340K', verified: true },
  { label: 'Verified Reports', value: '89,432', change: '+12K', verified: true },
  { label: 'Volunteer Hours', value: '1.2M', change: '+180K', verified: true },
];

const projects = [
  { title: 'PVC Registration Drive - North-Central', amount: '₦42M', status: 'Completed', region: 'Kwara, Nasarawa, Plateau' },
  { title: 'Youth Civic Education Workshops', amount: '₦28M', status: 'Completed', region: '36 States' },
  { title: 'Community Verifier Training', amount: '₦18M', status: 'In Progress', region: '774 LGAs' },
  { title: 'Transparency Dashboard Development', amount: '₦12M', status: 'Completed', region: 'National' },
  { title: 'Regional Chapter Support', amount: '₦35M', status: 'In Progress', region: '6 Regions' },
];

const auditPartners = [
  { name: 'Civil Society Network', role: 'Independent Auditor' },
  { name: 'Bureau of Public Procurement', role: 'Funds Validator' },
  { name: 'Nigerian Accounting Standards Board', role: 'Financial Compliance' },
];

export default function TransparencyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Hero */}
        <section className={styles.hero}>
          <span className={styles.badge}>Transparency First</span>
          <h1 className={styles.title}>Every Naira Accounted For</h1>
          <p className={styles.subtitle}>
            OK Movement operates with radical transparency. Every donation, every project, 
            every expense is visible to the public. We believe trust is earned, not claimed.
          </p>
        </section>

        {/* Metrics */}
        <section className={styles.metrics}>
          <h2 className={styles.sectionTitle}>Real-Time Transparency Metrics</h2>
          <div className={styles.metricsGrid}>
            {transparencyMetrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>{metric.label}</span>
                  {metric.verified && (
                    <svg className={styles.verifiedIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                  )}
                </div>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricChange}>{metric.change} this month</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className={styles.projects}>
          <h2 className={styles.sectionTitle}>Project Funding</h2>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectItem}>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.projectRegion}>{project.region}</span>
                </div>
                <div className={styles.projectMeta}>
                  <span className={styles.projectAmount}>{project.amount}</span>
                  <span 
                    className={styles.projectStatus}
                    data-status={project.status.toLowerCase().replace(' ', '-')}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Partners */}
        <section className={styles.audit}>
          <h2 className={styles.sectionTitle}>Independent Oversight</h2>
          <p className={styles.sectionDesc}>
            Third-party organizations verify our operations and finances.
          </p>
          <div className={styles.auditList}>
            {auditPartners.map((partner, index) => (
              <div key={index} className={styles.auditItem}>
                <div className={styles.auditIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div className={styles.auditInfo}>
                  <span className={styles.auditName}>{partner.name}</span>
                  <span className={styles.auditRole}>{partner.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section className={styles.download}>
          <h2 className={styles.downloadTitle}>Full Financial Reports</h2>
          <p className={styles.downloadDesc}>
            Download complete quarterly reports with detailed breakdowns.
          </p>
          <div className={styles.downloadButtons}>
            <button className={styles.downloadBtn}>Q1 2024 Report</button>
            <button className={styles.downloadBtn}>Q2 2024 Report</button>
            <button className={styles.downloadBtn}>Q3 2024 Report</button>
          </div>
        </section>
      </div>
    </main>
  );
}