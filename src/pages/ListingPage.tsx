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

//Constants
import constant from '../../const'
import { Query } from 'appwrite'

type Props = DrawerScreenProps<ParamList>

let useStripe: any = null

if (Platform.OS !== 'web') {
    import('@stripe/stripe-react-native')
        .then(module => {
            useStripe = module.useStripe
        })
        .catch(err => {
            console.error('Could not dynamically import stripe module', err)
        })
}


export default function ListingPage( { route, navigation }: Props) {

    //Hooks
    const { db, account, currentUser } = useAppwrite()
    const isFocused = useIsFocused()

    let presentPaymentSheet: ((options?: PresentOptions | undefined) => Promise<PresentPaymentSheetResult>) | null = null
    let initPaymentSheet: ((params: SetupParams) => Promise<InitPaymentSheetResult>) | null = null

    if (useStripe) {
        console.log('using stripe')
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
        setShowPaymentModal(false)
        db.listDocuments(
            constant.db.id,
            constant.db.users_id,
            [
                Query.equal('user_id', [currentUser!.$id])
            ]
        )
            .then( res => {
                const user_data = res.documents[0];
            })
            .catch( err => {
                console.error('Could not fetch user from DB:', err)
            })
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

    const handleContactPress = () => {
        //console.log('presenting payment sheet')
        // if (presentPaymentSheet) {
        //     presentPaymentSheet()
            
        // }
        setShowPaymentModal(true)
    }

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
                        Contact
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
                    <Button
                        onPress={handlePaymentMade}
                        label='Test payment (no payment actually made)'
                    />
                    <Button
                        onPress={handlePaymentFailed}
                        label='Test payment fail (no payment actually made)'
                        variant='warn'
                    />
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