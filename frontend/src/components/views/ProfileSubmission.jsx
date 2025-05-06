import { useState, useEffect } from "react";
import {
  Clock,
  Code,
  Terminal,
  HardDrive,
  Check,
  X,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSubmissionStore } from "@/store/useSubmissionStore";

function ProfileSubmission() {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <Check size={14} />
            {status}
          </Badge>
        );
      case "Wrong Answer":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <X size={14} />
            {status}
          </Badge>
        );
      case "Time Limit Exceeded":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock size={14} />
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const toggleExpand = (id) => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(id);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true;
    return submission.status === filter;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">My Submissions</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                {filter === "all" ? "All Submissions" : filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Submissions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("Accepted")}>
                Accepted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("Wrong Answer")}>
                Wrong Answer
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter("Time Limit Exceeded")}
              >
                Time Limit Exceeded
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-2">
            <Card className="w-24">
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="text-xl font-bold">{submissions.length}</div>
              </CardContent>
            </Card>
            <Card className="w-24">
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Accepted</div>
                <div className="text-xl font-bold text-green-600">
                  {submissions.filter((s) => s.status === "Accepted").length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-medium">No submissions found</h2>
            <p className="text-muted-foreground mt-2">
              You haven't submitted any solutions yet, or none match your
              current filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {filteredSubmissions.map((submission) => (
              <AccordionItem key={submission.id} value={submission.id}>
                <Card>
                  <CardContent className="p-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          {getStatusBadge(submission.status)}

                          <div className="flex items-center gap-2">
                            <Code size={16} />
                            <span className="font-medium">
                              {submission.language}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>
                              Submitted {formatDate(submission.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      {/* Code Section */}
                      <div className="px-6 py-4 border-t border-border">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <Code size={18} />
                          Solution Code
                        </h3>
                        <div className="relative rounded-md bg-muted p-4 overflow-x-auto">
                          <pre className="text-sm">
                            <code>{submission.sourceCode}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Input/Output Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 border-t border-border">
                        <div>
                          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Terminal size={18} />
                            Input
                          </h3>
                          <div className="relative rounded-md bg-muted p-4">
                            <pre className="text-sm">
                              <code>
                                {submission.stdin || "No input provided"}
                              </code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Terminal size={18} />
                            Output
                          </h3>
                          <div className="relative rounded-md bg-muted p-4">
                            <pre className="text-sm">
                              <code>
                                {Array.isArray(JSON.parse(submission.stdout))
                                  ? JSON.parse(submission.stdout).join("")
                                  : submission.stdout || "No output"}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Performance Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-4 border-t border-border">
                        <Card>
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Clock size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Execution Time
                              </p>
                              <p className="text-lg font-medium">
                                {Array.isArray(JSON.parse(submission.time))
                                  ? JSON.parse(submission.time)[0]
                                  : submission.time || "N/A"}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <HardDrive size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Memory Used
                              </p>
                              <p className="text-lg font-medium">
                                {Array.isArray(JSON.parse(submission.memory))
                                  ? JSON.parse(submission.memory)[0]
                                  : submission.memory || "N/A"}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </AccordionContent>
                  </CardContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default ProfileSubmission;
