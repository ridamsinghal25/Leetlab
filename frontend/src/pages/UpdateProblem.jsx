import UpdateProblemForm from "@/components/views/UpdateProblemForm";
import { useProblemStore } from "@/store/useProblemStore";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProblem() {
  const [problem, setProblem] = useState({});
  const { id } = useParams();
  const { getProblemByIdFromState } = useProblemStore();

  useEffect(() => {
    const problem = getProblemByIdFromState(id);
    setProblem(problem);
  }, [id]);

  if (!problem.id) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <UpdateProblemForm problem={problem} />
    </div>
  );
}

export default UpdateProblem;
