export enum DescriptionType {
  DESCRIPTION = "DESCRIPTION",
  LIST = "LIST",
}

export enum ModuleType {
  LECTURE = "LECTURE",
  ASSIGNMENT = "ASSIGNMENT",
}

/**
 * Interface for a submission field within an assignment template.
 */
export interface SubmissionField {
  id: string;
  label: string;
  isTextfield: boolean;
  submissionTemplateId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for the assignment submission template.
 */
interface SubmissionTemplate {
  id: string;
  moduleId: string;
  submissionTitle: string;
  endDate: string | null;
  scoreTotal: number;
  createdAt: string;
  updatedAt: string;
  submissionFields: SubmissionField[];
}

/**
 * Interface for a link associated with a module.
 */
interface ModuleLink {
  id: string;
  label: string;
  href: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for a sub-description within a module, which can be a paragraph or a list.
 */
interface ModuleSubdescription {
  id: string;
  header: string;
  type: DescriptionType;
  description: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * The main interface for a course module.
 */
export interface CourseModuleDetails {
  id: string;
  moduleType: ModuleType;
  embedVideoLink: string | null;
  title: string;
  description: string;
  sectionId: string;
  createdAt: string;
  updatedAt: string;
  links: ModuleLink[];
  subdescriptions: ModuleSubdescription[];
  submissionTemplate: SubmissionTemplate | null;
}
