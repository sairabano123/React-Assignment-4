import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Components/Layout/Header';

describe('Header Component', () => {
    test('Displays logged in content', () => {
        render(
        <Router >
            <Header isUserLoggedIn = { true }/>
            </Router>
        );

        const homeLinkElement = screen.getByText(/Home/i);
        expect(homeLinkElement).toBeInTheDocument();

        const aboutusLinkElement = screen.getByText(/About Us/i);
        expect(aboutusLinkElement).toBeInTheDocument();

        const blogsLinkElement = screen.getByText(/blogs/i);
        expect(blogsLinkElement).toBeInTheDocument();

        const dashboardLinkElement = screen.getByText(/Dashboard/i);
        expect(dashboardLinkElement).toBeInTheDocument();

        const logoutLinkElement = screen.getByText(/logout/i);
        expect(logoutLinkElement).toBeInTheDocument();
    });

    test('Displays logged out content', () => {
        render(<Router >
            <Header isUserLoggedIn={false} />
        </Router>
        );
        const homeLinkElement = screen.getByText(/Home/i);
        expect(homeLinkElement).toBeInTheDocument();

        const aboutusLinkElement = screen.getByText(/About Us/i);
        expect(aboutusLinkElement).toBeInTheDocument();

        const blogsLinkElement = screen.getByText(/blogs/i);
        expect(blogsLinkElement).toBeInTheDocument();

        const loginLinkElement = screen.getByText(/login/i);
        expect(loginLinkElement).toBeInTheDocument();

    });
});
