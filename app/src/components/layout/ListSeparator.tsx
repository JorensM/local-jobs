// Core
import { View } from 'react-native'

type ListSeparatorProps = {
    height?: number
}

/**
 * Basic list separator used for `FlatList`'s `itemSeparatorComponent` prop
 * 
 * ## Props
 * 
 * * `height` - height of the separator, default 8
 */
export default function ListSeparator( { height = 8 }: ListSeparatorProps) {
    return <View style={{height}} />
}