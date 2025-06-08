import { useState } from "react";
import { Check, Plus, Trash2, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TestPanel({ testCases, setTestCases }) {
  const [tabValue, setTabValue] = useState("case-1");

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
    setTabValue(`case-${testCases.length + 1}`);
  };

  const removeTestCase = (index) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
    if (testCases.length === index + 1) {
      setTabValue(`case-${testCases.length - 1}`);
    }
  };

  const onTestCaseValueChange = (value, field, index) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc))
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs
          defaultValue="case-1"
          value={tabValue}
          onValueChange={setTabValue}
          className="h-full flex flex-col"
        >
          {/* Tab List */}
          <div className="flex items-center px-3 py-2 border-b border-zinc-700 flex-shrink-0">
            <TabsList className="bg-transparent gap-1 h-8">
              {testCases.map((_, index) => (
                <TabsTrigger
                  key={index}
                  value={`case-${index + 1}`}
                  className={cn(
                    "rounded data-[state=active]:bg-zinc-600 data-[state=active]:text-white",
                    "data-[state=inactive]:bg-zinc-800 data-[state=inactive]:text-zinc-400",
                    "px-3 py-1 text-xs h-7"
                  )}
                >
                  Case {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              onClick={addTestCase}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {testCases.map(({ input, output }, index) => (
              <TabsContent
                key={index}
                value={`case-${index + 1}`}
                className="h-full p-3 m-0 data-[state=inactive]:hidden"
              >
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
                    disabled={testCases.length === 1}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
                <div className="h-full flex gap-3">
                  {/* Input Section */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <Label className="mb-1">Input</Label>
                    <Textarea
                      className="h-24"
                      value={input}
                      onChange={(e) =>
                        onTestCaseValueChange(e.target.value, "input", index)
                      }
                      placeholder="Enter input..."
                    />
                  </div>

                  {/* Output Section */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <Label className="mb-1">Expected Output</Label>
                    <Textarea
                      className="h-24"
                      value={output}
                      onChange={(e) =>
                        onTestCaseValueChange(e.target.value, "output", index)
                      }
                      placeholder="Enter expected output..."
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
