export interface Assessment {
  id: string;
  user_id?: string;
  type: AssessmentType;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  scoring_method: ScoringMethod;
  risk_levels: RiskLevel[];
  created_at: string;
  updated_at: string;
}

export enum AssessmentType {
  DEPRESSION = 'depression',
  ANXIETY = 'anxiety',
  PTSD = 'ptsd',
  BIPOLAR = 'bipolar',
  ADHD = 'adhd',
  SUICIDE_RISK = 'suicide_risk',
  SELF_HARM = 'self_harm',
  SUBSTANCE_ABUSE = 'substance_abuse',
  EATING_DISORDER = 'eating_disorder',
  GENERAL_WELLNESS = 'general_wellness',
  STRESS = 'stress',
  TRAUMA = 'trauma'
}

export interface AssessmentQuestion {
  id: string;
  question_text: string;
  question_type: QuestionType;
  options?: QuestionOption[];
  scale_min?: number;
  scale_max?: number;
  scale_labels?: ScaleLabel[];
  required: boolean;
  category?: string;
  weight?: number;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SCALE = 'scale',
  TEXT = 'text',
  BOOLEAN = 'boolean',
  CHECKBOX = 'checkbox'
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number;
  follow_up?: string;
}

export interface ScaleLabel {
  value: number;
  label: string;
}

export interface AssessmentResponse {
  id: string;
  assessment_id: string;
  user_id?: string;
  session_id?: string;
  responses: QuestionResponse[];
  total_score: number;
  risk_level: RiskLevelType;
  completed_at: string;
  time_taken_seconds: number;
  ip_address?: string;
  user_agent?: string;
}

export interface QuestionResponse {
  question_id: string;
  response_value: string | number | boolean | string[];
  response_text?: string;
  timestamp: string;
}

export enum RiskLevelType {
  NO_RISK = 'no_risk',
  LOW_RISK = 'low_risk',
  MODERATE_RISK = 'moderate_risk',
  HIGH_RISK = 'high_risk',
  SEVERE_RISK = 'severe_risk',
  CRISIS = 'crisis'
}

export interface RiskLevel {
  level: RiskLevelType;
  min_score: number;
  max_score: number;
  description: string;
  recommendations: string[];
  crisis_resources: CrisisResource[];
  professional_referral: boolean;
  follow_up_required: boolean;
  follow_up_timeframe_hours: number;
}

export interface CrisisResource {
  name: string;
  type: 'hotline' | 'text' | 'chat' | 'local_service';
  contact_info: string;
  hours: string;
  description: string;
  priority: number;
}

export enum ScoringMethod {
  SUM = 'sum',
  AVERAGE = 'average',
  WEIGHTED_SUM = 'weighted_sum',
  CATEGORY_SUM = 'category_sum',
  CUSTOM = 'custom'
}

export interface AssessmentResult {
  response_id: string;
  assessment: Assessment;
  score: number;
  risk_level: RiskLevel;
  recommendations: string[];
  next_steps: NextStep[];
  resources: CrisisResource[];
  professional_referral?: ProfessionalReferral;
  follow_up_scheduled?: FollowUp;
}

export interface NextStep {
  type: 'education' | 'self_care' | 'professional_help' | 'crisis_support' | 'community';
  title: string;
  description: string;
  priority: number;
  estimated_time_minutes?: number;
}

export interface ProfessionalReferral {
  urgency: 'immediate' | 'within_24_hours' | 'within_week' | 'within_month';
  specialties: string[];
  insurance_required: boolean;
  telehealth_available: boolean;
  local_only: boolean;
  notes?: string;
}

export interface FollowUp {
  scheduled_for: string;
  type: 'self_assessment' | 'professional_check_in' | 'crisis_check_in';
  reminder_enabled: boolean;
  reminder_time?: string;
  notes?: string;
}