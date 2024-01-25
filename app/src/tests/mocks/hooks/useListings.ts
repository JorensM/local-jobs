// Types
import { Listing, ListingNew } from '#types/Listing';

jest.mock('#hooks/useListings', () => {
    
    const { getListingID, getListings, createListing } = jest.requireActual('#tests/mocks/state');
    
    return {
        __esModule: true,
        default: () => ({
            fetchListings: async (): Promise<Listing[]> => {
                return getListings()
            },
            createListing: async (listing: ListingNew): Promise<number> => {
                createListing(listing);

                return getListingID();
            }
        })
    }
})