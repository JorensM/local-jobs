// Core
import { Pressable } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'

type Props = {
    /**
     * name of the icon from Expo's MaterialIcons package
     */
    name: keyof typeof MaterialIcon.glyphMap,
    /**
     * size of the icon in pixels
     */
    size?: number,
    /**
     * called when button is pressed
     */
    onPress?: () => void
}

/**
 * An icon button
 */
export default function IconButton( { size = 24, name, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
        >
            {/* Display icon wrapped in a Pressable */}
            <MaterialIcon name={name} size={size} />
        </Pressable>
    )
}