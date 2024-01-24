// Mocks
import '#tests/mocks/hooks/useAuth'

// Core
import { act, fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';

// Pages
import LoginPage from '#app';
import FeedPage from '#app/feed';

describe('Login page', () => {

    it('Should redirect to feed page when successfully logged in', async () => {
        renderRouter({
            index: LoginPage,
            feed: FeedPage
        }, {
            initialUrl: '/'
        })
        expect(screen).toHavePathname('/')

        const email_field = screen.getByTestId('input-email');
        const password_field = screen.getByTestId('input-password');
        const login_button = screen.getByTestId('button-login');
        act(() => {
            fireEvent.changeText(email_field, 'test');
            fireEvent.changeText(password_field, 'password');
            fireEvent.press(login_button);
        }) 
        
        // Check if user has been redirected to /feed after successful login
        await waitFor(() => expect(screen).toHavePathname('/feed'), {
            timeout: 25 * 1000,
            interval: 1000
        });
    })
})