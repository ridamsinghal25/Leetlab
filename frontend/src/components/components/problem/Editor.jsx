import Editor from "@monaco-editor/react";
import { Play, Terminal, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TestPanel from "./TestPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function CodeEditor({
  code,
  setCode,
  selectedLanguage,
  handleLanguageChange,
  problem,
  isExecuting,
  handleRunCode,
  handleSubmitCode,
  isCounting,
  count,
  testCases,
  setTestCases,
}) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <div className="flex justify-between px-4 py-[8.5px] border-b">
        <div className="flex items-center">
          <Terminal className="w-4 h-4 mr-2" />
          <h2 className="font-medium">Code Editor</h2>
        </div>
        <div>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[120px] md:w-[140px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(problem.codeSnippets || {}).map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Editor and Test Panel */}
      <ResizablePanelGroup direction="vertical">
        <div className="h-screen flex flex-col px-1">
          <ResizablePanel defaultSize={60} className="rounded">
            {/* Code Editor */}

            {/* <div className="pt-1"> */}
            <Editor
              className="mt-1 rounded border"
              height="100%"
              language={selectedLanguage.toLowerCase()}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              defaultLanguage="javascript"
              defaultValue={code}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                mouseWheelScrollSensitivity: 1,
                wordWrap: "on",
                scrollbar: {
                  alwaysConsumeMouseWheel: false,
                  handleMouseWheel: true,
                },
                padding: {
                  top: 10,
                  right: 20,
                },
              }}
            />
            {/* </div> */}
          </ResizablePanel>
          <div className="h-1 bg-black transition-colors"></div>
          <ResizableHandle withHandle />

          <ResizablePanel
            defaultSize={50}
            maxSize={50}
            minSize={7}
            className="rounded pb-1"
          >
            {/* Test Panel */}
            <div className="h-full bg-[#252526] border border-[#3e3e3e] flex flex-col rounded mb-2">
              {/* Test Panel Header */}
              <div className="bg-[#2d2d2d] border-b border-[#3e3e3e] px-3 py-2 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-white">
                    Testcases
                  </span>
                </div>
              </div>

              {/* Test Panel Content */}
              <div className="flex-1 overflow-hidden">
                <TestPanel testCases={testCases} setTestCases={setTestCases} />
              </div>
            </div>
          </ResizablePanel>
        </div>
      </ResizablePanelGroup>

      <div className="p-3 border-t bg-muted/50">
        <div className="flex justify-between items-center w-full">
          <div>
            <Button
              variant="default"
              className="gap-2 w-full sm:w-auto relative min-w-[100px] min-h-[36px]"
              onClick={handleRunCode}
              disabled={isCounting || isExecuting}
            >
              {isCounting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>{count}</span>
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {isExecuting ? (
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>Run Code</span>
                </div>
              )}
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              className="gap-2 w-full sm:w-auto"
              onClick={handleSubmitCode}
              disabled={isExecuting}
            >
              {isExecuting ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              Submit Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
