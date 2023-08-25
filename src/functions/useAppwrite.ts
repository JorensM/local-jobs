import { Client, Account, Databases, Models } from 'appwrite'

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

    

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('64e4a62767a8fbeccac8');

    account.get()
    .then( res => { account_obj = res })
    .catch(err => {
        console.error('Could not retrieve current user account: ', err)
    })

    const getCurrentUser = async () => {
        if( account_obj ) {
            return account_obj
        } else {
            return await account.get()
        }
    }

    return { client, account, db, getCurrentUser }
}