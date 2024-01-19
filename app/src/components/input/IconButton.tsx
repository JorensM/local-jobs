// Core
import { Pressable } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'

type Props = {
    name: keyof typeof MaterialIcon.glyphMap,
    size?: number,
    onPress?: () => void
}

/**
 * An icon button
 * 
 * ## Props
 * 
 * * `size` - size of the icon in pixels
 * * `name` - name of the icon from Expo's MaterialIcons package
 * * `onPress` - called when button is pressed
 */
export default function IconButton( { size, name, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
        >
            <MaterialIcon name={name} size={size} />
        </Pressable>
    )
}