import { ComponentProps } from 'react'
import { 
    Image,
    Pressable,
    View,
    StyleSheet
} from 'react-native'

type AvatarProps = ComponentProps<typeof Image> & {

}

const Avatar = ( { ...props }: AvatarProps) => {
    return (
        <Image
            { ...props }
        >

        </Image>
    )
}

type UserSmallProps = {
    user: {
        $id: string,
        profile_picture: string
    }
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
                />
            </View>
            <View
                style={{
                    ...styles.user_small_right
                }}
            >

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    user_small_container: {
        width: '100%',
    },
    user_small_left: {
        width: '24%'
    },
    user_small_right: {
        flexGrow: 1
    }
})