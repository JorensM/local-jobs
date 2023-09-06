import { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native'
import private_var from '../../../private';
// import { CardField } from '@stripe/stripe-react-native';

import Button from '../input/Button';

export default function PaymentForm() {


    const [ paymentElement, setPaymentElement ] = useState<any>(<Text>Payments not supported on web</Text>)

    useEffect(() => {
        // if (Platform.OS !== 'web') {
        //     console.log('platform not web')
        //     import('@stripe/stripe-react-native')
        //         .then(module => {
        //             console.log(module)

        //             const CardField = module.CardField

        //             setPaymentElement(
        //                 <module.StripeProvider
        //                     publishableKey={private_var.api_keys.stripe.publishable.test}
        //                     // merchantIdentifier="merchant.identifier" // required for Apple Pay
        //                     // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        //                 >
        //                     <module.CardForm
        //                         onFormComplete={(cardDetails) => {
        //                             console.log('card details', cardDetails);
        //                             // setCard(cardDetails);
        //                         }}
        //                         style={{height: 200}}
        //                     />
        //                 </module.StripeProvider>
        //             )
        //         })
        //         .catch(err => {
        //             console.error('Error while dynamically importing module', err)
        //         })
        // }
    }, [])

    return (
        <Button>
            Test payment (no transactions made)
        </Button>
    )
}