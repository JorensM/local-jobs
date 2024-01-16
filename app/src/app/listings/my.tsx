// Core
import  { useCallback, useState } from 'react'
import { Button, View, FlatList, StyleSheet } from 'react-native'

// Components
import ListingSmall from '#components/ListingSmall'
import SessionPage from '#components/layout/SessionPage'

// Types
import { Listing } from '#types/Listing'

// Hooks
import useFocusEffect from '#hooks/useFocusEffect'
import useListings from '#hooks/useListings'
import useAuth from '#hooks/useAuth'
import { router } from 'expo-router'

export default function MyListingsPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();

    // State
    const [ listingsData, setListingsData ] = useState<Listing[]>([])
    const [ error, setError ] = useState<null | string>(null)
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleListingPress = (id: number) => {
        router.replace('/listings/' + id)
    }

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

    useFocusEffect(() => {
        fetchListings()
    })

    return (
        <SessionPage
            error={error}
            loading={loading}
        >
            <FlatList
                style={styles.listings_list}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                data={listingsData}
                renderItem={({ item }) => (
                    <ListingSmall 
                        item={item} 
                        onPress={() => handleListingPress(item.id)}
                    /> 
                )}
            />
            {/* <Button
                onPress={() => handleAddListingPress()}
                title='Add Listing'
            /> */}
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