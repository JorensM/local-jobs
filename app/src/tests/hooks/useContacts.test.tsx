// Core
import { renderHook } from '@testing-library/react-native'
import { useState } from 'react';

//Hooks
import useContacts from '#hooks/useContacts'

// State
import AuthContext from '#state/AuthContext';

// Types
import { User } from '#types/User';

// Test utils
import { getUser as mockGetUser, setUser as mockSetUser } from '#tests/mocks/state';
import supabase from '#misc/supabase';
import { TEST_USER_1 } from '#tests/test_utils/constants';

// jest.mock('#misc/supabase', () => {
//     const originalModule = jest.requireActual('#misc/supabase');

//     return {
//         __esModule: true,
//         ...originalModule,
//         from: (table: string) => ({
//             select: () => ({
//                 eq: () => ()
//             })
//         })
//     }
// })

const renderHookWithUser = (user: User | null) => {
    return renderHook(() => useContacts(), {
        wrapper: ({children}) => {
            
            // const [user, setUser] = useState<User | null>(null);

            return (
                //@ts-ignore
                <AuthContext.Provider value={{user, setUser: mockSetUser}}>
                    {children}
                </AuthContext.Provider>
            )
        }
    });
}

describe('useContacts()', () => {
    

    describe('fetchUsersContacts()', () => {
        it('Should throw error if user is not logged in', () => {
            const { result } = renderHookWithUser(null)

            // mockSetUser(null);

            expect(() => result.current.fetchUsersContacts())
                .rejects
                .toThrow()
        })

        // Don't know how to test it without useAuth
        it('Should return contacts of user', async () => {
            const { result } = renderHookWithUser(TEST_USER_1)
            // Sign in to Supabase
            await supabase.auth.signInWithPassword({ email: 'ntz.arts@gmail.com', password: 'password' });

            const contacts = await result.current.fetchUsersContacts();

            expect(Array.isArray(contacts)).toBeTruthy();
            expect(contacts.length).toBeGreaterThan(0);
            contacts.forEach((contact) => {
                expect(contact.id).toBeDefined();
                expect(contact.name).toBeDefined();
                expect(contact.role).toBeDefined();
            })
        })
    })

    describe('fetchContact()', () => {

        it('Should throw error if user is not logged in', () => {
            const { result } = renderHookWithUser(null)

            // mockSetUser(null);

            expect(() => result.current.fetchContact('123'))
                .rejects
                .toThrow()
        })

        it('Should return contact user data if contact exists', async () => {
            const { result } = renderHookWithUser(TEST_USER_1)
            // Sign in to Supabase
            await supabase.auth.signInWithPassword({ email: 'ntz.arts@gmail.com', password: 'password' });

            const contact = await result.current.fetchContact("b1bebf88-64d0-4437-a031-4eaa6cf4a81c");

            expect(contact).not.toBeNull;

            expect(contact?.id).toBeDefined();
            expect(contact?.name).toBeDefined();
            expect(contact?.role).toBeDefined();
        })

        it('Should return null if contact is not found', async () => {
            const { result } = renderHookWithUser(TEST_USER_1)
            // Sign in to Supabase
            await supabase.auth.signInWithPassword({ email: 'ntz.arts@gmail.com', password: 'password' });

            const contact = await result.current.fetchContact("67d2848b-45e9-4e15-afb3-6d57c7d34ac5"); //This is an incorrect ID

            expect(contact).toBeNull();
        })
        
    })
})