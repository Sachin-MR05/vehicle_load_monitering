import DashboardLayout from '@/components/DashboardLayout';
import { mockAdminStats, mockActivityFeed, mockFines } from '@/lib/mock-data';
import { Truck, MapPin, Banknote, AlertTriangle, Clock, Server, Database, Wifi, HardDrive, UserPlus, FileWarning, CreditCard } from 'lucide-react';

const iconForType = (type: string) => {
  const map: Record<string, typeof UserPlus> = { registration: UserPlus, fine: Banknote, tamper: FileWarning, payment: CreditCard };
  return map[type] || Clock;
};

const colorForType = (type: string) => {
  const map: Record<string, string> = { registration: 'text-primary', fine: 'text-accent', tamper: 'text-destructive', payment: 'text-success' };
  return map[type] || 'text-muted-foreground';
};

const AdminDashboard = () => {
  const s = mockAdminStats;

  return (
    <DashboardLayout
      title="Admin Panel"
      subtitle="System Administrator"
      navItems={[
        { label: 'Dashboard', href: '/admin/dashboard', active: true },
        { label: 'Vehicles', href: '/admin/vehicles' },
        { label: 'Checkpoints', href: '/admin/checkpoints' },
        { label: 'Officers', href: '/admin/officers' },
        { label: 'Fines', href: '/admin/fines' },
        { label: 'Analytics', href: '/admin/analytics' },
        { label: 'Settings', href: '/admin/settings' },
      ]}
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <section>
          <p className="section-title">System Overview</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Total Vehicles', value: s.totalVehicles.toLocaleString(), icon: Truck },
              { label: 'Active Checkpoints', value: s.activeCheckpoints, icon: MapPin },
              { label: 'Fines This Month', value: `₹${(s.finesThisMonth / 1000).toFixed(0)}K`, icon: Banknote },
              { label: 'Pending Fines', value: `₹${(s.pendingFines / 1000).toFixed(0)}K`, icon: Clock },
              { label: 'Tamper Attempts', value: s.tamperAttempts, icon: AlertTriangle },
              { label: 'System Uptime', value: `${s.systemUptime}%`, icon: Server },
            ].map((card, i) => (
              <div key={i} className="stat-card">
                <card.icon className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="data-value">{card.value}</p>
                <p className="data-label mt-1">{card.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <section>
            <p className="section-title">Recent Activity</p>
            <div className="glass-card divide-y divide-border">
              {mockActivityFeed.map(item => {
                const Icon = iconForType(item.type);
                return (
                  <div key={item.id} className="flex items-start gap-3 px-4 py-3">
                    <div className={`mt-0.5 ${colorForType(item.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{item.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* System Health */}
          <section>
            <p className="section-title">System Health</p>
            <div className="glass-card p-5 space-y-4">
              {[
                { label: 'Blockchain Nodes', status: 'Online', ok: true, icon: Wifi },
                { label: 'Database Connection', status: 'Healthy', ok: true, icon: Database },
                { label: 'API Response Time', status: '45ms', ok: true, icon: Server },
                { label: 'Storage Usage', status: '67% (134 GB)', ok: true, icon: HardDrive },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className={item.ok ? 'alert-badge-green' : 'alert-badge-red'}>{item.status}</span>
                </div>
              ))}
            </div>

            {/* Recent Fines */}
            <p className="section-title mt-6">Recent Fines</p>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Vehicle</th>
                    <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Amount</th>
                    <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockFines.map(f => (
                    <tr key={f.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="px-4 py-2.5 font-mono text-xs">{f.vehicleNumber}</td>
                      <td className="px-4 py-2.5">₹{f.amount.toLocaleString()}</td>
                      <td className="px-4 py-2.5">
                        <span className={f.status === 'Paid' ? 'alert-badge-green' : f.status === 'Pending' ? 'alert-badge-yellow' : 'alert-badge-red'}>
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
