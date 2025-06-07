import { ArrowLeft, Brain, Loader2, Plus, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Quiz from "@/components/newQuiz/Quiz";
import { useQuizStore } from "@/store/useQuizStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { ROUTES } from "@/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateQuizSchema } from "@/validations/zodValidations";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import { INDUSTRIES } from "@/constants/constants";

function NewQuizPage() {
  const { quiz, generateQuiz, isGeneratingQuiz } = useQuizStore();

  const generateQuizForm = useForm({
    resolver: zodResolver(generateQuizSchema),
    defaultValues: {
      industry: "",
      skills: ["Skill"],
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: generateQuizForm.control,
    name: "skills",
  });

  return (
    <>
      <div className="w-screen lg:w-4xl mx-auto py-8 px-4">
        <Card className="border shadow-lg mb-4">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={ROUTES.QUIZ}>
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <Brain className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Start a Quiz</CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div>
          {quiz.length > 0 ? (
            <Quiz quiz={quiz} />
          ) : (
            <Card className="w-full border shadow-lg">
              <CardHeader className="text-center space-y-6 pb-8">
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-inner">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Create Your Personalized Quiz
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg mt-2">
                    Tell us about your industry and skills to generate a
                    tailored knowledge assessment
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <Form {...generateQuizForm}>
                  <form
                    onSubmit={generateQuizForm.handleSubmit((data) =>
                      generateQuiz(data)
                    )}
                    className="space-y-6"
                  >
                    <FormFieldSelect
                      form={generateQuizForm}
                      name="industry"
                      type="text"
                      label="Industry"
                      placeholder="e.g., Software Development, Marketing, Finance..."
                      optionValues={INDUSTRIES}
                    />
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Skills
                          </CardTitle>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => appendSkill("")}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Skill
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {skillFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex gap-2 items-center"
                            >
                              <FormFieldInput
                                form={generateQuizForm}
                                name={`skills.${index}`}
                                placeholder="Enter skill"
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  removeSkill(index);
                                }}
                                className="text-destructive hover:text-destructive/90"
                                disabled={skillFields.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        {generateQuizForm.formState.errors.skills?.root && (
                          <p className="text-sm text-destructive mt-2">
                            {
                              generateQuizForm.formState.errors.skills?.root
                                ?.message
                            }
                          </p>
                        )}
                      </CardFooter>
                    </Card>

                    <CardFooter className="flex justify-end pt-4 border-t">
                      <Button type="submit" disabled={isGeneratingQuiz}>
                        {isGeneratingQuiz ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            Generate My Quiz
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

export default NewQuizPage;
