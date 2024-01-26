// Hooks
import supabase from '#misc/supabase'
import useAuth from './useAuth'

// Types
import { User } from '#types/User';

type ContactsHook = {
    /**
     * Fetches all of users contacts and returns an array of User objects of those contacts.
     * 
     * @returns Promise that resolves to an array of User objects of the contacts
     */
    fetchUsersContacts: () => Promise<User[]>
    /**
     * Fetches single contact by id and returns User object of that contact
     * 
     * @returns User object of requested contact or null if user not found or not
     * in current user's contacts
     */
    fetchContact: (contact_id: string) => Promise<User | null>
}

/**
 * Hook used for managing contacts
 */
export default function useContacts(): ContactsHook {

    // Hooks
    const auth = useAuth();

    const fetchUsersContacts = async () => {

        // Check if user is logged in and throw error if not
        if(!auth.user) {
            throw new Error('User state not set')
        }

        console.log('fetching contacts of ' + auth.user.id)

        // Get user's contacts from Supabase
        const { data: contacts, error } = await supabase
            .from('contacts')
            .select()
            .eq('user_id', auth.user.id)

        console.log(contacts);

        if(error) {
            throw error;
        }
        
        // If there are any contacts
        if(contacts.length > 0) {

            // Stored all contact ids in an array
            const contact_ids = contacts.map(entry => entry.contact_id);

            // Get every contact's user data from Supabase by the IDs
            const { data: users, error } = await supabase
                .from('user_data')
                .select()
                .in('user_id', contact_ids)

            if(error){
                throw error
            }

            // Convert Supabase user schema to User type
            const users_parsed: User[] = users!.map(user => ({
                id: user.user_id,
                role: user.role,
                name: user.name
            }))

            return users_parsed;
        } else {
            return []
        }

    }

    const fetchContact = async (contact_id: string) => {

        // Check if user is logged in and throw error if not
        if(!auth.user) {
            throw new Error('User state not set')
        }

        // Get contact's user data by ID
        const { data, error } = await supabase
            .from('user_data')
            .select()
            .eq('user_id', contact_id)
            .limit(1);

        if(error) {
            throw error
        } else if (data.length == 0) {
            return null;
        }

        // Convert Supabase user schema to User type and return it
        return parseUserData(data[0]);

    }

    /**
     * Convert DB user_data model to User object
     * @param user_data user data as found in the user_data table in Supabase
     * @returns {User} parsed User object
     */
    const parseUserData = (user_data: any): User => {

        return {
            id: user_data.user_id,
            name: user_data.name,
            role: user_data.role
        }

    }

    return {
        fetchUsersContacts,
        fetchContact
    }
}