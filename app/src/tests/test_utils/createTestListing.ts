// Types
import { Listing } from '#types/Listing'

/**
 * Create a test Listing object.
 * 
 * @param index index of the listing, useful when creating multiple listings. Will
 * determine the id, title, username and description of the listing
 * 
 * @returns a Listing object
 */
export const createTestListing = (index: number): Listing => {
    return {
        id: index,
        user_id: '123',
        title: 'Listing #' + index,
        user_name: 'Listing #' + index + ' author',
        description: 'Listing #' + index + ' description'
    }
}

/**
 * Creates several listings using the `createTestListing()` function
 * @param count how many listings to create
 * @returns array of Listing objects
 */
export const createTestListings = (count: number): Listing[] => {
    const listings = []
    for(let i = 0; i < count; i++) {
        listings.push(createTestListing(i))
    }
    return listings;
}
