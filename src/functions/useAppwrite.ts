import { Client, Account, Databases, Functions, Models } from 'appwrite'
import { useEffect, useState } from 'react'
import useCheckLogin from './useCheckLogin'

export default function useAppwrite(fetch_user_interval: number = 2000): {
    client: Client, 
    account: Account,
    db: Databases,
    functions: Functions,
    //currentUser:
    currentUser: Models.User<Models.Preferences> | null,
    fetchCurrentUser: () => Promise<Models.User<Models.Preferences> | null> 
} {
    //State
    const [ currentUser, setCurrentUser ] = useState<Models.User<Models.Preferences> | null>(null)

    const client = new Client()
    const account = new Account(client)
    const db = new Databases(client)
    const functions = new Functions(client)

    let account_obj: any = null;

    // const { checkSession } = useCheckLogin(undefined, undefined, true)

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('64e4a62767a8fbeccac8');

    // useEffect(() => {

    // }, [])
    // account.getSession('current')
    //     .then( res => {
    //         //console.log('aaa')
    //         fetchCurrentUser()
    //     })
    //     .catch( err => {
    //         //console.log('bbb')
    //         console.warn('Could not retrieve session', err)
    //     })

    // account.get()
    // .then( res => { account_obj = res })
    // .catch(err => {
    //     console.error('Could not retrieve current user account: ', err)
    // })

    const fetchCurrentUser = (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                //console.log('ddd')
                const acc = await account.get()
                //console.log(acc)
                setCurrentUser(acc)
                resolve(acc)
            } catch ( err ) {
                console.warn('Could not retrieve current user account')
                setCurrentUser(null)
                reject('Could not retrieve current user account')
            }
        })
        //if( account_obj ) {
            //console.log('ccc')
            //return account_obj
        //} else {
            //let acc// = account.get()
        

        //}
    }

    // if (fetch_user_interval > 0) {
    //     setInterval(() => {
    //         fetchCurrentUser()
    //     }, fetch_user_interval)
    // }

    

    return { client, account, db, functions, currentUser, fetchCurrentUser }
}