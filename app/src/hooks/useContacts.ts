import supabase from '#misc/supabase'
import { User } from '#types/User';
import useAuth from './useAuth'

export default function useContacts() {

    const auth = useAuth();

    const purchaseContact = async (contact_user_id: string) => {

        if (!auth.user) {
            throw new Error('User not stored in state')
        }

        {

            const { data, error } = await supabase
                .from('contacts')
                .select()
                .limit(1)
                .eq('user_id', auth.user.id)
                .eq('contact_id', contact_user_id)

            if(error) {
                throw error
            }

            if (data.length != 0) {
                throw new Error('User already in your contacts')
            }
        }
        

        const { error } = await supabase
            .from('contacts')
            .insert({
                user_id: auth.user.id,
                contact_id: contact_user_id
            })
        
        if(error) {
            throw error
        }

        return true;
    }

    const fetchUsersContacts = async () => {

        if(!auth.user) {
            throw new Error('User state not set')
        }

        const { data: contacts, error } = await supabase
            .from('contacts')
            .select()
            .eq('user_id', auth.user.id)

        if(error) {
            throw error;
        }

        let users: User[] = [];
        
        if(contacts.length > 0) {

            const contact_ids = contacts.map(entry => entry.contact_id);

            const { data: users, error } = await supabase
                .from('user_data')
                .select()
                .in('user_id', contact_ids)

            if(error){
                throw error
            }

            const users_parsed: User[] = users!.map(user => ({
                id: user.user_id,
                role: user.role,
                name: user.name
            }))

            return users_parsed;

            // const { data: _users, error } = await supabase
            //     .from('users')
            //     .select()
            //     .in('id', contact_ids)

            // if(error) {
            //     throw error
            // }

            // users = _users;
        } else {
            return []
        }

        

        return users;
    }

    const parseUserData = (user_data: any): User => {
        return {
            id: user_data.user_id,
            name: user_data.name,
            role: user_data.role
        }
    }

    const fetchContact = async (contact_id: string) => {
        const { data, error } = await supabase
            .from('user_data')
            .select()
            .eq('user_id', contact_id)
            .limit(1);

        if(error) {
            throw error
        } else if (data.length == 0) {
            throw new Error('Could not fetch contact')
        }

        return parseUserData(data[0]);
    }

    return {
        purchaseContact,
        fetchUsersContacts,
        fetchContact
    }
}