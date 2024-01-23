import LoginPage from '#app';
import FeedPage from '#app/feed';
import { fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';
import useAuth from '#hooks/useAuth'
import { AuthError } from '@supabase/supabase-js';
import { Listing } from '#types/Listing';

jest.mock('#hooks/useAuth', () => {
    return {
        __esModule: true,
        default: () => ({
            login: async (email: string, password: String) => {
                if(email == 'test' && password == 'password') {
                    return true;
                } else {
                    throw new Error('Wrong username or password')
                }
            }
        })
    }
})

const createTestListing = (index: number): Listing => {
    return {
        id: index,
        user_id: '123',
        title: 'Listing #' + index,
        user_name: 'Listing #' + index + ' author',
        description: 'Listing #' + index + ' description'
    }
}

const createTestListings = (count: number): Listing[] => {
    const listings = []
    for(let i = 0; i < count; i++) {
        listings.push(createTestListing(i))
    }
    return listings;
}

const USE_LISTINGS_COUNT = 5;

jest.mock('#hooks/useListings', () => {
    return {
        __esModule: true,
        default: () => ({
            fetchListings: async (): Promise<Listing[]> => {
                return createTestListings(USE_LISTINGS_COUNT)
            }
        })
    }
})


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
        fireEvent.changeText(email_field, 'test');
        fireEvent.changeText(password_field, 'password');
        fireEvent.press(login_button);

        await waitFor(() => expect(screen).toHavePathname('/feed'), {
            timeout: 25 * 1000,
            interval: 1000
        });
        // const feed_page = screen.getByTestId('FeedPage');
        // expect(feed_page).toBeDefined();
    })
})

describe('Feed page', () => {

    

    it('Should display listings and their data', async () => {
        renderRouter({
            // index: LoginPage,
            feed: FeedPage
        }, {
            initialUrl: '/feed'
        })

        for(let i = 0; i < USE_LISTINGS_COUNT; i++) {
            const listing_data = createTestListing(i);
            const title = await waitFor(() => screen.getByText(listing_data.title));
            const description = await waitFor(() => screen.getByText(listing_data.description + '...'));
            const author = await waitFor(() => screen.getByText('By ' + listing_data.user_name));

            expect(title).toBeDefined();
            expect(description).toBeDefined();
            expect(author).toBeDefined();
        }
    })
})