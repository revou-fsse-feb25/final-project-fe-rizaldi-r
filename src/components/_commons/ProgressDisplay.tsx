import ProgressCircle from "./ProgressCircle";

export default function ProgressDisplay({
  displayType = "Bar",
  progressLabel = "Progress",
  progressPercentage,
  moduleLabel = "completed",
  moduleCompleted,
  moduleTotal,
}: {
  displayType?: "Bar" | "Circle";
  progressLabel?: string;
  progressPercentage?: number | null;
  moduleLabel?: string;
  moduleCompleted?: number | null;
  moduleTotal?: number | null;
}) {
  return (
    <>
      {displayType === "Bar" ? (
        // Bar Display
        <div>
          <p className="text-sm font-semibold">
            {progressLabel}: {progressPercentage || 0}%
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 my-1.5">
            <div
              className="bg-blue-400 h-2 rounded-full"
              style={{ width: `${progressPercentage || 0}%` }}
            ></div>
          </div>
          <p className="text-slate-500">
            {moduleCompleted}/{moduleTotal} {moduleLabel}
          </p>
        </div>
      ) : (
        // Circle Display
        <div className="flex items-center gap-2">
          <ProgressCircle progress={progressPercentage || 0} text={`${progressPercentage}%`} />
          <div>
            <p className="font-semibold text-slate-700">
              {progressLabel}: {progressPercentage || 0}%
            </p>
            <p className="text-slate-500">
              {moduleCompleted || 0}/{moduleTotal || 0} {moduleLabel}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
