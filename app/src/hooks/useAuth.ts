import { useContext, useState } from 'react';

// Types
import { UserRole } from '#types/User';
import { User } from '#/types/User'

// State
import AuthContext from '#state/AuthContext';

// Misc
import supabase from '#misc/supabase'

export default function useAuth() {

    //const [user, setUser] = useState<User | null>(null)

    const context = useContext(AuthContext)

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error){
            throw error
        }

        fetchUser();

        return true;
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error
        }

        return true;
    }

    const fetchUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if(error?.status == 401) {
            return false
        } else if(error) {
            throw error
        }
        
        const user_parsed = user ? {
            id: user.id,
            role: user.user_metadata.role,
            name: user.user_metadata.name
        } : null

        context.setUser(user_parsed)

        return user_parsed;
    }

    const register = async (email: string, password: string, name: string, role: UserRole) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role
                }
            }
        })

        if (error) {
            return false
        }
        return true;
    }

    return {
        user: context.user,
        fetchUser,
        login,
        logout,
        register,
    }
}