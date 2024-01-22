import supabase from '#misc/supabase'
import { Listing, ListingNew, ListingUpdate } from '#types/Listing'

type ListingFetchOptions = {
    filter?: Partial<Listing> | null,
    page?: number,
    per_page?: number
}

const fetch_listings_default_options: Required<ListingFetchOptions> = {
    filter: null,
    page: 0,
    per_page: 16
}

export default function useListings() {
    const fetchListings = async (options?: ListingFetchOptions) => {

        const _options = {
            ...fetch_listings_default_options,
            ...options
        }

        const range_from = _options.page * _options.per_page // Paginated results start index
        const range_to = range_from + _options.per_page // Paginated results end index

        let query = supabase
            .from('listings')
            .select()
            .range(range_from, range_to)

        const filter = _options.filter;

        if(filter) {
            if(filter.user_id) {
                query = query.eq('user_id', filter.user_id)
            }
        }
        

        const { data, error } = await query

        if (error) {
            throw error;
        }

        return data;
    }

    const fetchListing = async (id: number | string): Promise<Listing | null> => {

        const _id = typeof id == 'string' ? parseInt(id) : id

        const { data, error } = await supabase
            .from('listings')
            .select()
            .limit(1)
            .eq('id', _id)

        if (error) {
            throw error
        }

        // Check if a row was returned from Supabase, in which case return the row
        if(data.length > 0) {
            return data[0] as Listing;
        }

        // Otherwise return null
        return null;

        
    }

    const createListing = async (listing: ListingNew) => {
        const { data, error } = await supabase
            .from('listings')
            .insert(listing)
            .select()

        if (error) {
            throw error
        }

        return data[0].id; // Return the id of the newly created listing
    }

    const updateListing = async (listing: ListingUpdate) => {
        const { error } = await supabase
            .from('listings')
            .update(listing)
            .eq('id', listing.id)

        if (error) {
            throw error
        }

        return true;
    }

    return {
        fetchListings,
        fetchListing,
        createListing,
        updateListing
    }
}