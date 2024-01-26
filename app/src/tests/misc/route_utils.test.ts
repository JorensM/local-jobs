import { guest_routes, user_routes } from '#constants/routes'
import { getRouteBackRoute, isGuestRoute, isUserRoute, sanitizeRouteName } from '#misc/route_utils';

const getFirstObjectKey = (obj: any) => {
    return Object.keys(obj)[0];
}

const getFirstUserRoute = () => {
    return getFirstObjectKey(user_routes);
}

const getFirstGuestRoute = () => {
    return getFirstObjectKey(guest_routes);
}

const getFirstRouteWithBackRoute = () => {
    return Object.entries(user_routes).find(([name, route]) => typeof route.backButton == 'string')![0]
}

const getFirstRouteWithoutBackRoute = () => {
    return Object.entries(user_routes).find(([name, route]) => typeof route.backButton != 'string')![0]
}

describe('route_utils.ts', () => {
    describe('sanitizeRouteName()', () => {
        it('Should return string without first slash if first character is a slash', () => {
            const str = '/test';

            const output = sanitizeRouteName(str);

            expect(output).toEqual('test');
        })

        it('Should return same string if first character isn\'t a slash', () => {
            const str = 'test2';

            const output = sanitizeRouteName(str);

            expect(output).toEqual(str);
        })
    })

    describe('isUserRoute()', () => {
        it('Should return true if given route is a user route', () => {
            const is_user_route = isUserRoute(getFirstUserRoute());

            expect(is_user_route).toBeTruthy();
        })
        it('Should return false if given route is not a user route', () => {
            const is_user_route = isUserRoute(getFirstGuestRoute());

            expect(is_user_route).toBeFalsy();
        })
    })

    describe('isGuestRoute()', () => {
        it('Should return true if given route is a fuest route', () => {
            const is_guest_route = isGuestRoute(getFirstGuestRoute());

            expect(is_guest_route).toBeTruthy();
        })
        it('Should return false if given route is not a guest route', () => {
            const is_guest_route = isGuestRoute(getFirstUserRoute());

            expect(is_guest_route).toBeFalsy();
        })
    })

    describe('getRouteBackRoute', () => {
        it('Should return back route link if given route has a back route', () => {
            const route_name = getFirstRouteWithBackRoute();

            const back_route = getRouteBackRoute(route_name);

            expect(typeof back_route).toEqual('string');
        })

        it('Should return null if given route doesn\'t have a back route', () => {
            const route_name = getFirstRouteWithoutBackRoute();

            const back_route = getRouteBackRoute(route_name);

            expect(back_route).toBeNull();
        })
    })
})