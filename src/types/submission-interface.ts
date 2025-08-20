export interface SubmissionFieldValue {
  id?: string;
  submitted: string;
  submissionId?: string;
  submissionFieldId: string;
  createdAt?: string;
  updatedAt?: string;
  // submissionField: SubmissionField;
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
  scorePercentage: string;
  scoreAchieved: string;
  scoreTotal: number;
  feedback: string | null;
  createdAt?: string;
  updatedAt?: string;
  submissionFieldValue: SubmissionFieldValue[];
}