export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED' | 'ON_HOLD';
export type ProjectTaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'DONE'
  | 'COMPLETED'
  | 'BLOCKED'
  | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type Visibility = 'PRIVATE' | 'SHARED_WITH_COACH';

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
  /** Task IDs that block this task (Prisma field) */
  blockedBy?: string[];
  /** Calculated depth in task hierarchy (for UI purposes) */
  depth?: number;
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
  /** Prisma relation: Milestones that block this one (raw Prisma data) */
  agenda_milestone_dependencies_agenda_milestone_dependencies_blockedIdToagenda_milestones?: Array<{
    agenda_milestones_agenda_milestone_dependencies_blockerIdToagenda_milestones: {
      id: string;
      name: string;
    };
  }>;
  /** Prisma field: Name field (when different from title) */
  name?: string;
  /** Prisma relation: Project reference */
  agenda_projects?: { name?: string };
  /** Prisma relation: Sub-milestones */
  subMilestones?: Milestone[];
  /** Prisma relation: Tasks count */
  agenda_tasks?: Array<{ id: string }>;
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
  /** Visibility setting for the project */
  visibility?: Visibility;
  /** User ID this project is assigned to (for coach-assigned projects) */
  assignedToUserId?: string;
  /** Coach ID who assigned this project */
  assignedByCoachId?: string;
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
  startDate?: Date;
  dueDate?: Date;
  order?: number;
  dependencies?: string[];
  /** Estimated time in minutes */
  estimatedMinutes?: number;
  /** User ID to assign this task to */
  assignedToUserId?: string;
  /** Tags for categorization */
  tags?: string[];
  /** Visibility setting */
  visibility?: Visibility;
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
