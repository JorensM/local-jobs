// Core
import { useContext } from 'react';
import { AuthSession } from '@supabase/supabase-js';

// Types
import { User, UserRole } from '#types/User';

// State
import AuthContext from '#state/AuthContext';

// Misc
import supabase from '#misc/supabase'


type AuthHook = {
    user: User | null
    fetchUser: () => Promise<User|null>
    getSession: () => Promise<AuthSession|null>,
    login: (email: string, password: string) => Promise<true>
    logout: () => Promise<true>
    register: (email: string, password: string, name: string, role: UserRole) => Promise<true>
}

/**
 * Hook for managing user/session related stuff
 * 
 * ## Returns
 * 
 * `user` - User object of the currently logged in user or null if not 
 * logged in (as state). This state is stored in context and is synced throughout
 * each use of the hook.
 * `fetchUser()` - fetches currently logged in User object, returns it and assigns the `user` state to the retrieved value.
 * `getSession()` - fetches and returns the current session.
 * `login()` - logs in user with email and password.
 * `logout()` - logs out current user.
 * `register()` - registers new user.
 */
export default function useAuth(): AuthHook {

    // State
    const context = useContext(AuthContext)

    const login = async (email: string, password: string): Promise<true> => {
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

    const logout = async (): Promise<true> => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error
        }

        return true;
    }

    const fetchUser = async () => {
        const { data: { user: user }, error } = await supabase.auth.getUser();

        if(error?.status == 401) {
            return null
        } else if(error) {
            throw error
        }

        if(!user) {
            throw new Error('Could not find user')
        }
        
        
        const { data: user_data, error: user_data_error } = await supabase
            .from('user_data')
            .select()
            .eq('user_id', user!.id)
            .limit(1);

        if(user_data_error) {
            throw user_data_error
        }
        
        

        const user_parsed = {
            id: user.id,
            role: user.user_metadata.role,
            name: user.user_metadata.name
        }

        if(user_data!.length == 0) {
            const { error } = await supabase
                .from('user_data')
                .insert({
                    ...user_parsed,
                    id: undefined,
                    user_id: user_parsed.id
                })

            if(error) {
                throw error;
            }
        }

        

        context.setUser(user_parsed)

        return user_parsed;
    }

    const getSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();

        if(error) {
            throw error
        }

        return session;
    }

    const register = async (email: string, password: string, name: string, role: UserRole): Promise<true> => {
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
            throw error;
        }
        return true;
    }

    return {
        user: context.user,
        fetchUser,
        getSession,
        login,
        logout,
        register,
    }
}