import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Brain, Download, FileText, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { axiosInstance } from "@/lib/axios";
import { sampledpData, sampleStringProblem } from "@/data";
import { problemSchema } from "@/validations/zodValidations";
import { ROUTES } from "@/constants/routes";
import ProblemForm from "@/components/basic/ProblemForm";
import { AIProblemModal } from "@/components/modals/AIProblemModal";
import { useProblemStore } from "@/store/useProblemStore";

const defaultValues = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: ["Tag"],
  companies: ["Company"],
  constraints: "",
  hints: "",
  editorial: "",
  testcases: [
    {
      input: "",
      output: "",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "",
      output: "",
      explanation: "",
    },
    PYTHON: {
      input: "",
      output: "",
      explanation: "",
    },
    JAVA: {
      input: "",
      output: "",
      explanation: "",
    },
  },
  codeSnippets: {
    JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
    PYTHON: "def solution():\n    # Write your code here\n    pass",
    JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
  },
  referenceSolutions: {
    JAVASCRIPT: "// Add your reference solution here",
    PYTHON: "# Add your reference solution here",
    JAVA: "// Add your reference solution here",
  },
  stdin: {
    JAVASCRIPT:
      "const readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    console.log(lengthOfLongestSubstring(input));\n    rl.close();\n});",
    PYTHON:
      "import sys\n\nline = sys.stdin.readline().strip()\nprint(lengthOfLongestSubstring(line))",
    JAVA: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.lengthOfLongestSubstring(s));\n    }\n}",
  },
};

const AddProblem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState("DP");
  const [executionError, setExecutionError] = useState(null);
  const [isAskAIModalOpen, setIsAskAIModalOpen] = useState(false);
  const navigation = useNavigate();
  const { addProblemToState } = useProblemStore();

  const addProblemForm = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultValues,
  });

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    addProblemForm.reset(sampleData);
  };

  const resetForm = () => {
    addProblemForm.reset(defaultValues);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setExecutionError(null);
      const res = await axiosInstance.post("/problem/create-problem", data);

      if (res.data.success) {
        toast.success(res.data.message);

        addProblemToState(res.data.problem);
        addProblemForm.reset(defaultValues);
        navigation(ROUTES.HOME);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error creating problem");
      setExecutionError(error.response?.data?.executionError || null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen lg:w-4xl mx-auto py-8 px-4">
      <div className="absolute top-4 right-4">
        <Button
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
          onClick={() => setIsAskAIModalOpen(true)}
        >
          <Brain size={18} />
          <span>Ask AI</span>
        </Button>
      </div>

      <AIProblemModal
        isOpen={isAskAIModalOpen}
        onOpenChange={() => setIsAskAIModalOpen(false)}
        form={addProblemForm}
      />

      <Card className="border shadow-lg mb-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Create Problem</CardTitle>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Tabs
                defaultValue="DP"
                className="w-full sm:w-auto"
                onValueChange={(value) => setSampleType(value)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="DP">DP Problem</TabsTrigger>
                  <TabsTrigger value="string">String Problem</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                variant="outline"
                className="gap-2"
                onClick={loadSampleData}
              >
                <Download className="h-4 w-4" />
                Load Sample
              </Button>

              <Button variant="outline" className="gap-2" onClick={resetForm}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <ProblemForm
        form={addProblemForm}
        onSubmit={onSubmit}
        isLoading={isLoading}
        executionError={executionError}
      />
    </div>
  );
};

export default AddProblem;
