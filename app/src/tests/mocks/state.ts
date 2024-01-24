/**
 * State mocks used for setting and getting mocked state
 */
// Core
import { Session } from '@supabase/supabase-js';

// Test utils
import { USE_LISTINGS_COUNT } from '#tests/test_utils/constants';
import { createTestListings } from '#tests/test_utils/createTestListing';

// Types
import { ListingNew } from '#types/Listing';
import { User } from '#types/User';

let listing_id = 0; // This ID will be used when creating a listing
let current_user: User | null = null; // This is the current user, akin to AuthContext's user
let current_session: Session | null = null; // This is the current session, akin to supabase.auth.getSession()
const listings = createTestListings(USE_LISTINGS_COUNT) // These are the stored listings, akin to useListings().fetchListing()

/**
 * Get the current listing ID
 * @returns listing_id
 */
export function getListingID() {
    return listing_id;
}

/**
 * Set the current listing id
 * @param id id to set to
 */
export function setListingID(id: number) {
    listing_id = id;
}

/**
 * Create a listing and add it to the `listings` variable
 * @param listing listing to add
 */
export function createListing(listing: ListingNew) {
    listings.push({
        ...listing,
        id: listing_id
    })
}

/**
 * Get listings from the `listings` variable
 * @returns array of Listing objects
 */
export function getListings() {
    return listings
}

/**
 * Set the current User object
 * @param user User object to set to. Can be null
 */
export function setUser(user: User | null) {
    current_user = user;
}

/**
 * Get the current User object
 * @returns User object or null
 */
export function getUser() {
    return current_user;
}

/**
 * Set the session object
 * @param session Session object to set to. Set to null for no session
 */
export function setSession(session: Session | null) {
    current_session = session;
}

/**
 * Get the session object
 * @returns Session object or null
 */
export function getSession() {
    return current_session;
}