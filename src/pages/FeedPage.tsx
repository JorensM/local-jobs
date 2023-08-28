//Core
import { useFocusEffect } from '@react-navigation/native';
import { Models } from 'appwrite';
import { useState, useEffect, useCallback } from 'react';
import { Text, Button, FlatList, View, StyleSheet, Pressable } from 'react-native'
import humanize from 'humanize-duration'


//Components
import Page from '../components/layout/Page';
import useAppwrite from '../functions/useAppwrite';
import useCheckLogin from '../functions/useCheckLogin';
import Caption from '../components/typography/Caption';

//Constants
import constant from '../../const';
import { DrawerScreenProps } from '@react-navigation/drawer';
import ParamList from './ParamList';
import Description from '../components/typography/Description';

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

    const humanizeTime = (ms: number) => {
        return humanize(
            ms,
            {
                largest: 2
            }
        )
    }

    /**
     * Get time span from given time to current time in ms
     * @param { number | string } time Time as a datetime string or a number in ms 
     * @param { boolean } humanize Whether to humanize the output as a human readable string
     * @returns { number | string } Number in ms if humanize is `false`, string if humanize is `true`
     */
    const getAge = (time: number | string, humanize = false): number | string => {
        //console.log( time )
        //console.log( new Date() )
        //console.log( new Date(time) )
        const age = new Date().getTime() - new Date(time).getTime()
        return humanize ? humanizeTime(age) : age
    }

    return (
        <Page>
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
                        <Caption>
                            By { item.by_user_name }
                        </Caption>
                        <Caption>
                            { getAge(item.$createdAt, true) } ago
                        </Caption>
                        <Description>
                            { item.description.slice(0, 100) }...
                        </Description>
                        
                        
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