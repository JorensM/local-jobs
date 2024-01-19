// Core
import { useEffect, useState } from 'react';
import { router, usePathname } from 'expo-router';
import Toast from 'react-native-toast-message';


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



export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '/login',
};

export default function Layout() {

  // rconsole.log(StripeProvider)

  // Auth context
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = useAuth();
  const pathname = usePathname();

  const validateSession = async () => {
    const user = await auth.fetchUser();
    let _pathname = pathname.substring(1);
    _pathname = _pathname == '' ? 'index' : _pathname
    if(!user && isUserRoute(_pathname)) {
      console.log('Your session has expired, please log in')
      router.replace('/login')
    } else if (user && isGuestRoute(_pathname)) {
      console.log('Already logged in, redirecting')
      router.replace('/feed')
    }
  }
  

  useEffect(() => {
    validateSession()

    const timeout = setTimeout(async () => {
      validateSession()
    }, 10 * 1000);

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    validateSession()
  }, [pathname])

  return (
    <AuthContext.Provider 
      value={{
        user,
        setUser
      }}
    >
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      >
        <CustomDrawer />
        <Toast config={toast_config}/>
      </StripeProvider>
    </AuthContext.Provider>
  );
}