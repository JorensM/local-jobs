// Core
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Components
import TextInput from '#components/input/TextInput';



describe('TextInput', () => {

    const LABEL_TEXT = 'Test Input';
    const INPUT_NAME = 'test';
    const ENTERED_TEXT = 'Test text';

    const validationSchema = Yup.object().shape({
        [INPUT_NAME]: Yup.string().required('This field is required').min(5)
    })

    let native_input_comp: any = null;

    beforeEach(() => {
        render(
            // Wrap component in a Formik form because it relies on Formik context
            <Formik
                initialValues={{
                    INPUT_NAME: 'initial value'
                }}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={() => {
                    console.log('submitted form')
                }}
            >
                {(formik) => (
                    <>
                        <TextInput name={INPUT_NAME} label={LABEL_TEXT}/>
                        <Button 
                            testID='submit-button' 
                            onPress={() => formik.submitForm()}
                            title='Submit'
                        />
                    </>
                )}
                
            </Formik>
        )
        native_input_comp = screen.getByTestId('input-' + INPUT_NAME);
    })
    

    

    it('Should display the native input component', () => {
        expect(native_input_comp).toBeDefined();
    })

    it('Should display the label', () => {
        const label_comp = screen.getByText(LABEL_TEXT);

        expect(label_comp).toBeDefined()
    })

    it('Should display the entered value', () => {

        act(() => {
            fireEvent.changeText(native_input_comp, ENTERED_TEXT);
        })
        
    
        expect(native_input_comp.props.value).toEqual(ENTERED_TEXT)
    })

    it('Should show error upon validation fail', async () => {
        const submit_button = screen.getByTestId('submit-button');

        act(() => {
            fireEvent.changeText(native_input_comp, '');
            fireEvent.press(submit_button);
        })

        await waitFor(() => {
            const err_comp = screen.getByText('required', { exact: false })
            expect(err_comp).toBeDefined()
        });
    })
})