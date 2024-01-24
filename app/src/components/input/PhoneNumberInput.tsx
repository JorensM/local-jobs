// Core
import { TextInput, View, Text } from 'react-native';
import { useField } from 'formik';

// Components
import InputBase from './InputBase';

// Styles
import form from '#styles/form';

type PhoneNumberInputProps = {
    name: string,
    country_code_name: string,
    label: string,
}

export default function PhoneNumberInput({ label, name, country_code_name }: PhoneNumberInputProps) {

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
                <View
                    style={{
                        ...form.input,
                        maxWidth: 64,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4
                    }}
                >
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
                    <TextInput
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        value={ccField.value}
                        onChangeText={(text: string) => ccField.onChange(country_code_name)(text)}
                    />
                </View>
                
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