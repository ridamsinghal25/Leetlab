import { HomeShimmerWrapper } from "@/components/basic/HomePageShimmerUI/ShimmerUIWrapper";
import Navbar from "@/components/basic/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useProblemStore } from "@/store/useProblemStore";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const { isProblemsLoading, getAllProblems } = useProblemStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getAllProblems();
    }
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return <HomeShimmerWrapper />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
