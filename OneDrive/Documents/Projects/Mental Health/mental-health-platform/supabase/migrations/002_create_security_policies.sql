-- Row Level Security (RLS) Policies for Mental Health App
-- These policies ensure data privacy and HIPAA compliance

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anonymous users can create accounts" ON public.users
    FOR INSERT WITH CHECK (true);

-- User profiles table policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Assessments table policies (public assessments)
CREATE POLICY "Anyone can view public assessments" ON public.assessments
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage assessments" ON public.assessments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Assessment responses table policies
CREATE POLICY "Users can view own responses" ON public.assessment_responses
    FOR SELECT USING (
        auth.uid() = user_id OR 
        is_anonymous = true OR
        user_id IS NULL
    );

CREATE POLICY "Users can create responses" ON public.assessment_responses
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        is_anonymous = true OR
        user_id IS NULL
    );

CREATE POLICY "Crisis counselors can view responses" ON public.assessment_responses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('crisis_counselor', 'admin')
        )
    );

-- Crisis resources table policies (public)
CREATE POLICY "Anyone can view active crisis resources" ON public.crisis_resources
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage crisis resources" ON public.crisis_resources
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Safety plans table policies
CREATE POLICY "Users can view own safety plan" ON public.safety_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own safety plan" ON public.safety_plans
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create own safety plan" ON public.safety_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Crisis counselors can view safety plans" ON public.safety_plans
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('crisis_counselor', 'admin')
        )
    );

-- Professionals table policies
CREATE POLICY "Anyone can view verified professionals" ON public.professionals
    FOR SELECT USING (license_verified = true AND verification_status = 'verified' AND is_active = true);

CREATE POLICY "Professionals can update own profile" ON public.professionals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Professionals can create own profile" ON public.professionals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage professionals" ON public.professionals
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Professional reviews table policies
CREATE POLICY "Anyone can view reviews" ON public.professional_reviews
    FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create reviews" ON public.professional_reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own reviews" ON public.professional_reviews
    FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Admins can moderate reviews" ON public.professional_reviews
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Forums table policies (public forums)
CREATE POLICY "Anyone can view public forums" ON public.forums
    FOR SELECT USING (is_private = false AND is_active = true);

CREATE POLICY "Registered users can view all accessible forums" ON public.forums
    FOR SELECT USING (
        is_private = false OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('registered', 'premium', 'professional', 'crisis_counselor', 'admin')
        )
    );

CREATE POLICY "Admins can manage forums" ON public.forums
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Forum posts table policies
CREATE POLICY "Anyone can view public posts" ON public.forum_posts
    FOR SELECT USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM public.forums 
            WHERE id = forum_id AND is_private = false
        )
    );

CREATE POLICY "Users can create posts" ON public.forum_posts
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.forums f
            JOIN public.users u ON u.id = auth.uid()
            WHERE f.id = forum_id AND 
            (f.is_private = false OR u.role IN ('registered', 'premium', 'professional', 'crisis_counselor', 'admin'))
        )
    );

CREATE POLICY "Users can update own posts" ON public.forum_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Moderators can moderate posts" ON public.forum_posts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'crisis_counselor')
        )
    );

-- Forum replies table policies
CREATE POLICY "Anyone can view public replies" ON public.forum_replies
    FOR SELECT USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM public.forum_posts fp
            JOIN public.forums f ON f.id = fp.forum_id
            WHERE fp.id = post_id AND f.is_private = false
        )
    );

CREATE POLICY "Users can create replies" ON public.forum_replies
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.forum_posts fp
            JOIN public.forums f ON f.id = fp.forum_id
            JOIN public.users u ON u.id = auth.uid()
            WHERE fp.id = post_id AND 
            (f.is_private = false OR u.role IN ('registered', 'premium', 'professional', 'crisis_counselor', 'admin'))
        )
    );

CREATE POLICY "Users can update own replies" ON public.forum_replies
    FOR UPDATE USING (auth.uid() = user_id);

-- Educational content table policies
CREATE POLICY "Anyone can view published content" ON public.educational_content
    FOR SELECT USING (is_active = true AND published_at IS NOT NULL);

CREATE POLICY "Admins can manage educational content" ON public.educational_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Mood entries table policies
CREATE POLICY "Users can view own mood entries" ON public.mood_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create mood entries" ON public.mood_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries" ON public.mood_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries" ON public.mood_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Journal entries table policies
CREATE POLICY "Users can view own journal entries" ON public.journal_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create journal entries" ON public.journal_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON public.journal_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Medications table policies
CREATE POLICY "Users can view own medications" ON public.medications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create medications" ON public.medications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medications" ON public.medications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own medications" ON public.medications
    FOR DELETE USING (auth.uid() = user_id);

-- Medication reminders table policies
CREATE POLICY "Users can view own medication reminders" ON public.medication_reminders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.medications 
            WHERE id = medication_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create medication reminders" ON public.medication_reminders
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.medications 
            WHERE id = medication_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own medication reminders" ON public.medication_reminders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.medications 
            WHERE id = medication_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own medication reminders" ON public.medication_reminders
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.medications 
            WHERE id = medication_id AND user_id = auth.uid()
        )
    );

-- Medication logs table policies
CREATE POLICY "Users can view own medication logs" ON public.medication_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.medications 
            WHERE id = medication_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create medication logs" ON public.medication_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.medications 
            WHERE id = medication_id AND user_id = auth.uid()
        )
    );

-- Crisis interventions table policies
CREATE POLICY "Users can view own crisis interventions" ON public.crisis_interventions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Crisis counselors can view crisis interventions" ON public.crisis_interventions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('crisis_counselor', 'admin')
        )
    );

CREATE POLICY "Crisis counselors can create crisis interventions" ON public.crisis_interventions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('crisis_counselor', 'admin')
        )
    );

CREATE POLICY "Crisis counselors can update crisis interventions" ON public.crisis_interventions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('crisis_counselor', 'admin')
        )
    );

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.crisis_resources TO anon, authenticated;
GRANT SELECT ON public.assessments TO anon, authenticated;
GRANT SELECT ON public.educational_content TO anon, authenticated;
GRANT SELECT ON public.professionals TO anon, authenticated;
GRANT SELECT ON public.professional_reviews TO anon, authenticated;
GRANT SELECT ON public.forums TO anon, authenticated;
GRANT SELECT ON public.forum_posts TO anon, authenticated;
GRANT SELECT ON public.forum_replies TO anon, authenticated;

-- Grant permissions to authenticated users
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.assessment_responses TO authenticated;
GRANT ALL ON public.safety_plans TO authenticated;
GRANT ALL ON public.mood_entries TO authenticated;
GRANT ALL ON public.journal_entries TO authenticated;
GRANT ALL ON public.medications TO authenticated;
GRANT ALL ON public.medication_reminders TO authenticated;
GRANT ALL ON public.medication_logs TO authenticated;
GRANT ALL ON public.crisis_interventions TO authenticated;

-- Grant all permissions to service_role (for admin operations)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;