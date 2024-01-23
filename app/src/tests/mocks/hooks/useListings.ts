// Types
import { Listing, ListingNew } from '#types/Listing';

jest.mock('#hooks/useListings', () => {

    const { createTestListings } = jest.requireActual('#tests/test_utils/createTestListing')
    const { USE_LISTINGS_COUNT } = jest.requireActual('#tests/test_utils/constants')
    const { getListingID } = jest.requireActual('#tests/mocks/hook_utils');
    // const auth = require('#hooks/useAuth');
    const listings = createTestListings(USE_LISTINGS_COUNT)
    

    return {
        __esModule: true,
        default: () => ({
            fetchListings: async (): Promise<Listing[]> => {
                return listings
            },
            createListing: async (listing: ListingNew): Promise<number> => {
                listings.push({
                    ...listing,
                    id: getListingID()
                })

                return getListingID();
            }
        })
    }
})