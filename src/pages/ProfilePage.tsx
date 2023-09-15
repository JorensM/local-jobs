//Core
import { useFocusEffect } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Models } from 'appwrite'
import { useCallback, useState } from 'react'

//Functions
import useAppwrite from '../functions/useAppwrite'

//Types
import ParamList from './ParamList'
import UserModel from '../types/UserModel'

//Components
import Page from '../components/layout/Page'
import H1 from '../components/typography/H1'

type ProfilePageProps = DrawerScreenProps<ParamList>

export default function ProfilePage( { route }: ProfilePageProps) {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const { functions } = useAppwrite()
    
    const [user, setUser] = useState<UserModel | null>(null)

    const fetchUser = () => {
        setLoading(true)
        functions.createExecution('get-public-profile', JSON.stringify({
            id: route.params!.id
        }))
            .then(res => {
                setUser(JSON.parse(res.response).data)
            })
            .catch(err => {
                console.error(err)
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useFocusEffect(
        useCallback(() => {
            fetchUser()
        }, [])
    )

    return (
        <Page
            loading={loading}
            error={error}
        >
            <H1>{user?.name}</H1>
        </Page>
    )    
    
}