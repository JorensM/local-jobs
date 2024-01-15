// Core
import { useState, useEffect, useCallback } from 'react';
import { Text, Button, FlatList, View, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router';
// import humanize from 'humanize-duration'


// Components
import Page from '#components/layout/Page';
import Caption from '#components/typography/Caption';
import Description from '#components/typography/Description';
import ListingSmall from '#components/ListingSmall';

// Hooks
import useAuth from '#hooks/useAuth';
import useListings from '#hooks/useListings';
import useFocusEffect from '#hooks/useFocusEffect';

// Types
import { Listing } from '#types/Listing';


//import ListingModel from '../types/ListingModel'

//Constants
// import constant from '../../const';


export default function FeedPage() {

    const listings = useListings();
    const auth = useAuth();

    const [listingsData, setListingsData] = useState<Listing[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const handleLogoutPress = async () => {

        auth.logout();
        router.replace('/login')

        // account.deleteSession('current')
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })
        //     .finally(() => {
        //         checkSession('Login')
        //     })
    }

    const handleListingPress = (id: number) => {

        router.replace('/listings/' + id)

        // console.log('listing button press: ' + id)
        // navigation.navigate('Listing', {
        //     id: id
        // })
    }

    const fetchListings = async () => {
        setLoading(true);
        const listings_data = await listings.fetchListings();
        console.log(listings_data)
        setListingsData(listings_data);
        setLoading(false);
        // db.listDocuments<ListingModel>(
        //     constant.db.id,
        //     constant.db.listings_id,
        //     [
        //         Query.orderDesc('$createdAt')
        //     ]
        // ).then( async (res) => {
        //     console.log(res)
        //     setListings(res.documents)
        // }).catch( err => {
        //     console.error('Could not retrieve listings', err)
        // })
    }

    useFocusEffect(() => {
        fetchListings()
    })

    const humanizeTime = (ms: number) => {
        // return humanize(
        //     ms,
        //     {
        //         round: true,
        //         units: ["y", "mo", "w", "d", "h", "m"],
        //         largest: 2
        //     }
        // )
    }

    /**
     * Get time span from given time to current time in ms
     * @param { number | string } time Time as a datetime string or a number in ms 
     * @param { boolean } humanize Whether to humanize the output as a human readable string
     * @returns { number | string } Number in ms if humanize is `false`, string if humanize is `true`
     */
    // const getAge = (time: number | string, humanize = false): number | string => {
    //     //console.log( time )
    //     //console.log( new Date() )
    //     //console.log( new Date(time) )
    //     const age = new Date().getTime() - new Date(time).getTime()
    //     //return humanize ? humanizeTime(age) : age
    // }

    return (
        <Page
            loading={loading}
        >
            <FlatList
                style={styles.listings_list}
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
    listings_list: {
        gap: 8
    },
    listing_item: {
        padding: 4,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray'
    }
})