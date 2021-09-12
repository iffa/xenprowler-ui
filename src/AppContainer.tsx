import {
  Button,
  Container,
  Flex,
  HStack,
  Spacer,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useAuth from "./auth/AuthContext";
import logo from "./AppIcon.svg";

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
    <Container maxW="container.lg" py={4}>
      <Flex
        as="nav"
        flexDir="row"
        align="center"
        p={4}
        backgroundColor="white"
        boxShadow="lg"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
      >
        <Image src={logo} boxSize="64px" />
        <Spacer />
        {!loading && (
          <HStack spacing={2}>
            <Text>{!!user ? user.id : "Not logged in"}</Text>
            <Button size="sm" variant="outline" onClick={authButtonClick}>
              {!!user ? "Log out" : "Log in"}
            </Button>
          </HStack>
        )}
      </Flex>
      {children}
    </Container>
  );
}
