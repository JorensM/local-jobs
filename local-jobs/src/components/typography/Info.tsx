import { Text, StyleSheet } from 'react-native'
import { PropsWithChildren } from 'react';

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