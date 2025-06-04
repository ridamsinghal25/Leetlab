import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookmarkIcon,
  ThumbsUpIcon,
  EyeIcon,
  ArrowLeft,
  SquareActivity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useLikeStore } from "@/store/useLikeStore";
import { useSaveStore } from "@/store/useSaveStore";
import { useMarkForRevisionStore } from "@/store/useMarkForRevisionStore";
import { useEffect } from "react";
import { ProblemCard } from "@/components/activity/ProblemCard";
import { useAuthStore } from "@/store/useAuthStore";

export default function ActivityPage() {
  const { likedProblems, getLikes, isFetchingLikes } = useLikeStore();
  const { savedProblems, getSavedProblems, isFetchingSavedProblems } =
    useSaveStore();
  const { markedProblems, getMarkedProblems, isFetchingMarkedProblems } =
    useMarkForRevisionStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) return;

    if (
      likedProblems.length > 0 ||
      savedProblems.length > 0 ||
      markedProblems.length > 0
    )
      return;
    getLikes();
    getSavedProblems();
    getMarkedProblems();
  }, [getLikes, getSavedProblems, getMarkedProblems]);

  return (
    <div className="container py-8 max-w-7xl px-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={ROUTES.HOME}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <SquareActivity className="h-6 w-6 text-primary" />
          <h1 className="text-2xl">My Activities</h1>
        </div>
      </div>

      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <BookmarkIcon className="h-4 w-4" />
            <span>Saved Problems</span>
            <Badge variant="secondary" className="ml-1">
              {savedProblems.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="liked" className="flex items-center gap-2">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>Liked Problems</span>
            <Badge variant="secondary" className="ml-1">
              {likedProblems.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="markedForReview"
            className="flex items-center gap-2"
          >
            <EyeIcon className="h-4 w-4" />
            <span>Marked For Review</span>
            <Badge variant="secondary" className="ml-1">
              {markedProblems.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-0">
          <ProblemCard
            problems={savedProblems}
            isFetching={isFetchingSavedProblems}
          />
        </TabsContent>

        <TabsContent value="liked" className="mt-0">
          <ProblemCard problems={likedProblems} isFetching={isFetchingLikes} />
        </TabsContent>

        <TabsContent value="markedForReview" className="mt-0">
          <ProblemCard
            problems={markedProblems}
            isFetching={isFetchingMarkedProblems}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
