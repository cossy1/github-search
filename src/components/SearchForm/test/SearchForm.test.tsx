import { render, screen } from '@testing-library/react';
import SearchForm from '..';

const mockProps = {
    isLoading: false,
    setResults: jest.fn(),
    setIsLoading: jest.fn(),
    setHasSearched: jest.fn(),
    handleSubmit: jest.fn(),
    query: "cosmas",
    handleInputChange: jest.fn(),
    handleSearchTypeChange: jest.fn(),
    searchType: 'user'
};

describe('App', () => {
    it('should render the SearchForm component properly', async () => {

        render(<SearchForm {...mockProps} />);

        const titleText = screen.getByText('Search Github User or Organization')
        const radioButtons = screen.getAllByRole('radio');
        const inputField = screen.getByTestId('search-input');

        expect(inputField).toHaveValue('cosmas')
        expect(radioButtons.length).toBe(2);
        expect(screen.getByLabelText('Organization')).toBeInTheDocument();
        expect(screen.getByLabelText('User')).toBeInTheDocument();
        expect(titleText).toBeInTheDocument();
    });

    it('should take snapshot of the SearchForm component', () => {

        render(<SearchForm {...mockProps} />);

        expect(screen).toMatchSnapshot();
    });
});
