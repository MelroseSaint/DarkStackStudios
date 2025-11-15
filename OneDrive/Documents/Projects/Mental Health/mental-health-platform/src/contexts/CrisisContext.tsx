import { createContext, useContext, useState, useEffect } from 'react';
import { CrisisResource, SafetyPlan } from '../types/crisis';
import { toast } from 'sonner';

interface CrisisContextType {
  crisisResources: CrisisResource[];
  safetyPlan: SafetyPlan | null;
  crisisDetected: boolean;
  lastCrisisCheck: Date | null;
  loadCrisisResources: () => Promise<void>;
  createSafetyPlan: (userId: string) => Promise<SafetyPlan>;
  updateSafetyPlan: (planId: string, updates: Partial<SafetyPlan>) => Promise<void>;
  checkForCrisis: (assessmentData: any) => Promise<boolean>;
  escalateCrisis: (userId: string, crisisData: any) => Promise<void>;
  getEmergencyContacts: () => CrisisResource[];
}

const CrisisContext = createContext<CrisisContextType | undefined>(undefined);

export function CrisisProvider({ children }: { children: React.ReactNode }) {
  const [crisisResources, setCrisisResources] = useState<CrisisResource[]>([]);
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan | null>(null);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [lastCrisisCheck, setLastCrisisCheck] = useState<Date | null>(null);

  useEffect(() => {
    loadCrisisResources();
  }, []);

  const loadCrisisResources = async () => {
    try {
      // Simulate API call to load crisis resources
      const mockResources: CrisisResource[] = [
        {
          id: '1',
          name: '988 Suicide & Crisis Lifeline',
          organization: 'SAMHSA',
          phone: '988',
          text: 'Text HOME to 741741',
          website: 'https://988lifeline.org',
          services: [{ type: 'suicide_prevention', description: '24/7 crisis counseling', age_range: { min: 13 } }],
          hours: { type: '24_7', timezone: 'America/New_York' },
          languages: ['English', 'Spanish'],
          coverage_area: { type: 'national', codes: ['US'] },
          target_demographics: ['All ages'],
          specialties: ['Suicide prevention', 'Crisis intervention', 'Emotional support'],
          is_national: true,
          is_confidential: true,
          is_free: true,
          requires_insurance: false,
          accessibility_features: ['TTY', 'Multiple languages'],
          quality_rating: 4.8,
          user_reviews: [],
          last_verified: new Date().toISOString(),
          priority_level: 1
        },
        {
          id: '2',
          name: 'Crisis Text Line',
          organization: 'Crisis Text Line Inc.',
          phone: 'Text HOME to 741741',
          website: 'https://www.crisistextline.org',
          services: [{ type: 'general_mental_health', description: 'Text-based crisis support', age_range: { min: 13 } }],
          hours: { type: '24_7', timezone: 'America/New_York' },
          languages: ['English'],
          coverage_area: { type: 'national', codes: ['US'] },
          target_demographics: ['Youth', 'Young adults', 'Adults'],
          specialties: ['Text-based support', 'Crisis intervention'],
          is_national: true,
          is_confidential: true,
          is_free: true,
          requires_insurance: false,
          accessibility_features: ['Text-only', 'Anonymous'],
          quality_rating: 4.6,
          user_reviews: [],
          last_verified: new Date().toISOString(),
          priority_level: 2
        }
      ];
      
      setCrisisResources(mockResources);
    } catch (error) {
      console.error('Failed to load crisis resources:', error);
      toast.error('Failed to load crisis resources');
    }
  };

  const createSafetyPlan = async (userId: string): Promise<SafetyPlan> => {
    try {
      // Simulate API call to create safety plan
      const newPlan: SafetyPlan = {
        id: Date.now().toString(),
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        warning_signs: [],
        coping_strategies: [],
        distraction_techniques: [],
        support_contacts: [],
        professional_contacts: [],
        environmental_safety: {
          safe_spaces: [],
          items_to_remove: [],
          items_to_secure: [],
          emergency_exits: [],
          comfort_items: []
        },
        emergency_plan: {
          immediate_actions: [],
          emergency_services: [],
          crisis_hotlines: [],
          hospital_options: [],
          transportation_plan: {
            primary_method: '',
            backup_methods: [],
            emergency_contacts: [],
            estimated_costs: []
          },
          communication_plan: {
            who_to_contact: [],
            what_to_communicate: [],
            how_to_communicate: [],
            when_to_communicate: []
          }
        },
        commitment_statement: '',
        review_schedule: {
          frequency: 'weekly',
          next_review_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          review_reminders: true,
          modification_triggers: []
        },
        shared_with: [],
        completion_percentage: 0
      };
      
      setSafetyPlan(newPlan);
      toast.success('Safety plan created successfully');
      return newPlan;
    } catch (error) {
      console.error('Failed to create safety plan:', error);
      toast.error('Failed to create safety plan');
      throw error;
    }
  };

  const updateSafetyPlan = async (planId: string, updates: Partial<SafetyPlan>) => {
    try {
      if (!safetyPlan || safetyPlan.id !== planId) {
        throw new Error('Safety plan not found');
      }
      
      const updatedPlan = { ...safetyPlan, ...updates, updated_at: new Date().toISOString() };
      setSafetyPlan(updatedPlan);
      
      toast.success('Safety plan updated successfully');
    } catch (error) {
      console.error('Failed to update safety plan:', error);
      toast.error('Failed to update safety plan');
      throw error;
    }
  };

  const checkForCrisis = async (assessmentData: any): Promise<boolean> => {
    try {
      setLastCrisisCheck(new Date());
      
      // Simulate crisis detection logic based on assessment data
      const crisisIndicators = [
        'suicide',
        'self_harm',
        'homicide',
        'psychosis',
        'severe_depression'
      ];
      
      const hasCrisis = crisisIndicators.some(indicator => 
        JSON.stringify(assessmentData).toLowerCase().includes(indicator)
      );
      
      setCrisisDetected(hasCrisis);
      
      if (hasCrisis) {
        toast.error('Crisis indicators detected. Please seek immediate help.', {
          duration: 10000,
          action: {
            label: 'Get Help Now',
            onClick: () => {
              window.location.href = 'tel:988';
            }
          }
        });
      }
      
      return hasCrisis;
    } catch (error) {
      console.error('Crisis check failed:', error);
      return false;
    }
  };

  const escalateCrisis = async (userId: string, crisisData: any) => {
    try {
      // Simulate crisis escalation to professionals
      console.log('Crisis escalation triggered for user:', userId, crisisData);
      
      toast.error('Crisis escalation initiated. Professional help is being contacted.', {
        duration: 8000,
        action: {
          label: 'Emergency: 988',
          onClick: () => {
            window.location.href = 'tel:988';
          }
        }
      });
      
      // In a real app, this would:
      // 1. Send alert to crisis counselors
      // 2. Create emergency ticket
      // 3. Notify emergency contacts
      // 4. Log crisis event for follow-up
      
    } catch (error) {
      console.error('Crisis escalation failed:', error);
      toast.error('Crisis escalation failed. Please call 988 directly.');
    }
  };

  const getEmergencyContacts = (): CrisisResource[] => {
    return crisisResources
      .filter(resource => resource.priority_level <= 2)
      .sort((a, b) => a.priority_level - b.priority_level);
  };

  const value = {
    crisisResources,
    safetyPlan,
    crisisDetected,
    lastCrisisCheck,
    loadCrisisResources,
    createSafetyPlan,
    updateSafetyPlan,
    checkForCrisis,
    escalateCrisis,
    getEmergencyContacts,
  };

  return <CrisisContext.Provider value={value}>{children}</CrisisContext.Provider>;
}

export function useCrisis() {
  const context = useContext(CrisisContext);
  if (context === undefined) {
    throw new Error('useCrisis must be used within a CrisisProvider');
  }
  return context;
}