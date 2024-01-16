import { User } from '#types/User'
import { Pressable } from 'react-native/types'

type ContactSmallProps = {
    item: User,
    onPress?: () => void
}

export default function ContactSmall({ item, onPress = () => {}}: ContactSmallProps) {
    return (
        <Pressable>
            
        </Pressable>
    )
}