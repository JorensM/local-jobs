// Core
import { PropsWithChildren } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type InputBaseProps = {
    label: string
    error?: string | null | undefined
}

/**
 * Input base component to reuse common parts of an input, such as label and error message
 * 
 * ## Props
 * 
 * `label` - Label text
 * `error` - Error text or null to hide error
 */
export default function InputBase({ label, error, children }: PropsWithChildren<InputBaseProps>) {
    return (
        <View>
            <Text
                style={styles.label}
            >
                { label }
            </Text>
            {children}
            {error ? 
                <Text
                    style={{
                        color: 'red'
                    }}
                >
                    {error}
                </Text>
            : null}
        </View>
        
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: 'gray'
    }
});