// Core
import { useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';

// Components
import Page from '#components/layout/Page';
import ListingSmall from '#components/ListingSmall';

// Hooks
import useAuth from '#hooks/useAuth';
import useListings from '#hooks/useListings';
import useFocusEffect from '#hooks/useFocusEffect';
import usePage from '#hooks/usePage';

// Types
import { Listing } from '#types/Listing';

// Styles
import list from '#styles/list';
import ListSeparator from '#components/layout/ListSeparator';

/**
 * Feed page where listings are displayed
 */
export default function FeedPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const { pageState, setLoading } = usePage(true);

    // State
    const [listingsData, setListingsData] = useState<Listing[]>([]);

    // Handlers

    /**
     * On logout button press. Logs out user and redirects to login page
     */
    const handleLogoutPress = async () => {
        // Log user out
        auth.logout();
        // Redirect to login page
        router.replace('/');
    }

    /**
     * On listing card press. Redirects to that listing's page
     * @param id ID of the listing to redirect to
     */
    const handleListingPress = (id: number) => {
        // Redirect to appropriate listing page
        router.replace('/listings/' + id);
    }

    // Functions

    /**
     * Fetches all listings #TODO: fetch only the most recent listings
     */
    const fetchListings = async () => {
        setLoading(true);
        const listings_data = await listings.fetchListings();
        setListingsData(listings_data);
        setLoading(false);
    }

    // Effects

    useFocusEffect(() => {
        fetchListings();
    })

    return (
        <Page
            pageState={pageState}
            testID='FeedPage'
        >
            {/* Listings list */}
            <FlatList
                style={list.list}
                ItemSeparatorComponent={() => <ListSeparator />}
                data={listingsData}
                renderItem={({ item }: { item: Listing} ) => (
                    <ListingSmall 
                        item={item}
                        onPress={() => handleListingPress(item.id)}
                    />
                )}
            />
            {/* Logout button */}
            <Button
                onPress={handleLogoutPress}
                title='Logout'
                testID='button-login'
            />
        </Page>
    )
}