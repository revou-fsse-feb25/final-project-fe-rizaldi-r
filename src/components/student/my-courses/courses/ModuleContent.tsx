import ContentHeader from "@/components/_commons/ContentHeader";
import Header from "@/components/_commons/Header";
import Link from "next/link";
import AssignmentSubmissionForm from "./AssignmentSubmissionForm";
import { BookMinus, PlayIcon, TriangleAlert } from "lucide-react";
import { CourseModuleDetails, DescriptionType, ModuleType } from "@/types/module-interface";
import { Submission } from "@/types/submission-interface";

export default function ModuleContent({
  title,
  moduleType,
  description,
  links,
  embedVideoLink,
  subdescriptions,
  submissionTemplate,
  submissions,
}: CourseModuleDetails & { submissions?: Submission[] }) {
  const isAssignment = moduleType === ModuleType.ASSIGNMENT;

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
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300">
        {/* Module Header */}
        <ContentHeader
          title={title}
          descriptionDetail={{
            text: moduleType.charAt(0).toUpperCase() + moduleType.slice(1).toLowerCase(),
            iconComponent: isAssignment ? (
              <BookMinus size={16} className="text-slate-400" />
            ) : (
              <PlayIcon size={16} className="text-slate-400" />
            ),
          }}
        />

        {/* End Date */}
        {isAssignment && (
          <div className="text-sm text-slate-500 mb-6">
            <TriangleAlert size={16} className="text-slate-400 inline mr-1 mb-1" />
            <span>Deadline:</span>{" "}
            {submissionTemplate?.endDate
              ? new Date(submissionTemplate.endDate).toDateString()
              : "No deadline"}
          </div>
        )}

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

      {/* Submission */}
      {isAssignment &&
        submissionTemplate?.submissionTitle &&
        submissionTemplate.submissionFields && (
          <AssignmentSubmissionForm
            submissions={submissions || []}
            submissionTitle={submissionTemplate.submissionTitle}
            submissionFields={submissionTemplate.submissionFields}
            submissionTemplateId={submissionTemplate.id}
          />
        )}
    </>
  );
}
