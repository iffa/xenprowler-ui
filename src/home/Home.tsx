import useAuth from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return <p>Hello, {user?.id}</p>;
}
