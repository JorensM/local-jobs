import { Text, View, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import TextInput from '../components/input/TextInput'
import { ID } from 'appwrite'
import useAppwrite from '../functions/useAppwrite'
import { DrawerScreenProps } from '@react-navigation/drawer'
import ParamList from './ParamList'
import Dropdown from '../components/input/Dropdown'

type Props = DrawerScreenProps<ParamList>

export default function RegistrationPage( { navigation }: Props) {

    const { account } = useAppwrite()

    const handleSubmit = (values: any) => {
        account.create(
          ID.unique(),
          values.email,
          values.password,
          values.name
        ).then(res => {

          console.log('Created account')
          //console.log(res)
          navigation.navigate('Login')
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
                password: '',
                name: ''
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