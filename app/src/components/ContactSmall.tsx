// Core
import { Pressable, Text } from 'react-native'

// Types
import { User } from '#types/User'

// Styles
import list from '#styles/list'

type ContactSmallProps = {
    item: User,
    onPress?: () => void
}

/**
 * Contact card, displays basic information about a contact
 * 
 * # Props
 * 
 * * `item` - User object of the contact
 * * `onPress` - called when card is pressed
 */
export default function ContactSmall({ item, onPress = () => {}}: ContactSmallProps) {
    return (
        <Pressable
            style={{
                ...list.item,
                padding: 16
            }}
            onPress={onPress}
        >
            <Text>
                { item.name }
            </Text>
        </Pressable>
    )
}