import { Info } from "lucide-react";
import SubmissionsList from "@/components/components/submissions/SubmissionList";

export const ProblemTabsContent = ({
  activeTab,
  problem,
  submissions,
  isSubmissionsLoading,
  testCases,
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
                      {example.input}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-blue-500 dark:text-blue-400 mb-2 text-base font-semibold">
                      Output:
                    </div>
                    <div className="bg-black/90 dark:bg-white/10 px-4 py-2 rounded-lg font-semibold text-white">
                      {example.output}
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
              <div className="bg-muted p-6 rounded-xl mb-6">
                <pre className=" dark:bg-white/10 px-4 py-2 rounded-lg font-semibold text-black text-lg whitespace-pre-wrap">
                  {problem.constraints}
                </pre>
              </div>
            </>
          )}

          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Test Cases</h3>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Run your code to see results
                </span>
              </div>
            </div>

            {/* Table header */}
            <div className="w-full border-b border-gray-200">
              <div className="grid grid-cols-2 py-3 bg-gray-50">
                <div className="px-4 font-medium text-gray-900">Input</div>
                <div className="px-4 font-medium text-gray-900">
                  Expected Output
                </div>
              </div>
            </div>

            {/* Table body */}
            <div className="w-full">
              {testCases?.map((testCase, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 py-4 border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="px-4 font-mono">{testCase.input}</div>
                  <div className="px-4 font-mono">{testCase.output}</div>
                </div>
              ))}
            </div>
          </>
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
