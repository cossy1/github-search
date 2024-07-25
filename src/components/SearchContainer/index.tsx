import { ChangeEvent, FormEvent, useState } from "react";
import Results from "../Results";
import SearchForm from "../SearchForm";
import { useNavigate } from "react-router-dom";

function SearchContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, any>[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchType, setSearchType] = useState("organization");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseUrl = process.env.REACT_APP_BASE_URL as string;

    setIsLoading(true);
    setHasSearched(true);
    setQuery("");

    try {
      let url;

      if (searchType === "organization") {
        url = `${baseUrl}/search/users?q=${query}+type:org.`;
      } else {
        url = `${baseUrl}/search/users?q=${query}`;
      }
      navigate(`/search/${query}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      setResults(data?.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm
        isLoading={false}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleSearchTypeChange={handleSearchTypeChange}
        query={query}
        searchType={searchType}
      />
      <Results data={results} isLoading={isLoading} hasSearched={hasSearched} />
    </>
  );
}

export default SearchContainer;
