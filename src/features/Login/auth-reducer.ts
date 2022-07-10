import {authAPI, dataLoginType} from '../../api/todolist-api';
import {setAppStatusAC} from '../../app/app-reducer';
import {AppThunk} from '../../app/store';
import {errorNetworkHandler, errorServerHandler} from '../../utils/error-utils';

const initialState: LoginStateType = {
    userID: null,
    isLoggedIn: false,
}

//Login Reducer
export const authReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGG-IN':
            return {...state, isLoggedIn: action.isUserLogged}
        default:
            return state;
    }
}

//Action Creators
export const setLoggedUser = (isUserLogged: boolean) =>
    ({type: 'AUTH/SET-LOGG-IN', isUserLogged} as const)

//Thunks
export const loginTC = (data: dataLoginType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setLoggedUser(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            errorServerHandler(res.data, dispatch)
        }
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }
}
export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setLoggedUser(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            errorServerHandler(res.data, dispatch)
        }
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }
}

//types
type LoginStateType = {
    userID: number | null
    isLoggedIn: boolean
}
type setLoggedUserType = ReturnType<typeof setLoggedUser>

export type LoginActionsType = setLoggedUserType