import supabase from '#misc/supabase'

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

    return {
        fetchListings
    }
}