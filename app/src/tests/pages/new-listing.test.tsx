// Mocks
import '#tests/mocks/hooks/useListings';
import '#tests/mocks/hooks/useAuth';
import '#tests/mocks/stripe';

// Core
import { fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';

// Util
import { getListings, setListingID, setUser } from '#tests/mocks/hook_utils';

// Pages
import FeedPage from '#app/feed';
import NewListingPage from '#app/new-listing';
import ListingPage from '#app/listings/[listing_id]';

const AUTHOR_NAME = 'Custom author name';

describe('New Listing page', () => {

    setUser({
        id: "123",
        name: AUTHOR_NAME,
        role: 'recruiter'
    })
    
    it('Should create new listing upon form submission and redirect to listing page', async () => {
        renderRouter({
            'new-listing': NewListingPage,
            'listings/[id]': ListingPage,
            'feed': FeedPage,
        }, {
            initialUrl: '/new-listing'
        });

        const title_comp = await waitFor(() => screen.getByTestId('input-title'));
        const description_comp = await waitFor(() => screen.getByTestId('input-description'));
        const save_button = await waitFor(() => screen.getByLabelText('Create listing'));


        const TITLE = 'My new Listing';
        const DESCRIPTION = 'Description of my new listing. aaaaaa'
        
        const LISTING_ID = 25;
        setListingID(LISTING_ID);

        fireEvent.changeText(title_comp, TITLE)
        fireEvent.changeText(description_comp, DESCRIPTION);
        fireEvent.press(save_button);

        await waitFor(() => expect(screen).toHavePathname('/listings/' + LISTING_ID), {timeout: 10 * 1000, interval: 1000});

        // Expect for the listing to be added to the mock listings array
        await waitFor(() => {
            const index = getListings().findIndex(listing => (
                listing.id == LISTING_ID &&
                listing.title == TITLE &&
                listing.description == DESCRIPTION &&
                listing.user_name == AUTHOR_NAME
            ))
            
            expect(index).not.toEqual(-1);
        })

        // For now the below code doesn't work because screen becomes undefined on route change.
        // GH issue: https://github.com/expo/expo/issues/26623

        // const title_comp_2 = await waitFor(() => screen.getByText(TITLE));
        // const description_comp_2 = await waitFor(() => screen.getByText(DESCRIPTION));
        // const author_comp = await waitFor(() => screen.getByText('By ' + AUTHOR_NAME));

        // expect(title_comp_2).toBeDefined();
        // expect(description_comp_2).toBeDefined();
        // expect(author_comp).toBeDefined()
    })
})