// Constants
import { user_routes, guest_routes } from '#constants/routes'

/**
 * Check if a given route is a user route.
 * @param name name of route
 * @returns boolean indicating whether the route is a user route
 */
export const isUserRoute = (name: string) => {
    return Object.keys(user_routes).includes(name)
}

/**
 * Check if a given route is a guest route.
 * @param name name of route
 * @returns boolean indicating whether the route is a guest route
 */
export const isGuestRoute = (name: string) => {
    return Object.keys(guest_routes).includes(name)
}

/**
 * get the backRoute property of a route
 * @param name name of route
 * @returns back route name or null if not set
 */
export const getRouteBackRoute = (name: string) => {
    return user_routes[name]?.backButton || null 
}