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
    Pressable,
    StyleSheet,
    Platform
} from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import Modal from 'react-native-modal'
import { InitPaymentSheetResult, PresentPaymentSheetResult, SetupIntent } from '@stripe/stripe-react-native'
import { PresentOptions, SetupParams } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet'

//Hooks
import useAppwrite from '../functions/useAppwrite'

//Types
import ParamList from './ParamList'
import ListingModel from '../types/ListingModel'

//Components
import Page from '../components/layout/Page'
import H1 from '../components/typography/H1'
import Caption from '../components/typography/Caption'
import Info from '../components/typography/Info'
import IconButton from '../components/input/IconButton'
import Button from '../components/input/Button'
//import PaymentForm from '../components/forms/PaymentForm'
// import { StripeProvider } from '@stripe/stripe-react-native'

// console.log('stripe: ')
// console.log(StripeProvider)

//Constants
import constant from '../../const'
import { Query } from 'appwrite'
//import { PaymentIntent } from 'stripe'

type Props = DrawerScreenProps<ParamList>

let _useStripe: any = null

if (Platform.OS !== 'web') {
    import('@stripe/stripe-react-native')
        .then(module => {
            console.log('abc')
            _useStripe = module.useStripe
        })
        .catch(err => {
            console.error('Could not dynamically import stripe module', err)
        })
}

type PaymentIntentResponse = {
    paymentIntent: string,
    emphemeralKey: string,
    customer: string,
    publishableKey: string
}


