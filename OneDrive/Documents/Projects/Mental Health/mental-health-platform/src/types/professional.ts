export interface Professional {
  id: string;
  user_id?: string;
  license_number: string;
  license_state: string;
  license_expiration: string;
  license_verified: boolean;
  verification_date?: string;
  profile: ProfessionalProfile;
  specialties: Specialty[];
  treatment_approaches: TreatmentApproach[];
  insurance_networks: InsuranceNetwork[];
  availability: Availability;
  fees: FeeStructure;
  credentials: Credential[];
  experience: Experience[];
  education: Education[];
  reviews: ProfessionalReview[];
  ratings: ProfessionalRating;
  verification_status: VerificationStatus;
  background_check_completed: boolean;
  malpractice_insurance: boolean;
  telehealth_enabled: boolean;
  languages: string[];
  accessibility_features: string[];
  emergency_contact: EmergencyContact;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalProfile {
  first_name: string;
  last_name: string;
  title: string;
  credentials: string;
  bio: string;
  photo_url?: string;
  practice_name?: string;
  practice_website?: string;
  phone: string;
  email: string;
  office_address: Address[];
  practice_philosophy: string;
  areas_of_focus: string[];
  client_demographics: string[];
  session_formats: SessionFormat[];
  typical_session_length: number;
  average_wait_time_days: number;
  accepts_new_clients: boolean;
}

export interface Specialty {
  id: string;
  name: string;
  category: string;
  description: string;
  years_experience: number;
  certification?: string;
  verified: boolean;
}

export interface TreatmentApproach {
  id: string;
  name: string;
  description: string;
  evidence_based: boolean;
  years_experience: number;
  training_completed: string[];
  certification?: string;
}

export interface InsuranceNetwork {
  provider: string;
  plan_types: string[];
  verification_date: string;
  accepts_insurance: boolean;
  sliding_scale_available: boolean;
  superbills_provided: boolean;
}

export interface Availability {
  regular_hours: DayAvailability[];
  emergency_availability: boolean;
  weekend_availability: boolean;
  evening_availability: boolean;
  telehealth_hours: DayAvailability[];
  appointment_types: AppointmentType[];
  scheduling_notice_hours: number;
  cancellation_policy: string;
}

export interface DayAvailability {
  day: string;
  available: boolean;
  time_slots: TimeSlot[];
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
  appointment_type: string;
}

export interface AppointmentType {
  type: 'initial_consultation' | 'individual_therapy' | 'group_therapy' | 'family_therapy' | 'couples_therapy' | 'medication_management' | 'assessment' | 'crisis_intervention';
  duration_minutes: number;
  fee: number;
  insurance_coverage: boolean;
  telehealth_available: boolean;
  in_person_available: boolean;
}

export interface FeeStructure {
  initial_consultation: number;
  individual_session: number;
  group_session: number;
  family_session: number;
  couples_session: number;
  assessment: number;
  crisis_intervention: number;
  sliding_scale_min?: number;
  sliding_scale_max?: number;
  payment_methods: string[];
  payment_plans_available: boolean;
  superbill_fee: number;
  cancellation_fee: number;
  no_show_fee: number;
}

export interface Credential {
  type: 'license' | 'certification' | 'degree' | 'training' | 'membership';
  name: string;
  issuing_organization: string;
  credential_number: string;
  issue_date: string;
  expiration_date?: string;
  verification_url?: string;
  verified: boolean;
}

export interface Experience {
  position: string;
  organization: string;
  start_date: string;
  end_date?: string;
  current_position: boolean;
  responsibilities: string[];
  population_served: string[];
  setting_type: string;
}

export interface Education {
  degree: string;
  institution: string;
  graduation_date: string;
  gpa?: number;
  honors?: string[];
  relevant_coursework?: string[];
}

export interface ProfessionalReview {
  id: string;
  client_id?: string;
  rating: number;
  title: string;
  comment: string;
  would_recommend: boolean;
  verified_client: boolean;
  therapy_duration_months: number;
  improvement_areas: string[];
  created_at: string;
  helpful_votes: number;
  response_from_professional?: string;
}

export interface ProfessionalRating {
  overall: number;
  effectiveness: number;
  communication: number;
  punctuality: number;
  office_environment: number;
  staff_friendliness: number;
  appointment_availability: number;
  total_reviews: number;
  would_recommend_percentage: number;
}

export enum VerificationStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  VERIFIED = 'verified',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_primary: boolean;
  office_suite?: string;
  parking_info?: string;
  public_transport_info?: string;
  accessibility_notes?: string;
}

export interface SessionFormat {
  type: 'individual' | 'group' | 'family' | 'couples' | 'online' | 'in_person' | 'hybrid';
  available: boolean;
  description?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  available_24_7: boolean;
  backup_contact?: string;
}

export interface ProfessionalSearchCriteria {
  specialties: string[];
  treatment_approaches: string[];
  insurance_networks: string[];
  location: {
    city?: string;
    state?: string;
    zip_code?: string;
    radius_miles?: number;
  };
  availability: {
    days: string[];
    time_of_day: 'morning' | 'afternoon' | 'evening' | 'weekend' | 'flexible';
    telehealth_only: boolean;
    in_person_only: boolean;
  };
  fees: {
    max_fee?: number;
    accepts_insurance: boolean;
    sliding_scale: boolean;
  };
  demographics: {
    gender_preference?: string;
    language?: string;
    age_group_experience?: string[];
  };
  urgency: 'immediate' | 'within_week' | 'within_month' | 'flexible';
  accepts_new_clients: boolean;
}

export interface ProfessionalMatch {
  professional: Professional;
  match_score: number;
  match_reasons: string[];
  availability_match: boolean;
  insurance_match: boolean;
  location_match: boolean;
  specialty_match: boolean;
  estimated_wait_time_days: number;
  recommended: boolean;
}