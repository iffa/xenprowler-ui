import { Table, Thead, Tr, Th, Tbody, Td, Link } from "@chakra-ui/react";
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
      <Thead>
        <Tr>
          <Th pl={0} pr={4} py={4}>
            Title
          </Th>
          <Th px={4} py={4}>
            Search query
          </Th>
          <Th pl={4} pr={0} py={4} isNumeric>
            Confidence
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {searchResults.map((result) => (
          <Tr key={result.item.title}>
            <Td pl={0} pr={4} py={4}>
              <Link href={`${linkBaseUrl}${result.item.link}`} isExternal>
                {result.item.title}
              </Link>
            </Td>
            <Td px={4} py={4}>
              {result.query}
            </Td>
            <Td pl={4} pr={0} py={4} isNumeric>
              {formatConfidence(result.score)}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
