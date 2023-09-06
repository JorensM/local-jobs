//Core
import { useContext, useState } from 'react'
import { 
  View, 
  StyleSheet, 
  Button } 
  from 'react-native'
import { Formik } from 'formik'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Snackbar } from 'react-native-paper'

//State
import SnackbarContext from '../functions/SnackbarProvider'

//Hooks
import useAppwrite from '../functions/useAppwrite'

//Types
import ParamList from './ParamList'

//Components
import Page from '../components/layout/Page'
import TextInput from '../components/input/TextInput'
import Dropdown from '../components/input/Dropdown'

type Props = DrawerScreenProps<ParamList>

export default function RegistrationPage( { navigation }: Props) {

    const { account, db, functions } = useAppwrite()

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

    const { createSnackbar } = useContext(SnackbarContext)

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (values: any) => {
        setLoading(true)
        functions.createExecution(
          'create-user',
          JSON.stringify({
            email: values.email,
            password: values.password,
            name: values.name,
            role: values.role
          })
        )
          .then(res => {
            if(res.statusCode == 200) {
              console.log('Created account for ' + values.email)
              createSnackbar('Your account has been created!')
            } else {
              console.error('Could not create user:', res)
              setError(JSON.parse(res.response).msg)
            }
            
          })
          .finally(() => {
            setLoading(false)
          })
        // console.log(exec)
      }

    return (
        <Page
          error={error}
          loading={loading}
        >
            <Formik
                initialValues={{
                  email: '',
                  password: '',
                  name: '',
                  role: null
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
                          name='role'
                        />
                        <Button
                            onPress={() => createSnackbar('Hello!')/*formik.handleSubmit()*/}
                            title='Register'
                        />
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                    </View>
                )}
            </Formik>
            <Snackbar
              visible={showSnackbar}
              onDismiss={() => setShowSnackbar(false)}
            >
              Account created!
            </Snackbar>
        </Page>
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