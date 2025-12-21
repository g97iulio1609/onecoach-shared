export type HabitFrequency = 'DAILY' | 'WEEKLY' | 'CUSTOM';
export interface HabitLog {
    id: string;
    habitId: string;
    date: Date | string;
    completed: boolean;
    value?: number;
    notes?: string;
}
export interface Habit {
    id: string;
    name: string;
    description?: string;
    frequency: HabitFrequency;
    streak?: number;
    color?: string;
    logs?: HabitLog[];
    metadata?: {
        isCompletedToday?: boolean;
        [key: string]: any;
    };
    visibility?: 'PRIVATE' | 'SHARED_WITH_COACH';
    targetDays?: number[];
    archived?: boolean;
    history?: (string | number | Date)[];
}
