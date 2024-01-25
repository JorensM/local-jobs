// Core
import { Pressable, Text } from 'react-native'

// Types
import { User } from '#types/User'

// Styles
import list from '#styles/list'

type ContactSmallProps = {
    /**
     * User object of the contact
     */
    item: User,
    /**
     * called when card is pressed
     */
    onPress?: () => void
}

/**
 * Contact card, displays basic information about a contact
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
            {/* Contact name */}
            <Text>
                { item.name }
            </Text>
        </Pressable>
    )
}