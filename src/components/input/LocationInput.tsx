import { GooglePlaceData, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useField, useFormikContext } from 'formik'
import { useState } from 'react'

//Constants
import private_var from '../../../private'

type Props = {
    name: string,
    formik: any,
    placeholder?: string
}

export default function LocationInput( { formik, name, ...props }: Props ) {

    const [value, setValue] = useState<any>(null)

    const [field] = useField(name)

    const { setFieldValue } = useFormikContext()

    const handleChange = (data: GooglePlaceData) => {
        //const event: any = {}
        //event.target.name = name
        //event.target.value = item.value
        //setValue(item.value)
        setFieldValue(name, data.place_id)
    }

    return (
        <GooglePlacesAutocomplete
            styles={{
                container: {
                    marginBottom: 32
                }
            }}
            placeholder={props.placeholder || 'Location'}
            onPress={(data, details = null) => handleChange(data)}
            query={{
                key: private_var.api_keys.google.places,
                language: 'en'
            }}
            requestUrl={{
                url: 'https://corsproxy.io/?https://maps.googleapis.com/maps/api',
                useOnPlatform: 'all'
            }}
        />
    )
}