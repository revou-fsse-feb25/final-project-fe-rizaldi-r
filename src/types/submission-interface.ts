import { SubmissionField, SubmissionTemplate } from "@/types/module-interface";

export interface GradeSubmission {
  isPassed: boolean;
  scoreAchieved: string;
  feedback: string;
}

export interface SubmissionFieldValue {
  id?: string;
  submitted: string;
  submissionId?: string;
  submissionFieldId: string;
  createdAt?: string;
  updatedAt?: string;
  submissionField?: SubmissionField;
}

export interface Submission {
  id?: string;
  studentId: string;
  enrollmentId: string;
  moduleId: string;
  submissionTemplateId: string;
  isLocked: boolean;
  isGraded: boolean;
  isPassed: boolean;
  scorePercentage: number;
  scoreAchieved: number;
  scoreTotal: number;
  feedback: string | null;
  createdAt?: string;
  updatedAt?: string;
  submissionTemplate: SubmissionTemplate;
  submissionFieldValue: SubmissionFieldValue[];
}