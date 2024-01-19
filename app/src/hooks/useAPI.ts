// Core
import { useCallback } from 'react';

// Hooks
import useAuth from './useAuth';

// Constants
import { API_URL } from '#constants/env';

type APIHookReturnValue = {
    getContactPaymentSheet: (contact_id: string) => Promise<{
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

        try {
            const url = new URL(`${API_URL}${endpoint}`);

            if(typeof params == 'object') {
                for(const param_key in params) {
                    url.searchParams.set(param_key, params[param_key])
                }
            }
            
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': session.access_token,
                    'refresh-token': session.refresh_token
                }
            })
    
            const data = await response.json()

            //console.log(data);
    
            return data;
        } catch (error: any) {
            throw new Error(error)
        }
        
    }, [auth.user])


    const getContactPaymentSheet = async (contact_id: string) => {
        const payment_sheet = await authGET('contact-payment-sheet', {contact_id});
    
        // console.log(JSON.stringify(payment_sheet, null, 2))

        return payment_sheet;
    }

    return {
        getContactPaymentSheet
    }
}