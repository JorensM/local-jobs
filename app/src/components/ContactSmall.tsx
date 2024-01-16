import list from '#styles/list'
import { User } from '#types/User'
import { Pressable, Text } from 'react-native'

type ContactSmallProps = {
    item: User,
    onPress?: () => void
}

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