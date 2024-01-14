import supabase from '#misc/supabase'
import { UserRole } from '#types/User';

export default function useAuth() {
    const login = async (email: string, password: string) => {
        console.log(email)
        console.log(password)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error){
            return false;
        }
        return true;
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
        login,
        register
    }
}