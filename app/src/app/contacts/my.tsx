// Core
import { useState } from 'react';
import { FlatList } from 'react-native';

// Components
import ListSeparator from '#components/layout/ListSeparator';
import SessionPage from '#components/layout/SessionPage';
import ContactSmall from '#components/ContactSmall';

// Styles
import list from '#styles/list';

// Types
import { User } from '#types/User';
import { router } from 'expo-router';
import useFocusEffect from '#hooks/useFocusEffect';
import useContacts from '#hooks/useContacts';
import { toastError } from '#misc/toast';


export default function MyContactsPage() {

    // Hooks
    const contacts = useContacts();

    // State
    const [contactsData, setContactsData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleContactPress = (contact_id: string) => {
        router.replace('/contacts/' + contact_id);
    }

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const _contacts = await contacts.fetchUsersContacts();
            console.log(_contacts);
            setContactsData(_contacts)
            setLoading(false);
        } catch (err: any) {
            setError(err.message)
            toastError('An error has occured', err.message);
        }
        
    }

    useFocusEffect(() => {
        fetchContacts();
    })
    
    return (
        <SessionPage
            loading={loading}
            error={error}
        >
            <FlatList
                style={list.list}
                ItemSeparatorComponent={() => <ListSeparator/>}
                data={contactsData}
                renderItem={({ item }) => (
                    <ContactSmall 
                        item={item} 
                        onPress={() => handleContactPress(item.id)}
                    /> 
                )}
            />
        </SessionPage>
    )
}