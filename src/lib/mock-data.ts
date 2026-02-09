export type UserRole = 'owner' | 'officer' | 'admin';

export interface Vehicle {
  id: string;
  number: string;
  type: 'Truck' | 'Tempo' | 'Van';
  maxCapacity: number;
  currentWeight: number;
  ownerName: string;
  rfidTag: string;
  status: 'Active' | 'Suspended';
  registrationDate: string;
  healthScore: number;
}

export interface AlertRecord {
  id: string;
  dateTime: string;
  weight: number;
  alertLevel: 0 | 1 | 2 | 3;
  tilt: { x: number; y: number };
  action: string;
}

export interface Fine {
  id: string;
  vehicleId: string;
  vehicleNumber: string;
  date: string;
  location: string;
  amount: number;
  status: 'Pending' | 'Paid' | 'Disputed';
  checkpoint: string;
  officerName: string;
}

export interface BlockRecord {
  blockNumber: number;
  timestamp: string;
  prevHash: string;
  currentHash: string;
  data: { weight: number; tilt: { x: number; y: number } };
  signature: string;
  verified: boolean;
}

export interface TripSummary {
  id: string;
  startTime: string;
  endTime: string;
  maxWeight: number;
  overloadEvents: number;
  warnings: number;
  healthScore: number;
  blockchainRecords: number;
}

export const mockVehicle: Vehicle = {
  id: 'VH-2026-001',
  number: 'KA-01-AB-1234',
  type: 'Truck',
  maxCapacity: 2500,
  currentWeight: 2180,
  ownerName: 'Rajesh Kumar',
  rfidTag: 'RFID-9A3F-B7C2',
  status: 'Active',
  registrationDate: '2025-08-15',
  healthScore: 87,
};

export const mockAlerts: AlertRecord[] = [
  { id: 'A001', dateTime: '2026-02-09 14:32', weight: 2450, alertLevel: 2, tilt: { x: 3.2, y: 1.1 }, action: 'Warning Issued' },
  { id: 'A002', dateTime: '2026-02-09 11:15', weight: 2180, alertLevel: 0, tilt: { x: 0.5, y: 0.3 }, action: 'None' },
  { id: 'A003', dateTime: '2026-02-08 16:45', weight: 2600, alertLevel: 3, tilt: { x: 5.1, y: 2.8 }, action: 'Fine Issued' },
  { id: 'A004', dateTime: '2026-02-08 09:20', weight: 1900, alertLevel: 0, tilt: { x: 0.2, y: 0.1 }, action: 'None' },
  { id: 'A005', dateTime: '2026-02-07 13:50', weight: 2350, alertLevel: 1, tilt: { x: 2.1, y: 1.5 }, action: 'Alert Logged' },
];

export const mockFines: Fine[] = [
  { id: 'FN-001', vehicleId: 'VH-2026-001', vehicleNumber: 'KA-01-AB-1234', date: '2026-02-08', location: 'NH-44 Checkpoint', amount: 15000, status: 'Pending', checkpoint: 'CP-001', officerName: 'Officer Sharma' },
  { id: 'FN-002', vehicleId: 'VH-2026-001', vehicleNumber: 'KA-01-AB-1234', date: '2026-01-25', location: 'NH-48 Toll Plaza', amount: 8500, status: 'Paid', checkpoint: 'CP-003', officerName: 'Officer Patel' },
  { id: 'FN-003', vehicleId: 'VH-2026-002', vehicleNumber: 'MH-12-CD-5678', date: '2026-02-05', location: 'SH-17 Checkpoint', amount: 22000, status: 'Disputed', checkpoint: 'CP-002', officerName: 'Officer Singh' },
];

export const mockBlocks: BlockRecord[] = Array.from({ length: 8 }, (_, i) => ({
  blockNumber: i + 1,
  timestamp: `2026-02-09 ${String(8 + i * 2).padStart(2, '0')}:00`,
  prevHash: i === 0 ? '0000000000000000' : `d4f3b2a1c9e8${String(i).padStart(4, '0')}`,
  currentHash: `d4f3b2a1c9e8${String(i + 1).padStart(4, '0')}`,
  data: { weight: 1800 + Math.floor(Math.random() * 700), tilt: { x: Math.random() * 5, y: Math.random() * 3 } },
  signature: `sig_${Math.random().toString(36).slice(2, 10)}`,
  verified: true,
}));

export const mockTrips: TripSummary[] = [
  { id: 'TRP-20260209-001', startTime: '2026-02-09 06:00', endTime: '2026-02-09 09:45', maxWeight: 2450, overloadEvents: 0, warnings: 2, healthScore: 87, blockchainRecords: 2700 },
  { id: 'TRP-20260208-001', startTime: '2026-02-08 07:30', endTime: '2026-02-08 14:15', maxWeight: 2600, overloadEvents: 1, warnings: 3, healthScore: 72, blockchainRecords: 3100 },
  { id: 'TRP-20260207-001', startTime: '2026-02-07 05:45', endTime: '2026-02-07 11:30', maxWeight: 2100, overloadEvents: 0, warnings: 0, healthScore: 95, blockchainRecords: 2200 },
];

export const mockOfficerStats = {
  totalScanned: 47,
  overloaded: 8,
  finesIssued: 5,
  tamperDetected: 1,
  avgProcessingTime: '2m 15s',
};

export const mockAdminStats = {
  totalVehicles: 1247,
  activeCheckpoints: 23,
  finesThisMonth: 892500,
  pendingFines: 345000,
  tamperAttempts: 12,
  systemUptime: 99.7,
};

export const mockActivityFeed = [
  { id: '1', type: 'registration' as const, message: 'New vehicle KA-05-EF-9012 registered', time: '5 min ago' },
  { id: '2', type: 'fine' as const, message: 'Fine ₹15,000 issued to MH-12-CD-5678', time: '12 min ago' },
  { id: '3', type: 'tamper' as const, message: 'Tamper detected on vehicle TN-09-GH-3456', time: '28 min ago' },
  { id: '4', type: 'payment' as const, message: 'Payment ₹8,500 received from KA-01-AB-1234', time: '1 hour ago' },
  { id: '5', type: 'registration' as const, message: 'New vehicle DL-03-IJ-7890 registered', time: '2 hours ago' },
];
