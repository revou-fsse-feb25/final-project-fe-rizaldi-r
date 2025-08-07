/**
 * Validation form
 */
export interface ValidationRuleItf {
  type: "text" | "number" | "email" | "password";
  required?: boolean;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  label?: string;
  isTextarea?: boolean;
  placeholder?: string;
}

export interface ValidationConfigItf {
  [fieldName: string]: ValidationRuleItf;
}

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

export interface SubmittedListItf {
  label: string;
  submission: string;
}

export interface itfAssignmentScoreData {
  moduleId: string;
  assignmentTitle: string;
  scorePercentage: number;
  scoreAchieved: number;
  scoreTotal: number;
  submittedList?: SubmittedListItf[];
  feedback: string;
}

interface itfLecturerData {
  username: string;
  userTitle: string;
  avatarSrc: string;
}

export interface CourseScoresItf {
  moduleOverallProgressData: ItfmoduleProgressData;
  moduleProgressDataList: ItfmoduleProgressData[];
  assignmentOverallScoresData: ItfmoduleProgressData;
  assignmentScoreDataList: itfAssignmentScoreData[];
}

export interface enrollmentDataItf extends CourseScoresItf {
  courseId: string;
  id: string;
  courseTitle: string;
  tags: string[];
  dueDate: string;
  lecturerData: itfLecturerData;
}

export interface OverallScoresItf {
  moduleOverallProgressDataList: ItfmoduleProgressData[];
  assignmentOverallScoresData: ItfmoduleProgressData;
}

/**
 * Course Performances
 */
export interface CoursePerformanceItf {
  id: string;
  courseTitle: string;
  tags: string[];
  dueDate: string;
  lecturerData: itfLecturerData;
  moduleOverallProgressData: ItfmoduleProgressData;
  moduleProgressDataList: ItfmoduleProgressData[];
  assignmentOverallScoresData: ItfmoduleProgressData;
  // TODO: any
  courseEnrollmentDataList: any[];
}

export interface AssignmentDetailsItf {
  id: string;
  type: "Lecture" | "Assignment";
  title: string;
  description: string;
  subdescription?: ModuleSubdescription[];
  links?: ModuleLink[];
  embedVideoLink?: string;
  submittedData?: {
    submissionTitle: string;
    submissionList: { label: string; submission: string }[];
    scoreLimit: number;
  };
}
