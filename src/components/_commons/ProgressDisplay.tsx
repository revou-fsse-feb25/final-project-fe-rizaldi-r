import ProgressCircle from "./ProgressCircle";

export default function ProgressDisplay({
  displayType = "Bar",
  progressLabel = "Progress",
  progressPercentage = 0,
  countLabel = "completed",
  countCompleted = 0,
  countTotal = 0,
}: {
  displayType?: "Bar" | "Circle";
  progressLabel?: string;
  progressPercentage: number;
  countLabel?: string;
  countCompleted: number;
  countTotal: number;
}) {
  return (
    <>
      {displayType === "Bar" ? (
        // Bar Display
        <div>
          <p className="text-sm font-semibold">
            {progressLabel}: {progressPercentage}%
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 my-1.5">
            <div
              className="bg-blue-400 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-slate-500">
            {countCompleted}/{countTotal} {countLabel}
          </p>
        </div>
      ) : (
        // Circle Display
        <div className="flex items-center gap-2">
          <ProgressCircle
            progress={progressPercentage}
            text={`${progressPercentage}%`}
          />
          <div>
            <p className="font-semibold text-slate-700">
              {progressLabel}: {progressPercentage}%
            </p>
            <p className="text-slate-500">
              {countCompleted}/{countTotal} {countLabel}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
