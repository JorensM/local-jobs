// Core
import { StyleSheet, View, Button } from 'react-native';
import { Formik } from 'formik';
import { useMemo } from 'react';
import * as Yup from 'yup';

// Components
import TextInput from '#components/input/TextInput';

// Types
import { Listing } from '#types/Listing';


export type ListingFormValues = {
    title: string,
    description: string,
    // location_id?: string,
    // location_name?: string
}

const default_values: ListingFormValues = {
    title: '',
    description: '',
    // location_id: '',
    // location_name: ''
}

type ListingFormProps = {
    onSubmit?: (values: ListingFormValues) => void
    listing?: Listing | null
}

/**
 * Listing edit/create form
 * 
 * ## Props
 * 
 * * `onSubmit` - called when the form is submitted. Validation i 
 */
export default function ListingForm( { onSubmit = () => {}, listing = undefined }: ListingFormProps) {

    const initialValues = useMemo<ListingFormValues>(() => {
        if(listing) {
            return {
                title: listing.title,
                description: listing.description
            }
        } else {
            return default_values
        }
    }, [listing])

    // const [ initialValues, setInitialValues ] = useState<ListingFormValues>(default_values)

    return (
        <Formik<ListingFormValues>
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <View
                    style={styles.form}
                >
                    <TextInput
                        name='title'
                        label='Listing Title'
                    />
                    <TextInput
                        name='description'
                        label='Description'
                        style={{
                            height: 128
                        }}
                        multiline
                    />
                    {/* <LocationInput
                        id_name='location_id'
                        name_name='location_name'
                        formik={formik}
                        // onChange={setLocationDetails}
                        // value={locationValue}
                    /> */}
                    <Button
                        onPress={() => formik.handleSubmit()}
                        title='Save'
                    />
                    {/* <Button onPress={handleSubmit} title="Submit" /> */}
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    form: {
      gap: 16
    }
});