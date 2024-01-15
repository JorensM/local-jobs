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
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import useListings from '#hooks/useListings'
import useFocusEffect from '#hooks/useFocusEffect'
import { usePathname } from 'expo-router'
import useAuth from '#hooks/useAuth'

export default function ListingPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const pathname = usePathname();
    const navigation = useNavigation();
    const { listing_id } = useLocalSearchParams();

    // State
    const [listing, setListing] = useState<Listing | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isOwnListing, setIsOwnListing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    // const isFocused = useIsFocused()

    

    const handleEditPress = () => {
        console.log(isOwnListing)
        if (isOwnListing) {
            router.replace('edit-listing/' + listing_id)
        } else {
            console.warn(`Can't edit listing that isn't your own!`)
        }
    }

    const handleEditPressRef = useRef(handleEditPress)
    handleEditPressRef.current = handleEditPress

    const fetchListing = async () => {
        setIsOwnListing(false)
        setLoading(true)
        if( listing_id ) {
            const _listing: Listing = await listings.fetchListing(parseInt(listing_id as string));

            const is_own = _listing.user_id == auth.user!.id
            setIsOwnListing(is_own)

            if(is_own) {
                navigation.setOptions({
                    headerRight: () => (
                        <View
                            style={{
                                paddingRight: 16
                            }}
                        >
                            <IconButton
                                name='edit'
                                size={ 24 }
                                onPress={ handleEditPressRef.current }
                            />
                        </View>
                    )
                })
            }
            setListing(_listing)
            setLoading(false)
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
        } else {
            console.error('Id not specified for listing')
            setError('Id not specified for listing')
        }
    }

    useFocusEffect(() => {
        fetchListing()
    }, [listing_id])

    useEffect(() => {
        setLoading(true)
        setListing(null)
        console.log('unsetting listing')
    }, [pathname])

    return (
        <Page
            loading={loading}
            error={error}
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