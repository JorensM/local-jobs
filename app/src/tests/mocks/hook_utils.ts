import { USE_LISTINGS_COUNT } from '#tests/test_utils/constants';
import { createTestListings } from '#tests/test_utils/createTestListing';
import { ListingNew } from '#types/Listing';
import { User } from '#types/User';
import { Session } from '@supabase/supabase-js';

let listing_id = 0;
let current_user: User | null = null;
let current_session: Session | null = null;
const listings = createTestListings(USE_LISTINGS_COUNT)

export function getListingID() {
    return listing_id;
}

export function setListingID(id: number) {
    listing_id = id;
}

export function createListing(listing: ListingNew) {
    listings.push({
        ...listing,
        id: listing_id
    })
}

export function getListings() {
    return listings
}

export function setUser(user: User | null) {
    current_user = user;
}

export function getUser() {
    return current_user;
}

export function setSession(session: Session | null) {
    current_session = session;
}

export function getSession() {
    return current_session;
}