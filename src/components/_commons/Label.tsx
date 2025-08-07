interface LabelProps {
  children: React.ReactNode;
  dotColorClass?: string;
}

export default function Label({ children, dotColorClass }: LabelProps) {
  return (
    <span className="flex flex-row items-center rounded-full text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 border border-slate-200 flex-wrap">
      {dotColorClass && (
        <span className={`w-[7px] h-[7px] ${dotColorClass} rounded-full mr-2 opacity-75`}></span>
      )}
      {children}
    </span>
  );
}
