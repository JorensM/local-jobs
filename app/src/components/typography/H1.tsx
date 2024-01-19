// Core
import { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native'


/**
 * H1 component
 */
export default function H1( { children }: PropsWithChildren<{}> ) {
    return (
        <Text
            style={styles.h1}
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})