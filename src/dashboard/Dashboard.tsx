import { Box, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher, HttpError } from "../App";
import useAuth from "../auth/AuthContext";
import { SearchResult, User } from "../auth/User";
import { useUnauthenticatedRedirect } from "../auth/useUnauthenticatedRedirect";
import { AddSearchQueryForm } from "./AddSearchQueryForm";
import { SearchQueryTable } from "./SearchQueryTable";
import { SearchResultsTable } from "./SearchResultsTable";

export function Dashboard(): JSX.Element {
  useUnauthenticatedRedirect();

  const { user, mutate } = useAuth();

  const { data: searchResults } = useSWR<SearchResult[], HttpError>(
    `${process.env.REACT_APP_API_ENDPOINT}/v1/results`,
    fetcher
  );

  const handleSearchQueryRemove = (searchQuery: string) => {
    console.log(`Remove query ${searchQuery}`);
    const mutatedUser: User = {
      ...user!,
      searchQueries: user!.searchQueries.filter((x) => x !== searchQuery),
    };
    mutate(mutatedUser, false);

    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/v1/queries`, {
      method: "PATCH",
      body: JSON.stringify({ searchQueries: mutatedUser.searchQueries }),
      credentials: "include",
    }).then((res) => {
      mutate();
      return res.ok;
    });
  };

  const handleSearchQueryAdd = (searchQuery: string) => {
    console.log(`Add query ${searchQuery}`);
    const mutatedUser: User = {
      ...user!,
      searchQueries: [searchQuery, ...user!.searchQueries],
    };
    mutate(mutatedUser, false);

    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/v1/queries`, {
      method: "PATCH",
      body: JSON.stringify({ searchQueries: mutatedUser.searchQueries }),
      credentials: "include",
    }).then((res) => {
      mutate();
      return res.ok;
    });
  };

  return (
    <VStack spacing={4} mt={8}>
      <Box
        as="section"
        width="full"
        boxShadow="md"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        backgroundColor="white"
        p={4}
      >
        <AddSearchQueryForm
          searchQueries={user?.searchQueries || []}
          querySubmitted={handleSearchQueryAdd}
        />
      </Box>
      <Box
        as="section"
        width="full"
        boxShadow="md"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        backgroundColor="white"
        p={4}
      >
        <SearchQueryTable
          searchQueries={user?.searchQueries || []}
          queryRemoveClicked={handleSearchQueryRemove}
        ></SearchQueryTable>
      </Box>
      <Box
        as="section"
        width="full"
        boxShadow="md"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        backgroundColor="white"
        overflow="auto"
        p={4}
      >
        <SearchResultsTable
          searchResults={searchResults || []}
        ></SearchResultsTable>
      </Box>
    </VStack>
  );
}
