import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useProblemStore } from "@/store/useProblemStore";
import { useSubmissionStore } from "@/store/useSubmissionStore";
import { useExecutionStore } from "@/store/useExecution";
import { getLanguageId } from "@/lib/getLanguageInfo";
import ProblemPageHeader from "@/components/problem/Header";
import ProblemTabs from "@/components/problem/Tabs";
import CodeEditor from "@/components/problem/Editor";
import { useCountdown, useMediaQuery } from "usehooks-ts";
import { COUNTDOWN } from "@/constants/constants";
import SubmissionsView from "@/components/submissions/SubmissionsView";
import { ProblemPageShimmer } from "@/components/basic/ProblemPageShimmerUI";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MobileRestrictionCard } from "@/components/problem/MobileRestrictionCard";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissionsOfProblem,
    isFetchingSubmissionsForProblem: isSubmissionsLoading,
    getSubmissionForProblemByUser,
    getSubmissionCountForProblem,
    submissionCount,
    addSubmissionToState,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [testCases, setTestCases] = useState([]);
  const [isCounting, setIsCounting] = useState(false);

  const { executeCode, submission, isExecuting, runCode, setSubmission } =
    useExecutionStore();

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: COUNTDOWN.COUNTSTART,
      intervalMs: COUNTDOWN.INTERVAL,
    });

  const isDesktop = useMediaQuery("(min-width: 850px)");
  const submissionRef = useRef(null);

  useEffect(() => {
    if (id && problem?.id !== id) {
      getProblemById(id);
      getSubmissionCountForProblem(id);
      getSubmissionForProblemByUser(id);
    }
  }, [id]);

  useEffect(() => {
    if (problem) {
      const isAcceptedSubmission = submissionsOfProblem?.find(
        (sub) =>
          sub.status === "Accepted" &&
          sub.language?.toLowerCase() === selectedLanguage?.toLowerCase()
      );

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );

      if (isAcceptedSubmission) {
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

  const handleRunCode = async (e) => {
    e.preventDefault();

    setIsCounting(true);
    startCountdown();
    setSubmission();

    const language_id = getLanguageId(selectedLanguage);
    const stdin = testCases.map((tc) => tc.input);
    const expected_outputs = testCases.map((tc) => tc.output);
    const standardInputOfCode = problem.stdin[selectedLanguage];

    await runCode(
      code,
      language_id,
      stdin,
      standardInputOfCode,
      expected_outputs,
      id
    );

    submissionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();

    setSubmission();

    const language_id = getLanguageId(selectedLanguage);
    const stdin = testCases.map((tc) => tc.input);
    const expected_outputs = testCases.map((tc) => tc.output);
    const standardInputOfCode = problem.stdin[selectedLanguage];

    const submission = await executeCode(
      code,
      language_id,
      stdin,
      standardInputOfCode,
      expected_outputs,
      id
    );

    addSubmissionToState(submission);
    submissionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <ProblemPageShimmer />
      </div>
    );
  }

  if (!isDesktop) {
    return <MobileRestrictionCard />;
  }

  return (
    <div className="flex flex-col h-screen">
      <ProblemPageHeader problem={problem} submissionCount={submissionCount} />

      <main className="mx-auto px-0 py-0 flex flex-col">
        {/* Desktop: Resizable panels */}
        <div className="border w-screen">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={35} maxSize={70}>
              <ProblemTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                problem={problem}
                submissionsOfProblem={submissionsOfProblem}
                isSubmissionsLoading={isSubmissionsLoading}
                selectedLanguage={selectedLanguage}
              />
            </ResizablePanel>

            <ResizableHandle className="hover:bg-blue-400 hover:w-0.5" />

            <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
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
                testCases={testCases}
                setTestCases={setTestCases}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        {/* Submissions section */}
        <div className="m-5" ref={submissionRef}>
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
