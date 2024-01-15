import 'expo-router/entry'

//Core
import { Button, View, StyleSheet, Text } from 'react-native'
import { Formik } from 'formik'
import { Link, router } from 'expo-router'

//Components
import TextInput from '#components/input/TextInput'
import Page from '#components/layout/Page'
import useAuth from '#hooks/useAuth'
import { useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { toastError, toastSuccess } from '#misc/toast'

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

        try {
            await auth.login(email, password);
            router.replace('/feed')
        } catch (error: any) {
            console.log(error);
            console.log(error.code)
            console.log(error.message);
            if(error.message.toLowerCase().includes('email')) {
                toastError('Could not log in', 'please confirm your email');
            } else {
                toastError('Could not log in');
            }
        }
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
                            label='Email'
                        />
                        <TextInput
                            name='password'
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