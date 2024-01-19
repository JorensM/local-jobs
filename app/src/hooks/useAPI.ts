// Core
import { useCallback } from 'react';

// Hooks
import useAuth from './useAuth';

// Constants
import { API_URL } from '#constants/env';

type APIHookReturnValue = {
    getContactPaymentSheet: () => Promise<{
        paymentIntent: any,
        ephemeralKey: string,
        customer: string,
        publishableKey: string

    } | null>
}

/**
 * Hook for API calls
 */
export default function useAPI(): APIHookReturnValue {

    const auth = useAuth();

    const authGET = useCallback(async (endpoint: string, params?: { [name: string]: string }) => {

        const session = await auth.getSession();

        if(!session) {
            throw new Error('Session not found')
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'access-token': session.access_token,
                'refresh-token': session.refresh_token
            }
        })

        const data = await response.json()

        return data;
    }, [auth.user])


    const getContactPaymentSheet = async () => {
        const payment_sheet = await authGET('contact-payment-sheet');
    
        return payment_sheet;
    }

    return {
        getContactPaymentSheet
    }
}