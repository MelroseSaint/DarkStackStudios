export interface CrisisResource {
  id: string;
  name: string;
  organization: string;
  phone: string;
  text?: string;
  chat_url?: string;
  website: string;
  email?: string;
  services: CrisisService[];
  hours: HoursOfOperation;
  languages: string[];
  coverage_area: CoverageArea;
  target_demographics: string[];
  specialties: string[];
  is_national: boolean;
  is_confidential: boolean;
  is_free: boolean;
  requires_insurance: boolean;
  wait_time_minutes?: number;
  accessibility_features: string[];
  quality_rating: number;
  user_reviews: Review[];
  last_verified: string;
  priority_level: number;
  escalation_protocol?: EscalationProtocol;
}

export interface CrisisService {
  type: 'suicide_prevention' | 'crisis_counseling' | 'trauma_support' | 'substance_abuse' | 'domestic_violence' | 'youth_services' | 'lgbtq_support' | 'veterans_services' | 'disaster_response' | 'general_mental_health';
  description: string;
  age_range?: AgeRange;
}

export interface HoursOfOperation {
  type: '24_7' | 'business_hours' | 'weekends_only' | 'specific_hours';
  specific_hours?: DayHours[];
  timezone: string;
}

export interface DayHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface CoverageArea {
  type: 'national' | 'state' | 'county' | 'city' | 'zip_code';
  codes: string[];
}

export interface AgeRange {
  min?: number;
  max?: number;
}

export interface Review {
  id: string;
  user_id?: string;
  rating: number;
  comment: string;
  helpful: boolean;
  created_at: string;
  verified: boolean;
}

export interface EscalationProtocol {
  triggers: string[];
  response_time_minutes: number;
  escalation_steps: EscalationStep[];
  emergency_services_contact?: string;
}

export interface EscalationStep {
  step: number;
  action: string;
  responsible_party: string;
  timeframe_minutes: number;
  success_criteria: string[];
}

export interface SafetyPlan {
  id: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  warning_signs: string[];
  coping_strategies: CopingStrategy[];
  distraction_techniques: DistractionTechnique[];
  support_contacts: SupportContact[];
  professional_contacts: ProfessionalContact[];
  environmental_safety: EnvironmentalSafety;
  emergency_plan: EmergencyPlan;
  commitment_statement: string;
  review_schedule: ReviewSchedule;
  shared_with: string[];
  completion_percentage: number;
}

export interface CopingStrategy {
  id: string;
  category: 'physical' | 'emotional' | 'cognitive' | 'social' | 'spiritual' | 'creative';
  description: string;
  effectiveness_rating: number;
  last_used?: string;
  requires_resources: string[];
  estimated_time_minutes: number;
}

export interface DistractionTechnique {
  id: string;
  name: string;
  description: string;
  category: 'physical_activity' | 'mental_task' | 'creative_expression' | 'social_interaction' | 'entertainment';
  difficulty_level: 'easy' | 'moderate' | 'challenging';
  time_required_minutes: number;
  resources_needed: string[];
  effectiveness_rating: number;
}

export interface SupportContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  text?: string;
  email?: string;
  availability: string;
  best_contact_method: 'phone' | 'text' | 'email' | 'in_person';
  is_emergency_contact: boolean;
  notes?: string;
}

export interface ProfessionalContact {
  id: string;
  name: string;
  title: string;
  organization: string;
  phone: string;
  email?: string;
  crisis_line?: string;
  availability: string;
  after_hours_contact?: string;
  specialties: string[];
}

export interface EnvironmentalSafety {
  safe_spaces: SafeSpace[];
  items_to_remove: string[];
  items_to_secure: string[];
  emergency_exits: EmergencyExit[];
  comfort_items: string[];
}

export interface SafeSpace {
  name: string;
  location: string;
  description: string;
  accessibility: 'always' | 'business_hours' | 'by_appointment' | 'emergency_only';
  contact_info?: string;
}

export interface EmergencyExit {
  location: string;
  destination: string;
  transportation_method: string;
  estimated_time_minutes: number;
  backup_options: string[];
}

export interface EmergencyPlan {
  immediate_actions: string[];
  emergency_services: EmergencyService[];
  crisis_hotlines: CrisisHotline[];
  hospital_options: HospitalOption[];
  transportation_plan: TransportationPlan;
  communication_plan: CommunicationPlan;
}

export interface EmergencyService {
  type: 'police' | 'fire' | 'medical' | 'mental_health_crisis';
  phone: string;
  text?: string;
  when_to_contact: string[];
  what_to_say: string;
}

export interface CrisisHotline {
  name: string;
  phone: string;
  text?: string;
  chat?: string;
  specialties: string[];
  hours: string;
}

export interface HospitalOption {
  name: string;
  address: string;
  phone: string;
  distance_miles: number;
  travel_time_minutes: number;
  has_psychiatric_unit: boolean;
  accepts_insurance: boolean[];
  quality_rating: number;
}

export interface TransportationPlan {
  primary_method: string;
  backup_methods: string[];
  emergency_contacts: string[];
  estimated_costs: number[];
}

export interface CommunicationPlan {
  who_to_contact: string[];
  what_to_communicate: string[];
  how_to_communicate: string[];
  when_to_communicate: string[];
}

export interface ReviewSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'as_needed';
  next_review_date: string;
  review_reminders: boolean;
  modification_triggers: string[];
}