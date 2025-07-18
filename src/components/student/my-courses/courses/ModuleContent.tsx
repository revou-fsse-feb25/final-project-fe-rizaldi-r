import ContentHeader from "@/components/_commons/ContentHeader";
import Header from "@/components/_commons/Header";
import { ItfModule } from "@/types/types";
import Link from "next/link";
import AssignmentSubmissionForm from "./AssignmentSubmissionForm";

export default function ModuleContent({
  title,
  type,
  description,
  links,
  embedVideoLink,
  subdescription,
  submissionData,
}: ItfModule) {
  const isAssignment = type === "Assignment";

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
      <section className="bg-white py-6 px-7 rounded-lg border border-gray-300">
        {/* Module Header */}
        <ContentHeader
          title={title}
          descriptionDetail={{ text: type, iconSrc: isAssignment ? "/book.svg" : "/play.svg" }}
        />

        {/* Main Description */}
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{description}</p>

        {/* Subdescriptions */}
        {subdescription && subdescription.length > 0 && (
          <section className="mb-6">
            {subdescription.map((item, index) => (
              <div key={index} className="mb-5">
                {item.header && (
                  <Header element="h2" size="14px" className="my-3">
                    {item.header}
                  </Header>
                )}
                {item.type === "list" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 mb-6">
                    {item.description.split("\n").map((line, lineIndex) => (
                      <div key={lineIndex} className="flex items-start mb-1">
                        <span className="text-gray-700 mr-2">•</span>
                        <p className="text-gray-700 flex-grow">{line}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
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
            <Header size="14px" element="h2" className="my-2">
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
      {isAssignment && submissionData?.submissionTitle && submissionData.submissions && (
        <AssignmentSubmissionForm
          submissionTitle={submissionData.submissionTitle}
          submissions={submissionData.submissions}
        />
      )}
    </>
  );
}
