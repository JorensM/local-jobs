import { User } from '#types/User';
import { createContext } from 'react';

type AuthContextType = {
    /**
     * Currently logged in user. Stores a User object or null if user not logged in
     */
    user: User | null,
    /**
     * Set the currently logged in user state
     * 
     * @param new_user new User object to set user to, or null to unset user
     */
    setUser: (new_user: User | null) => void
}

/**
 * Auth related context
 */
const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
})

export default AuthContext;