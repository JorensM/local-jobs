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

  // Auth context
  const [ user, setUser ] = useState<User | null>(null);

  // hooks
  const auth = useAuth();
  const pathname = usePathname();

  /**
   * Validates whether user/guest is allowed to be on a given route, and redirects
   * if not.
   */
  const validateSession = async () => {
    const user = await auth.fetchUser();
    let _pathname = pathname.substring(1);
    _pathname = _pathname == '' ? 'index' : _pathname;
    if (!user && isUserRoute(_pathname)) {
      console.log('Your session has expired, please log in');
      router.replace('/');
      toastInfo('Your session has expired', 'Please log in');
    } else if (user && isGuestRoute(_pathname)) {
      console.log('Already logged in, redirecting');
      router.replace('/feed');
    }
  }
  

  useEffect(() => {
    validateSession();

    const timeout = setTimeout(async () => {
      validateSession();
    }, 10 * 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  useEffect(() => {
    validateSession();
  }, [pathname])

  return (
    <AuthContext.Provider 
        value={{
            user,
            setUser
        }}
    >
        <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
        >
            <CustomDrawer />
            <Toast config={toast_config}/>
        </StripeProvider>
    </AuthContext.Provider>
  );
}