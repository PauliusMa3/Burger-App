import reducer from './auth';
import * as actions from '../actions/actionTypes';

describe('auth Reducer', () => {
    it('should return initial State', () => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should return auth token' ,() => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actions.AUTH_SUCCESS,
            idToken: 'some-id',
            userId: 'user-id'
        })).toEqual({
            token: 'some-id',
            userId: 'user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})