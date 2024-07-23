import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchForm from "..";
import { act } from "react";

// Mock fetch globally
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
    })
) as jest.Mock;

describe("SearchForm", () => {
    it("renders the form", () => {
        render(
            <Router>
                <SearchForm />
            </Router>
        );

        // Check if the form elements are rendered
        expect(screen.getByLabelText(/Search Github User or Organization/i)).toBeInTheDocument();
        expect(screen.getByText(/Search Type/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });

    it("handles form submission and displays loading state", async () => {
        render(
            <Router>
                <SearchForm />
            </Router>
        );

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Search Github User or Organization/i), {
            target: { value: 'test' },
        });

        // fireEvent.click(screen.getByLabelText(/User/i));

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: /Search/i }));

        // Check loading state
        expect(screen.getByRole('button', { name: /Loading .../i })).toBeInTheDocument();

        // Wait for the API call to complete
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        // Check if the loading state is removed
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
        });
    });

    // it("displays 'No Results Found' when no results are returned", async () => {
    //     render(
    //         <Router>
    //             <SearchForm />
    //         </Router>
    //     );

    //     // Simulate user input
    //     fireEvent.change(screen.getByLabelText(/Search Github User or Organization/i), {
    //         target: { value: 'test' },
    //     });

    //     fireEvent.click(screen.getByLabelText(/User/i));

    //     // Simulate form submission
    //     fireEvent.submit(screen.getByRole('button', { name: /Search/i }));

    //     // Wait for the API call to complete
    //     await waitFor(() => {
    //         expect(global.fetch).toHaveBeenCalledTimes(1);
    //     });

    //     // Check if 'No Results Found' message is displayed
    //     expect(await screen.findByText(/No Results Found/i)).toBeInTheDocument();
    // });
});

// Clean up and reset mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});
