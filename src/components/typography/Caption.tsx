import { Text, StyleSheet } from 'react-native'
import { PropsWithChildren } from 'react';

export default function Caption({ children }: PropsWithChildren<{}>) {
    return (
        <Text
            style={ styles.caption }
        >
            { children }
        </Text>
    )
}

const styles = StyleSheet.create({
    caption: {
        fontSize: 14,
        color: 'gray'
    }
})