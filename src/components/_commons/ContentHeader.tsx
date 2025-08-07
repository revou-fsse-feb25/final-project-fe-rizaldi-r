import Header from "./Header";

interface AssignmentHeaderProps {
  title: string;
  descriptionDetail?: { text: string; iconComponent?: React.ReactNode; iconClass?: string };
}

export default function ContentHeader({ title, descriptionDetail }: AssignmentHeaderProps) {
  return (
    <section className="mb-4 text-slate-700">
      {descriptionDetail && (
        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
          {descriptionDetail.iconComponent &&
            // <img
            //   src={descriptionDetail?.iconComponent}
            //   className={`opacity-50 ${descriptionDetail.iconClass}`}
            // />
            descriptionDetail.iconComponent}
          {descriptionDetail?.text}
        </div>
      )}
      <Header element="h2" size="20" fontWeight="bold">{title}</Header>
    </section>
  );
}
