import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubmissionResults from "@/components/components/submissions/SubmissionResults";
import { PROBLEM_PAGE_TABS } from "@/constants/constants";

function SubmissionsView({ submissionsOfProblem, submission, activeTab }) {
  return (
    <div className="w-full mt-4">
      {submissionsOfProblem?.length > 0 &&
      activeTab === PROBLEM_PAGE_TABS.SUBMISSIONS ? (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">Your Submissions</h3>
            {submissionsOfProblem.map((submission, submissionIndex) => (
              <SubmissionResults
                key={submission.id}
                submission={submission}
                submissionIndex={submissionIndex}
              />
            ))}
          </CardContent>
        </Card>
      ) : (
        <div>
          {submission?.stderr && (
            <ScrollArea className="p-4 h-[50vh]">
              <h1 className="text-2xl font-bold">Error</h1>
              <div className="flex justify-end pt-4">
                <div className="w-full rounded-md border border-destructive/30 overflow-hidden">
                  <div className="bg-destructive/5 px-4 py-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </div>
                  {submission.stderr && (
                    <div className="bg-slate-50 p-3 font-mono text-sm text-slate-800 overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words">
                        {submission.stderr}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}

          {submission?.problemId && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <SubmissionResults submission={submission} />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default SubmissionsView;
