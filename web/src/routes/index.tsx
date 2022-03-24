import React from "react";
import { Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./route";

import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import Clientboard from "../pages/Clientboard";

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route
        path="/signup"
        element={
          <PrivateRoute redirectTo="/">
            <SignUp />
          </PrivateRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PrivateRoute redirectTo="/">
            <ForgotPassword />
          </PrivateRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PrivateRoute redirectTo="/">
            <ResetPassword />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute isPrivate redirectTo="/">
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute isPrivate redirectTo="/">
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/clientboard"
        element={
          <PrivateRoute isPrivate redirectTo="/">
            <Clientboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
