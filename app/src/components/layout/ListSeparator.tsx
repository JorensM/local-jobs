import { View } from 'react-native'

type ListSeparatorProps = {
    height?: number
}

export default function ListSeparator( { height = 8 }: ListSeparatorProps) {
    return <View style={{height}} />
}