import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'loading',
        error: null,
        isInitialized: false
    }
})

test('Set error from null', () => {

    let result = appReducer(startState, setAppErrorAC('Some error'))

    expect(result.error).toBe('Some error');
});

test('Status must be changed', () => {

    let result = appReducer(startState, setAppStatusAC('loading'))

    expect(result.status).toBe('loading');
});
