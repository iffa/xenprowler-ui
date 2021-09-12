import { useNavigate } from "react-router-dom";
import useAuth from "./AuthContext";
import { useEffect } from "react";

/**
 * Redirects user to another page if not authenticated.
 * @param redirectTo Path to redirect to
 */
export function useUnauthenticatedRedirect(redirectTo: string = "/") {
  const navigate = useNavigate();
  const { user, isValidating } = useAuth();

  useEffect(() => {
    if (!user && !isValidating) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, user, isValidating, redirectTo]);
}
