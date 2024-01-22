// Components
import SessionPage from '#components/layout/SessionPage';
import H1 from '#components/typography/H1';
import Caption from '#components/typography/Caption';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useAuth from '#hooks/useAuth';
import usePage from '#hooks/usePage';

/**
 * Profile page that displays the information about the current user
 */
export default function ProfilePage() {

    // Hooks
    const auth = useAuth();

    // State
    const { pageState } = usePage();

    // Effects

    useFocusEffect(() => {
        auth.fetchUser();
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