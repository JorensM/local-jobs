// Core
import { PropsWithChildren } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type InputBaseProps = {
    /**
     * Label text
     */
    label: string
    /**
     * Error text or null to hide error
     */
    error?: string | null | undefined
}

/**
 * Input base component to reuse common parts of an input, such as label and error message
 */
export default function InputBase({ label, error, children }: PropsWithChildren<InputBaseProps>) {
    return (
        <View>
            {/* Label */}
            <Text
                style={styles.label}
            >
                { label }
            </Text>
            {/* Contents */}
            {children}
            {/* Display error message if one is provided */}
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