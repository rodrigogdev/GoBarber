import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/Auth";

interface RouteProps {
  // eslint-disable-next-line react/require-default-props
  isPrivate?: boolean;
  redirectTo: string;
  children: JSX.Element;
}

export const PrivateRoute: React.FC<RouteProps> = ({
  isPrivate = false,
  children,
  redirectTo,
}) => {
  const { user } = useAuth();

  return isPrivate === !!user ? children : <Navigate to={redirectTo} />;
};
