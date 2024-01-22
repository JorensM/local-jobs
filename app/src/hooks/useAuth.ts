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
    /**
     * User object of the currently logged in user or null if not 
     * logged in (as state). This state is stored in context and is synced throughout
     * each use of the hook.
     */
    user: User | null
    /**
     * fetches currently logged in User object, returns it and assigns the `user` 
     * state to the retrieved value.
     * 
     * @returns Promise that resolves to a User object or null if not logged in
     */
    fetchUser: () => Promise<User|null>
    /**
     * fetches and returns the current session.
     * 
     * @returns Promise that resolves to an AuthSession or null if not logged in
     */
    getSession: () => Promise<AuthSession|null>,
    /** 
     * logs in user with email and password. 
     * 
     * @param email - email
     * @param password - password
     * */
    login: (email: string, password: string) => Promise<true> 
    /** logs out current user. */
    logout: () => Promise<true>/* AAA */
    /** registers new user. */
    register: (email: string, password: string, name: string, role: UserRole) => Promise<true>
}

/**
 * Hook for managing user/session related stuff
 */
export default function useAuth(): AuthHook {

    // State
    const context = useContext(AuthContext)

    const login = async (email: string, password: string): Promise<true> => {
        console.log('logging in aaaa')
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        console.log('2')
        if (error){
            throw error
        }
        console.log('3')
        fetchUser();

        console.log('4')
        return true;
    }

    /**
     * Test
     * @returns 
     */
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
            context.setUser(null);
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
        
        
        // Convert DB schema to User type
        const user_parsed = {
            id: user.id,
            role: user.user_metadata.role,
            name: user.user_metadata.name
        }

        // If user data has not been created in user_data table, create it
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

        context.setUser(user_parsed);

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
        /**
         * AAA
         */
        logout,
        register,
    }
}