// Core
import { View } from 'react-native';

// Components
import SessionPage from '#components/layout/SessionPage';
import H1 from '#components/typography/H1';
import Caption from '#components/typography/Caption';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useAuth from '#hooks/useAuth';
import usePage from '#hooks/usePage';
import useHeader from '#hooks/useHeader';
import useUnfocusEffect from '#hooks/useUnfocusEffect';
import IconButton from '#components/input/IconButton';
import { router } from 'expo-router';

/**
 * Profile page that displays the information about the current user
 */
export default function ProfilePage() {

    // Hooks
    const auth = useAuth();
    const { setHeaderRight } = useHeader();

    // State
    const { pageState } = usePage();

    // Handlers
    const handleEditPress = () => {
        router.replace('/profile-edit');
    }

    // Effects

    useFocusEffect(() => {
        auth.fetchUser();
        setHeaderRight(
            <IconButton
                name='edit'
                onPress={handleEditPress}
            />
        )
    })

    return (
        <SessionPage
            pageState={pageState}
        >
            {auth.user ?
                <>
                    <H1>
                    {auth.user!.name}
                    </H1>
                    <Caption>
                        {auth.user!.role}
                    </Caption>
                </>
            : null}
            
        </SessionPage>
    )
}