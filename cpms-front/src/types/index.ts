// Type definitions based on the Swagger file

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ATTENDANT' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface EmailInput {
  email: string;
}

export interface Park {
  id: number;
  code: string;
  parkingName: string;
  numberOfAvailableSpaces: number;
  location: string;
  chargingFeePerHr: number;
  status: 'AVAILABLE' | 'OCCUPIED';
  createdAt: string;
  updatedAt: string;
}

export interface ParkInput {
  code?: string;
  parkingName: string;
  numberOfAvailableSpaces: number;
  location: string;
  chargingFeePerHr: number;
  status?: 'AVAILABLE' | 'OCCUPIED';
}

export interface Vehicle {
  id: number;
  plateNumber: string;
  parkingCode: string;
  user: User;
  entryTime?: string;
  exitTime?: string;
  chargedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleInput {
  plateNumber: string;
  parkingCode: string;
  userId: number;
  entryTime?: string;
  exitTime?: string;
  chargedAmount?: number;
}

export interface VehicleEntryInput {
  plateNumber: string;
  parkingCode: string;
}

export interface EntryTicket {
  ticketId: string;
  entryTime: string;
  vehicle: Vehicle;
}

export interface ExitBill {
  ticketId: string;
  exitTime: string;
  durationMinutes: number;
  totalAmount: number;
}

export interface VehicleEntriesResponse {
  vehicles: Vehicle[];
}

export interface VehicleExitsResponse {
  totalCharged: number;
  vehicles: Vehicle[];
}

// API Error Response
export interface ApiError {
  message: string;
  statusCode?: number;
}

// Auth Context Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextProps {
  authState: AuthState;
  login: (credentials: LoginInput) => Promise<void>;
  register: (userData: UserInput) => Promise<void>;
  logout: () => void;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}