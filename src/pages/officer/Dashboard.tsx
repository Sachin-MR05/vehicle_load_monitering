import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { mockVehicle, mockBlocks, mockOfficerStats } from '@/lib/mock-data';
import { Scan, CheckCircle, XCircle, AlertTriangle, Truck, Shield, FileText, Clock, Users, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfficerDashboard = () => {
  const [scanned, setScanned] = useState(false);
  const stats = mockOfficerStats;

  return (
    <DashboardLayout
      title="Officer Sharma"
      subtitle="NH-44 Checkpoint • CP-001"
      badge={<span className="alert-badge-green">Scanner Online</span>}
      navItems={[
        { label: 'Dashboard', href: '/officer/dashboard', active: true },
        { label: 'Issue Fine', href: '/officer/fine' },
        { label: 'Search', href: '/officer/search' },
        { label: 'Tamper Log', href: '/officer/tamper' },
        { label: 'Reports', href: '/officer/reports' },
      ]}
    >
      <div className="space-y-6">
        {/* Scanner + Verification */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Live Scanner */}
          <section>
            <p className="section-title">Live Checkpoint Scanner</p>
            <div className="glass-card p-6 text-center">
              {!scanned ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto scan-pulse">
                    <Scan className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Ready to scan RFID tag</p>
                  <Button onClick={() => setScanned(true)} className="w-full">
                    <Scan className="w-4 h-4 mr-2" /> Trigger Scan
                  </Button>
                </div>
              ) : (
                <div className="text-left space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <Truck className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{mockVehicle.number}</p>
                      <p className="text-xs text-muted-foreground">{mockVehicle.ownerName} • {mockVehicle.type}</p>
                    </div>
                    <span className="alert-badge-green ml-auto">Verified</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card">
                      <span className="data-label">Max Capacity</span>
                      <p className="data-value">{mockVehicle.maxCapacity.toLocaleString()} kg</p>
                    </div>
                    <div className="stat-card">
                      <span className="data-label">RFID</span>
                      <p className="font-mono text-xs text-primary mt-1">{mockVehicle.rfidTag}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setScanned(false)} className="w-full">
                    Scan Another
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Verification Panel */}
          <section>
            <p className="section-title">Verification Panel</p>
            {scanned ? (
              <div className="glass-card p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="data-label">Current Weight</span>
                    <p className="data-value">2,180 kg</p>
                  </div>
                  <div>
                    <span className="data-label">Timestamp</span>
                    <p className="font-mono text-xs text-muted-foreground mt-1">2026-02-09 14:32:15</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Hash Verification', status: true, icon: Shield },
                    { label: 'Signature Validation', status: true, icon: CheckCircle },
                    { label: 'Chain Integrity', status: true, icon: CheckCircle },
                  ].map((check, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded bg-secondary/50">
                      <div className="flex items-center gap-2">
                        <check.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{check.label}</span>
                      </div>
                      {check.status ? (
                        <span className="alert-badge-green text-xs">✅ Passed</span>
                      ) : (
                        <span className="alert-badge-red text-xs">❌ Failed</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded bg-success/5 border border-success/20">
                  <p className="text-sm text-success font-medium">No overload detected — Vehicle may proceed</p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">Proceed</Button>
                  <Button variant="destructive" className="flex-1">Issue Fine</Button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-10 flex items-center justify-center text-muted-foreground">
                <p className="text-sm">Scan a vehicle to view verification details</p>
              </div>
            )}
          </section>
        </div>

        {/* Today's Summary */}
        <section>
          <p className="section-title">Today's Summary</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Vehicles Scanned', value: stats.totalScanned, icon: Users },
              { label: 'Overloaded', value: stats.overloaded, icon: AlertTriangle },
              { label: 'Fines Issued', value: stats.finesIssued, icon: Banknote },
              { label: 'Tamper Attempts', value: stats.tamperDetected, icon: XCircle },
              { label: 'Avg. Processing', value: stats.avgProcessingTime, icon: Clock },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <s.icon className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="data-value">{s.value}</p>
                <p className="data-label mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <p className="section-title">Quick Actions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Issue Fine', icon: Banknote },
              { label: 'Vehicle History', icon: FileText },
              { label: 'Report Tampering', icon: AlertTriangle },
              { label: 'Export Daily Report', icon: FileText },
            ].map((action, i) => (
              <button key={i} className="glass-card p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors cursor-pointer">
                <action.icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default OfficerDashboard;
