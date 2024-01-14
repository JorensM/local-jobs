import { 
    Text, 
    View, 
    StyleSheet,
    TextInput as NativeTextInput, 
    StyleSheetProperties,
    StyleProp,
    ViewStyle,
    TextStyle,
    TextInputProps,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native'
import { Field, useField } from 'formik';
import React, { ChangeEvent, ComponentProps, useMemo, useState } from 'react';


type Props = TextInputProps & {
    formik: any,
    name: string,
    // style?: StyleProp<TextStyle>,
    label: string
}

export default function TextInput( { 
    formik, 
    label, 
    name,
    style,
    ...props
}: Props ) {

    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    const [field, meta, helpers] = useField<any>(name);

    console.log(formik.errors)

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
                onBlur={() => { 
                    field.onBlur(name)(null)
                    setIsFocused(false)
                }}
                onFocus={() => setIsFocused(true)}
                value={field.value}
                {...props}
            />
            {formik.errors[name] ? 
                <Text
                    style={{
                        color: 'red'
                    }}
                >
                    {formik.errors[name]}
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