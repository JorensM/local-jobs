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
 * Hook for API calls. Returns an object with several functions
 * 
 * ## Returned functions
 * 
 * `getContactPaymentSheet()` - creates and returns a payment sheet for 
 * purchasing a contact for the current user. Must be passed a single `contact_id` arg.
 */
export default function useAPI(): APIHookReturnValue {

    // Hooks
    const auth = useAuth();

    /**
     * GET request caller that adds auth headers
     * 
     * @param endpoint URL of the API endpoint to call. This string will be combined with API_URL, so don't provide the full url, just the path
     * @param params object of GET params to pass. Keys are param keys and values are param values
     * 
     * @returns request response in JSON format
     */
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
    
            return data;
        } catch (error: any) {
            throw new Error(error)
        }
        
    }, [auth.user])


    const getContactPaymentSheet = async (contact_id: string) => {

        const payment_sheet = await authGET('contact-payment-sheet', {contact_id});

        return payment_sheet;
        
    }

    return {
        getContactPaymentSheet
    }
}