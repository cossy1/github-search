import React, {
    ChangeEvent,
    FormEvent,
} from "react";

interface ISearchFormProps {
    isLoading: boolean;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    query: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSearchTypeChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchType: string;
}

const SearchForm: React.FC<ISearchFormProps> = ({
    query,
    isLoading,
    handleSubmit,
    handleInputChange,
    handleSearchTypeChange,
    searchType
}) => {
    const searchOptions = [
        { value: "organization", label: "Organization" },
        { value: "user", label: "User" },
    ];
    const disabled = query.trim().length === 0;

    return (
        <div className="max-w-lg mx-auto p-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-lg font-bold mb-2 text-center"
                        htmlFor="search"
                    >
                        Search Github User or Organization
                    </label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Enter name"
                        value={query}
                        data-testid='search-input'
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4 flex items-center justify-center flex-col">
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
                        data-testid="btn"
                        className={`${disabled ? "bg-gray-400" : "bg-blue-500"} ${disabled ? "" : "hover:bg-blue-700"
                            } w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${disabled ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        {isLoading ? "Loading ..." : "Search"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
