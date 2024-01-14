import { Button, View, FlatList, StyleSheet } from 'react-native'
import { Link, useFocusEffect } from '@react-navigation/native'

import Page from '../components/layout/Page'
import useAppwrite from '../functions/useAppwrite'
import { useCallback, useState } from 'react'
import ListingModel from '../types/ListingModel'
import constant from '../../const'
import { Query } from 'appwrite'
import ListingSmall from '../components/ListingSmall'

export default function MyListingsPage() {

    //Hooks
    const { db, account, currentUser } = useAppwrite()

    //State
    const [ listings, setListings ] = useState<ListingModel[]>([])
    const [ error, setError ] = useState<null | string>(null)
    const [ loading, setLoading ] = useState<boolean>(false)
    
    const handleAddListingPress = () => {

    }

    const fetchListings = async () => {

        setLoading(true)

        const user = currentUser!
        const user_id = user.$id

        console.log('user id:', user_id)

        db.listDocuments<ListingModel>(
            constant.db.id,
            constant.db.listings_id,
            [
                Query.equal('by_user', user_id)
            ]
        )
        .then(res => {
            setLoading(false)
            console.log(res)
            setListings(res.documents)
        })
        .catch(err => {
            const msg = "Could not fetch current user's listings"
            console.error(msg, err)
            setError(msg)
        })
    }

    useFocusEffect(
        useCallback(() => {
            fetchListings()
        }, [])
    )

    return (
        <Page
            error={error}
            loading={loading}
        >
            <FlatList
                style={styles.listings_list}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                data={listings}
                renderItem={({ item }) => <ListingSmall item={item} /> }
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
        </Page>
    )
}


const styles = StyleSheet.create({
    listings_list: {
        gap: 8
    }
})