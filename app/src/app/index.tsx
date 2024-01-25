// import 'expo-router/entry' // temporarily commented out for tests, not sure if this will break anything

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
    const { pageState } = usePage();

    // Handlers

    /**
     * On login button press. Logs user in and redirects to /feed page
     * @param values form values
     */
    const handleSubmit = async ({ email, password }: FormValues) => {

        try {
            // Login user with provided email and password
            await auth.login(email, password);
            //Redirect to /feed
            router.replace('/feed');
        } catch (error: any) {
            // If error, display error toast with a message depending on type of error
            if(error.message.toLowerCase().includes('email')) { // If error is due to email not being confirmed
                toastError('Could not log in', 'please confirm your email');
            } else {
                toastError('Could not log in');
            }
            throw error
        }
    }

    return (
        <Page
            pageState={pageState}
        >
            {/* Login form */}
            <Formik
                initialValues={initial_values}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <View
                        style={form.container}
                    >
                        {/* Email input */}
                        <TextInput
                            name='email'
                            label='Email'
                        />
                        {/* Password input */}
                        <TextInput
                            name='password'
                            label='Password'
                            secureTextEntry={true}
                        />
                        {/* Login button */}
                        <Button
                            testID='button-login'
                            onPress={() => formik.handleSubmit()}
                            title='Login'
                        />
                    </View>
                )}
            </Formik>
            {/* Register button */}
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