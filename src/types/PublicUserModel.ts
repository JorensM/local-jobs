import { Models } from 'appwrite'

type PublicUserModel = Models.User<Models.Preferences> & {
    profile_picture: string
}

export default PublicUserModel