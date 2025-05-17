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
  const [testPanelWidth, setTestPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

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

  const startResizing = (e) => {
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 200 && newWidth < window.innerWidth / 2) {
          setTestPanelWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove]);

  return (
    <div className="bg-[#252526] h-screen">
      <div
        className="w-1 bg-[#3c3c3c] hover:bg-[#505050] cursor-col-resize"
        onMouseDown={startResizing}
      ></div>
      <div
        className="border-l border-[#3c3c3c] overflow-hidden"
        style={{ width: `${testPanelWidth}px` }}
      >
        <div className="flex justify-between items-center p-3 border-b border-[#3c3c3c]">
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
        <ScrollArea className="h-[calc(100%-40px)]">
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
                <CollapsibleTrigger
                  className="flex justify-between items-center w-full p-2 hover:bg-[#2a2d2e] text-left"
                  asChild
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-white transition-transform ui-open:rotate-90" />
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
                  <div className="p-3 space-y-3 bg-[#1e1e1e]">
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
                        className="bg-[#252526] border-[#3c3c3c] text-white h-20 text-sm resize-none"
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
                        className="bg-[#252526] border-[#3c3c3c] text-white h-20 text-sm resize-none"
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
  );
}

export default TestPanel;
