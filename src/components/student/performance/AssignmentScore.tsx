"use client";

import Button from "@/components/_commons/Button";
import ExpandableSection from "@/components/_commons/ExpandableSection";
import Header from "@/components/_commons/Header";
import ProgressDisplay from "@/components/_commons/ProgressDisplay";
import { UserRole } from "@/types/jwtPayload";
import { itfAssignmentScoreData } from "@/types/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const generateUniqueId = () => {
  return Date.now();
};

export default function AssignmentScore({
  identifier,
  moduleId,
  assignmentTitle,
  scorePercentage,
  scoreAchieved,
  scoreTotal,
  submittedList,
  feedback,
}: itfAssignmentScoreData & { identifier: string }) {
  const { data: session } = useSession();
  const userRole = session?.user.role;

  const submittedListWithIds = submittedList?.map((item) => ({
    ...item,
    id: generateUniqueId(),
  }));

  // handle toggle expand submitted section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const toggleExtendSection = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <section className="bg-slate-50 rounded-lg border border-slate-300 p-3 sm:p-3 sm:px-4 w-full">
      <ExpandableSection
        // Assignment Header
        headerComponent={
          <div className="flex items-center gap-2 ">
            {/* <img src="/book.svg" /> */}
            <Header element="h3" size="18">
              {assignmentTitle}
            </Header>
          </div>
        }
      >
        <section className="flex flex-col gap-3 mt-4">
          {/* Score Display */}
          <div className="max-w-60">
            <ProgressDisplay
              progressLabel="Score"
              countLabel="scores achieved"
              progressPercentage={scorePercentage}
              countCompleted={scoreAchieved}
              countTotal={scoreTotal}
            />
          </div>

          {/* Submited work */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Submitted</h3>
            <ul className="flex flex-col gap-4">
              {submittedListWithIds?.map((submitted, index) => (
                <li key={index}>
                  <ExpandableSection headerComponent={submitted.label}>
                    <p className="text-slate-500 leading-relaxed ml-12 mt-2">{submitted.submission}</p>
                  </ExpandableSection>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Feedback</h3>
            <p className="text-slate-500 leading-relaxed">{feedback}</p>
          </div>

          <Link
            href={
              userRole === UserRole.INSTRUCTOR
                ? `student-performance/${identifier}/${moduleId}`
                : `/student/my-courses/${identifier}/${moduleId}`
            }
            className="ml-auto"
          >
            <Button
              fontWeight="font-medium"
              padding="medium"
              isFilled={true}
              className="bg-blue-600 text-blue-50 px-8"
            >
              Edit
            </Button>
          </Link>
        </section>
      </ExpandableSection>
    </section>
  );
}
