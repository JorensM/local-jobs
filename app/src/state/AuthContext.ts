import { User } from '#types/User';
import { createContext } from 'react';

type AuthContextType = {
    user: User | null,
    setUser: (new_user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
})

export default AuthContext;