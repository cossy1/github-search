import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/SearchContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="search-form">Mocked SearchForm</div>,
}));

describe('App', () => {
  it('should render the SearchForm component', () => {
    render(<App />);

    const searchForm = screen.getByTestId('search-form');
    expect(searchForm).toBeInTheDocument();
  });
});