import { Client, Account, Databases, Models } from 'appwrite'
import { useState } from 'react'
import useCheckLogin from './useCheckLogin'

export default function useAppwrite(fetch_user_interval: number = 2000): {
    client: Client, 
    account: Account,
    db: Databases,
    //currentUser:
    currentUser: Models.User<Models.Preferences> | null,
    fetchCurrentUser: () => void
} {
    //State
    const [ currentUser, setCurrentUser ] = useState<Models.User<Models.Preferences> | null>(null)

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
            fetchCurrentUser()
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

    const fetchCurrentUser = async () => {
        //if( account_obj ) {
            //console.log('ccc')
            //return account_obj
        //} else {
            //let acc// = account.get()
        try {
            //console.log('ddd')
            const acc = await account.get()
            setCurrentUser(acc)
        } catch ( err ) {
            console.warn('Could not retrieve current user account')
            setCurrentUser(null)
        }

        //}
    }

    // if (fetch_user_interval > 0) {
    //     setInterval(() => {
    //         fetchCurrentUser()
    //     }, fetch_user_interval)
    // }

    

    return { client, account, db, currentUser, fetchCurrentUser }
}