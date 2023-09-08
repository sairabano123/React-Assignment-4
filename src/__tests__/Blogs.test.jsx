import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Blogs from '../components/Blogs/Blogs';

describe('Blog Component', () => {
    test('Displays required content', () => {
        render(<Blogs />);


        const blogId = screen.getByText(/Blog Id/i);
        expect(blogId).toBeInTheDocument();

        const title = screen.getByText(/Title/);
        expect(title).toBeInTheDocument();

        const subTitle = screen.getByText(/Subtitle/i);
        expect(subTitle).toBeInTheDocument();

        const author = screen.getByText(/Author/i);
        expect(author).toBeInTheDocument();

        const action = screen.getByText(/Action/i);
        expect(action).toBeInTheDocument();
    });
});
