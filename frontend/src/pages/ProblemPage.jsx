import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useProblemStore } from "@/store/useProblemStore";
import { useSubmissionStore } from "@/store/useSubmissionStore";
import { useExecutionStore } from "@/store/useExecution";
import { getLanguageId } from "@/lib/getLanguageInfo";
import ProblemPageHeader from "@/components/components/problem/Header";
import ProblemTabs from "@/components/components/problem/Tabs";
import CodeEditor from "@/components/components/problem/Editor";
import { useCountdown } from "usehooks-ts";
import { COUNTDOWN } from "@/constants/constants";
import SubmissionsView from "@/components/components/submissions/SubmissionsView";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissionsOfProblem,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblemByUser,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [testCases, setTestCases] = useState([]);
  const [isCounting, setIsCounting] = useState(false);

  const { executeCode, submission, isExecuting, runCode } = useExecutionStore();

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: COUNTDOWN.COUNTSTART,
      intervalMs: COUNTDOWN.INTERVAL,
    });

  useEffect(() => {
    if (id) {
      getProblemById(id);
      getSubmissionCountForProblem(id);
      getSubmissionForProblemByUser(id);
    }
  }, [id]);

  useEffect(() => {
    if (problem) {
      const isAcceptedSubmission = submissionsOfProblem?.find(
        (sub) => sub.status === "Accepted"
      );

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );

      if (
        isAcceptedSubmission &&
        isAcceptedSubmission?.language?.toLowerCase() ===
          selectedLanguage?.toLowerCase()
      ) {
        setCode(isAcceptedSubmission.sourceCode);
        return;
      }

      setCode(problem.codeSnippets?.[selectedLanguage] || "");
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (count === 0) {
      setIsCounting(false);
      resetCountdown();
    }
  }, [count]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleRunCode = (e) => {
    e.preventDefault();

    setIsCounting(true);
    startCountdown();

    const language_id = getLanguageId(selectedLanguage);
    const stdin = problem.testcases.map((tc) => tc.input);
    const expected_outputs = problem.testcases.map((tc) => tc.output);
    runCode(code, language_id, stdin, expected_outputs, id);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();

    const language_id = getLanguageId(selectedLanguage);
    const stdin = problem.testcases.map((tc) => tc.input);
    const expected_outputs = problem.testcases.map((tc) => tc.output);
    executeCode(code, language_id, stdin, expected_outputs, id);
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-[300px]">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="mt-4 text-muted-foreground">Loading problem...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ProblemPageHeader problem={problem} submissionCount={submissionCount} />

      <main className="container mx-auto px-0 py-0 lg:w-screen flex flex-col">
        <div className="flex flex-col lg:h-screen lg:flex-row border rounded">
          {/* Left side - Tabs  */}
          <ProblemTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            problem={problem}
            submissionsOfProblem={submissionsOfProblem}
            isSubmissionsLoading={isSubmissionsLoading}
            testCases={testCases}
          />

          {/* Right side - Code editor  */}
          <CodeEditor
            code={code}
            setCode={setCode}
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
            problem={problem}
            isExecuting={isExecuting}
            handleRunCode={handleRunCode}
            handleSubmitCode={handleSubmitCode}
            isCounting={isCounting}
            count={count}
          />
        </div>

        {/* Submissions section */}
        <div className="m-5">
          <SubmissionsView
            submissionsOfProblem={submissionsOfProblem}
            submission={submission}
            activeTab={activeTab}
          />
        </div>
      </main>
    </div>
  );
};

export default ProblemPage;