export default function ListingPage( { route, navigation }: Props) {

    //Hooks
    const { db, account, currentUser, functions, fetchCurrentUser } = useAppwrite()
    const isFocused = useIsFocused()

    const [error, setError] = useState<string>('')

    let useStripe: any = null;

    let presentPaymentSheet: ((options?: PresentOptions | undefined) => Promise<PresentPaymentSheetResult>) | null = null
    let initPaymentSheet: ((params: SetupParams) => Promise<InitPaymentSheetResult>) | null = null

    if (_useStripe) {
        console.log('using stripe')
        useStripe = _useStripe
        const { initPaymentSheet: _init, presentPaymentSheet: _present } = useStripe()
        presentPaymentSheet = _present
        initPaymentSheet = _init
    }
    // const { initPaymentSheet, presentPaymentSheet } = useStripe()

    //State
    const [listing, setListing] = useState<ListingModel | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isOwnListing, setIsOwnListing] = useState<boolean>(false)
    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
    const [showPaymentStatusModal, setShowPaymentStatusModal] = useState<boolean>(false)
    const [paymentStatus, setPaymentStatus] = useState<'success' | 'fail' | 'not-made'>('not-made')
    const [contactButtonText, setContactButtonText] = useState<'Loading' | 'Contact'>('Contact')
    
    const initializePaymentSheet = (current_user_id: string) => {
        return new Promise((resolve, reject) => {
            if(useStripe) {
                if (!listing?.by_user || !current_user_id) {
                    throw new Error('Could not initialize stripe payment sheet: listing.by_user and currentUser.$id must be defined')
                }
                functions.createExecution(
                    'stripe-contact-payment-intent',
                    JSON.stringify({
                        contact_id: listing!.by_user,
                        user_id: current_user_id
                    })
                ).then(async (res) => {
                    const { paymentIntent, emphemeralKey, customer, publishableKey }: PaymentIntentResponse = JSON.parse(res.response)
                    const { error: err } = await initPaymentSheet!({
                        merchantDisplayName: 'Local Jobs',
                        customerId: customer,
                        customerEphemeralKeySecret: emphemeralKey,
                        paymentIntentClientSecret: paymentIntent
                    })
                    if (err) {
                        throw new Error(err.message)
                    }
                    resolve(true)
                    console.log(res)
                })
                .catch(err => {
                    reject(err)
                    //console.error('Could not initialize payment sheet:', err)
                    //setError('Could not initialize payment sheet: ' + err)
                })
                .finally(() => {
                    setLoading(false)
                    setContactButtonText('Contact')
                })
            } else {
                console.warn('Stripe API not supported on web')
                reject('Stripe API not supported on web')
            }
        })
        
    }

    useEffect(() => {
        if (initPaymentSheet) {
            initPaymentSheet({
                merchantDisplayName: 'hello',
                setupIntentClientSecret: 'test'
            })
        }
    }, [])
    

    const handleEditPress = () => {
        console.log(isOwnListing)
        if (isOwnListing) {
            navigation.navigate('ListingEdit', { id: listing!.$id })
        } else {
            console.warn(`Can't edit listing that isn't your own!`)
        }
    }

    const handlePaymentMade = () => {
        // setShowPaymentModal(false)
        // db.listDocuments(
        //     constant.db.id,
        //     constant.db.users_id,
        //     [
        //         Query.equal('user_id', [currentUser!.$id])
        //     ]
        // )
        //     .then( res => {
        //         const user_data = res.documents[0];
        //     })
        //     .catch( err => {
        //         console.error('Could not fetch user from DB:', err)
        //     })
        // db.updateDocument(
        //     constant.db.id,
        //     constant.db.users_id,

        // )
        //setPaymentStatus('success')
    }

    const handlePaymentFailed = () => {
        setShowPaymentModal(false)
        setPaymentStatus('fail')
    }

    const handleEditPressRef = useRef(handleEditPress)
    handleEditPressRef.current = handleEditPress

    const fetchListing = () => {
        setIsOwnListing(false)
        setLoading(true)
        if( route.params?.id ) {
            db.getDocument<ListingModel>(
                constant.db.id,
                constant.db.listings_id,
                route.params.id
            )
            .then( async res => {
                const current_user = await account.get()
                const is_own = res.by_user == current_user.$id
                console.log('setting isownlisting to ' + is_own)
                setIsOwnListing(is_own)

                if (is_own) {
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

    useEffect(() => {
        if (paymentStatus !== 'not-made') {
            setShowPaymentStatusModal(true)
        }
    }, [paymentStatus])

    useFocusEffect(
        useCallback(() => {
            console.log('fetching listing by id ' + route.params?.id)
            fetchListing()
        }, [ route ])
    )

    useEffect(() => {
        if( !isFocused ) {
            setListing(null)
            navigation.setOptions({
                headerRight: () => null
            })
        }
    }, [isFocused])

    const handleContactPress = async () => {
        //console.log('presenting payment sheet')
        // if (presentPaymentSheet) {
        //     presentPaymentSheet()
            
        // }
        //console.log('abc')
        //console.log(process.env)
        if(useStripe) {
            setLoading(true)
            setContactButtonText('Loading')
            fetchCurrentUser()
                .then(user => {
                    console.log('before sheet: ')
                    //console.log(listing)
                    //console.log('current user:')
                    //console.log(user)
                    initializePaymentSheet(user!.$id)
                        .then(async (res) => {
                            console.log('presenting payment sheet')
                            const {error: err} = await presentPaymentSheet!()
                            if( error ) {
                                throw new Error(err?.message)
                            }
                            //console.log(res)
                        })
                        .catch(err => {
                            console.error('Could not initialize payment sheet:', err)
                            setError('Could not initialize payment sheet: ' + err)
                        })
                })
                
            
            
        } else if (process.env.NODE_ENV !== 'production'){
            setShowPaymentModal(true)
        }
        
    }

    // useEffect(() => {
    //     setLoading(false)
    // }, [ listing ])

    return (
        <Page
            loading={loading}
            error={error}
        >
            <H1>
                { listing?.title || '' }
            </H1>
            <Caption>
                By { listing?.by_user_name || '' }
            </Caption>
            { listing?.location_name ?
                <Caption>
                    { listing.location_name }
                </Caption>
            : null }
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
                        marginTop: 'auto',
                        borderWidth: 1,
                        borderColor: 'blue',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        backgroundColor: 'white'
                    }}

                    onPress={handleContactPress}
                >
                    <Text
                        style={{
                            color: 'blue'
                        }}
                    >
                        { contactButtonText }
                    </Text>
                </Pressable>
            : null }
            <Modal
                // transparent={true}
                isVisible={showPaymentModal}
                onBackdropPress={() => setShowPaymentModal(false)}
                // onRequestClose={() => setShowPaymentModal(false)}
            >   
                <View
                    style={styles.modal_content}
                >
                    { process.env.NODE_ENV !== 'production' ?
                        <>
                            <Button
                                onPress={handlePaymentMade}
                                label='Test payment (no payment actually made)'
                            />
                            <Button
                                onPress={handlePaymentFailed}
                                label='Test payment fail (no payment actually made)'
                                variant='warn'
                            />
                        </>
                    : <Text>Payments are not supported on web</Text>}
                    
                </View>
            </Modal>
            <Modal
                // transparent={true}
                isVisible={showPaymentStatusModal}
                onBackdropPress={() => setShowPaymentStatusModal(false)}
                // onRequestClose={() => setShowPaymentModal(false)}
            >   
                <View
                    style={styles.modal_content}
                >
                    <Text>
                        { paymentStatus == 'success' ? 
                            'Successfully made payment'
                            : 'Payment failed'
                        }
                    </Text>
                    { paymentStatus == 'success' ? 
                        <Button
                            label='View contact'
                        />
                    : null }
                </View>
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    modal_overlay: {
        height: '100%',
        width: '100%',
        opacity: 0.5
    },
    modal_content: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 16,
        gap: 8
        // width: '80%'
    }
})