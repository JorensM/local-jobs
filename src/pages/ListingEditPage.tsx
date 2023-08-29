import { View, StyleSheet, Button, Platform } from 'react-native'
import { ID } from 'appwrite'
import { Formik } from 'formik'

// import TextInput from 'components/input/TextInput'
import SessionPage from '../components/layout/SessionPage'
import Page from '../components/layout/Page'
import TextInput from '../components/input/TextInput'
import useAppwrite from '../functions/useAppwrite'
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import ParamList from './ParamList'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import constant from '../../const'
import ListingModel from '../types/ListingModel'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import private_var from '../../private'
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

    const [ error, setError ] = useState<string | null>(null)

    const [ initialValues, setInitialValues ] = useState<FormValues>(initial_values)
    const isFocused = useIsFocused()

    const handleSubmit = async (values: FormValues) => {

        const afterSuccessfulSubmit = (listing_id: string) => {
            navigation.navigate('Listing', {
                id: listing_id
            })
        }

        // console.log(route)
        console.log(account)
        console.log(db)
        console.log('submitting')
        console.log(process.env)
        if (!route.params?.id) {
            const acc = await account.get()
            const id = acc.$id
            account.getSession('current').then(console.log)
            console.log('creating document')
            //const listing_id = ID.unique()
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
                afterSuccessfulSubmit( res.$id )
            }).catch( err => {
                console.error('Could not create listing', err)
                setError('Could not create listing')
            })
        } else {
            db.updateDocument<ListingModel>(
                constant.db.id,
                constant.db.listings_id,
                route.params.id,
                {
                    title: values.title,
                    description: values.description
                }
            )
            .then( res => {
                afterSuccessfulSubmit(route.params.id)
            })
            .catch( err => {
                console.error('Could not update listing', err)
                setError('Could not update listing')
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
            console.log('focusing')
            console.log(route.params?.id)
            if (route.params?.id) {
                db.getDocument<ListingModel>(
                    constant.db.id,
                    constant.db.listings_id,
                    route.params.id
                )
                .then( listing => {
                    console.log('retrieved listing')
                    console.log(listing)
                    setInitialValues({
                        description: listing.description,
                        title: listing.title
                    })
                    //initial_values.description = listing.description
                    //initial_values.title = listing.title
                })
                .catch( err => {
                    console.error('Could not retrieve document by id ' + route.params.id, err)
                    setError('Could not retrieve document')
                })
            }
            //initial_values.description = 'ABCDDD'
        }, [route])
    )

    useEffect(() => {
        if (!isFocused) {
            setInitialValues(initial_values)
        }
    }, [ isFocused ])

    return (
        <SessionPage
            error={error}
        >
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
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
                        <GooglePlacesAutocomplete
                            styles={{
                                container: {
                                    marginBottom: 32
                                }
                                
                            }}
                            placeholder='Location'
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                            }}
                            query={{
                                key: private_var.api_keys.google.places,
                                language: 'en'
                            }}
                            requestUrl={{
                                url: 'https://corsproxy.io/?https://maps.googleapis.com/maps/api',
                                useOnPlatform: 'all'
                            }}
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