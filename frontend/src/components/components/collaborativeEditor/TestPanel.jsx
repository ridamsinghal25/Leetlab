import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, Trash2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";

function TestPanel({ testCases, setTestCases, setShowTestPanel }) {
  const addTestCase = () => {
    setTestCases([
      ...testCases,
      {
        id: Date.now(),
        input: "",
        expectedOutput: "",
      },
    ]);
  };

  const updateTestCase = (id, field, value) => {
    setTestCases(
      testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
    );
  };

  const removeTestCase = (id) => {
    setTestCases(testCases.filter((tc) => tc.id !== id));
  };

  return (
    <div className="bg-[#1e1e1e] h-screen flex">
      {/* Test Panel */}
      <div className="bg-[#252526] border-l border-[#3c3c3c] flex flex-col rounded-l-md">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-[#3c3c3c] flex-shrink-0">
          <h3 className="text-sm font-medium text-white">Test Cases</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#3c3c3c]"
            onClick={() => setShowTestPanel(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Note Panel */}
        <div className="mx-3 my-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 text-xs rounded-md flex-shrink-0">
          <div className="flex gap-2 items-start">
            <span>💡</span>
            <span>
              Please make sure to add test cases in the code editor & also make
              sure to add the Standard Input/Output in the code.
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-4">
              <Button
                onClick={addTestCase}
                size="sm"
                className="w-full bg-[#0e639c] hover:bg-[#1177bb]"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Test Case
              </Button>

              {testCases.map((testCase, index) => (
                <Collapsible
                  key={testCase.id}
                  className="border border-[#3c3c3c] rounded-md overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex justify-between items-center w-full p-2 hover:bg-[#2a2d2e] cursor-pointer">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-white transition-transform data-[state=open]:rotate-90" />
                        <span className="text-sm text-white">
                          Test Case {index + 1}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTestCase(testCase.id);
                        }}
                        className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#3c3c3c]"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-3 space-y-3 bg-[#252526]">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Input
                        </label>
                        <Textarea
                          value={testCase.input}
                          onChange={(e) =>
                            updateTestCase(testCase.id, "input", e.target.value)
                          }
                          placeholder="Enter test input..."
                          className="bg-[#1e1e1e] border-[#3c3c3c] text-white h-20 text-sm resize-none focus:border-[#0e639c]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Expected Output
                        </label>
                        <Textarea
                          value={testCase.expectedOutput}
                          onChange={(e) =>
                            updateTestCase(
                              testCase.id,
                              "expectedOutput",
                              e.target.value
                            )
                          }
                          placeholder="Enter expected output..."
                          className="bg-[#1e1e1e] border-[#3c3c3c] text-white h-20 text-sm resize-none focus:border-[#0e639c]"
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default TestPanel;
