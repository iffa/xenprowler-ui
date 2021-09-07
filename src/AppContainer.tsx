import { Container, Flex, Heading } from "@chakra-ui/layout";
import { Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useAuth from "./auth/AuthContext";

export function AppContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const navigate = useNavigate();
  const { user, loading, logout, mutate } = useAuth();
  const authButtonClick = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    await logout();
    mutate(null);
  };

  return (
    <Container maxW="container.lg">
      <Flex as="nav" flexDir="row" align="center" py={2}>
        <Heading>xenprowler</Heading>
        <Spacer />
        {!loading && (
          <HStack spacing={2}>
            <Text>{!!user ? user.id : "Not logged in"}</Text>
            <Button size="md" onClick={authButtonClick}>
              {!!user ? "Log out" : "Log in"}
            </Button>
          </HStack>
        )}
      </Flex>
      {children}
    </Container>
  );
}
