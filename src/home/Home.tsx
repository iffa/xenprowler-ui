import useAuth from "../auth/AuthContext";

export default function Home() {
  const { user, mutate } = useAuth();

  return <p>Hello, {user?.id}</p>;
}
