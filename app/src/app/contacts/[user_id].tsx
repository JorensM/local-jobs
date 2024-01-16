// Core
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

// Components
import SessionPage from '#components/layout/SessionPage';

// Types
import { User } from '#types/User';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useContacts from '#hooks/useContacts';

// Components
import H1 from '#components/typography/H1';
import Caption from '#components/typography/Caption';

// Misc
import { toastError } from '#misc/toast';





export default function ContactPage() {

    // Hooks
    const { user_id } = useLocalSearchParams();
    const contacts = useContacts();

    // State
    const [contact, setContact] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Functions
    const fetchContact = async () => {
        setLoading(true);
        try {
            const _contact = await contacts.fetchContact(user_id as string);

            setContact(_contact)
            setLoading(false);
        } catch (err: any) {
            toastError('Error', err.message)
            setError(err.message)
        }
        
    }

    // Effects
    useFocusEffect(() => {
        fetchContact();
    })

    return (
        <SessionPage
            loading={loading}
            error={error}
        >
            {contact ? 
                <>
                    <H1>
                        { contact.name }
                    </H1>
                    <Caption>
                        { contact.role }
                    </Caption>
                </>
            : null}
            
        </SessionPage>
    )
}