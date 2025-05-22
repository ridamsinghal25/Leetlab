import { HomeShimmerWrapper } from "@/components/basic/HomePageShimmerUI/ShimmerUIWrapper";
import Navbar from "@/components/basic/Navbar";
import { useProblemStore } from "@/store/useProblemStore";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { isProblemsLoading, getAllProblems } = useProblemStore();

  useEffect(() => {
    getAllProblems();
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

export default Layout;
