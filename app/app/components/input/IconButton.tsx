import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { Pressable } from 'react-native'

type Props = {
    name: keyof typeof MaterialIcon.glyphMap,
    size?: number,
    onPress?: () => void
}

export default function IconButton( { size, name, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
        >
            <MaterialIcon name={name} size={size} />
        </Pressable>
    )
}