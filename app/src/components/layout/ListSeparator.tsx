// Core
import { View } from 'react-native'

type ListSeparatorProps = {
    /**
     * height of the separator, default 8
     */
    height?: number
}

/**
 * Basic list separator used for `FlatList`'s `itemSeparatorComponent` prop
 */
export default function ListSeparator( { height = 8 }: ListSeparatorProps) {
    return <View style={{height}} />
}