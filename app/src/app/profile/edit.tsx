// Core
import { Button } from 'react-native'
import { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import SessionPage from '#components/layout/SessionPage';
import PhoneNumberInput from '#components/input/PhoneNumberInput';
import TextInput from '#components/input/TextInput';

// Hooks
import usePage from '#hooks/usePage';
import useAuth from '#hooks/useAuth';
import { usernameSchema, userPhoneCountryCodeSchema, userPhoneNumberSchema } from '#schema/userSchema';


type FormValues = {
    name: string
    country_code: string
    phone: string
}

const validationSchema = Yup.object().shape({
    name: usernameSchema,
    country_code: userPhoneCountryCodeSchema,
    phone: userPhoneNumberSchema
})

export default function ProfileEditPage() {

    // Hooks
    const { pageState } = usePage();
    const auth = useAuth();

    const initialValues = useMemo<FormValues>(() => {
        if(!auth.user) {
            // throw new Error('User not found')
        }
        return {
            name: auth.user?.name || "",//auth?.user?.name,
            phone: auth.user?.phone_number || "",
            country_code: auth.user?.phone_country_code || ""
        }
    }, [auth.user])

    // Handlers
    const handleSubmit = (values: FormValues) => {
        console.log('submitting')
        const user = {
            name: values.name,
            phone_number: values.phone,
            phone_country_code: values.country_code
        }
        auth.updateUser(user)
    }

    return (
        <SessionPage
            pageState={pageState}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {formik => (
                    <>
                        <TextInput
                            name='name'
                            label='Display name'
                        />
                        <PhoneNumberInput
                            name='phone'
                            country_code_name='country_code'
                            label='Phone number'
                        />
                        <Button
                            onPress={() => formik.submitForm()}
                            title='Save'
                        />
                    </>
                )}
            </Formik>
        </SessionPage>
    )
}