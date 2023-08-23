import { 
    Text, 
    View, 
    StyleSheet,
    TextInput as NativeTextInput, 
    StyleSheetProperties,
    StyleProp,
    ViewStyle,
    TextStyle,
    TextInputProps
} from 'react-native'
import { Field } from 'formik';
import { ComponentProps, useMemo, useState } from 'react';


type Props = TextInputProps & {
    formik: any,
    name: string,
    label: string
}

export default function TextInput( { 
    formik, 
    label, 
    name,
    ...props
}: Props ) {

    const [ isFocused, setIsFocused ] = useState<boolean>(false)

    return (
        <View>
            <Text
                style={styles.label}
            >
                { label }
            </Text>
            <NativeTextInput
                style={styles.input}
                onChangeText={formik.handleChange(name)}
                onBlur={() => { formik.handleBlur(name); setIsFocused(false) }}
                onFocus={() => setIsFocused(true)}
                value={formik.values[name]}
                {...props}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: 'gray'
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 32
    }
})