import QuizPageShimmerUI from "@/components/basic/QuizPageShimmerUI";
import PerformanceChart from "@/components/quiz/PerformanceChart";
import QuizList from "@/components/quiz/QuizList";
import StatsCards from "@/components/quiz/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { useQuizStore } from "@/store/useQuizStore";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function QuizPage() {
  const { getQuizAssessments, quizzes, isFetchingQuizzes } = useQuizStore();

  useEffect(() => {
    if (!quizzes.length) {
      getQuizAssessments();
    }
  }, [getQuizAssessments]);

  if (isFetchingQuizzes) {
    return <QuizPageShimmerUI />;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <Card className="border shadow-lg mb-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <CardTitle className="text-3xl">Your Quizzes</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <StatsCards assessments={quizzes} />
        <PerformanceChart assessments={quizzes} />
        <QuizList assessments={quizzes} />
      </div>
    </div>
  );
}

export default QuizPage;
