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
    const { pageState } = usePage()

    const handleSubmit = async ({ email, password, name, role} : FormValues) => {
      try {
        const success = await auth.register(email, password, name, role)

        if(success) {
          toastSuccess('Your account has been created!', 'A confirmation email has been sent to ' + email);
          router.replace('/')
        }
      } catch (err: any) {
        toastError('Could not register')
      }
    }

    return (
        <Page
          pageState={pageState}
          // style={styles.container}
        >
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
                        <TextInput
                            name='email'
                            label='Email'
                        />
                        <TextInput
                            name='name'
                            label='Name'
                        />
                        <TextInput
                            name='password'
                            label='Password'
                            secureTextEntry={true}
                        />
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
                          formik={formik} // Should remove this and use useField instead
                          name='role'
                        />
                        <Button
                            onPress={() => formik.handleSubmit()}
                            title='Register'
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                    </View>
                )}
            </Formik>
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

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: '100%',
    height: '100%',
    gap: 8
  }
});