//Core
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, StyleSheet } from 'react-native'

//Components
import Caption from './typography/Caption'
import Description from './typography/Description'
import ListingModel from '../types/ListingModel'

//Functions
import getAge from '../functions/getAge'

type Props = {
    item: ListingModel
}

export default function ListingSmall( { item }: Props ) {

    const navigation = useNavigation<any>()

    const handleListingPress = useCallback(() => {
        console.log('listing button press: ' + item.$id)
        navigation.navigate('Listing', {
            id: item.$id
        })
    }, [])

    return (
        <Pressable
            style={ styles.listing_item }
            onPress={ handleListingPress }
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
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    listing_item: {
        padding: 4,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'gray'
    }
})