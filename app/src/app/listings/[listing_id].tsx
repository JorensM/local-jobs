// Core
import { 
    useEffect, 
    useMemo, 
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
import usePage from '#hooks/usePage'
import useAPI from '#hooks/useAPI'
import useContacts from '#hooks/useContacts'
import useHeader from '#hooks/useHeader'

// Misc
import { toastError, toastSuccess } from '#misc/toast'
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
    // const navigation = useNavigation();
    const { setHeaderRight } = useHeader();
    const { listing_id } = useLocalSearchParams();
    const { setLoading, setError, pageState } = usePage(true);
    const api = useAPI();
    const stripe = useStripe();
    const contacts = useContacts();

    // State
    const [ listing, setListing ] = useState<Listing | null>(null);
    const [ showContactModal, setShowContactModal ] = useState<boolean>(false);
    const [ isContact, setIsContact ] = useState<boolean>(false);

    // Refs
    const isOwnListingRef = useRef<boolean>(false);

    // Handlers

    // On listing edit press
    const handleEditPress = () => {
        // Only redirect to edit page if the listing is user's own listing
        if (isOwnListingRef.current) {
            router.replace('edit-listing/' + listing_id);
        } else {
            console.warn(`Can't edit listing that isn't your own!`);
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
                throw new Error('Listing not found');
            } else if (!stripe) { // Stripe doesn't work on web so check for that
                throw new Error('Stripe not supported on web');
            }
            await initializePaymentSheet();
            // Present the payment sheet
            const { error } = await stripe.presentPaymentSheet();
            if(error) {
                throw error
            }
            setLoading(true);
            setShowContactModal(false);
            let interval_tries = 0;
            const MAX_INTERVAL_TRIES =  5;
            const interval = setInterval(async () => {
                // Clear interval and throw error if timeout has occured
                if(interval_tries > MAX_INTERVAL_TRIES) {
                    clearInterval(interval);
                    setLoading(false);
                    throw new Error('Timeout has occured')
                }
                // If contact has been added, show success toast and redirect to the
                // newly added contact's page
                const contact = await contacts.fetchContact(listing.user_id);
                if(contact) {
                    setLoading(false);
                    setIsContact(true);
                    toastSuccess('Payment successful', 'User has been added to your contacts list');
                    router.replace('contacts/' + contact.id)
                }
                interval_tries++;
            }, 2000)
            
        } catch (err: any) {
            setShowContactModal(false);
            toastError('An error has occured', err.message);
        }
    }

    // Functions

    const fetchListing = async () => {
        isOwnListingRef.current = false;
        // setIsOwnListing(false)
        setLoading(true);
        if( listing_id ) {
            try {
                const _listing: Listing | null = await listings.fetchListing(parseInt(listing_id as string));
                if(!_listing) {
                    throw new Error("Listing not found");
                }
                // Check if this is user's own listing
                const is_own = _listing.user_id == auth.user!.id;
                isOwnListingRef.current = is_own;

                if(is_own) {
                    // If this is user's own listing, add an 'edit' button to the header
                    setHeaderRight(
                        <IconButton
                            name='edit'
                            size={ 24 }
                            onPress={ handleEditPress }
                        />
                    )
                } else {
                    const contact = await contacts.fetchContact(_listing.user_id);
                    setIsContact(contact ? true : false);
                }
                setListing(_listing);
                setLoading(false);
            } catch (error: any) {
                toastError('Error', error.message);
            }
        } else { // If listing ID was not specified, show error message
            setError('ID not specified for listing');
        }
    }

    // Initialize payment sheet. Must be called before presenting the payment sheet
    const initializePaymentSheet = async () => {
        // Stripe is not supported on web so check for that
        if(!stripe) {
            throw new Error('Stripe not supported on web');
        }
    
        // Make request to API to generate a payment sheet for purchasing a contact
        const payment_sheet = await api.getContactPaymentSheet(listing!.user_id);

        if(!payment_sheet) {
            throw new Error('Could not retrieve payment sheet');
        }

        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey
        } = payment_sheet;

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
            throw error;
        }
    };

    // Effects

    useFocusEffect(() => {
        fetchListing();
    }, [listing_id], true)

    useUnfocusEffect(() => {
        setLoading(true);
        setListing(null);
        setHeaderRight(null);
    }, '/listings/' + listing_id)

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
                            style={text.warn}
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
                {isContact ? 
                    <Text>
                        This user is in your contacts
                    </Text>
                :
                    <Button
                        onPress={handleContactPress}
                        title='Contact'
                    />
                }
            </View>
                
            : null }
        </SessionPage>
    )
}