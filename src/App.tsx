import React from "react";
import { Route, Routes } from "react-router";
import { AppContainer } from "./AppContainer";
import { AuthProvider } from "./auth/AuthContext";
import RequestLogin from "./auth/request/RequestLogin";
import VerifyLogin from "./auth/verify/VerifyLogin";
import { Dashboard } from "./dashboard/Dashboard";
import Home from "./home/Home";

export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    const error = new HttpError(
      "An error occurred while fetching the data",
      res.status
    );
    throw error;
  }

  return res.json();
};

function App() {
  return (
    <AuthProvider>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/login" element={<RequestLogin />} />
          <Route path="/auth/login/callback" element={<VerifyLogin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AppContainer>
    </AuthProvider>
  );
}

export default App;
