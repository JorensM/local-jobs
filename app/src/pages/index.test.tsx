import LoginPage from '#app';
import FeedPage from '#app/feed';
import { fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';

describe('Login page', () => {
    it('Should redirect to feed page when successfully logged in', async () => {
        renderRouter({
            index: LoginPage,
            feed: FeedPage
        }, {
            initialUrl: '/'
        })

        expect(screen).toHavePathname('/')

        // const layout = screen.getByTestId('Layout');
        // expect(layout).toBeDefined()

        // const login_page_component = screen.getByTestId('LoginPage');

        // expect(login_page_component).toBeDefined();

        const email_field = screen.getByTestId('input-email');
        const password_field = screen.getByTestId('input-password');
        const login_button = screen.getByTestId('button-login');
        fireEvent.changeText(email_field, 'jorensmerenjanu@gmail.com');
        fireEvent.changeText(password_field, 'xjetix');
        fireEvent.press(login_button);

        await waitFor(() => expect(screen).toHavePathname('/feed'), {
            timeout: 25 * 1000,
            interval: 1000
        });
        // const feed_page = screen.getByTestId('FeedPage');
        // expect(feed_page).toBeDefined();
    })
})