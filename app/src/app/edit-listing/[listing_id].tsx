// Core
import { useEffect, useState, } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'

// Types
import { Listing } from '#types/Listing'

// Hooks
import useFocusEffect from '#hooks/useFocusEffect'
import usePage from '#hooks/usePage'
import useListings from '#hooks/useListings'

// Misc
import { toastError, toastSuccess } from '#misc/toast'

// Components
import SessionPage from '#components/layout/SessionPage'
import ListingForm, { ListingFormValues } from '#components/forms/ListingForm'


/**
 * Page for editing listing a listing
 */
export default function ListingEditPage() {

    // Hooks
    const {
        /**
         * ID of the listing to be edited
         */
        listing_id
    } = useLocalSearchParams();
    const pathname = usePathname()
    const listings = useListings();
    const { setLoading, pageState } = usePage();

    // State
    /**
     * Listing's data
     */
    const [ listing, setListing ] = useState<Listing | null>(null);

    // Do not delete this as we will need to implement location field in the future
    //const [ locationDetails, setLocationDetails ] = useState<GooglePlaceData | null>(null)
    //const [ locationInputValue, setLoctionInputValue ] = useState<string>()

    // Handlers

    /**
     * On form submitted. Updates the listing with the new values
     * @param values values of the Formik form
     */
    const handleSubmit = async (values: ListingFormValues) => {

        // Update listing with new values and return whether the update was successful.
        const success = await listings.updateListing({
            ...values,
            id: parseInt(listing_id as string)
        });

        if(success) {
            router.replace('listings/' + listing_id);
        }
    }

    // Functions

    /**
     * Fetch the listing data from DB and set the listing state to it
     */
    const fetchListing = async () => {
        setLoading(true);
        const _listing = await listings.fetchListing(listing_id as string)
        setListing(_listing)
        setLoading(false);
    }

    // Effects

    useFocusEffect(() => {
        fetchListing();
    }, [ listing_id ], true)

    // Set state to loading an unset listing when leaving page
    useEffect(() => {
        setLoading(true)
        setListing(null)
    }, [pathname])

    return (
        <SessionPage
            pageState={pageState}
        >
            {/* Listing edit form */}
            <ListingForm
                onSubmit={handleSubmit}
                listing={listing}
            />
        </SessionPage>
    )
}