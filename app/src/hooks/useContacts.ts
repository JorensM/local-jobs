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

        const { data, error } = await supabase
            .from('contacts')
            .select()
            .eq('user_id', auth.user.id)

        if(error) {
            throw error;
        }

        let users: User[] = [];
        
        if(data.length > 0) {

            const contact_ids = data.map(entry => entry.contact_id);

            const { data: _users, error } = await supabase
                .from('users')
                .select()
                .in('id', contact_ids)

            if(error) {
                throw error
            }

            users = _users;
        } else {
            return []
        }

        

        return users;
    }

    return {
        purchaseContact,
        fetchUsersContacts
    }
}