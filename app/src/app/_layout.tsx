import useAuth from '#hooks/useAuth';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'login',
};

const user_routes = [
  'feed'
]

export default function Layout() {

  const auth = useAuth();

  useEffect(() => {
    auth.fetchUser();
  }, [])

  const getItemDisplay = (name: string) => {
    if(user_routes.includes(name) && auth.user) {
      return 'flex'
    } else if(!user_routes.includes(name) && !auth.user) {
      return 'flex'
    }
    return 'none'
  }

  return (
    <Drawer>
      <Drawer.Screen
        name='login'
        options={{
          drawerLabel: 'Login',
          title: 'Login',
          drawerItemStyle: {
            display: getItemDisplay('register')
          }
        }}
      />
      
      <Drawer.Screen
        name='register'
        options={{
          drawerLabel: 'Register',
          title: 'Register',
          drawerItemStyle: {
            display: getItemDisplay('register')
          }
        }}
      />

      <Drawer.Screen
        name='feed'
        options={{
          drawerLabel: 'Feed',
          title: 'Feed',
          drawerItemStyle: {
            display: getItemDisplay('feed')
          }
        }}
      />

      <Drawer.Screen
        name='index'
        options={{
          drawerLabel: 'Index',
          title: 'aaa',
          drawerItemStyle: {
            display: 'none'
          }
        }}
      />
    </Drawer>
  );
}