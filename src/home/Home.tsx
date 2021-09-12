import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuth from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <Box mt={8}>
      <Heading mb={4}>Hello.</Heading>
      {!user && <Text>Log in to manage your active alerts.</Text>}
      {!!user && (
        <Link to="/dashboard">
          <Button colorScheme="blue">Open dashboard</Button>
        </Link>
      )}
    </Box>
  );
}
