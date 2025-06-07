import { BookmarkIcon, FlagIcon, HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { useLikeStore } from "@/store/useLikeStore";
import { Button } from "@/components/ui/button";
import { useSaveStore } from "@/store/useSaveStore";
import { useMarkForRevisionStore } from "@/store/useMarkForRevisionStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Reactions({ problem }) {
  const [isLiked, setIsLiked] = useState(problem.isLiked);
  const [likesCount, setLikesCount] = useState(problem.likesCount);
  const [isSaved, setIsSaved] = useState(problem.isSaved);
  const [isMarked, setIsMarked] = useState(problem.isMarked);
  const { isLiking, toggleLike, toggleLikedProblemFromState } = useLikeStore();
  const { isSaving, toggleSave, toggleSavedProblemFromState } = useSaveStore();
  const { isMarking, toggleMark, toggleMarkedProblemFromState } =
    useMarkForRevisionStore();
  const { authUser } = useAuthStore();

  const handleLike = async () => {
    await toggleLike(problem.id);
    toggleLikedProblemFromState(problem.id, problem);
    setIsLiked(!isLiked);
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleSave = async () => {
    await toggleSave(problem.id);
    toggleSavedProblemFromState(problem.id, problem);
    setIsSaved(!isSaved);
  };

  const handleMark = async () => {
    await toggleMark(problem.id);
    toggleMarkedProblemFromState(problem.id, problem);
    setIsMarked(!isMarked);
  };

  return (
    <div className="w-full py-3 px-4 md:px-6 border-t flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors cursor-pointer"
          aria-label="Like this problem"
          onClick={handleLike}
          disabled={isLiking}
        >
          {isLiked ? (
            <HeartIcon className="h-5 w-5 text-red-500" fill="red" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
          <span>{likesCount}</span>
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">
                <Button
                  variant="outline"
                  className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                  aria-label="Save this problem"
                  onClick={handleSave}
                  disabled={isSaving || !authUser.isSubscribed}
                >
                  {isSaved ? (
                    <>
                      <BookmarkIcon
                        className="h-5 w-5 text-primary"
                        fill="primary"
                      />
                      <span className="text-primary">Saved</span>
                    </>
                  ) : (
                    <>
                      <BookmarkIcon className="h-5 w-5" />
                      <span>Save</span>
                    </>
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {!authUser?.isSubscribed && (
              <TooltipContent>
                <p className="text-amber-600">Upgrade to pro plan</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer">
              <Button
                variant="outline"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                aria-label="Mark for revision"
                onClick={handleMark}
                disabled={isMarking || !authUser.isSubscribed}
              >
                {isMarked ? (
                  <>
                    <FlagIcon className="h-5 w-5 text-primary" fill="primary" />
                    <span className="text-primary">Marked Problem</span>
                  </>
                ) : (
                  <>
                    <FlagIcon className="h-5 w-5" />
                    <span>Mark for Revision</span>
                  </>
                )}
              </Button>
            </div>
          </TooltipTrigger>
          {!authUser?.isSubscribed && (
            <TooltipContent>
              <p className="text-amber-600">Upgrade to pro plan</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Reactions;
