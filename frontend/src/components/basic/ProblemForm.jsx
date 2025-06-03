import { Controller, useFieldArray } from "react-hook-form";
import Editor from "@monaco-editor/react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Code2,
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
import { DIFFICULTIES_OPTIONS, LANGUAGES } from "@/constants/constants";
import FormFieldInput from "../basic/FormFieldInput";
import { Form } from "../ui/form";
import FormFieldTextarea from "../basic/FormFieldTextarea";
import FormFieldSelect from "../basic/FormFieldSelect";

export default function ProblemForm({
  form,
  onSubmit,
  isLoading,
  isUpdateMode,
  executionError,
}) {
  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control: form.control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany,
  } = useFieldArray({
    control: form.control,
    name: "companies",
  });

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <FormFieldInput
                    form={form}
                    name="title"
                    label="Title"
                    placeholder="Enter problem title"
                    className="text-base"
                  />
                </div>
                <div>
                  <FormFieldTextarea
                    form={form}
                    name="description"
                    label="Description"
                    placeholder="Enter problem constraints"
                    className="min-h-32 text-base resize-y"
                  />
                </div>
                <FormFieldSelect
                  form={form}
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
                          form={form}
                          name={`tags.${index}`}
                          placeholder="Enter tag"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
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

              {/* Companies */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Companies
                    </CardTitle>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => appendCompany("New Company")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Name
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companyFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <FormFieldInput
                          form={form}
                          name={`companies.${index}`}
                          placeholder="Enter company"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeCompany(index);
                          }}
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
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeTestCase(index);
                              }}
                              className="text-destructive hover:text-destructive/90 h-8"
                              disabled={testCaseFields.length === 1}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormFieldTextarea
                              form={form}
                              name={`testcases.${index}.input`}
                              placeholder="Enter test case input"
                              className="min-h-24 resize-y"
                            />

                            <FormFieldTextarea
                              form={form}
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
                        {/* Reference Solution */}
                        <div className="space-y-3">
                          <Label className="text-base font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Reference Solution
                          </Label>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`referenceSolutions.${language}`}
                              control={form.control}
                              render={({ field }) => (
                                <Editor
                                  height="500px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    lineNumbers: "on",
                                    wordWrap: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    scrollbar: {
                                      alwaysConsumeMouseWheel: false,
                                      handleMouseWheel: true,
                                    },
                                    padding: {
                                      top: 10,
                                    },
                                  }}
                                />
                              )}
                            />
                          </div>
                          {form.formState.errors?.referenceSolutions?.[
                            language
                          ] && (
                            <p className="text-sm text-destructive">
                              {
                                form.formState.errors.referenceSolutions[
                                  language
                                ].message
                              }
                            </p>
                          )}
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Standard Input/Output
                          </Label>
                          {/* Note for Java */}
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 text-sm rounded-md">
                            <p>
                              <span className="font-semibold">
                                Note for Java:
                              </span>{" "}
                              Import statements should be placed at the top of
                              the Reference Solution and Starter Code, and must
                              be removed from the{" "}
                              <code className="bg-gray-100 px-1 rounded text-sm">
                                stdin
                              </code>{" "}
                              section.
                            </p>
                          </div>
                          {/* Judge0 Output Note */}
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 p-4 rounded-xl shadow-md space-y-3 max-w-3xl mx-auto mt-6">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-lg">
                                ⚠️ Judge0 Output Tips
                              </h3>
                            </div>
                            <ul className="list-disc pl-6 text-sm">
                              <li>
                                <span className="font-semibold">
                                  No extra spaces:
                                </span>
                                <br />✅ Expected:{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                  [1,2]
                                </code>
                                <br />❌ Common mistake:{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                  [1, 2]
                                </code>{" "}
                                (space after comma)
                              </li>
                              <li>
                                <span className="font-semibold">
                                  Exact line breaks:
                                </span>{" "}
                                Use{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                  println
                                </code>{" "}
                                or{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                  \n
                                </code>
                                . Extra/missing newlines fail tests.
                              </li>
                              <li>
                                <span className="font-semibold">
                                  Matching data types:
                                </span>{" "}
                                Format output exactly as expected (e.g.,
                                strings, numbers, brackets).
                              </li>
                            </ul>
                            <div className="text-sm pt-2 border-t border-yellow-200">
                              ✅ <span className="font-medium">Tip:</span>{" "}
                              Always match output format exactly — even
                              invisible differences matter.
                            </div>
                          </div>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`stdin.${language}`}
                              control={form.control}
                              render={({ field }) => (
                                <Editor
                                  height="500px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    scrollbar: {
                                      alwaysConsumeMouseWheel: false,
                                      handleMouseWheel: true,
                                    },
                                    padding: {
                                      top: 10,
                                    },
                                  }}
                                />
                              )}
                            />
                          </div>
                          {form.formState.errors?.stdin?.[language] && (
                            <p className="text-sm text-destructive">
                              {form.formState.errors.stdin[language].message}
                            </p>
                          )}
                        </div>

                        {/* Starter Code */}
                        <div className="space-y-3">
                          <Label className="text-base font-medium">
                            Starter Code Template
                          </Label>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`codeSnippets.${language}`}
                              control={form.control}
                              render={({ field }) => (
                                <Editor
                                  height="500px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: "on",
                                    scrollbar: {
                                      alwaysConsumeMouseWheel: false,
                                      handleMouseWheel: true,
                                    },
                                    padding: {
                                      top: 10,
                                    },
                                  }}
                                />
                              )}
                            />
                          </div>
                          {form.formState.errors?.codeSnippets?.[language] && (
                            <p className="text-sm text-destructive">
                              {
                                form.formState.errors.codeSnippets[language]
                                  .message
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
                              form={form}
                              name={`examples.${language}.input`}
                              label="Input"
                              placeholder="Example input"
                              className="min-h-20 resize-y"
                            />
                            <FormFieldTextarea
                              form={form}
                              name={`examples.${language}.output`}
                              label="Output"
                              placeholder="Example output"
                              className="min-h-20 resize-y"
                            />
                            <FormFieldTextarea
                              form={form}
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
                    form={form}
                    name="constraints"
                    label="Constraints"
                    placeholder="Enter problem constraints"
                    className="min-h-24 resize-y"
                  />
                  <FormFieldTextarea
                    form={form}
                    name="hints"
                    label="Hints (Optional)"
                    placeholder="Enter hints for solving the problem"
                    className="min-h-24 resize-y"
                  />
                  <FormFieldTextarea
                    form={form}
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
                      {isUpdateMode ? "Updating..." : "Creating..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      {isUpdateMode ? "Update Problem" : "Create Problem"}
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
        {executionError && (
          <CardFooter className="flex justify-end pt-4 border-t">
            <div className="w-full rounded-md border border-destructive/30 overflow-hidden">
              <div className="bg-destructive/5 px-4 py-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="font-medium text-destructive">
                  {executionError.description || "Execution Error"}
                </span>
              </div>
              {executionError.stderr && (
                <div className="bg-slate-50 p-3 font-mono text-sm text-slate-800 space-y-2">
                  <div>
                    <strong>Your Output:</strong>{" "}
                    <pre className="whitespace-pre-wrap break-words">
                      {String(executionError.stderr?.stdout)}
                    </pre>
                  </div>
                  <div>
                    <strong>Expected Output:</strong>{" "}
                    <pre className="whitespace-pre-wrap break-words">
                      {String(executionError.expected_output)}
                    </pre>
                  </div>
                  <div>
                    <strong>Time:</strong> {executionError.stderr?.time}
                  </div>
                  <div>
                    <strong>Memory:</strong> {executionError.stderr?.memory} KB
                  </div>
                  <div>
                    <strong>Standard Error:</strong>
                    <pre className="whitespace-pre-wrap break-words">
                      {String(executionError.stderr?.stderr)}
                    </pre>
                  </div>
                  <div>
                    <strong>Compile Output:</strong>
                    <pre className="whitespace-pre-wrap break-words">
                      {String(executionError.stderr?.compile_output)}
                    </pre>
                  </div>
                  <div>
                    <strong>Error Message:</strong>{" "}
                    {String(executionError.stderr?.message)}
                  </div>
                  {executionError.stderr?.status && (
                    <div>
                      <strong>status:</strong>
                      <div className="ml-2">
                        <div>
                          <strong>id:</strong> {executionError.stderr.status.id}
                        </div>
                        <div>
                          <strong>description:</strong>{" "}
                          {executionError.stderr.status.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
