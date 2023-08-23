import { Client, Account } from 'appwrite'

export default function useAppwrite(): {client: Client, account: Account} {
    const client = new Client()
    const account = new Account(client)

//global.client = new Client()
//global.account = new Account(client)

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('64e4a62767a8fbeccac8');

    return { client, account}
}