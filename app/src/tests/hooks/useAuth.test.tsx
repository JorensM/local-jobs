import useAuth from '#hooks/useAuth'
import { AuthError, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react-native'
import supabase from '#misc/supabase';
import { 
    createSupabaseSession as mockCreateSupabaseSession, 
    createSupabaseUser as mockCreateSupabaseUser 
} from '#tests/test_utils/createUser';
import { getUser as mockGetUser, setUser as mockSetUser } from '#tests/mocks/hook_utils';
import { createContext, useState } from 'react';
import AuthContext from '#state/AuthContext';
import { User } from '#types/User';

//const { getUser: _getUser, setUser: _setUser } = jest.requireActual('#tests/mocks/hook_utils');
//const { createSupabaseUser } = jest.requireActual('#tests/test_utils/createUser');

const TEST_EMAIL = 'test@gmail.com';
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

const signInSpy = jest.spyOn(supabase.auth, 'signInWithPassword').mockImplementation(
    async (credentials: any) => {
        if(credentials.email == TEST_EMAIL && credentials.password == TEST_PASSWORD) {
            const user = mockCreateSupabaseUser(credentials.email);
            const session = mockCreateSupabaseSession(user);
            mockSetUser({
                id: user.id,
                name: user.user_metadata.name,
                role: 'performer'
            })
            return {
                data: {
                    user,
                    session
                },
                error: null
            };
        } else {
            return {
                data: {
                    user: null,
                    session: null
                },
                error: new AuthError('Incorrect email/password', 400)
            }
        }
    }
)

describe('useAuth()', () => {

    const { result } = renderHook(() => useAuth(), {
        wrapper: ({children}) => {
            
            const [user, setUser] = useState<User | null>(null);

            return (
                <AuthContext.Provider value={{user, setUser}}>
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
})