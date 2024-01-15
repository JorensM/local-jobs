export type Listing = {
    id: number,
    user_name: string,
    user_id: string,
    title: string,
    description: string,
    // location_id?: string,
    // location_name?: string
}

export type ListingUpdate = Omit<Partial<Listing>, 'id'> & {
    id: number
}

export type ListingNew = Omit<Listing, 'id'>