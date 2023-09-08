import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Components/Layout/Footer';

describe('Footer Component', () => {
    test('Displays required content', () => {
        render(<Footer />);
        const linkElement = screen.getByText(/Abdul Samad © 2023/i);
        expect(linkElement).toBeInTheDocument();
    });
});
