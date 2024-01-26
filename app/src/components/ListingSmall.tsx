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
    item: Listing | null
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
            style={{
                ...list.item,
                minHeight: 64
            }}
            onPress={ onPress }
        >
            {/* Render data about listing or 'loading' if item is set to null */}
            {item ? (
                <>
                {/* <Text>Showing</Text> */}
                    {/* Title */}
                    <Text
                        style={text.title}
                    >
                        
                        { item.title }
                    </Text>
                    {/* Author */}
                    <Caption>
                        By { item.user_name }
                    </Caption>
                    {/* Age */}
                    <Caption>
                        { getAge(item.created_at, true) } ago
                    </Caption>
                    Description
                    <Description>
                        { item.description.slice(0, 100) }...
                    </Description>
                </>
                
            )
            : <Text style={text.warn}>Loading</Text> }
        </Pressable>
    )
}