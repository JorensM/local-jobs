// Core
import { useState } from 'react';
import { FlatList } from 'react-native';
import { router } from 'expo-router';

// Components
import ListSeparator from '#components/layout/ListSeparator';
import SessionPage from '#components/layout/SessionPage';
import ContactSmall from '#components/ContactSmall';

// Styles
import list from '#styles/list';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useContacts from '#hooks/useContacts';
import usePage from '#hooks/usePage';

// Types
import { User } from '#types/User';

// Misc
import { toastError } from '#misc/toast';

/**
 * Page showing all of users contacts
 */
export default function MyContactsPage() {

    // Hooks
    const contacts = useContacts();
    const { setError, setLoading, pageState } = usePage(true);

    // State
    /**
     * Data of all contacts
     */
    const [contactsData, setContactsData] = useState<User[]>([]);

    // Handlers

    /**
     * Called when contact card was pressed. Redirects to the page of the specified
     * contact.
     * @param contact_id ID of the contact on the card
     */
    const handleContactPress = (contact_id: string) => {
        // Redirect to respective contact's page
        router.replace('/contacts/' + contact_id);
    }

    // Functions

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const _contacts = await contacts.fetchUsersContacts();
            setContactsData(_contacts);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            toastError('An error has occured', err.message);
        }
        
    }

    // Effects

    useFocusEffect(() => {
        fetchContacts();
    })
    
    return (
        <SessionPage
            pageState={pageState}
        >
            {/* Contacts list */}
            <FlatList
                style={list.list}
                ItemSeparatorComponent={() => <ListSeparator />}
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