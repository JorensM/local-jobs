import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useAppwrite from './useAppwrite';

export default function useCheckLogin(
    logged_out_redirect?: string | null,
    logged_in_redirect?: string | null,
    prevent_navigation: boolean = false
) {
    const { account } = useAppwrite()
    const _navigation = prevent_navigation ? null : useNavigation<any>()

    const checkSession = (log_out_redirect?: string | null, log_in_redirect?: string | null) => {
        account.getSession('current')
            .then(res => {
                console.log('retrieved session')
                console.log(res)
                if (logged_in_redirect && !prevent_navigation) {
                    console.log('navigating')
                    console.log(_navigation)
                    _navigation.navigate(logged_in_redirect)
                }
            })
            .catch(err => {
                if (
                    err.code == 401 && 
                    logged_out_redirect && 
                    !prevent_navigation
                ) {
                    _navigation.navigate(logged_out_redirect)
                } else {
                    console.error('Could not retrieve session:', err)
                }
                
            })
    }

    useEffect(() => {
        checkSession(logged_out_redirect, logged_in_redirect)
    }, [])    

    return { checkSession }
}