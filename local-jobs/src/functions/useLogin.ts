import useAppwrite from './useAppwrite'
import useCheckLogin from './useCheckLogin'

export default function useLogin() {

    const { checkSession } = useCheckLogin('Login', undefined, true)
    const { account } = useAppwrite()

    const logout = () => {
        return new Promise( (resolve, reject) => {
            account.deleteSession('current')
                .then(res => {
                    //console.log(res)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                    console.error('An error occured while logging out', err)
                    console.error(err)
                })
                .finally(() => {
                    checkSession('Login')
                })
        })
        
    }

    return { logout }
}