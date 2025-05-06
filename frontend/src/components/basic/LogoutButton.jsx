import { useAuthStore } from "@/store/useAuthStore";
import React from "react";

const LogoutButton = ({ children }) => {
  const { logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
  };

  return (
    <button className="btn btn-primary" onClick={onLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;
