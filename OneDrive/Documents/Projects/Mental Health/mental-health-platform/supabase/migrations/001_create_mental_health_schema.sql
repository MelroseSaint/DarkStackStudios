-- Mental Health App Database Schema
-- Comprehensive schema for mental health platform with crisis intervention

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'registered' CHECK (role IN ('anonymous', 'registered', 'premium', 'professional', 'crisis_counselor', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}',
    crisis_contacts JSONB DEFAULT '[]',
    emergency_contact JSONB,
    mental_health_history JSONB DEFAULT '{}'
);

-- User profiles table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender TEXT,
    pronouns TEXT,
    phone TEXT,
    address JSONB,
    insurance_info JSONB DEFAULT '{}',
    emergency_contact JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Mental health assessments table
CREATE TABLE public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    session_id UUID DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('depression', 'anxiety', 'ptsd', 'bipolar', 'adhd', 'suicide_risk', 'self_harm', 'substance_abuse', 'eating_disorder', 'general_wellness', 'stress', 'trauma')),
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL DEFAULT '[]',
    scoring_method TEXT NOT NULL DEFAULT 'sum' CHECK (scoring_method IN ('sum', 'average', 'weighted_sum', 'category_sum', 'custom')),
    risk_levels JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment responses table
CREATE TABLE public.assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    responses JSONB NOT NULL DEFAULT '[]',
    total_score INTEGER DEFAULT 0,
    risk_level TEXT CHECK (risk_level IN ('no_risk', 'low_risk', 'moderate_risk', 'high_risk', 'severe_risk', 'crisis')),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    time_taken_seconds INTEGER DEFAULT 0,
    ip_address INET,
    user_agent TEXT,
    is_anonymous BOOLEAN DEFAULT false
);

-- Crisis resources table
CREATE TABLE public.crisis_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    organization TEXT NOT NULL,
    phone TEXT NOT NULL,
    text TEXT,
    chat_url TEXT,
    website TEXT,
    email TEXT,
    services JSONB DEFAULT '[]',
    hours JSONB DEFAULT '{}',
    languages TEXT[] DEFAULT '{"English"}',
    coverage_area JSONB DEFAULT '{}',
    target_demographics TEXT[] DEFAULT '{}',
    specialties TEXT[] DEFAULT '{}',
    is_national BOOLEAN DEFAULT false,
    is_confidential BOOLEAN DEFAULT true,
    is_free BOOLEAN DEFAULT true,
    requires_insurance BOOLEAN DEFAULT false,
    wait_time_minutes INTEGER,
    accessibility_features TEXT[] DEFAULT '{}',
    quality_rating DECIMAL(2,1) DEFAULT 0.0,
    priority_level INTEGER DEFAULT 5,
    escalation_protocol JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safety plans table
CREATE TABLE public.safety_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    warning_signs JSONB DEFAULT '[]',
    coping_strategies JSONB DEFAULT '[]',
    distraction_techniques JSONB DEFAULT '[]',
    support_contacts JSONB DEFAULT '[]',
    professional_contacts JSONB DEFAULT '[]',
    environmental_safety JSONB DEFAULT '{}',
    emergency_plan JSONB DEFAULT '{}',
    commitment_statement TEXT,
    review_schedule JSONB DEFAULT '{}',
    shared_with UUID[] DEFAULT '{}',
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Mental health professionals table
CREATE TABLE public.professionals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    license_number TEXT NOT NULL,
    license_state TEXT NOT NULL,
    license_expiration DATE NOT NULL,
    license_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP WITH TIME ZONE,
    profile JSONB DEFAULT '{}',
    specialties JSONB DEFAULT '[]',
    treatment_approaches JSONB DEFAULT '[]',
    insurance_networks JSONB DEFAULT '[]',
    availability JSONB DEFAULT '{}',
    fees JSONB DEFAULT '{}',
    credentials JSONB DEFAULT '[]',
    experience JSONB DEFAULT '[]',
    education JSONB DEFAULT '[]',
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'in_review', 'verified', 'suspended', 'rejected', 'expired')),
    background_check_completed BOOLEAN DEFAULT false,
    malpractice_insurance BOOLEAN DEFAULT false,
    telehealth_enabled BOOLEAN DEFAULT true,
    languages TEXT[] DEFAULT '{"English"}',
    accessibility_features TEXT[] DEFAULT '{}',
    emergency_contact JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Professional reviews table
CREATE TABLE public.professional_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    comment TEXT NOT NULL,
    would_recommend BOOLEAN DEFAULT true,
    verified_client BOOLEAN DEFAULT false,
    therapy_duration_months INTEGER,
    improvement_areas TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    helpful_votes INTEGER DEFAULT 0,
    response_from_professional TEXT
);

