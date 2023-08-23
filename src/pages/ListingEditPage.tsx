import { View, StyleSheet, Button } from 'react-native'
import { ID } from 'appwrite'
import { Formik } from 'formik'

// import TextInput from 'components/input/TextInput'
import SessionPage from '../components/layout/SessionPage'
import Page from '../components/layout/Page'
import TextInput from '../components/input/TextInput'
import useAppwrite from '../functions/useAppwrite'
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import ParamList from './ParamList'
//import TextInput from '@/components/input/TextInput'


type FormValues = {
    title: string
}

const initial_values: FormValues = {
    title: ''
}

type Props = DrawerScreenProps<ParamList, 'ListingEdit'>

export default function ListingEditPage( { route }: Props ) {

    const { db, account } = useAppwrite()

    const handleSubmit = (values: FormValues) => {
        // console.log(route)
        console.log(account)
        console.log(db)
        console.log('submitting')
        console.log(process.env)
        if (!route.params?.id) {
            account.getSession('current').then(console.log)
            db.createDocument(
                '64e5bca5774c43c6e4b8', 
                '64e5bcac74d34020c488',
                ID.unique(),
                {
                    title: values.title
                }
            ).then( res => {
                console.log('Created listing', res)
            }).catch( err => {
                console.error('Could not create listing', err)
            })
        }
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