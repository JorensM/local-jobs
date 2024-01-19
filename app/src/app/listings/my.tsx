// Core
import  { useState } from 'react'
import { View, FlatList, StyleSheet, Button } from 'react-native'
import { router } from 'expo-router'

// Components
import ListingSmall from '#components/ListingSmall'
import SessionPage from '#components/layout/SessionPage'

// Types
import { Listing } from '#types/Listing'

// Hooks
import useFocusEffect from '#hooks/useFocusEffect'
import useListings from '#hooks/useListings'
import useAuth from '#hooks/useAuth'
import usePage from '#hooks/usePage'
import ListSeparator from '#components/layout/ListSeparator'

/**
 * Page showing user's posted listings
 */
export default function MyListingsPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const { setLoading, pageState } = usePage(true);

    // State
    const [ listingsData, setListingsData ] = useState<Listing[]>([])
    
    // Handlers
    const handleListingPress = (id: number) => {
        router.replace('/listings/' + id)
    }

    const handleAddListingPress = () => {
        router.replace('/new-listing')
    }


    // Functions

    const fetchListings = async () => {

        setLoading(true)

        const _listings = await listings.fetchListings({
            filter: {
                user_id: auth.user!.id
            }
        })

        setListingsData(_listings);
        setLoading(false)

    }

    // Effects

    useFocusEffect(() => {
        if (auth.user) {
            fetchListings()
        }
    }, [auth.user])

    return (
        <SessionPage
            pageState={pageState}
        >
            <FlatList
                style={styles.listings_list}
                ItemSeparatorComponent={() => <ListSeparator />}
                data={listingsData}
                renderItem={({ item }) => (
                    <ListingSmall 
                        item={item} 
                        onPress={() => handleListingPress(item.id)}
                    /> 
                )}
            />
            <Button
                onPress={() => handleAddListingPress()}
                title='Add Listing'
            />
            {/* <Link
                to={{
                    screen: 'ListingEdit'
                }}
            >
                Add Listing
            </Link> */}
        </SessionPage>
    )
}


const styles = StyleSheet.create({
    listings_list: {
        gap: 8
    }
})