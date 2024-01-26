// Core
import { renderHook, waitFor } from '@testing-library/react-native';

// Hooks
import useListings from '#hooks/useListings';

// Misc
import supabase from '#misc/supabase';

// Types
import { User } from '#types/User';

// State
import AuthContext from '#state/AuthContext';

// Test Utils
import { TEST_USER_1 } from '#tests/test_utils/constants';
import { TestUser } from '#tests/test_utils/types';

const signInAndReturnHook = async (user: TestUser | null) => {

    if(user) {
        await supabase.auth.signInWithPassword({ email: user.email, password: user.password});
    }

    return renderHook(() => useListings(), {
        wrapper: ({children}) => {
            
            // const [user, setUser] = useState<User | null>(null);

            return (
                //@ts-ignore
                <AuthContext.Provider value={{user, setUser: () => {}}}>
                    {children}
                </AuthContext.Provider>
            )
        }
    });
}

const expectPropertiesToBeDefined = (obj: any, keys: string[]) => {
    keys.forEach(key => {
        expect(obj[key]).toBeDefined();
    })
}

const expectListingToBeCorrect = (obj: any) => {
    expectPropertiesToBeDefined(obj, [
        'title',
        'user_name',
        'user_id',
        'id',
        'title',
        'description',
        'created_at'
    ])
}

describe('useListings()', () => {

    describe('fetchListings()', () => {
        it('Should return listings with correct pagination', async () => {
            const { result } = await signInAndReturnHook(TEST_USER_1);

            const listings = await result.current.fetchListings({
                page: 0,
                per_page: 2
            });

            expect(Array.isArray(listings)).toBeTruthy();

            expect(listings.length).toEqual(2);

            listings.forEach(listing => {
                expectListingToBeCorrect(listing)
            })
        })

        it('Should return listings with correct user_id filter', async () => {
            const USER_ID = '5d23c422-dadd-4993-8b42-69c1f1787c6b';

            const { result } = await signInAndReturnHook(TEST_USER_1);

            const listings = await result.current.fetchListings({
                filter: {
                    user_id: USER_ID
                }
            });
            
            listings.forEach(listing => {
                expectListingToBeCorrect(listing);
                expect(listing.user_id).toEqual(USER_ID);
            })
        })
    })

    let created_listing_id: number;

    const TITLE = 'LISTING TITLE';
    const DESCRIPTION = 'LISTING DESCRIPTION';
    const UPDATED_TITLE = 'LISTING TITLE UPDATED';
    const UPDATED_DESCRIPTION = 'LISTING DESCRIPTION UPDATED';

    describe('createListing()', () => {

        it('Should throw if user is not logged in', async () => {
            const { result } = await signInAndReturnHook(null);

            expect(() => result.current.createListing({
                user_name: TEST_USER_1.name,
                user_id: TEST_USER_1.id,
                title: TITLE,
                description: DESCRIPTION
            }))
            .rejects
            .toThrow()
        })

        it('Should create a new listing and return its ID', async () => {
            const { result } = await signInAndReturnHook(TEST_USER_1);

            const listing_id = await result.current.createListing({
                user_name: TEST_USER_1.name,
                user_id: TEST_USER_1.id,
                title: TITLE,
                description: DESCRIPTION
            });

            expect(typeof listing_id).toEqual('number');

            created_listing_id = listing_id;
        })
    })

    describe('updateListing()', () => {
        

        it('Should throw error if user is not logged in', async () => {
            const { result } = await signInAndReturnHook(null);

            expect(() => result.current.updateListing({
                id: 0,
                user_name: TEST_USER_1.name,
                user_id: TEST_USER_1.id,
                title: TITLE,
                description: DESCRIPTION
            }))
            .rejects
            .toThrow()
        })

        it('Should update listing and return true', async () => {
            await waitFor(() => expect(created_listing_id).toBeDefined());

            const { result } = await signInAndReturnHook(TEST_USER_1);

            const success = await result.current.updateListing({
                id: created_listing_id,
                title: UPDATED_TITLE,
                description: UPDATED_DESCRIPTION
            });

            expect(success).toBeTruthy();
        })
    })

    describe('fetchListing()', () => {
        it('Should fetch the created/update listing and return it', async () => {
            await waitFor(() => expect(created_listing_id).toBeDefined());

            const { result } = await signInAndReturnHook(TEST_USER_1);

            const listing = await result.current.fetchListing(created_listing_id);

            expectListingToBeCorrect(listing);

            expect(listing?.title).toEqual(UPDATED_TITLE);
            expect(listing?.description).toEqual(UPDATED_DESCRIPTION);
            expect(listing?.user_id).toEqual(TEST_USER_1.id);
        })
    })

    // Not implemented yet
    describe.skip('deleteListing()', () => {

    })
})