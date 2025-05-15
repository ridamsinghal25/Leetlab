import {
  Clock,
  CheckCircle2,
  XCircle,
  MemoryStickIcon as Memory,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SubmissionResults = ({ submission, submissionIndex = 0 }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission?.memory || "[]");
  const timeArr = JSON.parse(submission?.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr
      ?.map((m) => Number.parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      ?.map((t) => Number.parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testcases.filter((tc) => tc.passed).length;

  const totalTests = submission.testcases.length;

  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className="mt-5">
        <CardHeader className="-mb-6">
          <CardTitle>Submission #{submissionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <p className="text-sm text-muted-foreground">Status</p>
                <div
                  className={`text-lg font-bold ${
                    submission.status === "Accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submission.status}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <div className="text-lg font-bold">
                  {successRate.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Avg. Runtime
                </p>
                <div className="text-lg font-bold">{avgTime.toFixed(3)} s</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Memory className="w-4 h-4" />
                  Avg. Memory
                </p>
                <div className="text-lg font-bold">
                  {avgMemory ? avgMemory.toFixed(0) : 0} KB
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Test Cases Results */}
          <Card className="mt-5">
            <CardHeader>
              <CardTitle>Test Cases Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Expected Output</TableHead>
                    <TableHead>Your Output</TableHead>
                    <TableHead>Memory</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submission.testcases.map((testCase) => (
                    <TableRow key={testCase.id || testCase.testCase}>
                      <TableCell>
                        {testCase.passed ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            Passed
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-5 h-5" />
                            Failed
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-mono">
                        {testCase.expected}
                      </TableCell>
                      <TableCell className="font-mono">
                        {testCase.stdout || "-"}
                      </TableCell>
                      <TableCell>
                        {testCase.memory ? testCase.memory : "-"}
                      </TableCell>
                      <TableCell>{testCase.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionResults;
