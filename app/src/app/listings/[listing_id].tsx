//Core
import { 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from 'react'
import {
    Text,
    View,
    Button,
    Pressable
} from 'react-native'

//Types
import { Listing } from '#types/Listing'

//Components
import Page from '#components/layout/Page'
import H1 from '#components/typography/H1'
import Caption from '#components/typography/Caption'
import Info from '#components/typography/Info'
import IconButton from '#components/input/IconButton'

export default function ListingPage() {

    const [listing, setListing] = useState<Listing | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isOwnListing, setIsOwnListing] = useState<boolean>(false)

    // const isFocused = useIsFocused()

    

    const handleEditPress = () => {
        // console.log(isOwnListing)
        // if (isOwnListing) {
        //     navigation.navigate('ListingEdit', { id: listing!.$id })
        // } else {
        //     console.warn(`Can't edit listing that isn't your own!`)
        // }
    }

    const handleEditPressRef = useRef(handleEditPress)
    handleEditPressRef.current = handleEditPress

    const fetchListing = () => {
        // setIsOwnListing(false)
        // setLoading(true)
        // if( route.params?.id ) {
        //     db.getDocument<ListingModel>(
        //         constant.db.id,
        //         constant.db.listings_id,
        //         route.params.id
        //     )
        //     .then( async res => {
        //         const current_user = await account.get()
        //         const is_own = res.by_user == current_user.$id
        //         console.log('setting isownlisting to ' + is_own)
        //         setIsOwnListing(is_own)

        //         if (is_own) {
        //             navigation.setOptions({
        //                 headerRight: () => (
        //                     <View
        //                         style={{
        //                             paddingRight: 16
        //                         }}
        //                     >
        //                         <IconButton
        //                             name='edit'
        //                             size={ 24 }
        //                             onPress={ handleEditPressRef.current }
        //                         />
        //                     </View>
        //                 )
        //             })
        //         }
                
        //         setListing(res)
        //         setLoading(false)
        //     })
        //     .catch( err => {
        //         console.error('Could not retrieve listing with id ' 
        //             + route.params?.id, err)
        //     })
        // } else {
        //     console.error('Id not specified for listing')
        // }
        
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log('fetching listing by id ' + route.params?.id)
    //         fetchListing()
    //     }, [ route ])
    // )

    // useEffect(() => {
    //     if( !isFocused ) {
    //         setListing(null)
    //         navigation.setOptions({
    //             headerRight: () => null
    //         })
    //     }
    // }, [isFocused])

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
                By { listing?.user_name || '' }
            </Caption>
            {/* { listing?.location_name ?
                <Caption>
                    { listing.location_name }
                </Caption>
            : null } */}
            { isOwnListing ? 
                <Info>
                    This is your listing
                </Info>
            : null }
            <Text
                style={{
                    marginTop: 8
                }}
                selectable
            >
                { listing?.description || '' }
            </Text>
            { !isOwnListing ? 
                <Pressable
                    style={{
                        marginTop: 'auto'
                    }}
                >
                    <Text>
                        Contact
                    </Text>
                </Pressable>
            : null }
        </Page>
    )
}