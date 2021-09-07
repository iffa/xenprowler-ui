import { Container } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../AuthContext";

export default function VerifyLogin() {
  const [searchParams] = useSearchParams();
  const { mutate } = useAuth();

  useEffect(() => {
    const verifyToken = async (email: string, token: string): Promise<any> => {
      const url = new URL(
        `${process.env.REACT_APP_API_ENDPOINT}/v1/auth/verify`
      );
      url.search = new URLSearchParams({ email, token }).toString();

      return fetch(url.toString(), { credentials: "include" })
        .then((response) => response.json())
        .then((user) => mutate(user));
    };

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      // TODO: Something error
      return;
    }

    verifyToken(email, token);
  }, [searchParams, mutate]);

  return <Container>verify-login</Container>;
}
