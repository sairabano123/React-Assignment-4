import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../components/Redux/store';
import { BrowserRouter } from 'react-router-dom';
import TransferForm from '../components/Forms/TransferForm';

describe('Transfer Form Component', () => {
    test('Displays required content for unauthenticated user',  () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <TransferForm />
                </Provider>
            </BrowserRouter>
        );

        const unAuthError = screen.getByText(/Login required to visit this page./i);
        expect(unAuthError).toBeInTheDocument();
        expect(unAuthError).toHaveClass('card-body');
    });
});
