import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Download, FileText, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { axiosInstance } from "@/lib/axios";
import { sampledpData, sampleStringProblem } from "@/data";
import { problemSchema } from "@/validations/zodValidations";
import { ROUTES } from "@/constants/routes";
import ProblemForm from "@/components/views/ProblemForm";

const defaultValues = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: ["Tag"],
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
};

const AddProblem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState("DP");
  const navigation = useNavigate();

  const addProblemForm = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      return;
      setIsLoading(true);
      const res = await axiosInstance.post("/problems/create-problem", data);
      toast.success(res.data.message);
      navigation(ROUTES.HOME);
    } catch (error) {
      console.log("Error creating problem", error);
      toast.error("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    addProblemForm.reset(sampleData);
  };

  const resetForm = () => {
    addProblemForm.reset(defaultValues);
  };

  return (
    <div className="w-screen lg:w-4xl mx-auto py-8 px-4">
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
      />
    </div>
  );
};

export default AddProblem;
