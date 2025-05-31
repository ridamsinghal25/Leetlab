import { Info } from "lucide-react";
import SubmissionsList from "@/components/components/submissions/SubmissionList";

export const ProblemTabsContent = ({
  activeTab,
  problem,
  submissions,
  isSubmissionsLoading,
}) => {
  switch (activeTab) {
    case "description":
      return (
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-lg mb-6">{problem.description}</p>

          {problem.examples && (
            <>
              <h3 className="text-xl font-bold mb-4">Examples:</h3>
              {Object.entries(problem.examples).map(([lang, example], idx) => (
                <div
                  key={lang}
                  className="bg-muted p-6 rounded-xl mb-6 font-mono"
                >
                  <div className="mb-4">
                    <div className="text-blue-500 dark:text-blue-400 mb-2 text-base font-semibold">
                      Input:
                    </div>
                    <div className="bg-black/90 dark:bg-white/10 px-4 py-2 rounded-lg font-semibold text-white">
                      {example.input.trim() ? example.input : "Empty String"}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-blue-500 dark:text-blue-400 mb-2 text-base font-semibold">
                      Output:
                    </div>
                    <div className="bg-black/90 dark:bg-white/10 px-4 py-2 rounded-lg font-semibold text-white">
                      {example.output.trim() ? example.output : "Empty String"}
                    </div>
                  </div>
                  {example.explanation && (
                    <div>
                      <div className="text-green-500 dark:text-green-400 mb-2 text-base font-semibold">
                        Explanation:
                      </div>
                      <p className="text-muted-foreground text-lg">
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {problem.constraints && (
            <>
              <h3 className="text-xl font-bold mb-4">Constraints:</h3>
              <div className="bg-muted rounded-xl mb-6">
                <pre className=" dark:bg-white/10 px-4 py-2 rounded-lg text-black dark:text-white whitespace-pre-wrap">
                  {problem.constraints}
                </pre>
              </div>
            </>
          )}
        </div>
      );
    case "submissions":
      return (
        <SubmissionsList
          submissions={submissions}
          isLoading={isSubmissionsLoading}
        />
      );
    case "editorial":
      return (
        <div className="p-4">
          {problem.editorial || "No editorial available"}
        </div>
      );
    case "hints":
      return (
        <div className="p-4">
          {problem?.hints ? (
            <div className="bg-muted p-6 rounded-xl">
              <pre className="px-4 py-2 rounded-lg font-semibold text-lg whitespace-pre-wrap">
                {problem.hints}
              </pre>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No hints available
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};
