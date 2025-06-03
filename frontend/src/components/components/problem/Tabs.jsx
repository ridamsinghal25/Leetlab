import {
  FileText,
  MessageSquare,
  Lightbulb,
  Code2,
  CircleCheckBig,
  FileInput,
  TableOfContents,
} from "lucide-react";
import { ProblemTabsContent } from "@/components/components/problem/TabsContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROBLEM_PAGE_TABS } from "@/constants/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import Reactions from "./Reactions";

function ProblemTabs({
  activeTab,
  setActiveTab,
  problem,
  submissionsOfProblem,
  isSubmissionsLoading,
  selectedLanguage,
}) {
  return (
    <div className="w-full border-b lg:border-b-0 lg:border-r">
      <Tabs
        defaultValue={PROBLEM_PAGE_TABS.DESCRIPTION}
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-full flex flex-col"
      >
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 overflow-x-auto h-[54px]">
          <TabsTrigger
            value={PROBLEM_PAGE_TABS.DESCRIPTION}
            className="data-[state=active]:border-primary data-[state=active]:rounded"
          >
            <TableOfContents className="w-4 h-4 text-blue-400" />
            <span className="whitespace-nowrap">Description</span>
          </TabsTrigger>
          <TabsTrigger
            value={PROBLEM_PAGE_TABS.SUBMISSIONS}
            className="data-[state=active]:border-primary data-[state=active]:rounded"
          >
            <FileInput className="w-4 h-4 text-green-400" />
            <span className="whitespace-nowrap">Submissions</span>
          </TabsTrigger>
          <TabsTrigger
            value={PROBLEM_PAGE_TABS.SOLUTION}
            className="data-[state=active]:border-primary data-[state=active]:rounded"
          >
            <Lightbulb className="w-5 h-5 text-amber-200" fill="currentColor" />
            <span className="whitespace-nowrap">Solutions</span>
          </TabsTrigger>
          <TabsTrigger
            value={PROBLEM_PAGE_TABS.EDITORIAL}
            className="data-[state=active]:border-primary data-[state=active]:rounded"
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="whitespace-nowrap">Editorial</span>
          </TabsTrigger>
          <TabsTrigger
            value={PROBLEM_PAGE_TABS.HINTS}
            className="data-[state=active]:border-primary data-[state=active]:rounded"
          >
            <Lightbulb className="w-4 h-4 text-green-400" fill="currentColor" />
            <span className="whitespace-nowrap">Hints</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value={activeTab}
          className="flex-1 overflow-hidden w-full"
        >
          <ScrollArea className="h-screen px-4 md:px-6 py-4 w-full">
            <div className="w-full">
              <ProblemTabsContent
                activeTab={activeTab}
                problem={problem}
                submissionsOfProblem={submissionsOfProblem}
                isSubmissionsLoading={isSubmissionsLoading}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </ScrollArea>
        </TabsContent>
        {/* <div className="flex-shrink-0"> */}
        <Reactions problem={problem} />
        {/* </div> */}
      </Tabs>
    </div>
  );
}

export default ProblemTabs;
