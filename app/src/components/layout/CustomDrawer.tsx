// Core
import { useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

// Hooks
import useAuth from '#hooks/useAuth';

// Misc
import { getRouteBackRoute, isGuestRoute, isUserRoute } from '#misc/route_utils';

// Consants
import { guest_routes, user_routes } from '#constants/routes';


/** 
    Custom drawer component that renders routes according to #constants/routes.tsx
*/
export default function CustomDrawer() {

    const auth = useAuth()
  
    useEffect(() => {
      auth.fetchUser()
    }, [])
  
    // Check if drawer item should be hidden depending on whether
    // The user is logged in or not
    const shouldHideItem = (name: string) => {  
      if(
        (isUserRoute(name) && auth.user) ||
        (isGuestRoute(name) && !auth.user)
      ) {
        return false;
      }
      return true;
    }
  
    return (
        <Drawer
            useLegacyImplementation={process.env.NODE_ENV == 'test' ? false : true}
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
                            {/* If route has backRoute defined, display a back button */}
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
                            {/* Route title */}
                            <Text
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: 20,
                                    marginBottom: 2
                                }}
                            >
                                {options.title}
                            </Text>
                            {/* headerRight */}
                            <View
                                style={{
                                    marginLeft: 'auto'
                                }}
                            >
                                { options.headerRight ? options.headerRight({
                                    tintColor: options.headerTintColor,
                                    pressColor: options.headerPressColor,
                                    pressOpacity: options.headerPressOpacity
                                }) : null }
                            </View>
                        </View>
                    )
                }
            }}
        >
  
            {/* Render guest routes */}

            {
            Object.entries(guest_routes).map(([route_name, route]) => {
                return renderDrawerItem(route_name, route.label, route.hide || shouldHideItem(route_name))
            })
            }

            {/* Render user routes */}

            {
            Object.entries(user_routes).map(([route_name, route]) => {
                return renderDrawerItem(route_name, route.label, route.hide || shouldHideItem(route_name))
            })
            }
        
        </Drawer>
    )
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