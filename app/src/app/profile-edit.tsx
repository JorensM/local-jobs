// Components
import SessionPage from '#components/layout/SessionPage';

// Hooks
import usePage from '#hooks/usePage';

export default function ProfileEditPage() {

    // Hooks
    const { pageState } = usePage();

    return (
        <SessionPage
            pageState={pageState}
        >

        </SessionPage>
    )
}