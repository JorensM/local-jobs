import { Text, View, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import TextInput from '#components/input/TextInput'
import Dropdown from '#components/input/Dropdown'
import { Link } from 'expo-router'
import button from '#styles/button'
import * as Yup from 'yup'

// Types
import { UserRole } from '#types/User'
import useAuth from '#hooks/useAuth'

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

export default function RegisterPage() {

    //const { account } = useAppwrite()

    const auth = useAuth();

    const handleSubmit = async ({ email, password, name, role} : FormValues) => {

        const success = await auth.register(email, password, name, role)

        console.log(success ? 'Registered successfully!' : 'Could not register')
        // account.create(
        //   ID.unique(),
        //   values.email,
        //   values.password,
        //   values.name
        // ).then(res => {
        //   account.createEmailSession(
        //     values.email,
        //     values.password
        //   ).then(res => {
        //     account.updatePrefs({
        //       role: values.role
        //     })
        //   })
        //   console.log('Created account')
        //   //console.log(res)
        //   navigation.navigate('Login')
        // }).catch(err => {
        //   console.error('Could not create account')
        //   console.error(err)
        // })
        // console.log('submitted')
        // console.log(values)
      }

    return (
        <View style={styles.container}>
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
                        style={styles.form}
                    >
                        <TextInput
                            name='email'
                            formik={formik}
                            label='Email'
                        />
                        <TextInput
                            name='name'
                            formik={formik}
                            label='Name'
                        />
                        <TextInput
                            name='password'
                            formik={formik}
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
                          formik={formik}
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
                href="/login"
            >
                Login
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: '100%',
    height: '100%',
    gap: 8
  },
  form: {
    gap: 16
  }
});