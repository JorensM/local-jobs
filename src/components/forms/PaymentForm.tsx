import { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native'
// import { CardField } from '@stripe/stripe-react-native';

export default function PaymentForm() {


    const [ paymentElement, setPaymentElement ] = useState<any>(<Text>Payments not supported on web</Text>)

    useEffect(() => {
        if (Platform.OS !== 'web') {
            import('@stripe/stripe-react-native')
                .then(module => {
                    console.log(module)

                    const CardField = module.CardField

                    setPaymentElement(
                        <module.CardForm
                            onFormComplete={(cardDetails) => {
                                console.log('card details', cardDetails);
                                // setCard(cardDetails);
                            }}
                            style={{height: 200}}
                        />
                        // <CardField
                        //     postalCodeEnabled={true}
                        //     placeholders={{
                        //     number: '4242 4242 4242 4242',
                        //     }}
                        //     cardStyle={{
                        //     backgroundColor: '#FFFFFF',
                        //     textColor: '#000000',
                        //     }}
                        //     style={{
                        //     width: '100%',
                        //     height: 50,
                        //     marginVertical: 30,
                        //     }}
                        //     onCardChange={(cardDetails) => {
                        //     console.log('cardDetails', cardDetails);
                        //     }}
                        //     onFocus={(focusedField) => {
                        //     console.log('focusField', focusedField);
                        //     }}
                        // >

                        // </CardField>
                    )
                })
                .catch(err => {
                    console.error('Error while dynamically importing module', err)
                })
        }
    }, [])

    return paymentElement
}