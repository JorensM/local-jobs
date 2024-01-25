//Core
import { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//Components
import Caption from './typography/Caption'
import Description from './typography/Description'

// Types
import { Listing } from '#types/Listing'

// Misc
import getAge from '#misc/getAge'

// Styles
import list from '#styles/list'
import text from '#styles/text'

//Functions
//import getAge from '#functions/getAge'
//import usePlacesAPI from '../functions/usePlacesAPI'

type Props = {
    /**
     * Listing object
     */
    item: Listing
    /**
     * called when card is pressed
     */
    onPress: () => void
}

/**
 * Listing card, used to display basic info about a listing.
 */
export default function ListingSmall( { item, onPress }: Props ) {

    

    // State

    const [ locationStr, setLocationStr ] = useState<string>('')

    // Keep this for now as it may be needed when implementing location field
    //const { getPlaceByID } = usePlacesAPI()
    //const fetchLocationStr = () => {
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
    //}
    //useEffect(() => {
        // if (item.location_id) {
        //     fetchLocationStr()
        // }
    //}, [])

    return (
        <Pressable
            style={ list.item }
            onPress={ onPress }
        >
            {/* Listing title */}
            <Text
                style={text.title}
            >
                
                { item.title }
            </Text>
            {/* Listing author */}
            <Caption>
                By { item.user_name }
            </Caption>
            {/* { item.location_name ? 
                <Caption>
                    { item.location_name }
                </Caption>
            : null } */}
            {/* Listing age */}
            <Caption>
                { getAge(item.created_at, true) } ago
            </Caption>
            {/* Listing description, only showing first 100 characters */}
            <Description>
                { item.description.slice(0, 100) }...
            </Description>
            
            
        </Pressable>
    )
}