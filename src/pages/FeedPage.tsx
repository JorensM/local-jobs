import { Models } from 'appwrite';
import { useState, useEffect } from 'react';
import { Text, Button, FlatList, View, StyleSheet } from 'react-native'
import constant from '../../const';

//Components
import Page from '../components/layout/Page';
import useAppwrite from '../functions/useAppwrite';
import useCheckLogin from '../functions/useCheckLogin';

type ListingModel = Models.Document & {
    title: string,
}

export default function FeedPage() {

    const [listings, setListings] = useState<ListingModel[]>([])

    const { checkSession } = useCheckLogin('Login')

    const { account, db } = useAppwrite()

    const handleLogoutPress = () => {
        account.deleteSession('current')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                checkSession('Login')
            })
    }

    useEffect(() => {
        db.listDocuments<ListingModel>(
            constant.db.id,
            constant.db.listings_id
        ).then( res => {
            console.log(res)
            setListings(res.documents)
        }).catch( err => {
            console.error('Could not retrieve listings', err)
        })
    }, [])

    return (
        <Page>
            <Text>
                Feed page
            </Text>
            <FlatList
                data={listings}
                renderItem={({ item }) => (
                    <View
                        style={ styles.listing_item }
                    >
                        { item.title }
                    </View>
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
    listing_item: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray'
    }
})