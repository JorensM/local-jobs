// Core
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

// Components
import SessionPage from '#components/layout/SessionPage';

// Types
import { User } from '#types/User';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useContacts from '#hooks/useContacts';
import usePage from '#hooks/usePage';

// Components
import H1 from '#components/typography/H1';
import Caption from '#components/typography/Caption';

// Misc
import { toastError } from '#misc/toast';

/**
 * Page showing a specific contact
 */
export default function ContactPage() {

    // Hooks
    /**
     * @function
     * @property {string} user_id ID of the contact to display
     */
    const {
        /**
         * The user id of the contact to display
         * @type {string}
         */
        user_id 
    } = useLocalSearchParams();
    const contacts = useContacts();
    const { setError, setLoading, pageState } = usePage(true);

    // State
    /**
     * Contact data state
     */
    const [ contact, setContact ] = useState<User | null>(null);

    // Functions

    const fetchContact = async () => {
        setLoading(true);
        try {
            const _contact = await contacts.fetchContact(user_id as string);

            setContact(_contact);
            setLoading(false);
        } catch (err: any) {
            toastError('Error', err.message);
            setError(err.message);
        }
        
    }

    // Effects

    useFocusEffect(() => {
        fetchContact();
    })

    return (
        <SessionPage
            pageState={pageState}
        >
            {/* Only render contact if it was found */}
            {contact ? 
                <>
                    {/* Contact name */}
                    <H1>
                        { contact.name }
                    </H1>
                    {/* Contact role */}
                    <Caption>
                        { contact.role }
                    </Caption>
                </>
            : null}
        </SessionPage>
    )
}