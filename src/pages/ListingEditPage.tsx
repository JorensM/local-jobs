import { View, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'

// import TextInput from 'components/input/TextInput'
import SessionPage from '../components/layout/SessionPage'
import Page from '../components/layout/Page'
import TextInput from '../components/input/TextInput'
import useAppwrite from 'src/functions/useAppwrite'
//import TextInput from '@/components/input/TextInput'


type FormValues = {
    title: string
}

const initial_values: FormValues = {
    title: ''
}

export default function ListingEditPage() {

    const { db } = useAppwrite()

    const handleSubmit = () => {

    }

    return (
        <SessionPage>
            <Formik
                initialValues={initial_values}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <View
                        style={styles.form}
                    >
                        <TextInput
                            name='title'
                            formik={formik}
                            label='Listing Title'
                        />
                        <Button
                            onPress={() => formik.handleSubmit()}
                            title='Save'
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                    </View>
                )}
            </Formik>
        </SessionPage>
    )
}

const styles = StyleSheet.create({
    form: {
      gap: 16
    }
});