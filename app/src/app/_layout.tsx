// Core
import { useEffect, useMemo, useState } from 'react';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Pressable } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
// import { Header } from 'react-navigation'
import Toast, { SuccessToast, ToastConfig, ErrorToast } from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

// Hooks
import useAuth from '#hooks/useAuth';

// Types
import { User } from '#types/User';

// State
import AuthContext from '#state/AuthContext';

// Constants
import toast_config from '#constants/toast_config';


export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '/login',
};

type Routes = {
  [name: string]: {
    label: string,
    title?: string,
    backButton?: string,
    hide?: boolean
  }
}

// Routes that should be available when user is not signed in
const guest_routes: Routes = {
  'index': {
    label: 'Loginnn',
  },
  'register': {
    label: 'Register'
  }
}

// Routes that should be available when user is signed in
const user_routes: Routes = {
  'feed': {
    label: 'Feed'
  },
  'new-listing': {
    label: 'New Listing',
    backButton: '/feed',
  },
  'listings/[listing_id]': {
    label: 'View Listing',
    hide: true,
    backButton: '/feed',
  },
  'edit-listing/[listing_id]': {
    label: 'Edit Listing',
    hide: true,
    backButton: '/feed'
  },
  'listings/my': {
    label: 'My Listings',
    backButton: '/feed'
  },
  'contacts/[user_id]': {
    label: 'View Contact',
    hide: true,
    backButton: '/contacts/my'
  },
  'contacts/my': {
    label: 'My Contacts',
    backButton: '/feed'
  }
}
//   [
//   'feed',
//   'new-listing'
// ]

// Routes that are hidden from navigation
const hidden_routes: Routes = {
  
}

const isUserRoute = (name: string) => {
  return Object.keys(user_routes).includes(name)
}

const isGuestRoute = (name: string) => {
  return Object.keys(guest_routes).includes(name)
}

const getRouteBackRoute = (name: string) => {
  return user_routes[name]?.backButton || null 
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

    const is_user_route = Object.keys(user_routes).includes(name);
    const is_guest_route = Object.keys(guest_routes).includes(name);

    if(
      (is_user_route && auth.user) ||
      (is_guest_route && !auth.user)
    ) {
      return false;
    }
    return true;
  }

  return (
    <Drawer
      screenOptions={{
        header: ({ route, options }) => {

          const back_route = getRouteBackRoute(route.name)

          return (
            <View
              style={{
                flexDirection: 'row',
                height: 56,
                alignItems: 'center',
                //padding: 8,
                backgroundColor: 'white'
              }}
            >
              { back_route ? 
                <Pressable
                  style={{
                    padding: 14
                  }}
                  onPress={() => {
                    router.replace(back_route)
                  }}
                >
                  <MaterialIcons
                    name='arrow-back'
                    size={24}
                  />
                </Pressable>
              :
                <DrawerToggleButton />
              }
              
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 20,
                  marginBottom: 2
                }}
              >
                {options.title}
              </Text>
            </View>
          )
        }
      }}
    >

        {/* Guest routes */}

        {
          Object.entries(guest_routes).map(([route_name, route]) => {
            return renderDrawerItem(route_name, route.label, route.hide || shouldHideItem(route_name))
          })
        }

        {/* User routes */}

        {
          Object.entries(user_routes).map(([route_name, route]) => {
            return renderDrawerItem(route_name, route.label, route.hide || shouldHideItem(route_name))
          })
        }

        {/* Hidden routes */}
        {/* {Object.entries(hidden_routes).map(([route_name, route]) => {
          return renderHiddenRoute(route_name, route.title || route.label)
        })} */}
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
      <Toast config={toast_config}/>
    </AuthContext.Provider>
  );
}