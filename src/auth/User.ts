import { BaseDocument } from "../BaseDocument";

export interface SearchResult {
  item: {
    title: string;
    link: string;
  };
  refIndex: number;
  score: number;
  query: string;
}

export interface User extends BaseDocument {
  searchQueries: string[];
}
