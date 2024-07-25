import { fireEvent, render, screen } from '@testing-library/react';
import Card from '..';

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

describe('App', () => {
    it('should render the Card component properly', () => {
        render(<Card {...mockProps} />);

        const name = screen.getByText(/exam/);
        const imgElement = screen.getByAltText("img");
        const followersLink = screen.getByTestId("follower");
        const eventsLink = screen.getByTestId('event');

        expect(eventsLink).toHaveAttribute("href", mockProps.events_url);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", mockProps.src);
        expect(name).toBeInTheDocument();
        expect(followersLink).toHaveAttribute("href", mockProps.followers_url);
    });

    it('should test navigation', () => {
        render(<Card {...mockProps} />);

        const follower = screen.getByTestId("follower");
        fireEvent.click(follower);

        expect(window.location.href).toBe('http://localhost/');
    });

    it("renders the correct icon for site_admin status", () => {
        const { rerender } = render(<Card {...mockProps} site_admin={true} />);
        expect(screen.getByTestId("checkmark-icon")).toBeInTheDocument();

        rerender(<Card {...mockProps} site_admin={false} />);
        expect(screen.getByTestId("cancel-icon")).toBeInTheDocument();
    });

    it('should take snapshot of the Card component', () => {
        render(<Card {...mockProps} />);

        expect(screen).toMatchSnapshot();
    });
});
