import {todolistsAPI, TodolistType} from '../../api/todolist-api'
import {Dispatch} from 'redux';
import {AppThunk} from '../../app/store';

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl=> tl.id===action.id ? {...tl, title: action.title}:tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl=> tl.id===action.id ? {...tl, filter: action.filter}:tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
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
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

//Thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(res.data))
}
export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.createTodolist(title)
    const todolist = res.data.data.item;
    dispatch(addTodolistAC(todolist))
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    await todolistsAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC(id, title))
}


// Types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

