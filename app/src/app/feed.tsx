// Core
import { useState } from 'react';
import { Button, FlatList, View, StyleSheet } from 'react-native'
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

    const handleLogoutPress = async () => {
        auth.logout();
        router.replace('/')
    }

    const handleListingPress = (id: number) => {
        router.replace('/listings/' + id)
    }

    const fetchListings = async () => {
        setLoading(true);
        const listings_data = await listings.fetchListings();
        console.log(listings_data)
        setListingsData(listings_data);
        setLoading(false);
    }

    useFocusEffect(() => {
        fetchListings()
    })

    

    return (
        <Page
            pageState={pageState}
        >
            <FlatList
                style={list.list}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                data={listingsData}
                renderItem={({ item }: { item: Listing} ) => (
                    <ListingSmall 
                        item={item}
                        onPress={() => handleListingPress(item.id)}
                    />
                )}
            />
            <Button
                onPress={handleLogoutPress}
                title='Logout'
            />
        </Page>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
})