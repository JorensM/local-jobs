import supabase from '#misc/supabase'
import { UserRole } from '#types/User';
import { User } from '#/types/User'
import { useState } from 'react';

export default function useAuth() {

    const [user, setUser] = useState<User | null>(null)

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error){
            return false;
        }

        fetchUser();

        return true;
    }

    const fetchUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if(error) {
            throw error
        }


        
        setUser(
            user ? {
                id: user.id,
                role: user.user_metadata.role
            } : null
        )
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
        user,
        fetchUser,
        login,
        register
    }
}