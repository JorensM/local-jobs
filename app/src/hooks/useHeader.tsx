// Core
import { ReactNode } from 'react';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';

export default function useHeader() {

    // Hooks
    const navigation = useNavigation();

    return {
        /**
         * Set the right header components
         * @param component Component to render
         */
        setHeaderRight: (component: ReactNode) => {
            navigation.setOptions({
                headerRight: () => (
                    // Wrap component in a view with padding so it doesn't have
                    // to be done manually each time
                    <View 
                        style={{
                            paddingRight: 16
                        }}
                    >
                        {component}
                    </View>
                )
            })
        }
    }
}