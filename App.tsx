import 'react-native-gesture-handler';
//Core
import { 
  StyleSheet, 
  Text, 
  View, 
  Button 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Client, Account, ID } from 'appwrite'

//Components
import TextInput from './components/input/TextInput';

//Pages
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import MyListingsPage from './pages/MyListingsPage';
import ListingEditPage from './pages/ListingEditPage';
import ParamList from './pages/ParamList';

//const Stack = createNativeStackNavigator<ParamList>();

const Drawer = createDrawerNavigator<ParamList>()

export default function App() {

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

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Login'
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
          component={MyListingsPage}
        />
        <Drawer.Screen
          name='ListingEdit'
          component={ListingEditPage}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    
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
  }
});
