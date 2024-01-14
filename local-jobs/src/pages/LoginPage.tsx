//Core
import { Button, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { Link, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerScreenProps } from '@react-navigation/drawer'

//Components
import TextInput from '../components/input/TextInput'
import Page from '../components/layout/Page'

import useAppwrite from '../functions/useAppwrite'

//Pages
import ParamList from '../pages/ParamList'
import useCheckLogin from '../functions/useCheckLogin'

type FormValues = {
    email: string,
    password: string
}

const initial_values: FormValues = {
    email: '',
    password: ''
}

type Props = DrawerScreenProps<ParamList, 'Login'>

export default function LoginPage( { navigation }: Props) {

    useCheckLogin(undefined, 'Feed')

    const { account } = useAppwrite()

    const handleSubmit = ({ email, password }: FormValues) => {
        account.createEmailSession(email, password)
            .then(res => {
                console.log('Logged in')
                console.log(res)
                navigation.navigate('Feed')
            })
            .catch(err => {
                console.error('Error while logging in')
                console.error(err)
            })
    }

    return (
        <Page
            style={{
                gap: 8
            }}
        >
            <Formik
                initialValues={initial_values}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <View
                        style={styles.form}
                    >
                        <TextInput
                            name='email'
                            formik={formik}
                            label='Email'
                        />
                        <TextInput
                            name='password'
                            formik={formik}
                            label='Password'
                            secureTextEntry={true}
                        />
                        <Button
                            onPress={() => formik.handleSubmit()}
                            title='Login'
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                    </View>
                )}
            </Formik>
            <Link 
                style={{
                    borderColor: 'green',
                    borderWidth: 1,
                    width: '100%',
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }}
                to={{
                    screen: 'Register'
                }}
            >
                Register
            </Link>
        </Page>
    )
}

const styles = StyleSheet.create({
    form: {
      gap: 16
    }
});