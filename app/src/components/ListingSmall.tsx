//Core
import { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//Components
import Caption from './typography/Caption'
import Description from './typography/Description'

// Types
import { Listing } from '#types/Listing'

//Functions
//import getAge from '#functions/getAge'
//import usePlacesAPI from '../functions/usePlacesAPI'

type Props = {
    item: Listing
    onPress: () => void
}

/**
 * Listing card, used to display basic info about a listing.
 * 
 * ## Props
 * 
 * * `item` - Listing object
 * * `onPress` - called when card is pressed
 */
export default function ListingSmall( { item, onPress }: Props ) {

    //const { getPlaceByID } = usePlacesAPI()

    const [ locationStr, setLocationStr ] = useState<string>('')

    const navigation = useNavigation<any>()

    const handleListingPress = useCallback(() => {
        // console.log('listing button press: ' + item.$id)
        // navigation.navigate('Listing', {
        //     id: item.$id
        // })
    }, [])

    const fetchLocationStr = () => {
        // if (!item.location_id) {
        //     return
        // }
        // getPlaceByID(item.location_id)
        //     .then((res: string)  => {
        //         setLocationStr(res)
        //     })
        //     .catch(err => {
        //         console.error('Could not fetch location by ID' + item.location_id, err)
        //     })
    }

    useEffect(() => {
        // if (item.location_id) {
        //     fetchLocationStr()
        // }
    }, [])

    return (
        <Pressable
            style={ styles.listing_item }
            onPress={ onPress }
        >
            <Text
                style={styles.title}
            >
                
                { item.title }
            </Text>
            <Caption>
                By { item.user_name }
            </Caption>
            {/* { item.location_name ? 
                <Caption>
                    { item.location_name }
                </Caption>
            : null } */}
            
            <Caption>
                {/* { getAge(item.$createdAt, true) } ago */}
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