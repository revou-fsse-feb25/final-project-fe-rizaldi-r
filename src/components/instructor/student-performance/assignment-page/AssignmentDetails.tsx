import ContentHeader from "@/components/_commons/ContentHeader";
import Header from "@/components/_commons/Header";
import Link from "next/link";
import { BookMinus, PlayIcon } from "lucide-react";
import { AssignmentDetailsItf } from "@/types/types";
import Grading from "@/components/instructor/student-performance/assignment-page/Grading";
import { Submission } from "@/types/submission-interface";
import { Enrollment } from "@/types/enrollment-interface";
import { CourseModuleDetails, DescriptionType } from "@/types/module-interface";

export default function AssignmentDetails({
  id,
  studentId,
  enrollmentId,
  moduleId,
  submissionTemplateId,
  isLocked,
  isGraded,
  isPassed,
  scorePercentage,
  scoreAchieved,
  scoreTotal,
  feedback,
  createdAt,
  updatedAt,
  submissionTemplate,
  submissionFieldValue,
  embedVideoLink,
  title,
  description,
  links,
  subdescriptions,
}: Submission & Partial<CourseModuleDetails>) {
  return (
    <>
      {embedVideoLink && (
        <iframe
          src={embedVideoLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="aspect-video rounded-xl"
        ></iframe>
      )}

      {/* module description */}
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300">
        {/* Module Header */}
        <ContentHeader
          title={title || "No Title"}
          descriptionDetail={{
            text: "Assignment",
            iconComponent: <BookMinus size={16} className="text-slate-400" />,
          }}
        />

        {/* Main Description */}
        <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{description}</p>

        {/* Subdescriptions */}
        {subdescriptions && subdescriptions.length > 0 && (
          <section className="mb-6">
            {subdescriptions.map((item, index) => (
              <div key={index} className="mb-5">
                {item.header && (
                  <Header element="h2" size="14" className="my-3">
                    {item.header}
                  </Header>
                )}
                {item.type === DescriptionType.LIST ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 mb-6">
                    {item.description.split("\n").map((line, lineIndex) => (
                      <div key={lineIndex} className="flex items-start mb-1">
                        <span className="text-slate-700 mr-2">•</span>
                        <p className="text-slate-700 flex-grow">{line}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <section>
            <Header size="14" element="h2" className="my-2">
              Links
            </Header>
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <span key={index}>
                  {link.label}
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm ml-2"
                  >
                    {link.href}
                  </Link>
                </span>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* submission details and grading */}
      {submissionTemplate && (
        <Grading
          submissionId={id || "submission-id-not-found"}
          scoreLimit={scoreTotal}
          initialFeedback={feedback || ""}
          initialScore={scoreAchieved.toString() || ""}
          initialPassStatus={isPassed || false}
          submissionTitle={submissionTemplate.submissionTitle}
          submissionFieldValueList={submissionFieldValue}
        />
      )}
      {/* {submittedData?.submissionTitle && submittedData.submissionList && (
        <Grading
          {...submittedData}
          // submissionTitle={submittedData?.submissionTitle}
          // submissions={submittedData?.submissionList}
        />
      )} */}
    </>
  );
}
