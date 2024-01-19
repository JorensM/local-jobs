// Core
import { 
    Text, 
    View, 
    StyleSheet,
    TextInput as NativeTextInput, 
    TextInputProps,
} from 'react-native'
import { useField } from 'formik';
import React, { useState } from 'react';


type Props = TextInputProps & {
    name: string,
    // style?: StyleProp<TextStyle>,
    label: string
}

export default function TextInput( { 
    label, 
    name,
    style,
    ...props
}: Props ) {

    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    const [field, meta, helpers] = useField<any>(name);

    return (
        <View>
            <Text
                style={styles.label}
            >
                { label }
            </Text>
            <NativeTextInput
                style={{
                    ...styles.input,
                    ...(typeof style == 'object' ? style : {})
                }}
                onChangeText={(value: string) => {
                    console.log('changing')
                    field.onChange(name)(value)/*e.nativeEvent.text)*/;
                }/*formik.handleChange(name)*/}
                onBlur={(e) => { 
                    field.onBlur(name)(e)
                    setIsFocused(false)
                }}
                onFocus={() => setIsFocused(true)}
                value={field.value}
                {...props}
            />
            {meta.error ? 
                <Text
                    style={{
                        color: 'red'
                    }}
                >
                    {meta.error}
                </Text>
            : null}
            
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