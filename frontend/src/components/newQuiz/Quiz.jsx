import { useQuizStore } from "@/store/useQuizStore";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";

function Quiz({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isSavingQuiz, saveQuiz } = useQuizStore();

  useEffect(() => {
    if (quiz) {
      setAnswers(new Array(quiz.length).fill(null));
      toast("Do not leave or close the tab");
    }
  }, [quiz]);

  const calculateScore = useMemo(() => {
    let correct = 0;

    answers.forEach((answer, index) => {
      if (answer === quiz[index].correctAnswer) {
        correct++;
      }
    });

    return (correct / quiz.length) * 100;
  }, [answers]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        toast("You left the interview page");
        saveQuiz(quiz, answers, calculateScore);
        navigate(ROUTES.QUIZ);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location.pathname, navigate, answers]);

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  };

  const handleNext = async () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await saveQuiz(quiz, answers, calculateScore);
      navigate(ROUTES.QUIZ);
    }
  };

  const question = quiz[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quiz.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || isSavingQuiz}
          className="ml-auto"
        >
          {isSavingQuiz ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {currentQuestion < quiz.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Quiz;
