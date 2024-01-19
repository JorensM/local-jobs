// Core
import { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native'


/**
 * Caption component. Used for secondary text
 */
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