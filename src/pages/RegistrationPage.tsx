import { Text, View, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import TextInput from '../components/input/TextInput'
import { ID } from 'appwrite'
import useAppwrite from '../functions/useAppwrite'

export default function RegistrationPage() {

    const { account } = useAppwrite()

    const handleSubmit = (values: any) => {
        account.create(
          ID.unique(),
          values.email,
          values.password
        ).then(res => {
          console.log('Created account')
          console.log(res)
        }).catch(err => {
          console.error('Could not create account')
          console.error(err)
        })
        console.log('submitted')
        console.log(values)
      }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                email: '',
                password: ''
                }}
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
                            title='Register'
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    height: '100%'
  },
  form: {
    gap: 16
  }
});