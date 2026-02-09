import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  navItems?: { label: string; href: string; active?: boolean }[];
}

const DashboardLayout = ({ children, title, subtitle, badge, navItems }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-sm text-foreground hidden sm:block">VehicleChain</span>
            </Link>
            <div className="h-5 w-px bg-border mx-1" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold text-foreground">{title}</h1>
                {badge}
              </div>
              {subtitle && <p className="text-xs text-muted-foreground -mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {navItems && (
              <nav className="hidden md:flex items-center gap-1 mr-2">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      item.active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => navigate('/')}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
