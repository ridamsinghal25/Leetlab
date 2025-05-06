import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProblemStore } from "@/store/useProblemStore";
import { useSubmissionStore } from "@/store/useSubmissionStore";
import { useExecutionStore } from "@/store/useExecution";
import SubmissionsList from "@/components/views/SubmissionList";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testCases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(
                  ([lang, example], idx) => (
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
                  )
                )}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-muted p-6 rounded-xl mb-6">
                  <pre className="bg-black/90 dark:bg-white/10 px-4 py-2 rounded-lg font-semibold text-white text-lg whitespace-pre-wrap">
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
      case "discussion":
        return (
          <div className="p-4 text-center text-muted-foreground">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-muted p-6 rounded-xl">
                <pre className="bg-black/90 dark:bg-white/10 px-4 py-2 rounded-lg font-semibold text-white text-lg whitespace-pre-wrap">
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={"/"}>
                  <Home className="w-5 h-5" />
                </Link>
              </Button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <h1 className="text-xl font-bold">{problem.title}</h1>

              <Badge
                className="ml-2"
                variant={
                  problem.difficulty === "EASY"
                    ? "success"
                    : problem.difficulty === "MEDIUM"
                    ? "warning"
                    : "destructive"
                }
              >
                {problem.difficulty}
              </Badge>
            </div>

            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="hidden sm:inline">Updated</span>
                        <span>
                          {new Date(problem.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Last updated on{" "}
                      {new Date(problem.createdAt).toLocaleString()}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{submissionCount} Submissions</span>
                </div>

                <Separator orientation="vertical" className="h-4" />

                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>95% Success</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "text-primary" : ""}
                >
                  <Bookmark className="w-5 h-5" />
                </Button>

                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>

                <Select
                  value={selectedLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(problem.codeSnippets || {}).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:order-1">
            <CardContent className="p-0">
              <Tabs
                defaultValue="description"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="description"
                    className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
                  >
                    <FileText className="w-4 h-4" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="submissions"
                    className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
                  >
                    <Code2 className="w-4 h-4" />
                    Submissions
                  </TabsTrigger>
                  <TabsTrigger
                    value="discussion"
                    className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Discussion
                  </TabsTrigger>
                  <TabsTrigger
                    value="hints"
                    className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Hints
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="p-6">
                  <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                    {renderTabContent()}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="lg:order-2">
            <CardContent className="p-0">
              <div className="flex items-center px-4 py-2 border-b">
                <Terminal className="w-4 h-4 mr-2" />
                <h2 className="font-medium">Code Editor</h2>
              </div>

              <div className="h-[calc(100vh-300px)] w-full">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="p-4 border-t bg-muted/50">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <Button
                    variant="default"
                    className="gap-2"
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
                  <Button variant="secondary" className="gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Submit Solution
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            {submission ? (
              <SubmissionResults submission={submission} />
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
