// DO NOT IMPORT THIS FILE, import the index.ts instead

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
})

export const useStripe: StripeHook = () => null;