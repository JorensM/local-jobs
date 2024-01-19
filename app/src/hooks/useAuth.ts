import { useContext } from 'react';

// Types
import { UserRole } from '#types/User';

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
        const { data: { user: user }, error } = await supabase.auth.getUser();

        if(error?.status == 401) {
            return false
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
        getSession,
        login,
        logout,
        register,
    }
}