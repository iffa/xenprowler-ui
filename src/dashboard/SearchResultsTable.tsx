import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
} from "@chakra-ui/react";
import { SearchResult } from "../auth/User";

interface SearchResultsTableProps {
  searchResults: SearchResult[];
}

export function SearchResultsTable(props: SearchResultsTableProps) {
  const { searchResults } = props;
  const linkBaseUrl = "https://bbs.io-tech.fi";

  const formatConfidence = (confidence: number) => {
    return (1.0 - confidence).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
  };

  return (
    <Table variant="simple">
      <TableCaption placement="top">Search results</TableCaption>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Search query</Th>
          <Th isNumeric>Confidence</Th>
        </Tr>
      </Thead>
      <Tbody>
        {searchResults.map((result) => (
          <Tr key={result.item.title}>
            <Td>
              <Link href={`${linkBaseUrl}${result.item.link}`} isExternal>
                {result.item.title}
              </Link>
            </Td>
            <Td>{result.query}</Td>
            <Td isNumeric>{formatConfidence(result.score)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
