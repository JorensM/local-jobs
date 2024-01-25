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
    
    // Handlers

    /**
     * On submit button press. Creates new listing and redirecs to the newly created
     * listing's page
     * @param values Formik form values
     */
    const handleSubmit = async (values: ListingFormValues) => {

        try {
            // Create listing with provided form values and user's data
            const id = await listings.createListing({
                ...values,
                user_id: auth.user!.id,
                user_name: auth.user!.name
            })
            // If listing was created successfully, redirect to the new listing's page
            // and display a success toast
            if(id) {
                router.replace('listings/' + id);
                toastSuccess('Success', 'Listing has been created');
            } else {
                // Otherwise throw error
                throw new Error('Could not create listing');
            }
        } catch(error: any) {
            // Display error if there was one
            toastError('Error', error.message);
        }
        
    }

    return (
        <SessionPage
            pageState={pageState}
        >
            {/* New listing form */}
            <ListingForm 
                onSubmit={handleSubmit}
            />
        </SessionPage>
    )
}

