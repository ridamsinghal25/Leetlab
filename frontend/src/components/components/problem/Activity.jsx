import { BookmarkIcon, FlagIcon, HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { useLikeStore } from "@/store/useLikeStore";
import { Button } from "@/components/ui/button";
import { useSaveStore } from "@/store/useSaveStore";
import { useMarkForRevisionStore } from "@/store/useMarkForRevisionStore";

function Activity({ problem }) {
  const [isLiked, setIsLiked] = useState(problem.isLiked);
  const [likesCount, setLikesCount] = useState(problem.likesCount);
  const [isSaved, setIsSaved] = useState(problem.isSaved);
  const [isMarked, setIsMarked] = useState(problem.isMarked);
  const { isLiking, toggleLike } = useLikeStore();
  const { isSaving, toggleSave } = useSaveStore();
  const { isMarking, toggleMark } = useMarkForRevisionStore();

  const handleLike = async () => {
    await toggleLike(problem.id);
    setIsLiked(!isLiked);
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleSave = async () => {
    await toggleSave(problem.id);
    setIsSaved(!isSaved);
  };

  const handleMark = async () => {
    await toggleMark(problem.id);
    setIsMarked(!isMarked);
  };

  return (
    <div className="w-full py-3 px-4 md:px-6 border-t flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
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
        <Button
          variant="outline"
          className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
          aria-label="Save this problem"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaved ? (
            <>
              <BookmarkIcon className="h-5 w-5 text-primary" fill="primary" />
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

      <Button
        variant="outline"
        className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
        aria-label="Mark for revision"
        onClick={handleMark}
        disabled={isMarking}
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
  );
}

export default Activity;
