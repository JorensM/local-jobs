import { useContext as mockUseContext } from 'react';
import mockAuthContext from '#state/AuthContext';

// Types
import { User } from '#types/User';


jest.mock('#hooks/useAuth', () => {

    // const { useContext } = jest.requireActual('react');
    // const AuthContext = jest.requireActual('#state/AuthContext');

    const { user, setUser } = mockUseContext(mockAuthContext);
    let current_user: User | null = null;

    return {
        __esModule: true,
        default: () => ({
            login: async (email: string, password: String) => {
                setUser({
                    id: email,
                    name: email,
                    role: 'performer'
                })
                return true;
            },
            user
        })
    }
})

