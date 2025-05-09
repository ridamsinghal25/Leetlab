import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  Lightbulb,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { axiosInstance } from "@/lib/axios";
import { DIFFICULTIES_OPTIONS, LANGUAGES } from "@/constants/constants";
import FormFieldInput from "../basic/FormFieldInput";
import { Form } from "../ui/form";
import FormFieldTextarea from "../basic/FormFieldTextarea";
import FormFieldSelect from "../basic/FormFieldSelect";
import { problemSchema } from "@/validations/zodValidations";
import { ROUTES } from "@/constants/routes";

export default function UpdateProblemForm({ problem }) {
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

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control: updateProblemForm.control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: updateProblemForm.control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="w-screen lg:w-4xl mx-auto py-8 px-4">
      <Card className="border shadow-lg ">
        <CardHeader className="border-b">
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

        <CardContent className="pt-6">
          <Form {...updateProblemForm}>
            <form
              onSubmit={updateProblemForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <FormFieldInput
                    form={updateProblemForm}
                    name="title"
                    label="Title"
                    placeholder="Enter problem title"
                    className="text-base"
                  />
                </div>
                <div>
                  <FormFieldTextarea
                    form={updateProblemForm}
                    name="description"
                    label="Description"
                    placeholder="Enter problem constraints"
                    className="min-h-32 text-base resize-y"
                  />
                </div>
                <FormFieldSelect
                  form={updateProblemForm}
                  name="difficulty"
                  label="Difficulty"
                  optionValues={DIFFICULTIES_OPTIONS}
                />
              </div>

              {/* Tags */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Tags
                    </CardTitle>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => appendTag("New Tag")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Tag
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tagFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <FormFieldInput
                          form={updateProblemForm}
                          name={`tags.${index}`}
                          placeholder="Enter tag"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            console.log("Index inside tags::", index);
                            removeTag(index);
                          }}
                          disabled={tagFields.length === 1}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Test Cases */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Test Cases
                    </CardTitle>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => appendTestCase({ input: "", output: "" })}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Test Case
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="space-y-4">
                    {testCaseFields.map((field, index) => (
                      <AccordionItem
                        key={field.id}
                        value={`test-case-${index}`}
                        className="border rounded-lg shadow-sm"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex justify-between items-center w-full">
                            <span className="font-medium">
                              Test Case #{index + 1}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="flex justify-end">
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTestCase(index);
                                }}
                                className="text-destructive hover:text-destructive/90 h-8"
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormFieldTextarea
                              form={updateProblemForm}
                              name={`testcases.${index}.input`}
                              placeholder="Enter test case input"
                              className="min-h-24 resize-y"
                            />

                            <FormFieldTextarea
                              form={updateProblemForm}
                              name={`testcases.${index}.output`}
                              placeholder="Enter expected output"
                              className="min-h-24 resize-y"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Code Editor Sections */}
              <Tabs defaultValue="JAVASCRIPT" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="JAVASCRIPT">JavaScript</TabsTrigger>
                  <TabsTrigger value="PYTHON">Python</TabsTrigger>
                  <TabsTrigger value="JAVA">Java</TabsTrigger>
                </TabsList>

                {Object.keys(LANGUAGES).map((language) => (
                  <TabsContent key={language} value={language} className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Code2 className="h-5 w-5" />
                          {language === "JAVASCRIPT"
                            ? "JavaScript"
                            : language === "PYTHON"
                            ? "Python"
                            : "Java"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Starter Code */}
                        <div className="space-y-3">
                          <Label className="text-base font-medium">
                            Starter Code Template
                          </Label>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`codeSnippets.${language}`}
                              control={updateProblemForm.control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: {
                                      top: 10,
                                    },
                                  }}
                                />
                              )}
                            />
                          </div>
                          {updateProblemForm.formState.errors?.codeSnippets?.[
                            language
                          ] && (
                            <p className="text-sm text-destructive">
                              {
                                updateProblemForm.formState.errors.codeSnippets[
                                  language
                                ].message
                              }
                            </p>
                          )}
                        </div>

                        {/* Reference Solution */}
                        <div className="space-y-3">
                          <Label className="text-base font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Reference Solution
                          </Label>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`referenceSolutions.${language}`}
                              control={updateProblemForm.control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: {
                                      top: 10,
                                    },
                                  }}
                                />
                              )}
                            />
                          </div>
                          {updateProblemForm.formState.errors
                            ?.referenceSolutions?.[language] && (
                            <p className="text-sm text-destructive">
                              {
                                updateProblemForm.formState.errors
                                  .referenceSolutions[language].message
                              }
                            </p>
                          )}
                        </div>

                        {/* Examples */}
                        <div className="space-y-3">
                          <Label className="text-base font-medium">
                            Example
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormFieldTextarea
                              form={updateProblemForm}
                              name={`examples.${language}.input`}
                              label="Input"
                              placeholder="Example input"
                              className="min-h-20 resize-y"
                            />
                            <FormFieldTextarea
                              form={updateProblemForm}
                              name={`examples.${language}.output`}
                              label="Output"
                              placeholder="Example output"
                              className="min-h-20 resize-y"
                            />
                            <FormFieldTextarea
                              form={updateProblemForm}
                              name={`examples.${language}.explanation`}
                              label="Explanation"
                              placeholder="Explain the example"
                              className="min-h-24 resize-y"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormFieldTextarea
                    form={updateProblemForm}
                    name="constraints"
                    label="Constraints"
                    placeholder="Enter problem constraints"
                    className="min-h-24 resize-y"
                  />
                  <FormFieldTextarea
                    form={updateProblemForm}
                    name="hints"
                    label="Hints (Optional)"
                    placeholder="Enter hints for solving the problem"
                    className="min-h-24 resize-y"
                  />
                  <FormFieldTextarea
                    form={updateProblemForm}
                    name="editorial"
                    label="Editorial (Optional)"
                    placeholder="Enter hints for solving the problem"
                    className="min-h-24 resize-y"
                  />
                </CardContent>
              </Card>

              <CardFooter className="flex justify-end pt-4 border-t">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Create Problem
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
