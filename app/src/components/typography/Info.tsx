// Core
import { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native'

/**
 * Info text, used for general short informative text.
 */
export default function Info({ children }: PropsWithChildren<{}>) {
    return (
        <Text
            style={ styles.info }
        >
            { children }
        </Text>
    )
}

const styles = StyleSheet.create({
    info: {
        color: 'orange'
    }
})