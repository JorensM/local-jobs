import 'react-native-gesture-handler';
//Core
import { 
  StyleSheet, 
  Text, 
  View, 
  Button 
} from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { NavigationContainer, Link, NavigationProp } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Loader as GoogleMapsLoader } from "@googlemaps/js-api-loader"

//Components
import TextInput from './src/components/input/TextInput';

//Pages
import RegistrationPage from './src/pages/RegistrationPage';
import LoginPage from './src/pages/LoginPage';
import FeedPage from './src/pages/FeedPage';
import MyListingsPage from './src/pages/MyListingsPage';
import ListingEditPage from './src/pages/ListingEditPage';
import ListingPage from './src/pages/ListingPage';
import ParamList from './src/pages/ParamList';
import useLogin from './src/functions/useLogin';
import useCheckLogin from './src/functions/useCheckLogin';
import useAppwrite from './src/functions/useAppwrite';
import { PlacesContext } from './src/state/PlacesContext';
import private_var from './private';



//const Stack = createNativeStackNavigator<ParamList>();



const Drawer = createDrawerNavigator<ParamList>()

export default function App() {

  //Hooks
  const { logout } = useLogin()
  const { currentUser, fetchCurrentUser } = useAppwrite()


  //State
  const [ placesAPI, setPlacesAPI ] = useState<any>(null)
  const [ drawerContent, setDrawerContent ] = useState()

  useEffect(() => {
    /*
      Time in ms of how often session information should be retrieved
    */
    const fetch_user_interval = 4000

    setInterval(() => {
      fetchCurrentUser()
    }, fetch_user_interval)

    const maps_loader = new GoogleMapsLoader({
      apiKey: private_var.api_keys.google.places
    })

    maps_loader.importLibrary('geocoding')
      .then(places => {
        //console.log('places: ')
        //console.log(places)
        setPlacesAPI(places)
      })
      .catch(console.log)
  }, [])

  const drawer_content_user = useCallback( (props: any) => (
    <View
      style={{
        height: '100%'
      }}
    >
      <DrawerContentScrollView
        // style={{
        //   height: 
        // }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'flex-end'
        }}
      >
        <DrawerItem
          label='Log out'
          onPress={() => {
            logout()
              .finally(() => {
                props.navigation.navigate('Login')
              })

          }}
        />
      </View>
      
    </View>
  ), [])
    
  const drawer_content_guest = useCallback(() => (
    <View
      style={{
        height: '100%'
      }}
    >
      <DrawerItem
        label='Login'
        onPress={() => {}}
      />

      <DrawerItem
        label='Register'
        onPress={() => {}}
      />
    </View>
  ), [])

  // const handleRegisterSubmit = (values: any) => {
  //   account.create(
  //     ID.unique(),
  //     values.email,
  //     values.password
  //   ).then(res => {
  //     console.log('Created account')
  //     console.log(res)
  //   }).catch(err => {
  //     console.error('Could not create account')
  //     console.log(err)
  //   })
  //   console.log('submitted')
  //   console.log(values)
  // }

  const handleLogoutPress = (navigation: NavigationProp<any>) => {
    logout()
  }

  return (
    <PlacesContext.Provider value={placesAPI}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Login'
          drawerContent={(props) => {
            if (currentUser) {
              return (
                <View
                  style={{
                    height: '100%'
                  }}
                >
                  <DrawerContentScrollView
                    // style={{
                    //   height: 
                    // }}
                  >
                    <DrawerItemList {...props} />
                  </DrawerContentScrollView>
                  <View
                    style={{
                      flexGrow: 1,
                      justifyContent: 'flex-end'
                    }}
                  >
                    <DrawerItem
                      label='Log out'
                      onPress={() => {
                        logout()
                          .finally(() => {
                            props.navigation.navigate('Login')
                          })

                      }}
                    />
                  </View>
                  
                </View>
              )
            } else {
              return (
                <View 
                  style={{
                    height: '100%'
                  }}
                >
                  <DrawerItem
                    label='Login'
                    onPress={() => {}}
                  />

                  <DrawerItem
                    label='Register'
                    onPress={() => {}}
                  />
                </View>
              )
            }
            // const DrawerListItem = (href: string) => (
            //   <Link
            //     to
            //   >
              
            //   </Link>
            // )

            // return (
            //   <View
            //     style={styles.drawer}
            //   >
            //     <Link to={{ screen: 'Feed'} }>Feed</Link>
            //     <Link to={{ screen: 'MyListings' }}>My Listings</Link>
            //   </View>
            // )
          }}
        >
          <Drawer.Screen 
            name='Register' 
            component={RegistrationPage}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen 
            name='Login' 
            component={LoginPage}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen 
            name='Feed' 
            component={FeedPage}
            // options={{
            //   headerBackVisible: false,
            //   headerLeft: undefined
            // }}
          />
          <Drawer.Screen
            name='MyListings'
            options={{
              title: 'My Listings'
            }}
            component={MyListingsPage}
          />
          <Drawer.Screen
            options={{
              title: 'New Listing'
            }}
            name='ListingEdit'
            component={ListingEditPage}
          />
          <Drawer.Screen
            name='Listing'
            component={ListingPage}
            options={{
              drawerItemStyle: { display: 'none' }
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PlacesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    height: '100%'
  },
  form: {
    gap: 16
  },
  drawer: {
    width: '100%',
    height: '100%',
    padding: 24,
    gap: 16
  }
});
