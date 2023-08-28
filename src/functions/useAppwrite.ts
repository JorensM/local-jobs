import { Client, Account, Databases, Models } from 'appwrite'
import useCheckLogin from './useCheckLogin'

export default function useAppwrite(): {
    client: Client, 
    account: Account,
    db: Databases,
    getCurrentUser: () => Promise<Models.User<Models.Preferences>>
} {
    const client = new Client()
    const account = new Account(client)
    const db = new Databases(client)

    let account_obj: any = null;

    // const { checkSession } = useCheckLogin(undefined, undefined, true)

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('64e4a62767a8fbeccac8');

    account.getSession('current')
        .then( res => {
            //console.log('aaa')
            getCurrentUser()
        })
        .catch( err => {
            //console.log('bbb')
            console.warn('Could not retrieve session', err)
        })

    // account.get()
    // .then( res => { account_obj = res })
    // .catch(err => {
    //     console.error('Could not retrieve current user account: ', err)
    // })

    const getCurrentUser = async () => {
        if( account_obj ) {
            //console.log('ccc')
            return account_obj
        } else {
            //let acc// = account.get()
            try {
                //console.log('ddd')
                const acc = account.get()
                return acc
            } catch ( err ) {
                console.warn('Could not retrieve current user account')
                return null
            }

        }
    }

    return { client, account, db, getCurrentUser }
}