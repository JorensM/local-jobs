// Mocks
import '#tests/mocks/hooks/useAuth';

// Core
import { renderHook } from '@testing-library/react-native';

// Constants
import { API_URL } from '#constants/env';

// Hooks
import useAPI from '#hooks/useAPI';

// Test utils
import { setSession } from '#tests/mocks/state';

describe('useAPI()', () => {
    describe('getContactPaymentSheet', () => {
        const { result } = renderHook(() => useAPI())

        const ACCESS_TOKEN = 'test-access-token';
        const REFRESH_TOKEN = 'test-refresh-token';
        const CONTACT_ID = '4242';
        const ENDPOINT = 'contact-payment-sheet';

        const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
            async (input: string | URL | Request, init?: RequestInit | undefined) => {
                return new Response('{"correct_response": true}', { status: 200 });
            }
        )

        it('Should send a GET request to the correct URL with correct headers and params and return the response as JSON', async () => {

            setSession({
                access_token: ACCESS_TOKEN,
                refresh_token: REFRESH_TOKEN,
                expires_in: 123,
                token_type: '123',
                user: {
                    id: '123',
                    app_metadata: {},
                    user_metadata: {},
                    aud: '123',
                    created_at: '123'
                }
            })

            const payment_sheet = await result.current.getContactPaymentSheet(CONTACT_ID);

            // Check if function returned the fetch response
            expect(payment_sheet).toMatchObject({
                correct_response: true
            })
            
            const url = new URL(`${API_URL}${ENDPOINT}`);

            url.searchParams.set('contact_id', CONTACT_ID)

            // Check if fetch function was called with correct params
            expect(fetchSpy).toHaveBeenCalledWith(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': ACCESS_TOKEN,
                    'refresh-token': REFRESH_TOKEN
                }
            })

        })
    })
    
})