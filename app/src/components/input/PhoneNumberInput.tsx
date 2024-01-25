// Core
import { TextInput, View, Text } from 'react-native';
import { useField } from 'formik';

// Components
import InputBase from './InputBase';

// Styles
import form from '#styles/form';

type PhoneNumberInputProps = {
    /**
     * Formik name of phone number input
     */
    name: string,
    /**
     * Formik name of country code input
     */
    country_code_name: string,
    /**
     * Field's label
     */
    label: string,
}

export default function PhoneNumberInput({ label, name, country_code_name }: PhoneNumberInputProps) {

    // Hooks
    const [ ccField, ccMeta ] = useField(country_code_name);
    const [ numberField, numberMeta ] = useField(name)


    return (
        <InputBase
            label={label}
            error={ccMeta.error || numberMeta.error}
        >   
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    gap: 8
                }}
            >
                {/* 
                    Country Code. Must be wrapped in an additional view to be able
                    to show the prefix
                */}
                <View
                    style={{
                        ...form.input,
                        maxWidth: 64,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4
                    }}
                >
                    {/* Prefix */}
                    <Text
                        style={{
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            width: 'auto',
                            height: 'auto',
                            lineHeight: 0
                        }}
                    >
                        +
                    </Text>
                    {/* Country Code input */}
                    <TextInput
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        value={ccField.value}
                        onChangeText={(text: string) => ccField.onChange(country_code_name)(text)}
                    />
                </View>
                {/* Phone number input */}
                <TextInput
                    style={{
                        ...form.input,
                        flexGrow: 1
                    }}
                    value={numberField.value}
                    onChangeText={(text: string) => numberField.onChange(name)(text)}
                />
            </View>
            
        </InputBase>
    )
}