//Core
import { useFocusEffect } from '@react-navigation/native';
import { Models } from 'appwrite';
import { useState, useEffect, useCallback } from 'react';
import { Text, Button, FlatList, View, StyleSheet, Pressable } from 'react-native'


//Components
import Page from '../components/layout/Page';
import useAppwrite from '../functions/useAppwrite';
import useCheckLogin from '../functions/useCheckLogin';

//Constants
import constant from '../../const';
import { DrawerScreenProps } from '@react-navigation/drawer';
import ParamList from './ParamList';

type ListingModel = Models.Document & {
    by_user_name: string,
    title: string,
    description: string,
}

type Props = DrawerScreenProps<ParamList>

export default function FeedPage( { navigation }: Props) {

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

    const handleListingPress = (id: string) => {
        console.log('listing button press: ' + id)
        navigation.navigate('Listing', {
            id: id
        })
    }

    const fetchListings = () => {
        db.listDocuments<ListingModel>(
            constant.db.id,
            constant.db.listings_id
        ).then( async (res) => {
            console.log(res)
            setListings(res.documents)
        }).catch( err => {
            console.error('Could not retrieve listings', err)
        })
    }

    useFocusEffect(
        useCallback(() => {
            fetchListings()
        }, [])
    )

    useEffect(() => {
        fetchListings()
    }, [])

    return (
        <Page>
            <Text>
                Feed page
            </Text>
            <FlatList
                style={styles.listings_list}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                data={listings}
                renderItem={({ item }) => (
                    <Pressable
                        style={ styles.listing_item }
                        onPress={ () => handleListingPress( item.$id ) }
                    >
                        <Text
                            style={styles.title}
                        >
                            
                            { item.title }
                        </Text>
                        <Text>
                            { item.description.slice(0, 100) }...
                        </Text>
                        <Text>
                            By { item.by_user_name }
                        </Text>
                        
                    </Pressable>
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