import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuizResultModal from "../modals/QuizResultModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function QuizList({ assessments }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [toggleQuizModal, setToggleQuizModal] = useState(false);
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <Button
                      onClick={() => navigate(ROUTES.NEWQUIZ)}
                      disabled={!authUser?.isSubscribed}
                    >
                      Start New Quiz
                    </Button>
                  </div>
                </TooltipTrigger>
                {!authUser?.isSubscribed && (
                  <TooltipContent>
                    <p className="text-amber-600">Upgrade to pro plan</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.length > 0 ? (
              assessments.map((assessment, i) => (
                <Card
                  key={assessment.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    setToggleQuizModal(true);
                    setSelectedQuiz(assessment);
                  }}
                >
                  <CardHeader>
                    <CardTitle className="gradient-title text-2xl">
                      Quiz {i + 1}
                    </CardTitle>
                    <CardDescription className="flex justify-between w-full">
                      <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                      <div>
                        {format(
                          new Date(assessment.createdAt),
                          "MMMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  {assessment.improvementTip && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {assessment.improvementTip}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-medium">No Quiz found</h3>
                  <p className="text-muted-foreground mt-2 text-center">
                    Create a quiz to get started
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <QuizResultModal
        result={selectedQuiz}
        open={toggleQuizModal}
        onOpenChange={setToggleQuizModal}
      />
    </>
  );
}
