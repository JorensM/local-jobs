// Core
import { PropsWithChildren } from 'react';

jest.mock('@stripe/stripe-react-native', () => {

    const View = jest.requireActual('react-native')

    //For now just no-op stubs until a need arises for more intricate mocks
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