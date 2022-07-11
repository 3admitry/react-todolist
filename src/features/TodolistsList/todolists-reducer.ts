import {todolistsAPI, TodolistType} from '../../api/todolist-api'
import {AppThunk} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {errorNetworkHandler, errorServerHandler} from '../../utils/error-utils';
import {fetchTasksTC} from './tasks-reducer';

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        }
        case 'CLEAR-DATA':
            return []
        default:
            return state;
    }
}

//ActionCreators
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id: id, title: title
} as const)
export const changeTodolistTEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const clearTodolistsAC = () => ({type: 'CLEAR-DATA'} as const)

//Thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        //Получаем наши тудулисты
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))

        //Итерируем наши тудылисты и получаем список тасок каждого из них.
        //Только в for of возможно применять await
        for (const tl of res.data) {
            await dispatch(fetchTasksTC(tl.id))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }

}
export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistTEntityStatusAC(todolistId, 'loading'))
    try {
        await todolistsAPI.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
        dispatch(changeTodolistTEntityStatusAC(todolistId, 'failed'))
    }
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            const todolist = res.data.data.item;
            dispatch(addTodolistAC(todolist))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            errorServerHandler(res.data, dispatch)
        }
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsAPI.updateTodolist(id, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            errorServerHandler(res.data, dispatch)
        }
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }
}


// Types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type clearTodolistsActionType = ReturnType<typeof clearTodolistsAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistTEntityStatusActionType = ReturnType<typeof changeTodolistTEntityStatusAC>

export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType
    | ChangeTodolistTEntityStatusActionType
    | clearTodolistsActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

