// Core
import { useMemo } from 'react';
import { Button } from 'react-native'
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import SessionPage from '#components/layout/SessionPage';
import PhoneNumberInput from '#components/input/PhoneNumberInput';
import TextInput from '#components/input/TextInput';

// Hooks
import usePage from '#hooks/usePage';
import useAuth from '#hooks/useAuth';

// Schema
import { usernameSchema, userPhoneCountryCodeSchema, userPhoneNumberSchema } from '#schema/userSchema';

// Constants
import { getRouteName, route_names } from '#constants/routes';

// Misc
import { toastSuccess } from '#misc/toast';


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

    // Memo

    /**
     * Initial values of the form. Are only set if user is found
     */
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

    /**
     * On form submit. Updates user profile, redirects to profile page and displays success toast
     * @param values 
     */
    const handleSubmit = (values: FormValues) => {
        const user = {
            name: values.name,
            phone_number: values.phone,
            phone_country_code: values.country_code
        }
        // Update user with new values
        auth.updateUser(user)
        // Redirect to profile page
        router.replace(getRouteName(route_names.profile));
        // Display success toast
        toastSuccess('Success', 'Your profile has been updated')
    }

    return (
        <SessionPage
            pageState={pageState}
        >
            {/* Profile form */}
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
                        {/* Display name */}
                        <TextInput
                            name='name'
                            label='Display name'
                        />
                        {/* Phone number */}
                        <PhoneNumberInput
                            name='phone'
                            country_code_name='country_code'
                            label='Phone number'
                        />
                        {/* Save button */}
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