-- Community forums table
CREATE TABLE public.forums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    is_private BOOLEAN DEFAULT false,
    requires_moderation BOOLEAN DEFAULT true,
    min_role_required TEXT DEFAULT 'registered' CHECK (min_role_required IN ('anonymous', 'registered', 'premium')),
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum posts table
CREATE TABLE public.forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    forum_id UUID NOT NULL REFERENCES public.forums(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    is_moderated BOOLEAN DEFAULT false,
    moderation_notes TEXT,
    moderated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    moderated_at TIMESTAMP WITH TIME ZONE,
    replies_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum replies table
CREATE TABLE public.forum_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    parent_reply_id UUID REFERENCES public.forum_replies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    is_moderated BOOLEAN DEFAULT false,
    moderation_notes TEXT,
    moderated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    moderated_at TIMESTAMP WITH TIME ZONE,
    likes_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Educational content table
CREATE TABLE public.educational_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    target_audience TEXT[] DEFAULT '{}',
    estimated_reading_time_minutes INTEGER,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    is_moderated BOOLEAN DEFAULT true,
    moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Mood tracking table
CREATE TABLE public.mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    mood_rating INTEGER NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 10),
    emotions TEXT[] DEFAULT '{}',
    triggers TEXT[] DEFAULT '{}',
    notes TEXT,
    context JSONB DEFAULT '{}',
    location JSONB,
    weather JSONB,
    sleep_hours NUMERIC(3,1),
    exercise_minutes INTEGER,
    medication_taken BOOLEAN,
    is_significant BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    entry_date DATE DEFAULT CURRENT_DATE
);

-- Journal entries table
CREATE TABLE public.journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
    emotions TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    is_private BOOLEAN DEFAULT true,
    is_encrypted BOOLEAN DEFAULT false,
    word_count INTEGER GENERATED ALWAYS AS (LENGTH(content) - LENGTH(REPLACE(content, ' ', '')) + 1) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    entry_date DATE DEFAULT CURRENT_DATE
);

-- Medication tracking table
CREATE TABLE public.medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    prescribed_by TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    instructions TEXT,
    side_effects TEXT[] DEFAULT '{}',
    is_current BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medication reminders table
CREATE TABLE public.medication_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
    reminder_time TIME NOT NULL,
    days_of_week INTEGER[] DEFAULT '{1,2,3,4,5,6,0}', -- 0=Sunday, 1=Monday, etc.
    dosage_amount TEXT,
    is_active BOOLEAN DEFAULT true,
    last_reminded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medication logs table
CREATE TABLE public.medication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
    reminder_id UUID REFERENCES public.medication_reminders(id) ON DELETE SET NULL,
    taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_time TIMESTAMP WITH TIME ZONE,
    dosage_taken TEXT,
    notes TEXT,
    side_effects_experienced TEXT[] DEFAULT '{}',
    mood_impact INTEGER CHECK (mood_impact >= -5 AND mood_impact <= 5),
    was_late BOOLEAN DEFAULT false,
    was_skipped BOOLEAN DEFAULT false
);

-- Crisis intervention logs table
CREATE TABLE public.crisis_interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    assessment_response_id UUID REFERENCES public.assessment_responses(id) ON DELETE SET NULL,
    crisis_type TEXT NOT NULL CHECK (crisis_type IN ('suicide_ideation', 'self_harm', 'homicide_ideation', 'psychosis', 'severe_depression', 'anxiety_crisis', 'trauma_response', 'substance_abuse')),
    severity_level TEXT NOT NULL CHECK (severity_level IN ('low', 'moderate', 'high', 'severe', 'extreme')),
    description TEXT NOT NULL,
    immediate_actions_taken TEXT[] DEFAULT '{}',
    resources_provided JSONB DEFAULT '[]',
    professional_contacted BOOLEAN DEFAULT false,
    emergency_services_contacted BOOLEAN DEFAULT false,
    outcome TEXT,
    follow_up_required BOOLEAN DEFAULT true,
    follow_up_scheduled_for TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_by UUID REFERENCES public.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_interventions ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_created_at ON public.users(created_at);
CREATE INDEX idx_assessment_responses_user_id ON public.assessment_responses(user_id);
CREATE INDEX idx_assessment_responses_assessment_id ON public.assessment_responses(assessment_id);
CREATE INDEX idx_assessment_responses_risk_level ON public.assessment_responses(risk_level);
CREATE INDEX idx_crisis_resources_priority ON public.crisis_resources(priority_level);
CREATE INDEX idx_crisis_resources_active ON public.crisis_resources(is_active);
CREATE INDEX idx_professionals_verified ON public.professionals(license_verified);
CREATE INDEX idx_professionals_status ON public.professionals(verification_status);
CREATE INDEX idx_mood_entries_user_id ON public.mood_entries(user_id);
CREATE INDEX idx_mood_entries_date ON public.mood_entries(entry_date);
CREATE INDEX idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX idx_journal_entries_date ON public.journal_entries(entry_date);
CREATE INDEX idx_crisis_interventions_user_id ON public.crisis_interventions(user_id);
CREATE INDEX idx_crisis_interventions_type ON public.crisis_interventions(crisis_type);
CREATE INDEX idx_crisis_interventions_severity ON public.crisis_interventions(severity_level);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON public.assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crisis_resources_updated_at BEFORE UPDATE ON public.crisis_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_safety_plans_updated_at BEFORE UPDATE ON public.safety_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON public.professionals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_educational_content_updated_at BEFORE UPDATE ON public.educational_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON public.medications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();