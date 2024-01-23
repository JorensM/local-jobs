// Mocks
import '#tests/mocks/hooks/useListings';
import '#tests/mocks/stripe';

// Core
import { fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';
import { screen as nativeScreen } from '@testing-library/react-native'
import { useState } from 'react';

// Util
import { setListingID } from '#tests/mocks/hook_utils';

// Pages
import FeedPage from '#app/feed';
import NewListingPage from '#app/new-listing';
import ListingPage from '#app/listings/[listing_id]';
import Layout from '#app/_layout';

import AuthContext from '#state/AuthContext';
import { User } from '#types/User';
import CustomDrawer from '#components/layout/CustomDrawer';

console.log('layout: ')
console.log(Layout);

const AUTHOR_NAME = 'Custom author name';

// jest.mock('#hooks/useAuth', () => {
//     return {
//         __esModule: true,
//         default: () => ({
//             user: {
//                 id: 20,
//                 name: AUTHOR_NAME,
//                 role: 'performer'
//             },
//             fetchUser: async () => true
//         })
//     }
// })

// describe('New Listing page', () => {

//     // console.log('layout: ')
//     // console.log(Layout());

//     const TestLayout = () => {

//         const [user, setUser] = useState<User | null>(null);

//         return (
//             <AuthContext.Provider value={{user, setUser}}>
//                 <CustomDrawer />
//             </AuthContext.Provider>
//         )
//     }

//     it('aaa', () => {
//         expect(true).toBeTruthy();
//     })

//     renderRouter({
//         'new-listing': NewListingPage,
//         'listings/[id]': ListingPage,
//         'feed': FeedPage,
//         '_layout': TestLayout
//     }, {
//         initialUrl: '/'
//     });
//     it('Should create new listing upon form submission and redirect to listing page', async () => {

//         console.log('screen:')
//         screen.debug()
//         const title_comp = screen.getByTestId('input-title');
//         const description_comp = screen.getByTestId('input-description');
//         const save_button = screen.getByLabelText('Create listing')

//         // console.log(nativeScreen);

//         const TITLE = 'My new Listing';
//         const DESCRIPTION = 'Description of my new listing. aaaaaa'
        
//         const LISTING_ID = 25;
//         setListingID(LISTING_ID);

//         fireEvent.changeText(title_comp, TITLE)
//         fireEvent.changeText(description_comp, DESCRIPTION);
//         fireEvent.press(save_button);

//         await waitFor(() => expect(screen).toHavePathname('/listing/' + LISTING_ID));

//         const title_comp_2 = screen.findByText(TITLE);
//         const description_comp_2 = screen.findByText(DESCRIPTION);
//         const author_comp = screen.findByText('By ' + AUTHOR_NAME);

//         expect(title_comp_2).toBeDefined();
//         expect(description_comp_2).toBeDefined();
//         expect(author_comp).toBeDefined()
//     })
// })