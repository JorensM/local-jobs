import { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native'
// import { CardField } from '@stripe/stripe-react-native';

export default function PaymentForm() {


    const [ paymentElement, setPaymentElement ] = useState<any>(<Text>Payments not supported on web</Text>)

    useEffect(() => {
        if (Platform.OS !== 'web') {
            import('@stripe/stripe-react-native')
                .then(module => {
                    setPaymentElement(<module.CardField></module.CardField>)
                })
        }
    }, [])

    return paymentElement
}