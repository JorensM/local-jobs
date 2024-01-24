import { useContext as mockUseContext } from 'react';
import mockAuthContext from '#state/AuthContext';

// Types
import { User } from '#types/User';
// import { getUser, setUser } from '../hook_utils';



jest.mock('#hooks/useAuth', () => {

    // const { useContext } = jest.requireActual('react');
    // const AuthContext = jest.requireActual('#state/AuthContext');

    // const { user, setUser } = mockUseContext(mockAuthContext);
    
    const { getUser, setUser, getSession: _getSession } = jest.requireActual('../hook_utils');


    return {
        __esModule: true,
        default: () => ({
            login: async (email: string, password: String) => {
                // setUser({
                //     id: email,
                //     name: email,
                //     role: 'performer'
                // })
                setUser({
                    id: email,
                    name: email,
                    role: 'performer'
                })
                return true;
            },
            getSession: async () => {
                return _getSession()
            },
            user: getUser()
        })
    }
})

