import supabase from '#misc/supabase'
import useAuth from './useAuth'

export default function useContacts() {

    const auth = useAuth();

    const purchaseContact = async (contact_user_id: string) => {

        if (!auth.user) {
            throw new Error('User not stored in state')
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

    return {
        purchaseContact
    }
}