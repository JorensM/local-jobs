//Core
import { DrawerScreenProps } from '@react-navigation/drawer'
import Page from '../components/layout/Page'
import H1 from '../components/typography/H1'

//Types
import ParamList from './ParamList'


type ProfilePageProps = DrawerScreenProps<ParamList>

export default function ProfilePage( {}: ProfilePageProps) {


    return (
        <Page>
            <H1></H1>
        </Page>
    )    
    
}