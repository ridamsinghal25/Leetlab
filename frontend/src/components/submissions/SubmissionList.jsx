import {
  Clock,
  CheckCircle2,
  XCircle,
  MemoryStickIcon as Memory,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SubmissionsList = ({ submissions, isLoading }) => {
  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData)?.map((m) =>
      Number.parseFloat(m.split(" ")[0])
    );

    if (memoryArray?.length === 0) return 0;

    return (
      memoryArray?.reduce((acc, curr) => acc + curr, 0) / memoryArray?.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      Number.parseFloat(t.split(" ")[0])
    );

    if (timeArray.length === 0) return 0;

    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-muted-foreground">No submissions yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions?.map((submission, index) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <div
            key={submission.id}
            className="border rounded-lg hover:shadow-md transition-shadow"
          >
            {/* Added Submission Number Indicator */}
            <div className="px-4 py-2 rounded-t-lg border-b flex items-center">
              <span className="font-medium">Submission {index + 1}</span>
            </div>

            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left Section: Status and Language */}
                <div className="flex flex-wrap items-center gap-4">
                  {submission.status === "Accepted" ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-semibold">Accepted</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-6 h-6" />
                      <span className="font-semibold">{submission.status}</span>
                    </div>
                  )}
                  <Badge variant="outline">{submission.language}</Badge>
                </div>

                {/* Right Section: Runtime, Memory, and Date */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="w-4 h-4" />
                    <span>{avgMemory ? avgMemory.toFixed(0) : "0"} KB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;
