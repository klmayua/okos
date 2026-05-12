import AdminShell from '@/shells/admin-shell';

export default function ModerationPage() {
  return (
    <AdminShell>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F4F5F2', marginBottom: 8 }}>Moderation</h1>
        <p style={{ color: 'rgba(244,245,242,0.7)' }}>Content moderation and dispute resolution.</p>
      </div>
    </AdminShell>
  );
}
