import DashboardLayout from '@/components/DashboardLayout';
import { mockVehicle, mockAlerts, mockFines, mockTrips } from '@/lib/mock-data';
import { Activity, Weight, AlertTriangle, TrendingUp, CheckCircle, Clock, Gauge, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const alertLevelLabel = (level: number) => {
  if (level === 0) return <span className="alert-badge-green">Normal</span>;
  if (level === 1) return <span className="alert-badge-yellow">Warning</span>;
  if (level === 2) return <span className="alert-badge-yellow">High</span>;
  return <span className="alert-badge-red">Critical</span>;
};

const OwnerDashboard = () => {
  const v = mockVehicle;
  const loadPercent = Math.round((v.currentWeight / v.maxCapacity) * 100);
  const overloadPercent = Math.max(0, loadPercent - 100);

  return (
    <DashboardLayout
      title={v.number}
      subtitle={`${v.type} • ${v.ownerName}`}
      badge={<span className="alert-badge-green">Normal</span>}
      navItems={[
        { label: 'Dashboard', href: '/owner/dashboard', active: true },
        { label: 'Trips', href: '/owner/trips' },
        { label: 'Blockchain', href: '/owner/blockchain' },
        { label: 'Profile', href: '/owner/profile' },
      ]}
    >
      <div className="space-y-6">
        {/* Real-Time Monitoring */}
        <section>
          <p className="section-title">Real-Time Monitoring</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-3">
                <Weight className="w-4 h-4 text-primary" />
                <span className="data-label">Current Weight</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{v.currentWeight.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">kg</span></p>
              <Progress value={loadPercent} className="mt-2 h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">{loadPercent}% of {v.maxCapacity.toLocaleString()} kg</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-accent" />
                <span className="data-label">Overload</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{overloadPercent}%</p>
              <p className="text-xs text-muted-foreground mt-1">Above max capacity</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="data-label">Tilt Angle</span>
              </div>
              <p className="text-2xl font-bold text-foreground">X: 1.2° <span className="text-muted-foreground">Y: 0.5°</span></p>
              <p className="text-xs text-muted-foreground mt-1">Within safe range</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-success" />
                <span className="data-label">Vibration</span>
              </div>
              <p className="text-2xl font-bold text-foreground">Low</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Synced 30s ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Summary Cards */}
        <section>
          <p className="section-title">Trip Summary — This Month</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Trips', value: mockTrips.length, icon: BarChart3 },
              { label: 'Avg Load', value: `${Math.round(mockTrips.reduce((a, t) => a + t.maxWeight, 0) / mockTrips.length / v.maxCapacity * 100)}%`, icon: TrendingUp },
              { label: 'Overload Events', value: mockTrips.reduce((a, t) => a + t.overloadEvents, 0), icon: AlertTriangle },
              { label: 'Warnings', value: mockTrips.reduce((a, t) => a + t.warnings, 0), icon: AlertTriangle },
              { label: 'Health Score', value: `${v.healthScore}/100`, icon: Activity },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <s.icon className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="data-value">{s.value}</p>
                <p className="data-label mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Alert History */}
          <section>
            <p className="section-title">Alert History</p>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Date/Time</th>
                      <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Weight</th>
                      <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Level</th>
                      <th className="px-4 py-2.5 text-xs text-muted-foreground font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAlerts.map(a => (
                      <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{a.dateTime}</td>
                        <td className="px-4 py-2.5">{a.weight} kg</td>
                        <td className="px-4 py-2.5">{alertLevelLabel(a.alertLevel)}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{a.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Compliance Status */}
          <section>
            <p className="section-title">Compliance Status</p>
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="data-label">Status</span>
                <span className="alert-badge-green flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Compliant
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="data-label">Last Verified</span>
                <span className="text-sm text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="data-label">Data Sync</span>
                <span className="text-sm text-success font-medium">Active</span>
              </div>
            </div>

            {/* Pending Fines */}
            <p className="section-title mt-6">Pending Fines</p>
            <div className="space-y-3">
              {mockFines.filter(f => f.status === 'Pending').map(f => (
                <div key={f.id} className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">₹{f.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{f.date} • {f.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">Pay</button>
                    <button className="text-xs px-3 py-1 rounded bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">Dispute</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
