import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Code2,
  Users,
  Play,
  Plus,
  ChevronRight,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function EditorShimmerUI({ showTestPanel = true }) {
  return (
    <div className="flex flex-col h-screen w-screen bg-[#1e1e1e] overflow-auto">
      {/* Top Menu Bar Skeleton */}
      <div className="flex items-center justify-between bg-[#333333] text-white px-3 py-1 text-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled>
              <ArrowLeft className="h-5 w-5 opacity-50" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 opacity-50" />
            <span className="font-medium opacity-50">Collaborative Editor</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-[#505050] text-white border-[#505050] opacity-50"
          >
            <Users className="h-3 w-3" />
            <Skeleton className="h-3 w-4 bg-gray-600" />
            <span className="text-xs">online</span>
          </Badge>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-[#333333]">
                <Skeleton className="h-full w-full rounded-full bg-gray-600" />
              </Avatar>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between bg-[#252526] text-white px-3 py-2 border-b border-[#3c3c3c] sticky top-7 z-10">
        <div className="flex items-center gap-3">
          {/* Language Selector Skeleton */}
          <Skeleton className="w-[150px] h-8 bg-[#3c3c3c]" />

          {/* Run Button Skeleton */}
          <div className="flex items-center h-8 px-3 bg-[#0e639c] opacity-50 rounded-md">
            <Play className="mr-2 h-4 w-4" />
            <span>Run Code</span>
          </div>

          {/* Toggle Buttons Skeleton */}
          <Skeleton className="h-8 w-32 bg-[#3c3c3c]" />
          <Skeleton className="h-8 w-36 bg-[#3c3c3c]" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex  overflow-hidden">
        {/* Main Editor Area Skeleton */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex flex-1">
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Monaco Editor Skeleton */}
              <div className="h-[100vh] bg-[#1e1e1e] p-4 relative overflow-hidden">
                {/* Line numbers area */}
                <div className="absolute left-0 top-0 w-12 h-full bg-[#1e1e1e] border-r border-[#3c3c3c] flex flex-col items-center pt-4 gap-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-6 bg-gray-700" />
                  ))}
                </div>

                {/* Code content area */}
                <div className="ml-16 pt-4 space-y-2">
                  {/* Simulate code lines with varying widths */}
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-64 bg-gray-700" />
                    <Skeleton className="h-4 w-48 bg-gray-700" />
                    <Skeleton className="h-4 w-80 bg-gray-700" />
                    <Skeleton className="h-4 w-32 bg-gray-700" />
                    <Skeleton className="h-4 w-72 bg-gray-700" />
                    <Skeleton className="h-4 w-56 bg-gray-700" />
                    <Skeleton className="h-4 w-40 bg-gray-700" />
                    <Skeleton className="h-4 w-88 bg-gray-700" />
                    <Skeleton className="h-4 w-24 bg-gray-700" />
                    <Skeleton className="h-4 w-64 bg-gray-700" />
                    <Skeleton className="h-4 w-96 bg-gray-700" />
                    <Skeleton className="h-4 w-44 bg-gray-700" />
                    <Skeleton className="h-4 w-68 bg-gray-700" />
                    <Skeleton className="h-4 w-52 bg-gray-700" />
                    <Skeleton className="h-4 w-76 bg-gray-700" />
                  </div>
                </div>

                {/* Minimap skeleton */}
                <div className="absolute right-0 top-0 w-20 h-full bg-[#252526] border-l border-[#3c3c3c] p-2">
                  <div className="space-y-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="h-1 w-full bg-gray-600"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Panel Skeleton */}
            {showTestPanel && (
              <div className="w-[400px] bg-[#252526] border-l border-[#3c3c3c]">
                {/* Test Panel Header */}
                <div className="flex justify-between items-center p-3 border-b border-[#3c3c3c]">
                  <Skeleton className="h-4 w-20 bg-gray-600" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-50"
                    disabled
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Test Panel Content */}
                <div className="p-3 space-y-4">
                  {/* Add Test Case Button */}
                  <div className="flex items-center justify-center w-full h-8 bg-[#0e639c] opacity-50 rounded-md">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="text-sm">Add Test Case</span>
                  </div>

                  {/* Test Cases Skeleton */}
                  {[1, 2, 3, 4].map((testCase) => (
                    <div
                      key={testCase}
                      className="border border-[#3c3c3c] rounded-md overflow-hidden"
                    >
                      {/* Test Case Header */}
                      <div className="flex justify-between items-center p-2 bg-[#2a2d2e]">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-white opacity-50" />
                          <Skeleton className="h-4 w-16 bg-gray-600" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-50"
                          disabled
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
