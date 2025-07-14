/**
 * Section
 */
export interface ItfModuleItem {
  id: string;
  label: string;
  completed: boolean;
  type?: "assignment" | "quiz";
}

export interface ItfSection {
  id: string;
  title: string;
  modules: ItfModuleItem[];
  isExpanded?: boolean;
}

/**
 * Module
 */
interface ModuleLink {
  label: string;
  href: string;
}

interface ModuleSubdescription {
  header: string;
  type: "description" | "list";
  description: string;
}

export interface ItfModuleSubmission {
  label: string;
  isTextfield: boolean;
}

export interface ItfModule {
  id: string;
  type: "Lecture" | "Assignment";
  title: string;
  description: string;
  subdescription?: ModuleSubdescription[];
  links?: ModuleLink[];
  embedVideoLink?: string;
  submissionData?: {
    submissionTitle?: string;
    submissions?: ItfModuleSubmission[];
  };
}

/**
 * Performances
 */
export interface ItfmoduleProgressData {
  progressLabel?: string;
  progressPercentage: number;
  countLabel?: string;
  countCompleted: number;
  countTotal: number;
}

export interface itfAssignmentScoreDataList {
  assignmentTitle: string;
  scorePercentage: number;
  scoreAchieved: number;
  scoreTotal: number;
  feedback: string;
}

interface itfLecturerData {
  userName: string;
  userTitle: string;
  avatarSrc: string;
}

export interface ItfProgressDashboard {
  enrollmentId: string;
  courseTitle: string;
  tags: string[];
  dueDate: string;
  moduleProgressDataList: ItfmoduleProgressData[];
  assignmentOverallScoresData: ItfmoduleProgressData;
  assignmentScoreDataList: itfAssignmentScoreDataList[];
  lecturerData: itfLecturerData;
}
