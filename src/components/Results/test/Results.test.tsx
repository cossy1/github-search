import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Results from '..';


describe('Results', () => {
    it('displays "No data Found" when hasSearched is true and data is empty', () => {
        render(<Results isLoading={false} hasSearched={true} data={[]} />);
        expect(screen.getByText(/No data Found/i)).toBeInTheDocument();
    });

    it('does not display Loader or "No data Found" when isLoading is false and hasSearched is false', () => {
        render(<Results isLoading={false} hasSearched={false} data={[]} />);
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        expect(screen.queryByText(/No data Found/i)).not.toBeInTheDocument();
    });

    it('should take snapshot of the Results component', () => {
        render(<Results isLoading={false} hasSearched={false} data={[]} />);

        expect(screen).toMatchSnapshot();
    });
});
