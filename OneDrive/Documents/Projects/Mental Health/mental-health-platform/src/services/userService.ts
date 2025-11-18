import { supabase } from './supabase';
import { getLocationSuggestions } from './locationService';

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  cityId: string;
  stateId: string;
  dateOfBirth?: string;
  gender?: string;
  pronouns?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Check if email is available for registration
 */
export async function checkEmailAvailability(email: string): Promise<ValidationResult> {
  try {
    // First, check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'Please enter a valid email address'
      };
    }

    // Check if email already exists in auth.users
    const rpcCall = supabase.rpc as any;
    const { data, error } = await rpcCall('check_user_exists', { email_param: email.toLowerCase() });

    if (error) {
      console.error('Error checking email availability:', error);
      return {
        isValid: false,
        message: 'Error checking email availability'
      };
    }

    if (data) {
      return {
        isValid: false,
        message: 'Email address is already registered'
      };
    }

    return {
      isValid: true,
      message: 'Email address is available'
    };
  } catch (error) {
    console.error('Error in checkEmailAvailability:', error);
    return {
      isValid: false,
      message: 'Error checking email availability'
    };
  }
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): ValidationResult {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  if (strengthScore < 2) {
    return {
      isValid: false,
      message: 'Password must include uppercase, lowercase, numbers, and special characters'
    };
  }

  if (strengthScore < 3) {
    return {
      isValid: true,
      message: 'Password strength: Fair'
    };
  }

  return {
    isValid: true,
    message: 'Password strength: Strong'
  };
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): ValidationResult {
  if (!phone) {
    return {
      isValid: true,
      message: 'Phone number is optional'
    };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // US phone number validation (10 digits)
  if (digitsOnly.length !== 10) {
    return {
      isValid: false,
      message: 'Please enter a valid 10-digit US phone number'
    };
  }

  return {
    isValid: true,
    message: 'Phone number is valid'
  };
}

/**
 * Validate name fields
 */
export function validateName(name: string, field: 'firstName' | 'lastName'): ValidationResult {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      message: `${field === 'firstName' ? 'First' : 'Last'} name is required`
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters long`
    };
  }

  if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    return {
      isValid: false,
      message: `${field === 'firstName' ? 'First' : 'Last'} name can only contain letters, spaces, hyphens, and apostrophes`
    };
  }

  return {
    isValid: true,
    message: `${field === 'firstName' ? 'First' : 'Last'} name is valid`
  };
}

/**
 * Register a new user with location data
 */
export async function registerUser(userData: UserRegistrationData): Promise<{
  success: boolean;
  userId?: string;
  error?: string;
}> {
  try {
    // Validate required fields
    const emailValidation = await checkEmailAvailability(userData.email);
    if (!emailValidation.isValid) {
      return { success: false, error: emailValidation.message };
    }

    const passwordValidation = validatePasswordStrength(userData.password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.message };
    }

    const firstNameValidation = validateName(userData.firstName, 'firstName');
    if (!firstNameValidation.isValid) {
      return { success: false, error: firstNameValidation.message };
    }

    const lastNameValidation = validateName(userData.lastName, 'lastName');
    if (!lastNameValidation.isValid) {
      return { success: false, error: lastNameValidation.message };
    }

    if (userData.phone) {
      const phoneValidation = validatePhoneNumber(userData.phone);
      if (!phoneValidation.isValid) {
        return { success: false, error: phoneValidation.message };
      }
    }

    // Create user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email.toLowerCase(),
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName.trim(),
          last_name: userData.lastName.trim(),
          phone: userData.phone?.trim() || null,
          city_id: userData.cityId,
          state_id: userData.stateId,
          date_of_birth: userData.dateOfBirth || null,
          gender: userData.gender || null,
          pronouns: userData.pronouns || null,
          role: 'registered'
        }
      }
    });

    if (authError) {
      console.error('Error creating user account:', authError);
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user account' };
    }

    // Create user profile in public.users table
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: userData.email.toLowerCase(),
        first_name: userData.firstName.trim(),
        last_name: userData.lastName.trim(),
        phone: userData.phone?.trim() || null,
        city_id: userData.cityId,
        state_id: userData.stateId,
        date_of_birth: userData.dateOfBirth || null,
        gender: userData.gender || null,
        pronouns: userData.pronouns || null,
        role: 'registered',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as any);

    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Try to clean up the auth user if profile creation failed
      await supabase.auth.admin.deleteUser(authData.user.id);
      return { success: false, error: 'Failed to create user profile' };
    }

    return {
      success: true,
      userId: authData.user.id
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during registration'
    };
  }
}

/**
 * Get location suggestions for user registration
 */
export async function getRegistrationLocationSuggestions(): Promise<{
  suggestions: Array<{
    city: string;
    state: string;
    stateCode: string;
    cityId: string;
    stateId: string;
  }>;
  error?: string;
}> {
  try {
    const suggestions = await getLocationSuggestions();
    
    // Transform suggestions to a more user-friendly format
    const formattedSuggestions = suggestions.slice(0, 3).map(suggestion => ({
      city: suggestion.name,
      state: '', // Will be populated by frontend
      stateCode: suggestion.state_code,
      cityId: suggestion.id,
      stateId: '' // Will be populated by frontend
    }));

    return {
      suggestions: formattedSuggestions
    };
  } catch (error) {
    console.error('Error getting location suggestions:', error);
    return {
      suggestions: [],
      error: 'Unable to get location suggestions'
    };
  }
}