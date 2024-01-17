import 'expo-router/entry'

// Core
import { Button, View, StyleSheet, Text } from 'react-native'
import { Formik } from 'formik'
import { Link, router } from 'expo-router'

// Components
import TextInput from '#components/input/TextInput'
import Page from '#components/layout/Page'

// Hooks
import useAuth from '#hooks/useAuth'
import usePage from '#hooks/usePage'

// Misc
import { toastError } from '#misc/toast'

// Styles
import button from '#styles/button'
import form from '#styles/form'

type FormValues = {
    email: string,
    password: string
}

const initial_values: FormValues = {
    email: '',
    password: ''
}

/**
 * User login page
 */
export default function LoginPage() {

    // Hooks
    const auth = useAuth();
    const { pageState } = usePage(false);

    const handleSubmit = async ({ email, password }: FormValues) => {

        try {
            await auth.login(email, password);
            router.replace('/feed')
        } catch (error: any) {
            if(error.message.toLowerCase().includes('email')) {
                toastError('Could not log in', 'please confirm your email');
            } else {
                toastError('Could not log in');
            }
        }
    }

    return (
        <Page
            pageState={pageState}
        >
            <Formik
                initialValues={initial_values}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <View
                        style={form.container}
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
                        <Button
                            onPress={() => formik.handleSubmit()}
                            title='Login'
                        />
                    </View>
                )}
            </Formik>
            <Text>Not a member?</Text>
            <Link 
                style={button.secondary}
                href="/register"
            >
                Register
            </Link>
        </Page>
    )
}