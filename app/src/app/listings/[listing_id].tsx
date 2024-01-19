// Core
import { 
    useEffect, 
    useRef, 
    useState 
} from 'react'
import {
    Text,
    View,
    Button,
    Pressable,
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
import useAPI from '#hooks/useAPI'

// Misc
import { toastError } from '#misc/toast'
import { useStripe } from '#misc/stripe'

// Styles
import text from '#styles/text'

/**
 * Page for single listing. On this page customer can make payment to get access
 * to contact.
 */
export default function ListingPage() {

    // Hooks
    const listings = useListings();
    const auth = useAuth();
    const pathname = usePathname();
    const navigation = useNavigation();
    const { listing_id } = useLocalSearchParams();
    const { setLoading, setError, pageState } = usePage(true);
    const api = useAPI();
    const stripe = useStripe();

    // State
    const [listing, setListing] = useState<Listing | null>(null)
    const [showContactModal, setShowContactModal] = useState<boolean>(false);

    // Refs
    const isOwnListingRef = useRef<boolean>(false);

    // Handlers

    // On listing edit press
    const handleEditPress = () => {
        // Only redirect to edit page if the listing is user's own listing
        if (isOwnListingRef.current) {
            router.replace('edit-listing/' + listing_id)
        } else {
            console.warn(`Can't edit listing that isn't your own!`)
        }
    }

    // On contact button press
    const handleContactPress = () => {
        setShowContactModal(true);
    }

    // On contact payment button press
    const handlePayForContactPress = async () => {
        try {
            if (!listing) {
                throw new Error('Listing not found')
            } else if (!stripe) { // Stripe doesn't work on web so check for that
                throw new Error('Stripe not supported on web')
            }
            await initializePaymentSheet()
            // Present the payment sheet
            const { error } = await stripe.presentPaymentSheet();
            if(error) {
                console.log(error)
                throw error
            }
                // #TODO implement after-payment-success flow
                //toastSuccess('Purchase successful', 'User has been added to your contacts')
            
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

            // Check if this is user's own listing
            const is_own = _listing.user_id == auth.user!.id;
            isOwnListingRef.current = is_own;

            if(is_own) {
                // If this is user's own listing, add an 'edit' button to the header
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

    // Initialize payment sheet. Must be called before presenting the payment sheet
    const initializePaymentSheet = async () => {
        // Stripe is not supported on web so check for that
        if(!stripe) {
            throw new Error('Stripe not supported on web')
        }
    
        // Make request to API to generate a payment sheet for purchasing a contact
        const payment_sheet = await api.getContactPaymentSheet(listing!.user_id);

        if(!payment_sheet) {
            throw new Error('Could not retrieve payment sheet')
        }

        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey
        } = payment_sheet

        // Initialize payment sheet by passing data received from API
        const { error } = await stripe.initPaymentSheet({
          merchantDisplayName: "Local Jobs",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
          //methods that complete payment after a delay, like SEPA Debit and Sofort.
          allowsDelayedPaymentMethods: false,
          defaultBillingDetails: {
            name: 'Jane Doe',
          }
        });
        if(error) {
            throw error
        }
    };

    // Effects

    useFocusEffect(() => {
        fetchListing()
    }, [], true)

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