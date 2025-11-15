// Types para o VivaFit+

export type UserGoal = 'lose' | 'gain' | 'maintain';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type MoodType = 'great' | 'good' | 'neutral' | 'bad' | 'terrible';

export interface User {
  id: string;
  name: string;
  email: string;
  goal: UserGoal;
  fitnessLevel: FitnessLevel;
  isPremium: boolean;
  weight?: number;
  height?: number;
  age?: number;
}

export interface DailySummary {
  date: string;
  caloriesConsumed: number;
  caloriesGoal: number;
  waterIntake: number;
  waterGoal: number;
  sleepHours: number;
  steps: number;
  mood: MoodType;
  workoutCompleted: boolean;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isPremium?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
  calories: number;
  level: FitnessLevel;
  videoUrl?: string;
  isPremium?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: FitnessLevel;
  exercises: Exercise[];
  isPremium?: boolean;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  waist?: number;
  chest?: number;
  hips?: number;
  arms?: number;
  bmi: number;
  bodyFat?: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  isPremium?: boolean;
}

export interface PremiumPlan {
  id: string;
  name: string;
  duration: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  features: string[];
}
