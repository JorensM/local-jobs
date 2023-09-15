import { ComponentProps } from 'react'
import { 
    Image,
    Pressable,
    View,
    StyleSheet,
    Text
} from 'react-native'
import PublicUserModel from '../types/PublicUserModel'

type AvatarProps = ComponentProps<typeof Image> & {

}

const Avatar = ( { style, ...props }: AvatarProps) => {
    return (
        <Image
            style={{
                borderRadius: 100,
                borderWidth: 1,
                borderColor: 'black',
                ...style as object
            }}
            { ...props }
        />
        
    )
}

type UserSmallProps = {
    user: PublicUserModel
}

export default function UserSmall( { user }: UserSmallProps) {

    const handleUserPress = () => {

    }

    return (
        <Pressable
            onPress={handleUserPress}
            style={{
                ...styles.user_small_container
            }}
        >
            <View
                style={{
                    ...styles.user_small_left
                }}
            >
                <Avatar
                    source={{
                        uri: user.profile_picture
                    }}
                    // width={100}
                    height={100}
                    style={{
                        height: 48,
                        width: 48
                    }}
                />
            </View>
            <View
                style={{
                    ...styles.user_small_right
                }}
            >
                <Text>
                    {user.name}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    user_small_container: {
        width: '100%',
        height: 64,
        flexDirection: 'row'
    },
    user_small_left: {
        width: '24%',
        height: '100%'
    },
    user_small_right: {
        flexGrow: 1
    }
})