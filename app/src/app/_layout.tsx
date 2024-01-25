// Core
import { useEffect, useState } from 'react';
import { router, usePathname } from 'expo-router';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';

// Components
import CustomDrawer from '#components/layout/CustomDrawer';

// Hooks
import useAuth from '#hooks/useAuth';

// Types
import { User } from '#types/User';

// State
import AuthContext from '#state/AuthContext';

// Constants
import toast_config from '#constants/toast_config';

// Misc
import { isGuestRoute, isUserRoute } from '#misc/route_utils';
import { StripeProvider } from '#misc/stripe';
import { toastInfo } from '#misc/toast';
import { STRIPE_PUBLISHABLE_KEY } from '#constants/env';

// import Layout from '#components/layout/Layout';

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: '/login',
// };

/**
 * Layout component that will be shown on each route
 */
export default function Layout() {

  // State
  /**
   * User state used in AuthContext. Holds data about the currently logged in user
   * or null if not logged in
   */
  const [ user, setUser ] = useState<User | null>(null);

  // hooks
  const auth = useAuth();
  const pathname = usePathname();

  // Functions

  /**
   * Validates whether user/guest is allowed to be on a given route, and redirects
   * if not.
   */
  const validateSession = async () => {
    const user = await auth.fetchUser();
    // The pathname variable from expo returns '/' for index route instead of the string 'index'
    // so must check for that and replace string with 'index' if the pathname is '/'
    const _pathname = pathname == '/' ? 'index' : pathname;
    // If route is user route and user is not logged in, redirect to login page and display toast
    if (!user && isUserRoute(_pathname)) {
      console.log('Your session has expired, please log in');
      router.replace('/');
      toastInfo('Your session has expired', 'Please log in');
    } // If route is guest route but user is logged in, redirect to /feed
    else if (user && isGuestRoute(_pathname)) {
      console.log('Already logged in, redirecting');
      router.replace('/feed');
    }
  }
  
  // Effects

  useEffect(() => {

    // Validate session on mount and every 10 seconds after that
    validateSession();

    const INTERVAL_FREQUENCY_SECONDS = 10; // Frequency of validation interval in second

    const interval = setInterval(async () => {
      validateSession();
    }, INTERVAL_FREQUENCY_SECONDS * 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  // Validate session each time route changes
  useEffect(() => {
    validateSession();
  }, [pathname])

  return (
    // Auth Context
    <AuthContext.Provider 
        value={{
            user,
            setUser
        }}
    >
        {/* Stripe provider */}
        <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
        >
            {/* Navigation Drawer */}
            <CustomDrawer />
            {/* Toast component */}
            <Toast config={toast_config}/>
        </StripeProvider>
    </AuthContext.Provider>
  );
}