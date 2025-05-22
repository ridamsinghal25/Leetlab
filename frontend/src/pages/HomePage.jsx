import { ProblemsTable } from "@/components/components/problemTable/ProblemsTable";
import { useProblemStore } from "@/store/useProblemStore";

const HomePage = () => {
  const { problems } = useProblemStore();

  return (
    <section className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-16 relative">
      <div className="max-w-4xl text-center mb-8 sm:mb-12 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Welcome to <span className="text-primary">LeetLab</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          A platform inspired by LeetCode to help you prepare for coding
          interviews and improve your skills by solving challenging problems.
        </p>
      </div>

      {problems.length > 0 ? (
        <ProblemsTable problems={problems} />
      ) : (
        <div className="mt-10 p-6 sm:p-8 border border-dashed border-primary rounded-lg text-center w-full max-w-md mx-auto">
          <p className="text-lg font-medium text-muted-foreground">
            No problems found. Check back later or contact an administrator.
          </p>
        </div>
      )}
    </section>
  );
};

export default HomePage;
