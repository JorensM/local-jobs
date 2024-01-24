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

// Components
import InputBase from './InputBase';

// Styles
import form from '#styles/form'


type Props = TextInputProps & {
    name: string,
    label: string
}

/**
 * Text input component
 * 
 * # Props
 * 
 * * `label` - label of the field
 * * `name` - unique name to identify field in formik
 * 
 * And any native TextInput props
 * @returns 
 */
export default function TextInput( { 
    label, 
    name,
    style,
    ...props
}: Props ) {

    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    const [field, meta ] = useField<any>(name);

    return (
        <InputBase
            label={label}
            error={meta.error}
        >
            <NativeTextInput
                style={{
                    ...form.input,
                    ...(typeof style == 'object' ? style : {}),
                    ...(props.multiline ? {
                        paddingTop: 8,
                        paddingBottom: 8
                    } : {})
                }}
                onChangeText={(value: string) => {
                    // console.log('changing')
                    field.onChange(name)(value)/*e.nativeEvent.text)*/;
                }/*formik.handleChange(name)*/}
                onBlur={(e) => { 
                    field.onBlur(name)(e)
                    setIsFocused(false)
                }}
                onFocus={() => setIsFocused(true)}
                value={field.value}
                testID={'input-' + name}
                {...props}
            />
        </InputBase>
    )
}