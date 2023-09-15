//Core
import { useState, useCallback } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect as _useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

//Components
import SessionPage from '../components/layout/SessionPage';
import UserSmall from '../components/UserSmall';

//Functions
import useAppwrite from '../functions/useAppwrite';

//Types
import ParamList from './ParamList'
import PublicUserModel from '../types/PublicUserModel';


const useFocusEffect = (fn: Function) => {
    _useFocusEffect(
        useCallback(() => {
            fn()
        }, [])
    )
}

const test_data = [
    {
        profile_picture: require('/assets/user.png'),
        $id: '1',
        $name: 'Test Userbbbb'
    }
]

type ProfilePageProps = DrawerScreenProps<ParamList>

export default function ContactsPage( {}: ProfilePageProps) {

    //currentUser is deprecated
    const { db, functions, currentUser, currentSession } = useAppwrite()

    const [ contacts, setContacts ] = useState<PublicUserModel[]>([])

    const fetchContacts = () => {
        console.log('current user: ', currentSession)
        if( currentSession ) {
            functions.createExecution('get-user-contacts', 
                JSON.stringify({
                    id: currentSession.user.$id
                }))
                .then( res => {
                    console.log(res)
                    setContacts(JSON.parse(res.response).data)
                })
                .catch( err => {
                    console.error(err)
                })
        } else {
            console.error('Could not fetch contacts - user not logged in')
        }
        
    }

    useFocusEffect( () => {
        console.log('focus effect')
        fetchContacts()
    })

    return (
        <SessionPage>
            <FlatList
                data={contacts}
                renderItem={({item}) => (
                    <UserSmall
                        user={item}
                    />
                )}
            />
        </SessionPage>
    )
}