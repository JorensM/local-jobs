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
    Pressable,
    StyleSheet,
    Platform
} from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import Modal from 'react-native-modal'

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
import Info from '../components/typography/Info'
import IconButton from '../components/input/IconButton'
import PaymentForm from '../components/forms/PaymentForm'

type Props = DrawerScreenProps<ParamList>

export default function ListingPage( { route, navigation }: Props) {

    //Hooks
    const { db, account } = useAppwrite()
    const isFocused = useIsFocused()

    //State
    const [listing, setListing] = useState<ListingModel | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isOwnListing, setIsOwnListing] = useState<boolean>(false)
    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
    

    

    const handleEditPress = () => {
        console.log(isOwnListing)
        if (isOwnListing) {
            navigation.navigate('ListingEdit', { id: listing!.$id })
        } else {
            console.warn(`Can't edit listing that isn't your own!`)
        }
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
                    <PaymentForm

                    />
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
        // width: '80%'
    }
})