import SubmissionsList from "@/components/submissions/SubmissionList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PROBLEM_PAGE_TABS } from "@/constants/constants";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { BookOpen, Copy, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const ProblemTabsContent = ({
  activeTab,
  problem,
  submissionsOfProblem,
  isSubmissionsLoading,
  selectedLanguage,
}) => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);

      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  switch (activeTab) {
    case PROBLEM_PAGE_TABS.DESCRIPTION:
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
    case PROBLEM_PAGE_TABS.SUBMISSIONS:
      return (
        <SubmissionsList
          submissions={submissionsOfProblem}
          isLoading={isSubmissionsLoading}
        />
      );
    case PROBLEM_PAGE_TABS.SOLUTION:
      return (
        <div>
          {authUser?.isSubscribed ? (
            <div className="space-y-4 overflow-visible">
              {submissionsOfProblem?.length > 0 ? (
                <div>
                  {problem?.referenceSolutions && (
                    <>
                      <div className="flex items-center justify-between overflow-visible">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <h4 className="font-medium">Solution</h4>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                          <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-medium whitespace-nowrap">
                            {selectedLanguage}
                          </span>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="w-full">
                          <div className="flex items-center justify-end mb-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  problem?.referenceSolutions[selectedLanguage]
                                )
                              }
                              className="h-6 px-2 text-xs sm:h-8 sm:px-3 border-slate-300 hover:bg-slate-100 whitespace-nowrap"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              <span className="hidden xs:inline">Copy</span>
                            </Button>
                          </div>

                          <div className="relative rounded-md bg-muted w-full overflow-hidden">
                            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
                              <SyntaxHighlighter
                                language={selectedLanguage}
                                style={anOldHope}
                                showLineNumbers
                                wrapLongLines={true}
                                className="!text-xs sm:!text-sm"
                                customStyle={{
                                  margin: 0,
                                  padding: "0.75rem",
                                  background: "transparent",
                                  fontSize: "inherit",
                                }}
                              >
                                {problem?.referenceSolutions[selectedLanguage]}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="min-h-full flex items-center justify-center p-4">
                  <Card className="mt-20 rounded-2xl shadow-xl p-8 max-w-md w-full bg-white dark:bg-gray-800 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-gray-500 dark:text-gray-300" />
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                      Solution Locked
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                      Please{" "}
                      <span className="font-medium text-gray-800 dark:text-white">
                        submit your code
                      </span>{" "}
                      to unlock and view the complete solution. This ensures
                      you've attempted the problem before seeing the answer.
                    </p>
                  </Card>
                </div>
              )}
            </div>
          ) : (
            <div className="min-h-full flex items-center justify-center p-4">
              <Card className="mt-20 rounded-2xl shadow-xl p-8 max-w-md w-full border-2 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gray-500 dark:text-gray-300" />
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                  Upgrade to Pro Plan
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                  Access to complete solutions is available exclusively to our
                  Pro plan members. Upgrade today to unlock all solutions and
                  accelerate your learning journey.
                </p>

                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
                  onClick={() => navigate(ROUTES.PRICING)}
                >
                  Upgrade to Pro
                </Button>
              </Card>
            </div>
          )}
        </div>
      );
    case PROBLEM_PAGE_TABS.EDITORIAL:
      return (
        <div className="p-4">
          {problem.editorial || "No editorial available"}
        </div>
      );
    case PROBLEM_PAGE_TABS.HINTS:
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
