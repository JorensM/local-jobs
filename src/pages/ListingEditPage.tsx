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
    title: string,
    description: string
}

const initial_values: FormValues = {
    title: '',
    description: ''
}

type Props = DrawerScreenProps<ParamList, 'ListingEdit'>

export default function ListingEditPage( { route, navigation }: Props ) {

    const { db, account } = useAppwrite()

    const handleSubmit = async (values: FormValues) => {
        // console.log(route)
        console.log(account)
        console.log(db)
        console.log('submitting')
        console.log(process.env)
        if (!route.params?.id) {
            const acc = await account.get()
            const id = acc.$id
            account.getSession('current').then(console.log)
            db.createDocument(
                '64e5bca5774c43c6e4b8', 
                '64e5bcac74d34020c488',
                ID.unique(),
                {
                    title: values.title,
                    by_user: id,
                    by_user_name: acc.name,
                    description: values.description
                }
            ).then( res => {
                console.log('Created listing', res)
                navigation.navigate('Feed')
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
                        <TextInput
                            name='description'
                            label='Description'
                            style={{
                                height: 128
                            }}
                            multiline
                            formik={formik}
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