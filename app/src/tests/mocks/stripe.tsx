// Core
import { PropsWithChildren } from 'react';

jest.mock('@stripe/stripe-react-native', () => {

    const View = jest.requireActual('react-native')

    return {
        default: () => ({
            StripeProvider: ({ publishableKey, children }: PropsWithChildren<{ publishableKey: string}>) => (
                <View>
                    { children }
                </View>
            ),
            useStripe: () => null
        })
    }
})