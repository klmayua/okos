import React from 'react';

import styles from './footer.module.css';

const sections = [
  {
    title: 'Movement',
    links: ['About OK.OS', 'Our Constitution', 'Team', 'Careers'],
  },
  {
    title: 'Initiatives',
    links: ['One Vote. One PVC.', 'Verify Nigeria', 'Track Governance', 'Civic Pulse'],
  },
  {
    title: 'Transparency',
    links: ['Public Audit', 'Budget Explorer', 'Impact Reports', 'Open Data'],
  },
  {
    title: 'Governance',
    links: ['Voting Protocol', 'Deliberation', 'Escalation', 'Emergency'],
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Constitutional Law'],
  },
  {
    title: 'Contact',
    links: ['hello@okos.ng', 'Support', 'Press', 'Partnerships'],
  },
];

const socials = ['Twitter / X', 'LinkedIn', 'Instagram', 'YouTube'];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="ok-container">
        <div className={styles.grid}>
          {sections.map((section) => (
            <div key={section.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{section.title}</h3>
              <ul className={styles.linkList}>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.link}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.brand}>
            <div className={styles.logoBadge}>OK</div>
            <span className={styles.logoText}>.OS</span>
          </div>
          <div className={styles.socials}>
            {socials.map((social) => (
              <a key={social} href="#" className={styles.socialLink}>
                {social}
              </a>
            ))}
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} OK.OS — Civic Operating Infrastructure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
