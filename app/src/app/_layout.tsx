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
const hidden_routes: {
  [name: string]: string // Key should be name of the route, and value should be title
} = {
  'index': 'Home',
  'edit-listing': 'Edit Listing',
  'listings/[listing_id]': ''
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

// Same as with renderDrawerItem
const renderHiddenRoute = (name: string, title: string) => {
  return (
      <Drawer.Screen
        name={name}
        options={{
          title,
          drawerItemStyle: {
            display: 'none'
          }
        }}
        key={name}
      />
  )
}

const CustomDrawer = () => {

  const auth = useAuth()

  useEffect(() => {
    auth.fetchUser()
  }, [])

  // Check if drawer item should be hidden depending on whether
  // The user is logged in or not
  const shouldHideItem = (name: string) => {
    // console.log(auth.user)
    if(
      (user_routes.includes(name) && auth.user) ||
      (guest_routes.includes(name) && !auth.user)) {
      return false;
    }
    return true;
  }

  return (
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
        {Object.entries(hidden_routes).map(([route_name, route_title]) => {
          return renderHiddenRoute(route_name, route_title)
        })}
      </Drawer>
  )
}

export default function Layout() {

  // Auth context
  const [user, setUser] = useState<User | null>(null);

  const auth = useAuth();
  const pathname = usePathname();

  const validateSession = async () => {
    const user = await auth.fetchUser();
    // console.log(user)
    if(!user && user_routes.includes(pathname.substring(1))) {
      console.log('Your session has expired, please log in')
      router.replace('/login')
    } else if (user && guest_routes.includes(pathname.substring(1))) {
      console.log('Already logged in, redirecting')
      router.replace('/feed')
    }
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
      <CustomDrawer />
    </AuthContext.Provider>
  );
}