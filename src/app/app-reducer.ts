import {authAPI} from '../api/todolist-api';
import {AppThunk} from './store';
import {errorNetworkHandler, errorServerHandler} from '../utils/error-utils';
import {setLoggedUser} from '../features/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = string | null

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType,
    isInitialized: true,
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//ActionCreators
export const setAppErrorAC = (error: ErrorStatusType) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializeAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

//Thunks
export const initializeAppTC = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.auth()
        if (res.data.resultCode === 0) {
            dispatch(setLoggedUser(true))
        } else {
            errorServerHandler(res.data, dispatch)
        }
        dispatch(setInitializeAC(true))
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }
}

//Types
export type AppReducerActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setInitializeAC>