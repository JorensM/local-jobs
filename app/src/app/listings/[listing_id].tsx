// Core
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
    StyleSheet,
    Pressable
} from 'react-native'
import { 
    router, 
    useLocalSearchParams, 
    useNavigation,
    usePathname
} from 'expo-router'

// Types
import { Listing } from '#types/Listing'

// Components
import SessionPage from '#components/layout/SessionPage'
import H1 from '#components/typography/H1'
import Caption from '#components/typography/Caption'
import Info from '#components/typography/Info'
import IconButton from '#components/input/IconButton'
import Modal from '#components/layout/Modal'

// Hooks
import useListings from '#hooks/useListings'
import useFocusEffect from '#hooks/useFocusEffect'
import useAuth from '#hooks/useAuth'
import useContacts from '#hooks/useContacts'
import usePage from '#hooks/usePage'

// Misc
import { toastError, toastSuccess } from '#misc/toast'

/**
 * Page for single listing
 */
export default function ListingPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const pathname = usePathname();
    const navigation = useNavigation();
    const contacts = useContacts();
    const { listing_id } = useLocalSearchParams();
    const { setLoading, setError, pageState } = usePage(true);

    // State
    const [listing, setListing] = useState<Listing | null>(null)
    const [showContactModal, setShowContactModal] = useState<boolean>(false);

    // Refs
    const isOwnListingRef = useRef<boolean>(false);

    // Handlers

    const handleEditPress = () => {
        if (isOwnListingRef.current) {
            router.replace('edit-listing/' + listing_id)
        } else {
            console.warn(`Can't edit listing that isn't your own!`)
        }
    }

    const handleContactPress = () => {
        setShowContactModal(true);
    }

    const handlePayForContactPress = async () => {
        try {
            if(!listing) {
                throw new Error('Listing not found')
            }
            await contacts.purchaseContact(listing.user_id);
            setShowContactModal(false);
            router.replace('/feed') // This should redirect to the newly created contact
            toastSuccess('Purchase successful', 'User has been added to your contacts')
        } catch (err: any) {
            setShowContactModal(false);
            toastError('An error has occured', err.message)
        }
    }

    // Functions

    const fetchListing = async () => {
        isOwnListingRef.current = false;
        // setIsOwnListing(false)
        setLoading(true)
        if( listing_id ) {
            const _listing: Listing = await listings.fetchListing(parseInt(listing_id as string));

            const is_own = _listing.user_id == auth.user!.id;
            isOwnListingRef.current = is_own;

            if(is_own) {
                console.log('setting option')
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
                                onPress={ handleEditPress }
                            />
                        </View>
                    )
                })
            }
            setListing(_listing)
            setLoading(false)
        } else {
            setError('Id not specified for listing')
        }
    }

    // Effects

    useFocusEffect(() => {
        if(auth.user) {
            fetchListing()
        }
    }, [listing_id, auth.user])

    useEffect(() => {
        setLoading(true)
        setListing(null)
    }, [pathname])

    return (
        <SessionPage
            pageState={pageState}
        >
            <Modal
                visible={showContactModal}
            >
                <Modal.Header>
                    <Pressable
                        onPress={() => setShowContactModal(false)}
                    >
                        <Text
                            style={styles.warn}
                        >
                            Close
                        </Text>
                    </Pressable>
                </Modal.Header>
                <Modal.Content>
                    <Button
                        onPress={handlePayForContactPress}
                        title="Pay for contact"
                    />
                </Modal.Content>
            </Modal>
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
            { isOwnListingRef.current ? 
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
            { !isOwnListingRef.current ?
            <View
                style={{
                    marginTop: 'auto'
                }}
            >
                <Button
                    onPress={handleContactPress}
                    title='Contact'
                />
            </View>
                
            : null }
        </SessionPage>
    )
}

const styles = StyleSheet.create({
    warn: {
        color: 'red'
    }
})