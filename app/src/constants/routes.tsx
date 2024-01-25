type Routes = {
    [name: string]: { // Key should be the name/path of the route
        label: string, // Label seen in the drawer navigator
        title?: string, // Title seen in the header. If not specified, label is used
        backButton?: string, /* Link to the route that should be opened when pressing
        the back button. If not specified, not back button is shown and menu button
        is shown instead */
        hide?: boolean // Whether to hide the route from the drawer nav. Default false
    }
}

/**
 * Route pathnames. When refering to a route path in code, this constant should be
 * used to do so
 */
export const route_names = {
    login: 'index',
    register: 'register',
    feed: 'feed',
    new_listing: 'listings/new',
    listing: 'listings/[listing_id]',
    edit_listing: 'listings/edit/[listing_id]',
    my_listings: 'listings/my',
    contact: 'contacts/[user_id]',
    my_contacts: 'contacts/my',
    profile: 'profile',
    edit_profile: 'profile/edit'

}

/**
 * Get route name and replace [] dynamic params with passed params
 * @param name name of route, can include dynamic params like [listing_id]
 * @param params Params to replace dynamic params with. first param will be replaced with first param in route name, etc.
 * @returns Route name with params set to the passed params
 */
export const getRouteName = (name: string, ...params: (string | number)[]) => {
    let _name = name;
    for(const param of params) {
        _name = _name.replace(/\[.*?\]/, String(param))
    }
    return _name;
}

// Routes that should be available when user is not signed in
export const guest_routes: Routes = {
    [route_names.login]: {
        label: 'Login',
    },
    [route_names.register]: {
        label: 'Register'
    }
  }
  
// Routes that should be available when user is signed in
export const user_routes: Routes = {
    [route_names.feed]: {
        label: 'Feed'
    },
    [route_names.new_listing]: {
        label: 'New Listing',
        backButton: route_names.feed,
    },
    [route_names.listing]: {
        label: 'View Listing',
        hide: true,
        backButton: route_names.feed,
    },
    [route_names.edit_listing]: {
        label: 'Edit Listing',
        hide: true,
        backButton: route_names.feed
    },
    [route_names.my_listings]: {
        label: 'My Listings',
        backButton: route_names.feed
    },
    [route_names.contact]: {
        label: 'View Contact',
        hide: true,
        backButton: route_names.my_contacts
    },
    [route_names.my_contacts]: {
        label: 'My Contacts',
        backButton: route_names.feed
    },
    [route_names.profile]: {
        label: 'My Profile',
        backButton: route_names.feed
    },
    [route_names.edit_profile]: {
        label: "Edit Profile",
        hide: true,
        backButton: route_names.profile
    }
}