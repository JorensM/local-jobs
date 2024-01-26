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
            fetchListing: async(id: string | number): Promise<Listing | null> => {
                const _id = typeof id == 'string' ? parseInt(id) : id
                return (getListings() as Listing[]).find(listing => listing.id == _id) || null;
            },
            createListing: async (listing: ListingNew): Promise<number> => {
                createListing(listing);

                return getListingID();
            }
        })
    }
})