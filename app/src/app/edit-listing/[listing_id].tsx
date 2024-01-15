// Core
import { useCallback, useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Button, Platform } from 'react-native'
import { useLocalSearchParams, usePathname } from 'expo-router'
// import { Formik } from 'formik'

// Types
import { Listing } from '#types/Listing'

// Hooks
import useFocusEffect from '#hooks/useFocusEffect'

// Components
import TextInput from '#components/input/TextInput'
import LocationInput from '#components/input/LocationInput'
import SessionPage from '#components/layout/SessionPage'
import ListingForm from '#components/forms/ListingForm'
import useListings from '#hooks/useListings'



type FormValues = {
    title: string,
    description: string,
    location_id?: string,
    location_name?: string
}

const initial_values: FormValues = {
    title: '',
    description: '',
    location_id: '',
    location_name: ''
}

export default function ListingEditPage() {

    

    // Hooks
    const { listing_id } = useLocalSearchParams();
    const pathname = usePathname()
    const listings = useListings();

    // State
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ listing, setListing ] = useState<Listing | null>(null);

    // const [ initialValues, setInitialValues ] = useState<FormValues>(initial_values)
    // const isFocused = useIsFocused()

    // const [ locationDetails, setLocationDetails ] = useState<GooglePlaceData | null>(null)

    //const [ locationInputValue, setLoctionInputValue ] = useState<string>()

    const fetchListing = async () => {
        setLoading(true);
        const _listing = await listings.fetchListing(listing_id as string)
        setListing(_listing)
        setLoading(false);
    }

    const handleSubmit = async (values: FormValues) => {

        //console.log(values)

        //return
        // const afterSuccessfulSubmit = (listing_id: string) => {
        //     navigation.navigate('Listing', {
        //         id: listing_id
        //     })
        // }

        // // console.log(route)
        // console.log(account)
        // console.log(db)
        // console.log('submitting')
        // console.log(process.env)
        // if (!route.params?.id) {
        //     const acc = await account.get()
        //     const id = acc.$id
        //     account.getSession('current').then(console.log)
        //     console.log('creating document')
        //     //const listing_id = ID.unique()
        //     db.createDocument<ListingModel>(
        //         '64e5bca5774c43c6e4b8', 
        //         '64e5bcac74d34020c488',
        //         ID.unique(),
        //         {
        //             title: values.title,
        //             by_user: id,
        //             by_user_name: acc.name,
        //             description: values.description,
        //             location_id: values.location_id,
        //             location_name: values.location_name
        //         }
        //     ).then( res => {
        //         console.log('Created listing', res)
        //         afterSuccessfulSubmit( res.$id )
        //     }).catch( err => {
        //         console.error('Could not create listing', err)
        //         setError('Could not create listing')
        //     })
        // } else {
        //     db.updateDocument<ListingModel>(
        //         constant.db.id,
        //         constant.db.listings_id,
        //         route.params.id,
        //         {
        //             title: values.title,
        //             description: values.description,
        //             location_id: values.location_id,
        //             location_name: values.location_name
        //         }
        //     )
        //     .then( res => {
        //         afterSuccessfulSubmit(route.params.id)
        //     })
        //     .catch( err => {
        //         console.error('Could not update listing', err)
        //         setError('Could not update listing')
        //     })
        // }
    }

    // useFocusEffect(
    //     // useCallback(() => {
    //     //     console.log('focusing')
    //     //     console.log(route.params?.id)
    //     //     if (route.params?.id) {
    //     //         db.getDocument<ListingModel>(
    //     //             constant.db.id,
    //     //             constant.db.listings_id,
    //     //             route.params.id
    //     //         )
    //     //         .then( listing => {
    //     //             console.log('retrieved listing')
    //     //             console.log(listing)
    //     //             setInitialValues({
    //     //                 description: listing.description,
    //     //                 title: listing.title,
    //     //                 location_id: listing.location_id || '',
    //     //                 location_name: listing.location_name || ''//#TODO add actual location from id
    //     //             })
    //     //             //initial_values.description = listing.description
    //     //             //initial_values.title = listing.title
    //     //         })
    //     //         .catch( err => {
    //     //             console.error('Could not retrieve document by id ' + route.params.id, err)
    //     //             setError('Could not retrieve document')
    //     //         })
    //     //     }
    //     //     //initial_values.description = 'ABCDDD'
    //     // }, [route])
    // )

    useFocusEffect(() => {
        fetchListing();
    }, [ listing_id ])

    // Set state to loading an unset listing when leaving page
    useEffect(() => {
        setLoading(true)
        setListing(null)
    }, [pathname])

    // useEffect(() => {
    //     // if (!isFocused) {
    //     //     navigation.setParams({ id: null })
    //     //     setInitialValues(initial_values)
    //     // }
    // }, [ isFocused ])

    return (
        <SessionPage
            error={error}
            loading={loading}
        >
            <ListingForm
                onSubmit={handleSubmit}
                listing={listing}
            />
        </SessionPage>
    )
}

const styles = StyleSheet.create({
    form: {
      gap: 16
    }
});