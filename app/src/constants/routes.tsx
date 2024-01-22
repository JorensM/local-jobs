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

// Routes that should be available when user is not signed in
export const guest_routes: Routes = {
    'index': {
      label: 'Login',
    },
    'register': {
      label: 'Register'
    }
  }
  
// Routes that should be available when user is signed in
export const user_routes: Routes = {
    'feed': {
        label: 'Feed'
    },
    'new-listing': {
        label: 'New Listing',
        backButton: '/feed',
    },
    'listings/[listing_id]': {
        label: 'View Listing',
        hide: true,
        backButton: '/feed',
    },
    'edit-listing/[listing_id]': {
        label: 'Edit Listing',
        hide: true,
        backButton: '/feed'
    },
    'listings/my': {
        label: 'My Listings',
        backButton: '/feed'
    },
    'contacts/[user_id]': {
        label: 'View Contact',
        hide: true,
        backButton: '/contacts/my'
    },
    'contacts/my': {
        label: 'My Contacts',
        backButton: '/feed'
    },
    'profile': {
        label: 'My Profile',
        backButton: '/feed'
    }
}