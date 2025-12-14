import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean; // If true, redirect to home if already authenticated
}

export const PublicRoute = ({
  children,
  restricted = false,
}: PublicRouteProps) => {
  // TODO: Implement actual authentication check
  const isAuthenticated = false; // Replace with actual auth check

  if (isAuthenticated && restricted) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
