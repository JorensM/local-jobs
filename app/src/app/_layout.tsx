import useAuth from '#hooks/useAuth';
import AuthContext from '#state/AuthContext';
import { User } from '#types/User';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { usePathname } from 'expo-router/src/hooks';
import { useEffect, useMemo, useState } from 'react';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'login',
};


// Routes that should be available when user is not signed in
const guest_routes: string[] = [
  'login',
  'register'
]

// Routes that should be available when user is signed in
const user_routes: string[] = [
  'feed',
  'new-listing'
]

// Routes that are hidden from navigation
const hidden_routes: string[] = [
  'index',
  'edit-listing'
]


type DrawerItemProps = {
  name: string,
  label: string,
  title?: string,
  hide?: boolean
}

// These must be non-component functions because for some reason otherwise the drawer
// doesn't register these items
const renderDrawerItem = (name: string, label: string, hide = false, title?: string) => {

  return (
    <Drawer.Screen
      name={name}
      options={{
        drawerLabel: label,
        title: title || label,
        drawerItemStyle: {
          display: hide ? 'none' : 'flex'
        }
      }}
      key={name}
    />
  )
}

type HiddenRouteProps = {
  name: string
}

// Same as with renderDrawerItem
const renderHiddenRoute = (name: string) => {
  return (
      <Drawer.Screen
        name={name}
        options={{
          drawerItemStyle: {
            display: 'none'
          }
        }}
        key={name}
      />
  )
}



export default function Layout() {

  // Auth context
  const [user, setUser] = useState<User | null>(null);

  const auth = useAuth();
  const pathname = usePathname();

  const validateSession = async () => {
    const _user = await auth.fetchUser();
    if(!user && user_routes.includes(pathname.substring(1))) {
      console.log('Your session has expired, please log in')
      router.replace('/login')
    } else if (user && guest_routes.includes(pathname.substring(1))) {
      console.log('Already logged in, redirecting')
      router.replace('/feed')
    }
    console.log('session valid')
    console.log('logged in: ', user ? 'yes' : 'no')
    console.log('pathname: ', pathname)
  }

  const shouldHideItem = (name: string) => {
    if(
      (user_routes.includes(name) && auth.user) ||
      (guest_routes.includes(name) && !auth.user)) {
      console.log("shouldn't hide route " + name)
      console.log('logged in ', auth.user ? 'yes' : 'no')
      console.log(auth.user)
      console.log('abc')
      console.log(user)
      return false;
    }
    return true;
  }

  useEffect(() => {
    validateSession()

    const timeout = setTimeout(async () => {
      validateSession()
    }, 10 * 1000)

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
      <Drawer>

        {/* Guest routes */}

        {
          [
            renderDrawerItem('login', 'Login', shouldHideItem('login')),
            renderDrawerItem('register', 'Register', shouldHideItem('register'))
          ]
        }

        {/* User routes */}

        {
          [
            renderDrawerItem('new-listing', 'New Listing', shouldHideItem('new-listing')),
            renderDrawerItem('feed', 'Feed', shouldHideItem('new-listing')),
          ]
        }

        {/* Hidden routes */}
        {hidden_routes.map(route_name => {
          return renderHiddenRoute(route_name)
        })}
      </Drawer>
    </AuthContext.Provider>
  );
}