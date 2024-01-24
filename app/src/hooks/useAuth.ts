// Core
import { useContext } from 'react';
import { AuthSession } from '@supabase/supabase-js';

// Types
import { User, UserRole, UserUpdate } from '#types/User';

// State
import AuthContext from '#state/AuthContext';

// Misc
import supabase from '#misc/supabase'

// Schema
import { userSchemaPartial } from '#schema/userSchema';


type AuthHook = {
    /**
     * User object of the currently logged in user or null if not 
     * logged in (as state). This state is stored in context and is synced throughout
     * each use of the hook.
     */
    user: User | null
    /**
     * Update user according to the passed User object. User must be signed in for
     * this to work
     * 
     * @param user partial User object
     */
    updateUser: (user: UserUpdate) => Promise<void>
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

    const updateUser = async (user: UserUpdate) => {
        const valid = userSchemaPartial.validate(user);
        console.log(valid)
    }

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

    /**
     * Test
     * @returns 
     */
    const logout = async (): Promise<true> => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error
        }
        console.log('logged out')
        fetchUser()

        return true;
    }

    const fetchUser = async () => {
        const { data: { session }, error } = await supabase.auth.getSession()

        if(!session) {
            context.setUser(null);
            return null
        } else if(error) {
            throw error
        }

        const user = session.user;
        
        
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
            name: user.user_metadata.name,
            phone_number: user.user_metadata.phone_number,
            phone_country_code: user.user_metadata.phone_country_code
        }

        // If user data has not been created in user_data table, create it
        if(user_data!.length == 0) {
            const { error } = await supabase
                .from('user_data')
                .insert({
                    ...user_parsed,
                    id: undefined,
                    user_id: user_parsed.id,
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
        updateUser,
        fetchUser,
        getSession,
        login,
        logout,
        register,
    }
}