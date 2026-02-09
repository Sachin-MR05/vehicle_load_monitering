import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Shield, Settings, ChevronRight } from 'lucide-react';
import type { UserRole } from '@/lib/mock-data';

const roles: { id: UserRole; label: string; icon: typeof Truck; description: string }[] = [
  { id: 'owner', label: 'Vehicle Owner', icon: Truck, description: 'Monitor your vehicle, view trips & manage fines' },
  { id: 'officer', label: 'Government Officer', icon: Shield, description: 'Scan vehicles, verify blockchain & issue fines' },
  { id: 'admin', label: 'Administrator', icon: Settings, description: 'Manage system, officers, vehicles & analytics' },
];

const Index = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center mb-12 animate-fade-in-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          VehicleChain
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Blockchain-verified vehicle load monitoring & compliance system
        </p>
      </div>

      <div className="relative z-10 grid gap-4 w-full max-w-lg px-6">
        {roles.map((role, i) => (
          <button
            key={role.id}
            onClick={() => navigate('/login', { state: { role: role.id } })}
            onMouseEnter={() => setHoveredRole(role.id)}
            onMouseLeave={() => setHoveredRole(null)}
            className={`glass-card p-5 flex items-center gap-4 text-left transition-all duration-300 animate-fade-in-up opacity-0 group cursor-pointer
              ${hoveredRole === role.id ? 'border-primary/40 shadow-[0_0_30px_hsl(var(--glow-primary))]' : ''}
              ${i === 0 ? 'animate-delay-100' : i === 1 ? 'animate-delay-200' : 'animate-delay-300'}
            `}
          >
            <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <role.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground">{role.label}</div>
              <div className="text-sm text-muted-foreground">{role.description}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>

      <div className="relative z-10 mt-10 text-xs text-muted-foreground animate-fade-in-up animate-delay-400 opacity-0">
        Secured by blockchain • Real-time monitoring • TinyML powered
      </div>
    </div>
  );
};

export default Index;
