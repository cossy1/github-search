import { fireEvent, render, screen } from '@testing-library/react';
import Card from '..';

describe('App', () => {
    it('should render the Card component properly', () => {
        const mockProps = {
            src: "https://example.com/image.jpg",
            name: "exam",
            type: "User",
            site_admin: true,
            score: "42",
            followers_url: "https://example.com/followers",
            subscriptions_url: "https://example.com/subscriptions",
            organizations_url: "https://example.com/organizations",
            events_url: "https://example.com/events",
        };
        render(<Card {...mockProps} />);

        const name = screen.getByText(/exam/);
        const score = screen.getByText(/42/)

        expect(name).toBeInTheDocument();
        expect(score).toBeInTheDocument();

    });

    it('should test navigation', () => {
        const mockProps = {
            src: "https://example.com/image.jpg",
            name: "exam",
            type: "User",
            site_admin: true,
            score: "42",
            followers_url: "https://example.com/followers",
            subscriptions_url: "https://example.com/subscriptions",
            organizations_url: "https://example.com/organizations",
            events_url: "https://example.com/events",
        };
        render(<Card {...mockProps} />);

        const follower = screen.getByTestId("follower");
        fireEvent.click(follower)
        expect(window.location.href).toBe('http://localhost/');
    });

    it('should take snapshot of the Card component', () => {
        const mockProps = {
            src: "https://example.com/image.jpg",
            name: "exampleuser",
            type: "User",
            site_admin: true,
            score: "42",
            followers_url: "https://example.com/followers",
            subscriptions_url: "https://example.com/subscriptions",
            organizations_url: "https://example.com/organizations",
            events_url: "https://example.com/events",
        };
        render(<Card {...mockProps} />);

        expect(screen).toMatchSnapshot();
    });
});
