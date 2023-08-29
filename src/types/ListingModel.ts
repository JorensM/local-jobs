import { Models } from 'appwrite'

type ListingModel = Models.Document & {
    by_user_name: string,
    by_user: string,
    title: string,
    description: string,
    location_id?: string,
}

export default ListingModel