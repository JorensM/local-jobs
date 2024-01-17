// Core
import { useEffect, useState, } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'

// Types
import { Listing } from '#types/Listing'

// Hooks
import useFocusEffect from '#hooks/useFocusEffect'
import usePage from '#hooks/usePage'
import useListings from '#hooks/useListings'

// Components
import SessionPage from '#components/layout/SessionPage'
import ListingForm, { ListingFormValues } from '#components/forms/ListingForm'

/**
 * Page for editing listing a listing
 */
export default function ListingEditPage() {

    // Hooks
    const { listing_id } = useLocalSearchParams();
    const pathname = usePathname()
    const listings = useListings();
    const { setLoading, setError, pageState } = usePage();

    // State
    const [ listing, setListing ] = useState<Listing | null>(null);

    // const [ locationDetails, setLocationDetails ] = useState<GooglePlaceData | null>(null)
    //const [ locationInputValue, setLoctionInputValue ] = useState<string>()

    // Handlers

    const handleSubmit = async (values: ListingFormValues) => {

        const success = await listings.updateListing({
            ...values,
            id: parseInt(listing_id as string)
        })

        if(success) {
            router.replace('listings/' + listing_id)
        }
    }

    // Functions

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
            <ListingForm
                onSubmit={handleSubmit}
                listing={listing}
            />
        </SessionPage>
    )
}