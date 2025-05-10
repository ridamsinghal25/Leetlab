import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Clock,
  ChevronRight,
  Terminal,
  Code2,
  Users,
  Home,
  MemoryStickIcon as Memory,
  ArrowRight,
  Info,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProblemStore } from "@/store/useProblemStore";
import { useSubmissionStore } from "@/store/useSubmissionStore";
import { useExecutionStore } from "@/store/useExecution";
import { getLanguageId } from "@/lib/getLanguageInfo";
import { ProblemPageTabs } from "@/components/views/ProblemPageTabs";
import SubmissionResults from "@/components/views/SubmissionResults";
import { EASY_DIFFICULTY, MEDIUM_DIFFICULTY } from "@/constants/constants";
import { ROUTES } from "@/constants/routes";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblemByUser,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    if (id) {
      getProblemById(id);
      getSubmissionCountForProblem(id);
      getSubmissionForProblemByUser(id);
    }
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(
        submission?.sourceCode || problem.codeSnippets?.[selectedLanguage] || ""
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    setCode(problem.codeSnippets?.[value] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
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
      <header className="border-b bg-card shadow-sm h-16">
        <div className="container mx-auto px-2 sm:px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="flex-shrink-0"
              >
                <Link to={ROUTES.HOME}>
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground hidden xs:flex" />
              <h1 className="text-sm sm:text-base md:text-xl font-bold truncate">
                {problem.title}
              </h1>

              <Badge
                className="ml-1 sm:ml-2 flex-shrink-0"
                variant={
                  problem.difficulty === EASY_DIFFICULTY
                    ? "success"
                    : problem.difficulty === MEDIUM_DIFFICULTY
                    ? "warning"
                    : "destructive"
                }
              >
                {problem.difficulty}
              </Badge>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  <span className="hidden md:inline text-gray-700">
                    Updated
                  </span>
                  <span className="text-gray-700 truncate max-w-20 sm:max-w-none">
                    {new Date(problem.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <Separator
                  orientation="vertical"
                  className="h-3 sm:h-4 hidden sm:block"
                />

                <div className="hidden sm:flex items-center gap-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  <span className="text-gray-700">
                    {submissionCount} Submissions
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${
                  isBookmarked ? "text-primary" : ""
                } flex-shrink-0`}
              >
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-0 py-0 lg:w-screen h-[calc(100vh-64px)] flex flex-col">
        <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen lg:flex-row">
          {/* Left side - Problem description - Full width on mobile, 40% on large screens */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r">
            <Tabs
              defaultValue="description"
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col"
            >
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 overflow-x-auto">
                <TabsTrigger
                  value="description"
                  className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:rounded"
                >
                  <FileText className="w-4 h-4" />
                  <span className="whitespace-nowrap">Description</span>
                </TabsTrigger>
                <TabsTrigger
                  value="submissions"
                  className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:rounded"
                >
                  <Code2 className="w-4 h-4" />
                  <span className="whitespace-nowrap">Submissions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="discussion"
                  className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:rounded"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="whitespace-nowrap">Discussion</span>
                </TabsTrigger>
                <TabsTrigger
                  value="hints"
                  className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:rounded"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="whitespace-nowrap">Hints</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value={activeTab}
                className="flex-1 overflow-hidden w-full"
              >
                <ScrollArea className="h-full px-4 md:px-6 py-4 w-full">
                  <div className="w-full">
                    <ProblemPageTabs
                      activeTab={activeTab}
                      problem={problem}
                      submissions={submissions}
                      isSubmissionsLoading={isSubmissionsLoading}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right side - Code editor - Full width on mobile, 60% on large screens */}
          <div className="w-full lg:w-1/2 flex flex-col h-[60vh] md:h-[50vh] lg:h-[95vh]">
            <div className="flex justify-between px-4 py-2 border-b">
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                <h2 className="font-medium">Code Editor</h2>
              </div>
              <div>
                <Select
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-[120px] md:w-[140px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(problem.codeSnippets || {}).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() +
                          lang.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1">
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                defaultLanguage="javascript"
                defaultValue={code}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                  mouseWheelScrollSensitivity: 1,
                  wordWrap: "on",
                  scrollbar: {
                    alwaysConsumeMouseWheel: false,
                    handleMouseWheel: true,
                  },
                  padding: {
                    top: 10,
                    right: 20,
                  },
                }}
              />
            </div>

            <div className="p-4 border-t bg-muted/50">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <Button
                  variant="default"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleRunCode}
                  disabled={isExecuting}
                >
                  {isExecuting ? (
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  Run Code
                </Button>
                <Button variant="secondary" className="gap-2 w-full sm:w-auto">
                  <ArrowRight className="w-4 h-4" />
                  Submit Solution
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Test cases section - Only shown when on submissions tab */}

        <Card className="mt-6">
          <CardContent className="p-6">
            {submissions?.length > 0 && activeTab === "submissions" ? (
              <>
                <h3 className="text-xl font-bold">Your Submissions</h3>
                {submissions.map((submission, submissionIndex) => (
                  <SubmissionResults
                    key={submission.id}
                    submission={submission}
                    submissionIndex={submissionIndex}
                  />
                ))}
              </>
            ) : (
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Input</TableHead>
                      <TableHead>Expected Output</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testCases.map((testCase, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">
                          {testCase.input}
                        </TableCell>
                        <TableCell className="font-mono">
                          {testCase.output}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProblemPage;
