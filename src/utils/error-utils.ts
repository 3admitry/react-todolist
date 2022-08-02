import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolist-api';
import {AppDispatch} from '../app/store';

export const errorServerHandler = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some server error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const errorNetworkHandler = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message ? error.message : 'Some network error occurred'))
}
