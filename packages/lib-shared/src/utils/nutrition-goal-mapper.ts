/**
 * Nutrition Goal Mapper
 *
 * Centralizza la logica di mapping tra nutrition goals (CUIDs da DB)
 * e formati usati in UI/AI (stringhe leggibili).
 *
 * Principi:
 * - DRY: Una singola source of truth per tutti i mapping
 * - KISS: Funzioni semplici e dirette
 * - Future-proof: Supporto per goals multipli
 */

/**
 * Mapping CUIDs → form goal strings
 */
const GOAL_CUID_TO_FORM: Record<string, string> = {
  clx_ngoal_weightloss: 'weight_loss',
  clx_ngoal_musclegain: 'muscle_gain',
  clx_ngoal_performance: 'performance',
  clx_ngoal_maintenance: 'maintenance',
};

/**
 * Mapping form goal strings → CUIDs
 */
const GOAL_FORM_TO_CUID: Record<string, string> = {
  weight_loss: 'clx_ngoal_weightloss',
  muscle_gain: 'clx_ngoal_musclegain',
  performance: 'clx_ngoal_performance',
  maintenance: 'clx_ngoal_maintenance',
};

/**
 * Display names per UI (localizzati)
 */
const GOAL_DISPLAY_NAMES: Record<string, string> = {
  weight_loss: 'Perdita di Peso',
  muscle_gain: 'Aumento Massa Muscolare',
  performance: 'Performance',
  maintenance: 'Mantenimento',
};

/**
 * Type per goal form strings
 */
export type NutritionGoalForm = 'weight_loss' | 'muscle_gain' | 'performance' | 'maintenance';

/**
 * Converte un array di CUID goals in array di form goals
 *
 * @param goalCuids - Array di CUID goals dal database
 * @returns Array di form goal strings
 *
 * @example
 * mapNutritionGoalsToForm(['clx_ngoal_weightloss', 'clx_ngoal_performance'])
 * // Returns: ['weight_loss', 'performance']
 */
export function mapNutritionGoalsToForm(goalCuids?: string[]): NutritionGoalForm[] {
  if (!goalCuids || goalCuids.length === 0) {
    return ['maintenance']; // Default fallback
  }

  return goalCuids
    .map((cuid: unknown) => GOAL_CUID_TO_FORM[cuid])
    .filter((goal): goal is NutritionGoalForm => !!goal);
}

/**
 * Converte un singolo CUID goal in form goal
 *
 * @param goalCuid - CUID goal dal database
 * @returns Form goal string
 *
 * @example
 * mapNutritionGoalToForm('clx_ngoal_weightloss') // Returns: 'weight_loss'
 */
export function mapNutritionGoalToForm(goalCuid?: string): NutritionGoalForm {
  if (!goalCuid) return 'maintenance';
  return (GOAL_CUID_TO_FORM[goalCuid] as NutritionGoalForm) || 'maintenance';
}

/**
 * Converte un array di form goals in array di CUID goals
 *
 * @param formGoals - Array di form goal strings
 * @returns Array di CUID goals per il database
 *
 * @example
 * mapFormGoalsToIds(['weight_loss', 'performance'])
 * // Returns: ['clx_ngoal_weightloss', 'clx_ngoal_performance']
 */
export function mapFormGoalsToIds(formGoals: string[]): string[] {
  return formGoals
    .map((goal: unknown) => GOAL_FORM_TO_CUID[goal])
    .filter((cuid): cuid is string => !!cuid);
}

/**
 * Converte un singolo form goal in CUID
 *
 * @param formGoal - Form goal string
 * @returns CUID goal per il database
 *
 * @example
 * mapFormGoalToId('weight_loss') // Returns: 'clx_ngoal_weightloss'
 */
export function mapFormGoalToId(formGoal: string): string {
  return GOAL_FORM_TO_CUID[formGoal] || 'clx_ngoal_maintenance';
}

/**
 * Ottiene il display name di un goal per UI
 *
 * @param formGoal - Form goal string
 * @returns Display name localizzato
 *
 * @example
 * getGoalDisplayName('weight_loss') // Returns: 'Perdita di Peso'
 */
export function getGoalDisplayName(formGoal: string): string {
  return GOAL_DISPLAY_NAMES[formGoal] || 'Mantenimento';
}

/**
 * Ottiene i display names per goals multipli
 *
 * @param goalCuids - Array di CUID goals dal database
 * @returns Array di display names localizzati
 *
 * @example
 * getNutritionGoalsDisplay(['clx_ngoal_weightloss', 'clx_ngoal_performance'])
 * // Returns: ['Perdita di Peso', 'Performance']
 */
export function getNutritionGoalsDisplay(goalCuids?: string[]): string[] {
  const formGoals = mapNutritionGoalsToForm(goalCuids);
  return formGoals.map(getGoalDisplayName);
}

/**
 * Formatta goals multipli per il prompt AI con priorità
 *
 * @param goalCuids - Array di CUID goals dal database
 * @returns Stringa formattata per prompt (es: "Primary: Weight Loss, Secondary: Performance")
 *
 * @example
 * formatGoalsForPrompt(['clx_ngoal_weightloss', 'clx_ngoal_performance'])
 * // Returns: "Primary: Weight Loss, Secondary: Performance"
 */
export function formatGoalsForPrompt(goalCuids?: string[]): string {
  const formGoals = mapNutritionGoalsToForm(goalCuids);

  if (formGoals.length === 0) {
    return 'Maintenance';
  }

  if (formGoals.length === 1) {
    const firstGoal = formGoals[0];
    if (!firstGoal) {
      return 'Maintenance';
    }
    return getGoalDisplayName(firstGoal);
  }

  // Multiple goals: assegna priorità
  const priorities = ['Primary', 'Secondary', 'Tertiary'];
  return formGoals
    .map((goal, index) => {
      const priority = priorities[index] || `Goal ${index + 1}`;
      return `${priority}: ${getGoalDisplayName(goal)}`;
    })
    .join(', ');
}

/**
 * Verifica se un CUID è un goal valido
 *
 * @param cuid - CUID da verificare
 * @returns true se valido
 */
export function isValidGoalCuid(cuid: string): boolean {
  return cuid in GOAL_CUID_TO_FORM;
}

/**
 * Verifica se un form goal è valido
 *
 * @param formGoal - Form goal da verificare
 * @returns true se valido
 */
export function isValidFormGoal(formGoal: string): boolean {
  return formGoal in GOAL_FORM_TO_CUID;
}
