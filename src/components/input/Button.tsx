import { Pressable, PressableProps, Text, ViewStyle, StyleSheet } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

type ButtonProps = PressableProps & {
    label?: string
    style?: ViewStyle
    variant?: 'primary' | 'warn'
}

export default function Button({ label, style, variant = 'primary', ...props }: ButtonProps) {

    const colors = {
        primary: 'blue',
        warn: 'red'
    }

    return (
        <Pressable
            style={{
                borderColor: colors[variant],
                ...styles.button,
                ...(style ? style : {})
            }}
            { ...props }
        >
            <Text
                style={{
                    ...styles.button_text
                }}
            >
                { label }
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'blue',
        color: 'blue'
    },
    button_text: {
        color: 'blue'
    }
})