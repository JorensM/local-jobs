// Core
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, ViewToken } from 'react-native';
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
import { getRouteName, route_names } from '#constants/routes';

const PER_PAGE = 8;

/**
 * Feed page where listings are displayed
 */
export default function FeedPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const { pageState, setLoading } = usePage(false);

    // State
    /**
     * Listings data. if an element is null, it means it is out of view so shouldn't
     * be rendered. Once it becomes non-null, it gets fetched
     */
    const [listingsData, setListingsData] = useState<(Listing | null)[]>([]);

    // Refs
    const listingsDataRef = useRef(listingsData);

    // Handlers

    /**
     * On logout button press. Logs out user and redirects to login page
     */
    const handleLogoutPress = async () => {
        // Log user out
        auth.logout();
        // Redirect to login page
        router.replace(route_names.login);
    }

    /**
     * On listing card press. Redirects to that listing's page
     * @param id ID of the listing to redirect to
     */
    const handleListingPress = (id: number) => {
        // Redirect to appropriate listing page
        router.replace(getRouteName(route_names.listing, id));
    }

    // const handleViewableItemsChanged = ({ changed, viewableItems }: {changed: ViewToken[], viewableItems: ViewToken[]}) => {

    //     if(listingsDataRef.current.length == 0 || viewableItems.length == 0) {
    //         return;
    //     }
    //     //console.log('listing data');
    //     //console.log(listingsDataRef.current)

    //     const visible_pages = new Set<number>();

    //     for(const viewableItem of viewableItems) {
    //         const index = viewableItem.index!;

    //         const page = Math.floor(index / PER_PAGE)

    //         if(!viewableItem.item) {
    //             visible_pages.add(page);
    //         }
            
    //     }

        

    //     //console.log(current_page);
        
    //     const new_data = [...listingsDataRef.current];

    //     // console.log(changed);
    //     //console.log(viewableItems);

    //     new_data.forEach((item, index) => {
    //         //console.log(index);
    //         // If data entry is visible on screen
    //         if(item != null && viewableItems.every(viewable_item => viewable_item.index != index)) {
    //             new_data[index] = null;
    //             // new_data[index] = null;//.hidden = true;

    //         } else if (item == null) {
    //             //console.log('a')
    //         }
    //     })


    //     visible_pages.forEach((page: number) => {
    //         console.log('page: ' + page)
    //         fetchListings(page);
    //     })
    //     //console.log('new data')
    //     //console.log(new_data)

    //     setListingsData((old_state) => new_data);

       
    // }

    // const viewabilityConfig = useMemo(() => ({
    //     minimumViewTime: 1 * 1000,
    //     itemVisiblePercentThreshold: 1
    // }), []);
    // const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged: handleViewableItemsChanged }])

    // Functions

    /**
     * Fetches all listings #TODO: fetch only the most recent listings
     */
    const fetchListings = async (page?: number) => {
        const new_listings = listings.fetchListings({
            page: page,
            per_page: PER_PAGE
        }) 
    }

    // Effects

    useFocusEffect(() => {
        fetchListings();
    })

    useEffect(() => {
        listingsDataRef.current = listingsData
    }, [listingsData])

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
                keyExtractor={(item, index) => {
                    return 'listing' + index
                }}
                renderItem={({ item, index }: { item: Listing | null, index: number} ) => (
                    <ListingSmall 
                        item={item}
                        onPress={() => {
                            item ? handleListingPress(item.id) : null
                        }}
                    />
                )}
                // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                
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