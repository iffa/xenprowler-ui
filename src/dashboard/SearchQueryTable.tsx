import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from "@chakra-ui/react";

interface SearchQueryTableProps {
  searchQueries: string[];
  queryRemoveClicked: (searchQuery: string) => Promise<boolean>;
}

export function SearchQueryTable(props: SearchQueryTableProps) {
  const { searchQueries, queryRemoveClicked } = props;

  return (
    <>
      {searchQueries.length === 0 && (
        <Text>No active search queries. Add one now.</Text>
      )}
      {searchQueries.length > 0 && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th px={0}>Search query</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchQueries.map((searchQuery) => (
              <Tr key={searchQuery}>
                <Td px={0}>{searchQuery}</Td>
                <Td px={0} isNumeric>
                  <IconButton
                    title="Remove search query"
                    aria-label="Remove search query"
                    icon={<DeleteIcon />}
                    onClick={() => queryRemoveClicked(searchQuery)}
                  ></IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}
