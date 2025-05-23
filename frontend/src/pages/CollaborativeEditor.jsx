import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Code2, Users, Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TestPanel from "@/components/components/collaborativeEditor/TestPanel";
import { COLLABORATIVE_EDITOR_LANGUAGES } from "@/constants/constants";
import toast from "react-hot-toast";
import { getLanguageId } from "@/lib/getLanguageInfo";
import { useExecutionStore } from "@/store/useExecution";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import SubmissionsView from "@/components/components/submissions/SubmissionsView";
import { useAuthStore } from "@/store/useAuthStore";
import { getRandomColor } from "@/lib/getRandomColor";
import { Cursors } from "@/components/components/collaborativeEditor/Cursors";

export function CollaborativeEditor() {
  const [editorRef, setEditorRef] = useState();
  const [language, setLanguage] = useState("JAVASCRIPT");
  const [activeUsers, setActiveUsers] = useState([]);
  const [testCases, setTestCases] = useState([
    {
      id: Date.now(),
      input: "5",
      expectedOutput: "25",
    },
  ]);
  const [showTestPanel, setShowTestPanel] = useState(true);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const room = useRoom();
  const yProvider = getYjsProviderForRoom(room);

  const { isExecuting, runCodeCollabEditor, submission } = useExecutionStore();
  const { authUser } = useAuthStore();

  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    let binding;
    let awareness;

    if (!editorRef) return;

    const yDoc = yProvider.getYDoc();
    const yText = yDoc.getText("monaco");
    awareness = yProvider.awareness;

    // Attach Yjs to Monaco
    binding = new MonacoBinding(
      yText,
      editorRef.getModel(),
      new Set([editorRef]),
      awareness
    );

    // Set user information in awareness
    awareness.setLocalStateField("user", {
      name: authUser?.name,
      color: getRandomColor(),
      image: authUser?.image,
    });

    // Track active users
    const updateActiveUsers = () => {
      const states = Array.from(awareness.getStates().entries())
        .filter(([_, state]) => state.user)
        .map(([clientId, state]) => ({
          clientId,
          name: state.user.name,
          color: state.user.color,
          image: state.user.image,
        }));

      setActiveUsers(states);
    };

    awareness.on("change", updateActiveUsers);

    setTimeout(() => {
      updateActiveUsers();
    }, 3000);

    return () => {
      binding?.destroy();
      if (awareness) {
        awareness.off("change", updateActiveUsers);
      }
    };
  }, [editorRef, room, yProvider]);

  const handleOnMount = useCallback((e) => {
    setEditorRef(e);
  }, []);

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleRunCode = () => {
    if (!editorRef) return;

    if (!testCases.length) {
      toast.error("No test cases found");
      return;
    }

    const code = editorRef.getValue();

    const language_id = getLanguageId(language);
    const stdin = testCases.map((tc) => tc.input);
    const expected_outputs = testCases.map((tc) => tc.expectedOutput);

    runCodeCollabEditor(code, language_id, stdin, expected_outputs);
  };

  return (
    <div>
      <div className="flex flex-col h-screen w-screen bg-[#1e1e1e] overflow-auto">
        {/* Top Menu Bar - similar to VSCode */}
        <div className="flex items-center justify-between bg-[#333333] text-white px-3 py-1 text-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span className="font-medium">Collaborative Editor</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-[#505050] text-white border-[#505050]"
            >
              <Users className="h-3 w-3" />
              {activeUsers.length} online
            </Badge>
            <div className="flex -space-x-2">
              {activeUsers.slice(0, 3).map((user) => (
                <Avatar
                  key={user.clientId}
                  className="h-6 w-6 border-2 border-[#333333]"
                  style={{ borderColor: user.color }}
                >
                  <AvatarImage src={user.image?.url} alt="@user" />
                  <AvatarFallback
                    className="text-white"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {activeUsers.length > 3 && (
                <Avatar className="h-6 w-6 border-2 border-[#333333]">
                  <AvatarFallback className="bg-amber-300">
                    +{activeUsers.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between bg-[#252526] text-white px-3 py-2 border-b border-[#3c3c3c] sticky top-7 z-10">
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[150px] h-8 text-white">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="bg-[#252526] border-[#3c3c3c] text-white">
                {COLLABORATIVE_EDITOR_LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.value}
                    value={lang.value}
                    className="hover:bg-[#04395e] focus:bg-[#04395e]"
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="h-8 bg-[#0e639c] hover:bg-[#1177bb] text-white border-none"
            >
              {isExecuting ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Running...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  <span>Run Code</span>
                </div>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-gray-400 hover:text-white hover:bg-[#3c3c3c]"
              onClick={() => setShowTestPanel(!showTestPanel)}
            >
              {showTestPanel ? "Hide Test Cases" : "Show Test Cases"}
            </Button>
            {submission && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-gray-400 hover:text-white hover:bg-[#3c3c3c]"
                onClick={() => setShowSubmissions(!showSubmissions)}
              >
                {showSubmissions ? "Hide Submissions" : "Show Submissions"}
              </Button>
            )}
          </div>
        </div>

        {activeUsers ? (
          <Cursors yProvider={yProvider} activeUsers={activeUsers} />
        ) : null}

        {/* Main Content Area */}
        <div className="flex min-h-[60vh] overflow-hidden">
          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className={"flex flex-1"}>
              <div className="flex-1 flex flex-col overflow-hidden">
                <Editor
                  onMount={handleOnMount}
                  height="60vh"
                  width="100%"
                  theme="vs-dark"
                  language={language.toLowerCase()}
                  defaultValue="// Start coding here..."
                  options={{
                    tabSize: 2,
                    fontSize: 17,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    lineNumbers: "on",
                    glyphMargin: true,
                    folding: true,
                    renderLineHighlight: "all",
                    wordWrap: "on",
                    scrollbar: {
                      alwaysConsumeMouseWheel: false,
                      handleMouseWheel: true,
                    },
                  }}
                />
              </div>

              {showTestPanel && (
                <TestPanel
                  testCases={testCases}
                  setTestCases={setTestCases}
                  setShowTestPanel={setShowTestPanel}
                />
              )}
            </div>
          </div>
        </div>

        {/* Submissions section - Now with proper styling and visibility */}
      </div>
      <div className="m-5">
        {showSubmissions && <SubmissionsView submission={submission} />}
      </div>
    </div>
  );
}
