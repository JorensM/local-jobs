import useAuth from '#hooks/useAuth'
import { AuthError, SignInWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react-native'
import supabase from '#misc/supabase';
import { 
    createSupabaseSession as mockCreateSupabaseSession, 
    createSupabaseUser as mockCreateSupabaseUser 
} from '#tests/test_utils/createUser';
import * as hookUtils from '#tests/mocks/state'
import { getUser as mockGetUser, setUser as mockSetUser } from '#tests/mocks/state';
import { createContext, useState } from 'react';
import AuthContext from '#state/AuthContext';
import { User } from '#types/User';

//const { getUser: _getUser, setUser: _setUser } = jest.requireActual('#tests/mocks/hook_utils');
//const { createSupabaseUser } = jest.requireActual('#tests/test_utils/createUser');

const TEST_EMAIL = 'ntz.arts@gmail.com';
const TEST_NAME = 'test_user';
const TEST_PASSWORD = 'password';

// jest.mock('#misc/supabase', () => {

    

//     return {
//         __esModule: true,
//         default: () => ({
//             auth: {
//                 signInWithPassword: ,
//                 getUser: async () => _getUser()
//             }
//         })
//     }
// })

// jest.mock('react', () => {

//     const originalModule = jest.requireActual('react');

//     return {
//         __esModule: true,
//         ...originalModule,
//         useContext: () => {
//             return {
//                 user: mockGetUser,
//                 setUser: mockSetUser
//             }
//         },
//         createContext: () => {
//             return true
//         }
//     }
// })

// const getUserSpy = jest.spyOn(supabase.auth, 'getUser').mockImplementation(async () => {
//     const user = mockGetUser();
//     if(user) {
//         return {
//             data: {
//                 user: mockCreateSupabaseUser(user.name)
//             },
//             error: null
//         }
//     } else {
//         return {
//             data: {
//                 user: null
//             },
//             error: new AuthError('User not signed in', 400)
//         }
//     }
    
// })

const signInSpy = jest.spyOn(supabase.auth, 'signInWithPassword');

const logoutSpy = jest.spyOn(supabase.auth, 'signOut');



describe('useAuth()', () => {

    const { result } = renderHook(() => useAuth(), {
        wrapper: ({children}) => {
            
            const [user, setUser] = useState<User | null>(null);

            return (
                <AuthContext.Provider value={{user: mockGetUser(), setUser: mockSetUser}}>
                    {children}
                </AuthContext.Provider>
            )
        }
    });


    describe('login()', () => {
        
        
        it('Should call supabase.signInWithPassword passing in the email and password and return true', async () => {

            const response = await result.current.login(TEST_EMAIL, TEST_PASSWORD);

            expect(signInSpy).toHaveBeenCalledWith({
                email: TEST_EMAIL,
                password: TEST_PASSWORD
            })

            expect(response).toBeTruthy();

        })

        it('Should throw error if invalid credentials are given', async () => {

            expect(result.current.login('incorrect_email', 'incorrect_password'))
                .rejects
                .toThrow()

        })
    })

    describe('logout', () => {
        result.current.logout()
        it('Should call supabase.auth.logout', () => {
            expect(logoutSpy).toHaveBeenCalled()
        })
    })

    describe('fetchUser', () => {

        it('Should return fetched user', async () => {
            await result.current.login(TEST_EMAIL, TEST_PASSWORD);
            const user = await result.current.fetchUser();
            expect(user).not.toBeNull()
            expect(user!.name).toEqual(TEST_NAME)
        })

    })

    describe('getSession', () => {
        
        it('Should return session object if user is logged in', async () => {
            await result.current.login(TEST_EMAIL, TEST_PASSWORD);

            const session = await result.current.getSession();

            expect(session).not.toBeNull();
            expect(session!.access_token).toBeDefined();
            expect(session!.refresh_token).toBeDefined();

        })
        it('Should return null if user is not logged in', async () => {
            await result.current.logout();

            const session = await result.current.getSession();

            expect(session).toBeNull()
        })
    })
})