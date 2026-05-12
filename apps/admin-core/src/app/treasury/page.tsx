'use client';

import React from 'react';

import AdminShell from '@/shells/admin-shell';

import styles from './page.module.css';

const treasuryPanels = [
  { id: 'live', label: 'Live Treasury', value: '₦24.7M', change: '+₦456K today', status: 'green' },
  { id: 'donations', label: 'Incoming Donations', value: '₦1.2M', change: '32 donors', status: 'green' },
  { id: 'allocations', label: 'Allocation Engine', value: '8 active', change: '2 pending', status: 'amber' },
  { id: 'releases', label: 'Release Requests', value: '5', change: '3 approved', status: 'green' },
  { id: 'cso', label: 'CSO Signoffs', value: '12/14', change: '2 pending', status: 'amber' },
  { id: 'audit', label: 'Expenditure Audit', value: '98.4%', change: 'Last: 2 days ago', status: 'green' },
  { id: 'funding', label: 'Initiative Funding', value: '₦18.2M', change: '18 initiatives', status: 'green' },
  { id: 'emergency', label: 'Emergency Disbursement', value: '₦500K', change: 'Available', status: 'green' },
];

const transactions = [
  { id: 'TX-1042', type: 'Donation', amount: '₦50,000', donor: 'Anonymous', initiative: 'One Vote One PVC', status: 'Confirmed', time: '2 min ago' },
  { id: 'TX-1041', type: 'Allocation', amount: '₦200,000', donor: 'Treasury', initiative: 'Civic Education Drive', status: 'Pending CSO', time: '15 min ago' },
  { id: 'TX-1040', type: 'Release', amount: '₦150,000', donor: 'Treasury', initiative: 'Emergency Response Kit', status: 'Approved', time: '1 hr ago' },
  { id: 'TX-1039', type: 'Donation', amount: '₦25,000', donor: 'CSO Partner', initiative: 'Verify Nigeria 2026', status: 'Confirmed', time: '2 hrs ago' },
  { id: 'TX-1038', type: 'Expenditure', amount: '₦75,000', donor: 'Treasury', initiative: 'Transparency Portal', status: 'Audited', time: '3 hrs ago' },
];

export default function TreasuryPage() {
  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className="cmd-text-h1">Treasury & Transparency</h1>
          <p className="cmd-text-body">Public financial trust and allocation management.</p>
        </div>

        <div className={styles.grid}>
          {treasuryPanels.map((panel) => (
            <div key={panel.id} className={`cmd-glass-card ${styles.card}`}>
              <span className={styles.cardLabel}>{panel.label}</span>
              <div className={styles.cardValueRow}>
                <span className={styles.cardValue}>{panel.value}</span>
                <span className={`${styles.cardChange} ${styles[`status${panel.status}`]}`}>{panel.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`cmd-glass-panel ${styles.tableSection}`}>
          <h3 className="cmd-text-h2">Recent Transactions</h3>
          <div className={styles.tableWrapper}>
            <table className="cmd-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Donor/Source</th>
                  <th>Initiative</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className={styles.mono}>{tx.id}</td>
                    <td>{tx.type}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.donor}</td>
                    <td>{tx.initiative}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge${tx.status.replace(/\s/g, '')}`]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className={styles.muted}>{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
