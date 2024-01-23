// Types
import { Listing } from '#types/Listing'

export const createTestListing = (index: number): Listing => {
    return {
        id: index,
        user_id: '123',
        title: 'Listing #' + index,
        user_name: 'Listing #' + index + ' author',
        description: 'Listing #' + index + ' description'
    }
}

export const createTestListings = (count: number): Listing[] => {
    const listings = []
    for(let i = 0; i < count; i++) {
        listings.push(createTestListing(i))
    }
    return listings;
}
