// DO NOT IMPORT THIS FILE, import the index.ts instead

// Since stripe-react-native is not available on web, this just has non-functioning
// placeholders

import { PropsWithChildren } from 'react'

type StripeProviderProps = {
    publishableKey: string
}

export const StripeProvider = ({ publishableKey, children }: PropsWithChildren<StripeProviderProps>) => {
    return (
        <>
         {children}
        </>
    )
}

type StripeHook = (() => null) |
(() => {
    initPaymentSheet: (context: any) => { error: any }
    presentPaymentSheet: () => { error: any }
})

export const useStripe: StripeHook = () => null;