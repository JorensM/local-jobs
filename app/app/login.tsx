//Core
import { Button, View, StyleSheet, Text } from 'react-native'
import { Formik } from 'formik'
import { Link, router } from 'expo-router'

//Components
import TextInput from '#components/input/TextInput'
import Page from '#components/layout/Page'
import useAuth from '#hooks/useAuth'
import { useState } from 'react'

type FormValues = {
    email: string,
    password: string
}

const initial_values: FormValues = {
    email: '',
    password: ''
}

export default function LoginPage() {

    // useCheckLogin(undefined, 'Feed')

    // const { account } = useAppwrite()

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const auth = useAuth();

    const handleSubmit = async ({ email, password }: FormValues) => {

        setErrorMessage(null)

        const success = await auth.login(email, password)

        if(!success) {
            setErrorMessage('Could not log in')
        } else {
            router.replace('/feed')
        }

        // console.log('submitting')
        // console.log(email, password)
        // account.createEmailSession(email, password)
        //     .then(res => {
        //         console.log('Logged in')
        //         console.log(res)
        //         navigation.navigate('Feed')
        //     })
        //     .catch(err => {
        //         console.error('Error while logging in')
        //         console.error(err)
        //     })
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
                        {errorMessage ? 
                            <Text
                                style={{
                                    color: 'red'
                                }}
                            >
                                {errorMessage}
                            </Text>
                        : null}
                        
                        <Button
                            onPress={() => formik.handleSubmit()}
                            title='Login'
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                    </View>
                )}
            </Formik>
            <Text>Not a member?</Text>
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
                href="/register"
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