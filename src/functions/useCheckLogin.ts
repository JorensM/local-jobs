import { useNavigation } from '@react-navigation/native';
import useAppwrite from './useAppwrite';

export default function useCheckLogin(
    logged_out_redirect?: string,
    logged_in_redirect?: string
) {
    const { account } = useAppwrite()
    const navigation = useNavigation<any>()

    const checkSession = (log_out_redirect?: string, log_in_redirect?: string) => {
        account.getSession('current')
            .then(res => {
                console.log('retrieved session')
                console.log(res)
                if (logged_in_redirect) {
                    navigation.navigate(logged_in_redirect)
                }
            })
            .catch(err => {
                console.error('Could not retrieve session')
                console.error(err)
                if (logged_out_redirect) {
                    navigation.navigate(logged_out_redirect)
                }
            })
    }

    checkSession(logged_out_redirect, logged_in_redirect)

    return { checkSession }
}