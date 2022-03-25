import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/Auth";

interface RouteProps {
  // eslint-disable-next-line react/require-default-props
  isPrivate?: boolean;
  redirectTo: string;
  children: JSX.Element;
}
interface UserRouteProps {
  // eslint-disable-next-line react/require-default-props
  children: JSX.Element;
}

const PrivateRoute: React.FC<RouteProps> = ({
  isPrivate = false,
  children,
  redirectTo,
}) => {
  const { user } = useAuth();

  return isPrivate === !!user ? children : <Navigate to={redirectTo} />;
};

const UserRoute: React.FC<UserRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return user.user_type === "client" ? (
    <Navigate to="/clientboard" />
  ) : (
    children
  );
};

export { PrivateRoute, UserRoute };
