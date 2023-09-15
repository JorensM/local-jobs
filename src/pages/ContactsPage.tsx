import { useState, useCallback } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';

//Components
import SessionPage from '../components/layout/SessionPage';

//Functions
import useAppwrite from '../functions/useAppwrite';

//Types
import ParamList from './ParamList'
import { useFocusEffect as _useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import UserSmall from '../components/UserSmall';


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
        $name: 'Test User'
    }
]

type ProfilePageProps = DrawerScreenProps<ParamList>

export default function ContactsPage( {}: ProfilePageProps) {

    //currentUser is deprecated
    const { db, functions, currentUser, currentSession } = useAppwrite()

    const [ contacts, setContacts ] = useState<string[]>([])

    const fetchContacts = () => {
        console.log('current user: ', currentSession)
        if( currentSession ) {
            functions.createExecution('get-user-contacts', 
                JSON.stringify({
                    id: currentSession.user.$id
                }))
                .then( res => {
                    setContacts(JSON.parse(res.response))
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
                data={test_data}
                renderItem={({item}) => (
                    <UserSmall
                        user={item}
                    />
                )}
            />
        </SessionPage>
    )
}