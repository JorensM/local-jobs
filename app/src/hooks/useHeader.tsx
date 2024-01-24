// Core
import { ReactNode } from 'react';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';

export default function useHeader() {

    const navigation = useNavigation();

    return {
        setHeaderRight: (component: ReactNode) => {

            navigation.setOptions({
                headerRight: () => (
                    <View 
                        style={{
                            paddingRight: 16
                        }}
                    >
                        {component}
                    </View>
                    
                )
            })
            // navigation.setOptions({
                
            // })
            // navigation.setOptions({
            //     headerRight: component
            // })
        }
    }
}