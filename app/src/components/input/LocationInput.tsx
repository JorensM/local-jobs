//import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import { useField, useFormikContext } from 'formik'
import { useState, useRef, useEffect } from 'react'

//Constants
//import private_var from '@'

type Props = {
    id_name: string,
    name_name: string,
    formik: any,
    placeholder?: string,
    //onChange?: (details: GooglePlaceData) => void
}

export default function LocationInput( { formik, name_name, id_name, placeholder, /*onChange,*/ ...props }: Props ) {

//     const [value, setValue] = useState<any>(null)

//     const [field] = useField(id_name)
//     const [ name_field ] = useField(name_name)

//     const { setFieldValue } = useFormikContext()

//     const handleChange = (data: GooglePlaceData) => {
//         console.log('changed to: ', data)
//         //const event: any = {}
//         //event.target.name = name
//         //event.target.value = item.value
//         //setValue(item.value)
//         setFieldValue(id_name, data.place_id)
//         setFieldValue(name_name, data.description)
//         setValue(data.description)
//         if (onChange) {
//             onChange(data)
//         }
//     }

//     const handleTextInputChange = (e: any) => {
//         console.log(e)
//         setFieldValue(name_name, e.target.value)
//     }

//     return (<></>
//         // <GooglePlacesAutocomplete
//         //     styles={{
//         //         container: {
//         //             marginBottom: 32
//         //         }
//         //     }}
//         //     placeholder={placeholder || 'Location'}
//         //     onPress={(data, details = null) => handleChange(data)}
//         //     query={{
//         //         key: private_var.api_keys.google.places,
//         //         language: 'en'
//         //     }}
//         //     requestUrl={{
//         //         url: 'https://corsproxy.io/?https://maps.googleapis.com/maps/api',
//         //         useOnPlatform: 'all'
//         //     }}
//         //     textInputProps={{
//         //         value: name_field.value,
//         //         onChange: handleTextInputChange
//         //     }}
            
//         // />
//     )
}