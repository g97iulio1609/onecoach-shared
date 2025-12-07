export type HabitFrequency = 'DAILY' | 'WEEKLY';
export interface Habit {
    id: string;
    title: string;
    description?: string;
    frequency: HabitFrequency;
    streak: number;
    completedToday: boolean;
    color?: string;
    history: boolean[];
}
