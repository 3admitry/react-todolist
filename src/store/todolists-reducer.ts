import {todoListsType, valueFilterType} from '../App';
import {v1} from 'uuid';

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

// type actionType = {
//     type: string,
//     [key: string]: string
// }

type actionTypeAddTodolist = {
    type: 'ADD_TODOLIST',
    title: string
}
type actionTypeRemoveTodolist = {
    type: 'REMOVE_TODOLIST',
    id: string
}
type actionTypeChangeTodolistTitle = {
    type: 'CHANGE_TODOLIST_TITLE',
    title: string,
    id: string
}
type actionTypeChangeTodolistFilter = {
    type: 'CHANGE_TODOLIST_FILTER',
    filter: valueFilterType,
    id: string
}

type CommonActionType =
    actionTypeAddTodolist
    | actionTypeRemoveTodolist
    | actionTypeChangeTodolistTitle
    | actionTypeChangeTodolistFilter

export const todolistsReducer = (state: todoListsType[], action: CommonActionType): todoListsType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodolist: todoListsType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [newTodolist, ...state];

        case REMOVE_TODOLIST: {
            let removedTasks = state.filter(t => t.id !== action.id)
            return [...removedTasks];
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(el => (action.id === el.id ? {
                ...el,
                title: action.title
            } : el))
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(el => (action.id === el.id ? {
                ...el,
                filter: action.filter
            } : el))

        }

        default:
            throw new Error('I don\'t understand this action type');
    }
}

export const addTodoListAC = (title: string): actionTypeAddTodolist => (
    {type: 'ADD_TODOLIST', title: title}
)
export const removeTodoListAC = (id: string): actionTypeRemoveTodolist => (
    {type: 'REMOVE_TODOLIST', id: id}
)
export const changeTodoLisTitletAC = (title: string, id: string): actionTypeChangeTodolistTitle => (
    {type: 'CHANGE_TODOLIST_TITLE', title: title, id: id}
)
export const changeTodoLisFiltertAC = (filter: valueFilterType, id: string): actionTypeChangeTodolistFilter => (
    {type: 'CHANGE_TODOLIST_FILTER', filter: filter, id: id}
)

export default todolistsReducer;