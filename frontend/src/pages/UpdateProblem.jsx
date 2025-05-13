import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { problemSchema } from "@/validations/zodValidations";
import { ROUTES } from "@/constants/routes";
import { useProblemStore } from "@/store/useProblemStore";
import ProblemForm from "@/components/views/ProblemForm";

function UpdateProblem() {
  const [problem, setProblem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getProblemByIdFromState } = useProblemStore();
  const navigation = useNavigate();

  const updateProblemForm = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: problem.title || "",
      description: problem.description || "",
      difficulty: problem.difficulty || "EASY",
      tags: problem.tags || ["Tag"],
      constraints: problem.constraints || "",
      hints: problem.hints || "",
      editorial: problem.editorial || "",
      testcases: problem.testcases || [
        {
          input: "",
          output: "",
        },
      ],
      examples: problem.examples || {
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
      codeSnippets: problem.codeSnippets || {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: problem.referenceSolutions || {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  useEffect(() => {
    const problemFromStore = getProblemByIdFromState(id);

    const sanitizedProblem = Object.fromEntries(
      Object.entries(problemFromStore).map(([key, value]) => [key, value ?? ""])
    );

    setProblem(sanitizedProblem);

    updateProblemForm.reset(sanitizedProblem);
  }, [id]);

  const onSubmit = async (value) => {
    try {
      console.log("value", value);
      return;
      setIsLoading(true);
      const res = await axiosInstance.post("/problems/update-problem", value, {
        params: { id: problem.id },
      });
      toast.success(res.data.message);
      navigation(ROUTES.HOME);
    } catch (error) {
      console.log("Error creating problem", error);
      toast.error("Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  if (!problem.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

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
              <CardTitle className="text-2xl">Update Problem</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>
      <ProblemForm
        form={updateProblemForm}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isUpdateMode
      />
    </div>
  );
}

export default UpdateProblem;
