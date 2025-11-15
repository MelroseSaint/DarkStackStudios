export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
  preferences?: UserPreferences;
  crisis_contacts?: CrisisContact[];
}

export enum UserRole {
  ANONYMOUS = 'anonymous',
  REGISTERED = 'registered',
  PREMIUM = 'premium',
  PROFESSIONAL = 'professional',
  CRISIS_COUNSELOR = 'crisis_counselor',
  ADMIN = 'admin'
}

export interface UserProfile {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  pronouns?: string;
  phone?: string;
  emergency_contact?: EmergencyContact;
  address?: Address;
  insurance_info?: InsuranceInfo;
  mental_health_history?: MentalHealthHistory;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  is_primary: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface InsuranceInfo {
  provider: string;
  policy_number: string;
  group_number?: string;
  mental_health_coverage: boolean;
  copay_amount?: number;
}

export interface MentalHealthHistory {
  previous_therapy: boolean;
  current_medications: Medication[];
  diagnoses: string[];
  hospitalization_history: Hospitalization[];
  family_history: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribed_by: string;
  start_date: string;
  current: boolean;
}

export interface Hospitalization {
  facility: string;
  admission_date: string;
  discharge_date?: string;
  reason: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications_enabled: boolean;
  crisis_alerts_enabled: boolean;
  location_sharing_enabled: boolean;
  language: string;
  timezone: string;
  privacy_level: 'public' | 'friends' | 'private' | 'anonymous';
}

export interface CrisisContact {
  id: string;
  name: string;
  organization: string;
  phone: string;
  text?: string;
  website?: string;
  services: string[];
  hours: string;
  languages: string[];
  is_national: boolean;
  is_local: boolean;
  priority: number;
}