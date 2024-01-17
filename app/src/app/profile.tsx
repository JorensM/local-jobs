// Components
import SessionPage from '#components/layout/SessionPage';

// Hooks
import useFocusEffect from '#hooks/useFocusEffect';
import useAuth from '#hooks/useAuth';
import usePage from '#hooks/usePage';

export default function ProfilePage() {

    // Hooks
    const auth = useAuth();

    // State
    const { setError, setLoading, pageState } = usePage()

    useFocusEffect(() => {
        auth.fetchUser().then(() => {

        });
    })

    return (
        <SessionPage>

        </SessionPage>
    )
}