import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "user" | "agent" | "admin";
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  // TODO: Implement actual authentication check
  // For now, we'll assume the user is authenticated and has the required role
  const isAuthenticated = true; // Replace with actual auth check
  const userRole = "user"; // Replace with actual user role from auth context

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
