import { Button } from 'react-native'
import { Link } from '@react-navigation/native'

import Page from '../components/layout/Page'

export default function MyListingsPage() {

    const handleAddListingPress = () => {

    }

    return (
        <Page>
            {/* <Button
                onPress={() => handleAddListingPress()}
                title='Add Listing'
            /> */}
            <Link
                to={{
                    screen: 'ListingEdit'
                }}
            >
                Add Listing
            </Link>
        </Page>
    )
}