import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { 
  User, 
  UserInput, 
  LoginInput, 
  LoginResponse,
  Park,
  ParkInput,
  Vehicle,
  VehicleInput,
  VehicleEntryInput,
  EntryTicket,
  ExitBill,
  VehicleEntriesResponse,
  VehicleExitsResponse,
  EmailInput,
} from '../types/index.ts';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:9090',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic API error handler
const handleApiError = (error: AxiosError): never => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  
  const errorMessage =
    (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
      ? (error.response.data as { message?: string }).message
      : undefined) ||
    error.message ||
    'An unknown error occurred';
  throw new Error(errorMessage);
};

// Auth API
export const authApi = {
  register: async (userData: UserInput): Promise<void> => {
    try {
      await api.post('/rest/cpms/api/v1/register', userData);
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },
  
  login: async (credentials: LoginInput): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/rest/cpms/api/v1/login', credentials);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw new Error('Login failed'); // Ensure function always returns or throws
    }
  },
  
  sendMail: async (emailData: EmailInput): Promise<void> => {
    try {
      await api.post('/rest/cpms/api/v1/send-mail', emailData);
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  }
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/rest/cpms/api/v1/users');
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return []; // Ensure a User[] is always returned
    }
  },
  
  getById: async (id: string): Promise<User | undefined> => {
    try {
      const response = await api.get<User>(`/rest/cpms/api/v1/users/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  update: async (id: string, userData: UserInput): Promise<User | undefined> => {
    try {
      const response = await api.put<User>(`/rest/cpms/api/v1/users/${id}`, userData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/rest/cpms/api/v1/users/${id}`);
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  }
};

// Parks API
export const parksApi = {
  getAll: async (): Promise<Park[]> => {
    try {
      const response = await api.get<Park[]>('/rest/cpms/api/v1/parks');
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return []; // Ensure a Park[] is always returned
    }
  },
  
  getById: async (id: number): Promise<Park | undefined> => {
    try {
      const response = await api.get<Park>(`/rest/cpms/api/v1/parks/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  create: async (parkData: ParkInput): Promise<Park | undefined> => {
    try {
      const response = await api.post<Park>('/rest/cpms/api/v1/parks', parkData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  update: async (id: number, parkData: ParkInput): Promise<Park | undefined> => {
    try {
      const response = await api.put<Park>(`/rest/cpms/api/v1/parks/${id}`, parkData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/rest/cpms/api/v1/parks/${id}`);
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  }
};

// Vehicles API
export const vehiclesApi = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const response = await api.get<Vehicle[]>('/rest/cpms/api/v1/vehicles');
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error; // This line ensures a return type is always enforced
    }
  },
  
  getById: async (id: number): Promise<Vehicle | undefined> => {
    try {
      const response = await api.get<Vehicle>(`/rest/cpms/api/v1/vehicles/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  create: async (vehicleData: VehicleInput): Promise<Vehicle | undefined> => {
    try {
      const response = await api.post<Vehicle>('/rest/cpms/api/v1/vehicles', vehicleData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  update: async (id: number, vehicleData: VehicleInput): Promise<Vehicle | undefined> => {
    try {
      const response = await api.put<Vehicle>(`/rest/cpms/api/v1/vehicles/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return undefined;
    }
  },
  
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/rest/cpms/api/v1/vehicles/${id}`);
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },
  
  registerEntry: async (entryData: VehicleEntryInput): Promise<EntryTicket> => {
    try {
      const response = await api.post<EntryTicket>('/rest/cpms/api/v1/vehicles/entry', entryData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw new Error('Vehicle entry registration failed');
    }
  },
  
  registerExit: async (vehicleId: number): Promise<ExitBill> => {
    try {
      const response = await api.post<ExitBill>(`/rest/cpms/api/v1/vehicles/exit/${vehicleId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw new Error('Vehicle exit registration failed');
    }
  },
  
  getEntriesByDateRange: async (start: string, end: string): Promise<VehicleEntriesResponse> => {
    try {
      const params: AxiosRequestConfig = {
        params: { start, end }
      };
      const response = await api.get<VehicleEntriesResponse>('/rest/cpms/api/v1/vehicles/entries', params);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      // Return a default value to satisfy the return type
      return { vehicles: [] } as VehicleEntriesResponse;
    }
  },
  
  getExitsByDateRange: async (start: string, end: string): Promise<VehicleExitsResponse> => {
    try {
      const params: AxiosRequestConfig = {
        params: { start, end }
      };
      const response = await api.get<VehicleExitsResponse>('/vehicles/exits', params);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      // Return a default value to satisfy the return type
      return { vehicles: [], totalCharged: 0 };
    }
  }
};

export default {
  auth: authApi,
  users: usersApi,
  parks: parksApi,
  vehicles: vehiclesApi
};