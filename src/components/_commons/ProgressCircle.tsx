export default function ProgressCircle({ progress, text }: { progress: number; text: string }) {
  const radius = 20;
  const strokeWidth = 6;

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const svgDimension = (radius * 2) + (strokeWidth * 2);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={svgDimension}
        height={svgDimension}
        viewBox={`0 0 ${svgDimension} ${svgDimension}`}
      >
        <circle
          className="text-slate-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        <circle
          className="text-blue-400 transition-all duration-500 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
      </svg>
    </div>
  );
}
