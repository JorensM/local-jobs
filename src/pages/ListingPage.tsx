//Core
import { 
    useCallback, 
    useEffect, 
    useState 
} from 'react'
import {
    Text
} from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

//Types
import ListingModel from '../types/ListingModel'

//Components
import Page from '../components/layout/Page'
import useAppwrite from '../functions/useAppwrite'
import { DrawerScreenProps } from '@react-navigation/drawer'
import ParamList from './ParamList'
import constant from '../../const'
import { ID } from 'appwrite'
import H1 from '../components/typography/H1'
import Caption from '../components/typography/Caption'

type Props = DrawerScreenProps<ParamList>

export default function ListingPage( { route }: Props) {

    const { db } = useAppwrite()

    const [listing, setListing] = useState<ListingModel | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const isFocused = useIsFocused()

    const fetchListing = () => {
        setLoading(true)
        if( route.params?.id ) {
            db.getDocument<ListingModel>(
                constant.db.id,
                constant.db.listings_id,
                route.params.id
            )
            .then( res => {
                setListing(res)
                setLoading(false)
            })
            .catch( err => {
                console.error('Could not retrieve listing with id ' 
                    + route.params?.id, err)
            })
        } else {
            console.error('Id not specified for listing')
        }
        
    }

    useFocusEffect(
        useCallback(() => {
            console.log('fetching listing by id ' + route.params?.id)
            fetchListing()
        }, [ route ])
    )

    useEffect(() => {
        if( !isFocused ) {
            setListing(null)
        }
    }, [isFocused])

    // useEffect(() => {
    //     setLoading(false)
    // }, [ listing ])

    return (
        <Page
            loading={loading}
        >
            <H1>
                { listing?.title || '' }
            </H1>
            <Caption>
                By { listing?.by_user_name || '' }
            </Caption>
            <Text
                style={{
                    marginTop: 16
                }}
            >
                { listing?.description || '' }
            </Text>
        </Page>
    )
}