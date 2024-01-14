import UserContext from 'src/state/UserContext';
import { useContext } from 'react'

export default function useSupabase() {

    const [ user ] = useContext(UserContext);

    const register = (username: string, password: string) => {

    }

    const login = (username: string, password: string) => {

    }

    return {
        register,
        login
    }
}