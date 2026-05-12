import AdminShell from '@/shells/admin-shell';

export default function CompliancePage() {
  return (
    <AdminShell>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F4F5F2', marginBottom: 8 }}>Compliance</h1>
        <p style={{ color: 'rgba(244,245,242,0.7)' }}>Regulatory compliance and policy enforcement.</p>
      </div>
    </AdminShell>
  );
}
