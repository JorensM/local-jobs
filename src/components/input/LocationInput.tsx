import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import { useField, useFormikContext } from 'formik'
import { useState, useRef, useEffect } from 'react'

//Constants
import private_var from '../../../private'

type Props = {
    name: string,
    formik: any,
    placeholder?: string,
    onChange: (details: GooglePlaceData) => void
}

export default function LocationInput( { formik, name, placeholder, onChange, ...props }: Props ) {

    const [value, setValue] = useState<any>(null)

    const [field] = useField(name)

    const { setFieldValue } = useFormikContext()

    const handleChange = (data: GooglePlaceData) => {
        console.log('changed to: ', data)
        //const event: any = {}
        //event.target.name = name
        //event.target.value = item.value
        //setValue(item.value)
        setFieldValue(name, data.place_id)
        if (onChange) {
            onChange(data)
        }
    }

    const handleTextInputChange = (e: any) => {
        setValue(e.currentTarget.value)
    }

    return (
        <GooglePlacesAutocomplete
            styles={{
                container: {
                    marginBottom: 32
                }
            }}
            placeholder={placeholder || 'Location'}
            onPress={(data, details = null) => handleChange(data)}
            query={{
                key: private_var.api_keys.google.places,
                language: 'en'
            }}
            requestUrl={{
                url: 'https://corsproxy.io/?https://maps.googleapis.com/maps/api',
                useOnPlatform: 'all'
            }}
            textInputProps={{
                value: value,
                onChange: handleTextInputChange
            }}
            
        />
    )
}