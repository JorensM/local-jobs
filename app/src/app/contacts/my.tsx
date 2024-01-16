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


export default function MyContactsPage() {

    const [contactsData, setContactsData] = useState<User[]>([]);

    const handleContactPress = (contact_id: string) => {
        router.replace('/contacts/' + contact_id);
    }
    
    return (
        <SessionPage>
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