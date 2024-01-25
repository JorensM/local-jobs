// Core
import { router } from 'expo-router';

// Components
import SessionPage from '#components/layout/SessionPage';
import H1 from '#components/typography/H1';
import Caption from '#components/typography/Caption';
import IconButton from '#components/input/IconButton';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useAuth from '#hooks/useAuth';
import usePage from '#hooks/usePage';
import useHeader from '#hooks/useHeader';

// Constants
import { route_names } from '#constants/routes';

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

    /**
     * On edit button press. Redirects to profile edit page
     */
    const handleEditPress = () => {
        // Redirect to profile edit page
        router.replace(route_names.edit_profile);
    }

    // Effects

    useFocusEffect(() => {
        auth.fetchUser();
        // Add edit button to header
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
            {/* Render page if auth.user is set */}
            {auth.user ?
                <>
                    {/* Display name */}
                    <H1>
                    {auth.user!.name}
                    </H1>
                    {/* Role */}
                    <Caption>
                        {auth.user!.role}
                    </Caption>
                </>
            : null}
            
        </SessionPage>
    )
}