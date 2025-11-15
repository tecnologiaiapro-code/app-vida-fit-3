// Utilitários para o VivaFit+
import { UserGoal } from './types';

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function calculateCalorieGoal(
  weight: number,
  height: number,
  age: number,
  goal: UserGoal,
  gender: 'male' | 'female' = 'male'
): number {
  // Fórmula de Harris-Benedict
  let bmr: number;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Fator de atividade moderada
  const tdee = bmr * 1.55;

  // Ajuste baseado no objetivo
  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500); // Déficit de 500 calorias
    case 'gain':
      return Math.round(tdee + 300); // Superávit de 300 calorias
    case 'maintain':
      return Math.round(tdee);
    default:
      return Math.round(tdee);
  }
}

export function calculateBodyFat(bmi: number, age: number, gender: 'male' | 'female' = 'male'): number {
  // Fórmula aproximada de gordura corporal
  if (gender === 'male') {
    return Number((1.20 * bmi + 0.23 * age - 16.2).toFixed(1));
  } else {
    return Number((1.20 * bmi + 0.23 * age - 5.4).toFixed(1));
  }
}

export function getMotivationalQuote(quotes: string[]): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getWaterIntakeGoal(weight: number): number {
  // 35ml por kg de peso corporal
  return Math.round((weight * 35) / 250) * 250; // Arredonda para múltiplos de 250ml
}

export function calculateProgress(current: number, goal: number): number {
  return Math.min(Math.round((current / goal) * 100), 100);
}

export function getGoalLabel(goal: UserGoal): string {
  switch (goal) {
    case 'lose':
      return 'Emagrecer';
    case 'gain':
      return 'Ganhar massa';
    case 'maintain':
      return 'Manter peso';
    default:
      return 'Não definido';
  }
}

export function getLevelLabel(level: string): string {
  switch (level) {
    case 'beginner':
      return 'Iniciante';
    case 'intermediate':
      return 'Intermediário';
    case 'advanced':
      return 'Avançado';
    default:
      return 'Não definido';
  }
}
