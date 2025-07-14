import Header from "./Header";

interface AssignmentHeaderProps {
  title: string;
  descriptionDetail?: { text: string; iconSrc?: string; iconClass?: string };
}

export default function ContentHeader({ title, descriptionDetail }: AssignmentHeaderProps) {
  return (
    <section className="mb-4">
      {descriptionDetail && (
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          {descriptionDetail.iconSrc && (
            <img
              src={descriptionDetail?.iconSrc}
              className={`opacity-50 ${descriptionDetail.iconClass}`}
            />
          )}
          {descriptionDetail?.text}
        </div>
      )}
      <Header element="h1">{title}</Header>
    </section>
  );
}
