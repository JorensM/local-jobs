import { Client, Account, Databases } from 'appwrite'

export default function useAppwrite(): {
    client: Client, 
    account: Account,
    db: Databases
} {
    const client = new Client()
    const account = new Account(client)
    const db = new Databases(client)

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('64e4a62767a8fbeccac8');

    return { client, account, db }
}