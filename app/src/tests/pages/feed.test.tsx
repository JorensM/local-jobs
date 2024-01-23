// Mocks
import '#tests/mocks/hooks/useListings';

// Core
import { renderRouter, screen, waitFor } from 'expo-router/testing-library';

// Pages
import FeedPage from '#app/feed';

// Util
import { USE_LISTINGS_COUNT } from '#tests/test_utils/constants';
import { createTestListing } from '#tests/test_utils/createTestListing';

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