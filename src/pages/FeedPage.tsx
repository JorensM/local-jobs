import { Text, Button } from 'react-native'

//Components
import Page from '../components/layout/Page';
import useAppwrite from '../functions/useAppwrite';
import useCheckLogin from '../functions/useCheckLogin';

export default function FeedPage() {

    const { checkSession } = useCheckLogin('Login')

    const { account } = useAppwrite()

    const handleLogoutPress = () => {
        account.deleteSession('current')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                checkSession('Login')
            })
    }

    return (
        <Page>
            <Text>
                Feed page
            </Text>
            <Button
                onPress={handleLogoutPress}
                title='Logout'
            />
        </Page>
    )
}