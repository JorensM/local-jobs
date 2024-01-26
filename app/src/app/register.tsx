// Core
import { Text, View, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import { Link, router } from 'expo-router'
import * as Yup from 'yup'

// Components
import TextInput from '#components/input/TextInput'
import Dropdown from '#components/input/Dropdown'
import Page from '#components/layout/Page'

// Styles
import button from '#styles/button'

// Hooks
import useAuth from '#hooks/useAuth'

// Types
import { UserRole } from '#types/User'

// Misc
import { toastError, toastSuccess } from '#misc/toast'
import usePage from '#hooks/usePage'
import form from '#styles/form'
import { route_names } from '#constants/routes'

type FormValues = {
    email: string,
    password: string,
    name: string,
    role: UserRole
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').max(32, 'Password must be at most 32 characters').required('Required'),
    name: Yup.string().required('Required'),
    role: Yup.string().required('Required')
})

/**
 * New user registration page
 */
export default function RegisterPage() {

    // Hooks
    const auth = useAuth();
    const { pageState } = usePage();

    // Handlers

    /**
     * On register button press. Registers user, displays a success toast
     * and redirects to login page
     * @param values form values
     * @param values.email email
     * @param values.password password
     * @param values.name display name
     * @param values.role role. Either 'performer' or 'recruiter'
     */
    const handleSubmit = async ({ email, password, name, role} : FormValues) => {
      try {
        // Register user
        const success = await auth.register(email, password, name, role);

        // If registered successfully, redirect to login page and show success toast
        if (success) {
          toastSuccess('Your account has been created!', 'A confirmation email has been sent to ' + email);
          router.replace(route_names.login);
        }
      } catch (err: any) {
        // On error, display error toast
        toastError('Error', 'Could not register');
      }
    }

    return (
        <Page
          pageState={pageState}
        >
            {/* Registration form */}
            <Formik<FormValues>
                initialValues={{
                  email: '',
                  password: '',
                  name: '',
                  role: 'performer'
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {(formik) => (
                    <View
                        style={form.container}
                    >
                        {/* Email */}
                        <TextInput
                            name='email'
                            label='Email'
                        />
                        {/* Display name */}
                        <TextInput
                            name='name'
                            label='Name'
                        />
                        {/* Password */}
                        <TextInput
                            name='password'
                            label='Password'
                            secureTextEntry={true}
                        />
                        {/* Role */}
                        <Dropdown
                          data={[
                            {
                              label: 'Recruiter',
                              value: 'recruiter'
                            },
                            {
                              label: 'Performer',
                              value: 'performer'
                            }
                          ]}
                          placeholder='I am a...'
                          name='role'
                        />
                        {/* Register button */}
                        <Button
                            onPress={() => formik.handleSubmit()}
                            title='Register'
                        />
                    </View>
                )}
            </Formik>
            {/* Login button */}
            <Text>Already a member?</Text>
            <Link
                style={button.secondary}
                href="/"
            >
                Login
            </Link>
        </Page>
    )
}