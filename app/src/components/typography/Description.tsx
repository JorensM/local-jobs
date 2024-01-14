import { Text, StyleSheet } from 'react-native'
import { PropsWithChildren } from 'react';

export default function Description({ children }: PropsWithChildren<{}>) {
    return (
        <Text
            style={ styles.description }
        >
            { children }
        </Text>
    )
}

const styles = StyleSheet.create({
    description: {
        marginVertical: 8,
        // fontSize: 14,
        // color: 'black'
    }
})