// Core
import { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native'


/**
 * Description component, used for long description-type texts
 */
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
    }
})