import { Text, StyleSheet } from 'react-native'
import { PropsWithChildren } from 'react';

type InfoProps = {
    variant?: 'default' | 'dark'
}

const color_map = {
    default: 'orange',
    dark: 'black'
}

export default function Info({ children, variant = 'default' }: PropsWithChildren<InfoProps>) {

    return (
        <Text
            style={{
                color: color_map[variant]
            }}
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