import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import useAuth from "../AuthContext";
import { User } from "../User";

export default function VerifyLogin() {
  const [verifying, setVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const { mutate } = useAuth();

  useEffect(() => {
    const verifyToken = async (email: string, token: string): Promise<any> => {
      setVerifying(true);
      const url = new URL(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/auth/verify`
      );
      url.search = new URLSearchParams({ email, token }).toString();

      return fetch(url.toString(), { credentials: "include" })
        .then((response) => response.json())
        .then((user: User) => mutate(user))
        .finally(() => setVerifying(false));
    };

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      // TODO: Something error
      return;
    }

    verifyToken(email, token);
  }, [searchParams, mutate, setVerifying]);

  return (
    <>
      {verifying && <p>Verifying credentials, please wait...</p>}
      {!verifying && <Navigate to="/dashboard" replace={true} />}
    </>
  );
}
