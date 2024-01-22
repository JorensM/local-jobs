export type Listing = {
    /**
     * ID of listings. Should not be changed
     */
    id: number,
    /**
     * Listing author's display name
     */
    user_name: string,
    /**
     * Listing authors' user ID
     */
    user_id: string,
    /**
     * Title of the listing
     */
    title: string,
    /**
     * Description of the listing
     */
    description: string,
    // location_id?: string,
    // location_name?: string
}

/**
 * Type used in 'update' functions
 */
export type ListingUpdate = Omit<Partial<Listing>, 'id'> & {
    id: number
}

/**
 * Type used in 'create' functions
 */
export type ListingNew = Omit<Listing, 'id'>