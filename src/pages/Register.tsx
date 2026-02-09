import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '',
    vehicleNumber: '', vehicleType: 'Truck', maxCapacity: '',
    rfidTag: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: generate blockchain address
    navigate('/login', { state: { role: 'owner' } });
  };

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden py-10">
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">VehicleChain</span>
          </Link>
          <p className="text-sm text-muted-foreground">Register as a Vehicle Owner</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
          <div>
            <p className="section-title">Personal Details</p>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Full Name</Label>
                <Input value={form.name} onChange={e => update('name', e.target.value)} className="bg-secondary border-border" placeholder="Rajesh Kumar" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Phone</Label>
                  <Input value={form.phone} onChange={e => update('phone', e.target.value)} className="bg-secondary border-border" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Email</Label>
                  <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="bg-secondary border-border" placeholder="you@email.com" />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">Password</Label>
                <Input type="password" value={form.password} onChange={e => update('password', e.target.value)} className="bg-secondary border-border" />
              </div>
            </div>
          </div>

          <div>
            <p className="section-title">Vehicle Details</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Vehicle Number</Label>
                  <Input value={form.vehicleNumber} onChange={e => update('vehicleNumber', e.target.value)} className="bg-secondary border-border" placeholder="KA-01-AB-1234" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Vehicle Type</Label>
                  <Select value={form.vehicleType} onValueChange={v => update('vehicleType', v)}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Tempo">Tempo</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Max Capacity (kg)</Label>
                  <Input type="number" value={form.maxCapacity} onChange={e => update('maxCapacity', e.target.value)} className="bg-secondary border-border" placeholder="2500" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">RFID Tag</Label>
                  <Input value={form.rfidTag} onChange={e => update('rfidTag', e.target.value)} className="bg-secondary border-border" placeholder="Auto-assigned" />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Register & Generate Blockchain Address</Button>

          <p className="text-center text-sm text-muted-foreground">
            Already registered?{' '}
            <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
