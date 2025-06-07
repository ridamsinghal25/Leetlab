import ProblemTableMobileView from "./MobileView";
import ProblemTableDesktopView from "./DesktopView";

export const ProblemsTable = ({
  paginatedProblems,
  authUser,
  handleDelete,
  handleAddToPlaylist,
  isDeletingProblem,
}) => {
  return (
    <div>
      {/* Mobile Card View (visible on small screens) */}
      <ProblemTableMobileView
        paginatedProblems={paginatedProblems}
        authUser={authUser}
        handleDelete={handleDelete}
        handleAddToPlaylist={handleAddToPlaylist}
        isDeletingProblem={isDeletingProblem}
      />

      {/* Desktop Table View (hidden on small screens) */}
      <ProblemTableDesktopView
        paginatedProblems={paginatedProblems}
        authUser={authUser}
        handleDelete={handleDelete}
        handleAddToPlaylist={handleAddToPlaylist}
        isDeletingProblem={isDeletingProblem}
      />
    </div>
  );
};
