export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED' | 'ON_HOLD';
export type ProjectTaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'COMPLETED' | 'BLOCKED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
/**
 * Dependency reference for tasks and milestones
 */
export interface DependencyRef {
    id: string;
    title: string;
}
/**
 * Task with full hierarchy and dependency support
 */
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: ProjectTaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    completedAt?: Date;
    order: number;
    projectId?: string;
    milestoneId?: string;
    parentId?: string;
    /** Immediate child tasks */
    subTasks?: Task[];
    /** Tasks that must complete before this one can start */
    dependsOn?: DependencyRef[];
    /** Tasks that depend on this one */
    dependedOnBy?: DependencyRef[];
    createdAt?: Date;
    updatedAt?: Date;
}
/**
 * Milestone with dependencies and nested tasks
 */
export interface Milestone {
    id: string;
    title: string;
    description?: string;
    status: MilestoneStatus;
    progress: number;
    dueDate?: Date;
    order: number;
    projectId: string;
    tasks: Task[];
    /** Milestones that must complete before this one */
    dependsOn?: DependencyRef[];
    /** Milestones that depend on this one */
    dependedOnBy?: DependencyRef[];
    createdAt?: Date;
    updatedAt?: Date;
}
/**
 * Project with complete structure
 */
export interface Project {
    id: string;
    title: string;
    description?: string;
    status: ProjectStatus;
    progress: number;
    startDate?: Date;
    dueDate?: Date;
    taskCount: number;
    completedTaskCount: number;
    color?: string;
    icon?: string;
    milestones?: Milestone[];
    /** Root-level tasks (not in any milestone) */
    tasks?: Task[];
    createdAt?: Date;
    updatedAt: Date;
}
/**
 * Input for creating a project
 */
export interface CreateProjectInput {
    title: string;
    description?: string;
    startDate?: Date;
    dueDate?: Date;
    status?: ProjectStatus;
    color?: string;
    icon?: string;
}
/**
 * Input for creating a milestone
 */
export interface CreateMilestoneInput {
    projectId: string;
    title: string;
    description?: string;
    dueDate?: Date;
    order?: number;
    dependencies?: string[];
}
/**
 * Input for creating a task
 */
export interface CreateTaskInput {
    projectId: string;
    milestoneId?: string;
    parentId?: string;
    title: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: Date;
    order?: number;
    dependencies?: string[];
}
/**
 * Input for reordering items
 */
export interface ReorderInput {
    itemId: string;
    newOrder: number;
    /** For moving task to different milestone */
    newMilestoneId?: string;
    /** For moving sub-task to different parent */
    newParentId?: string;
}
