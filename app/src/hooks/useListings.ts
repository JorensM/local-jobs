import supabase from '#misc/supabase'
import { Listing, ListingNew, ListingUpdate } from '#types/Listing'

type ListingFetchOptions = {
    page: number,
    per_page: number
}

export default function useListings() {
    const fetchListings = async (options?: ListingFetchOptions) => {
        const { data, error } = await supabase
            .from('listings')
            .select()

        if (error) {
            throw error;
        }

        return data;
    }

    const fetchListing = async (id: number | string): Promise<Listing> => {

        const _id = typeof id == 'string' ? parseInt(id) : id

        const { data, error } = await supabase
            .from('listings')
            .select()
            .limit(1)
            .eq('id', _id)

        if (error) {
            throw error
        }

        return data[0] as Listing;
    }

    const createListing = async (listing: ListingNew) => {
        const { error } = await supabase
            .from('listings')
            .insert(listing)

        if (error) {
            throw error
        }

        return true;
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