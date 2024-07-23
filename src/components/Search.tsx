import { ChangeEvent, FormEvent, useState } from "react";
import ItemList from "./ItemList";

function SearchForm() {
    const [searchType, setSearchType] = useState("organization");
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const disabled = query.trim().length === 0;
    const searchOptions = [
        { value: "organization", label: "Organization" },
        { value: "user", label: "User" },
    ];

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

        try {
            let url;

            if (searchType === "organization") {
                url = `${baseUrl}/search/users?q=${query}+type:org.`;
            } else {
                url = `${baseUrl}/search/users?q=${query}`;
            }
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API call failed with status ${response.status}`);
            }

            const data = await response.json();
            setResults(data.items);
            console.log("Search results:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="search"
                    >
                        Search Github User or Organization
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={query}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <span className="text-gray-700">Search Type</span>
                    <div className="mt-2">
                        {searchOptions.map((option) => (
                            <label key={option.value} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value={option.value}
                                    checked={searchType === option.value}
                                    onChange={handleSearchTypeChange}
                                    className="form-radio text-indigo-600 ml-2"
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`${disabled ? "bg-gray-400" : "bg-blue-500"
                            } ${disabled ? "" : "hover:bg-blue-700"
                            } w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${disabled ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        {isLoading ? "Loading ..." : "Search"}
                    </button>
                </div>
            </form>

            {isLoading && <p>Fetching Data....</p>}

            {!isLoading && hasSearched && (
                <>
                    {results.length === 0 ? (
                        <h3>No Results Found</h3>
                    ) : (
                        <ul className="list-none p-0">
                            {results.map((res: Record<string, string>, index) => (
                                <li key={index} className="mb-2">
                                    <ItemList src={res.avatar_url} name={res.login} />
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default SearchForm;
