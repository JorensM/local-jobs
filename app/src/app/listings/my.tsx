// Core
import  { useState } from 'react'
import { View, FlatList, StyleSheet, Button } from 'react-native'
import { router } from 'expo-router'

// Components
import ListingSmall from '#components/ListingSmall'
import SessionPage from '#components/layout/SessionPage'
import ListSeparator from '#components/layout/ListSeparator'

// Types
import { Listing } from '#types/Listing'

// Hooks
import useFocusEffect from '#hooks/useFocusEffect'
import useListings from '#hooks/useListings'
import useAuth from '#hooks/useAuth'
import usePage from '#hooks/usePage'

// Styles
import list from '#styles/list'

/**
 * Page showing user's posted listings
 */
export default function MyListingsPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const { setLoading, pageState } = usePage(true);

    // State
    /**
     * Listings to display
     */
    const [ listingsData, setListingsData ] = useState<Listing[]>([]);
    
    // Handlers

    /**
     * On listing card press. Redirects to that listing's page
     * @param id ID of the listing
     */
    const handleListingPress = (id: number) => {
        // Redirect to appropriate listing's page
        router.replace('/listings/' + id);
    }

    /**
     * On 'add listing' button press. Redirects to new-listing page
     */
    const handleAddListingPress = () => {
        // Redirect to new-listing page
        router.replace('/new-listing');
    }


    // Functions

    /**
     * Fetches all user's own listings
     */
    const fetchListings = async () => {

        setLoading(true);

        const _listings = await listings.fetchListings({
            filter: {
                user_id: auth.user!.id
            }
        });

        setListingsData(_listings);
        setLoading(false);

    }

    // Effects

    useFocusEffect(() => {
        fetchListings();
    }, [], true)

    return (
        <SessionPage
            pageState={pageState}
        >
            {/* Listings list */}
            <FlatList
                style={list.list}
                ItemSeparatorComponent={() => <ListSeparator />}
                data={listingsData}
                renderItem={({ item }) => (
                    <ListingSmall 
                        item={item} 
                        onPress={() => handleListingPress(item.id)}
                    /> 
                )}
            />
            {/* 'Add listing' button */}
            <Button
                onPress={() => handleAddListingPress()}
                title='Add Listing'
            />
        </SessionPage>
    )
}