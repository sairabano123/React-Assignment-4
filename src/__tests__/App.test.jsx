import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
    test('Displays required content', () => {
        render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        );

        const homeLinkElement = screen.getByRole('link', { name: /home/i });
        expect(homeLinkElement).toHaveAttribute('href', '/');
        expect(homeLinkElement).toBeInTheDocument();

        const aboutusLinkElement = screen.getByText(/About Us/i);
        expect(aboutusLinkElement).toBeInTheDocument();

        const blogsLinkElement = screen.getByText(/blogs/i);
        expect(blogsLinkElement).toBeInTheDocument();

        const loginLinkElement = screen.getByText(/login/i);
        expect(loginLinkElement).toBeInTheDocument();


        const linkElement = screen.getByText(/Abdul Samad © 2023/i);
        expect(linkElement).toBeInTheDocument();
    });
});
