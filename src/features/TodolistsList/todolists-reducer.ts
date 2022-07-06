import {todolistsAPI, TodolistType} from '../../api/todolist-api'
import {Dispatch} from 'redux';
import {AppThunk} from '../../app/store';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {addTaskAC} from './tasks-reducer';

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
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

//Thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
}
export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistTEntityStatusAC(todolistId, 'loading'))
    await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
    dispatch(setAppStatusAC('succeeded'))
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.createTodolist(title)
    if (res.data.resultCode === 0) {
        const todolist = res.data.data.item;
        dispatch(addTodolistAC(todolist))
        dispatch(setAppStatusAC('succeeded'))
    } else {
        if (res.data.messages.length) {
            dispatch(setAppErrorAC(res.data.messages[0]))
        } else {
            dispatch(setAppErrorAC('Some error occurred'))
        }
        dispatch(setAppStatusAC('failed'))
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    await todolistsAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC(id, title))
    dispatch(setAppStatusAC('succeeded'))
}


// Types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
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

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

