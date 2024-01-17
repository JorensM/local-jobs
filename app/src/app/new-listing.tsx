// Core
import { router } from 'expo-router'

// Hooks
import useListings from '#hooks/useListings'
import useAuth from '#hooks/useAuth'
import usePage from '#hooks/usePage'

// Components
import SessionPage from '#components/layout/SessionPage'
import ListingForm, { ListingFormValues } from '#components/forms/ListingForm'

// Misc
import { toastError, toastSuccess } from '#misc/toast'

/**
 * Page for creating a new listing
 */
export default function NewListingPage() {

    // Hooks
    const auth = useAuth();
    const listings = useListings();
    const { pageState } = usePage();
    
    const handleSubmit = async (values: ListingFormValues) => {

        const id = await listings.createListing({
            ...values,
            user_id: auth.user!.id,
            user_name: auth.user!.name
        })

        if(id) {
            router.replace('listings/' + id)
            toastSuccess('Success', 'Listing has been created')
        } else {
            toastError('Error', 'Could not create listing')
        }
    }

    return (
        <SessionPage
            pageState={pageState}
        >
            <ListingForm 
                onSubmit={handleSubmit}
            />
        </SessionPage>
    )
}

