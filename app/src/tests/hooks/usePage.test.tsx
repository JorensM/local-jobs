import usePage from '#hooks/usePage'
import { act, renderHook } from '@testing-library/react-native'
import * as expoRouter from 'expo-router';

jest.mock('expo-router')
jest.spyOn(expoRouter, 'usePathname').mockImplementation(() => '');


describe('usePage()', () => {
    it('Should return pageState that changes depending on setError and setLoading changes and default loading state should be false', async () => {
        const { result } = renderHook(() => usePage());

        const pageState = result.current.pageState;

        expect(pageState.error).toBeDefined();
        expect(pageState.loading).toBeDefined();
        expect(pageState.loading).toBeFalsy();

        const ERR_MESSAGE = 'TEST ERROR MESSAGE'
        await act(() => {
            result.current.setError(ERR_MESSAGE);
            result.current.setLoading(true);
        })
        

        expect(result.current.pageState.error).toEqual(ERR_MESSAGE);
        expect(result.current.pageState.loading).toBeTruthy();
    })
})