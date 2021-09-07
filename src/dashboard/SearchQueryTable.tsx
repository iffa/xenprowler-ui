import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  IconButton,
} from "@chakra-ui/react";

interface SearchQueryTableProps {
  searchQueries: string[];
  queryRemoveClicked: (searchQuery: string) => Promise<boolean>;
}

export function SearchQueryTable(props: SearchQueryTableProps) {
  const { searchQueries, queryRemoveClicked } = props;

  return (
    <Table variant="simple">
      <TableCaption placement="top">Your active search queries</TableCaption>
      <Thead>
        <Tr>
          <Th>Search query</Th>
        </Tr>
      </Thead>
      <Tbody>
        {searchQueries.map((searchQuery) => (
          <Tr key={searchQuery}>
            <Td>{searchQuery}</Td>
            <Td isNumeric>
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
  );
}
