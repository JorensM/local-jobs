import supabase from '#misc/supabase'
import { ListingNew } from '#types/Listing'

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

    const createListing = async(listing: ListingNew) => {
        const { error } = await supabase
            .from('listings')
            .insert(listing)

        if (error) {
            throw error
        }

        return true;
    }

    return {
        fetchListings,
        createListing
    }
}