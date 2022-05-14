import {todoListsType, valueFilterType} from '../App';
import {v1} from 'uuid';

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';

export let todolistId1 = v1();
export let todolistId2 = v1();

// type actionType = {
//     type: string,
//     [key: string]: string
// }

export type actionTypeAddTodolist = {
    type: 'ADD_TODOLIST'
    title: string
    todolistId: string
}
export type actionTypeRemoveTodolist = {
    type: 'REMOVE_TODOLIST'
    id: string
}
type actionTypeChangeTodolistTitle = {
    type: 'CHANGE_TODOLIST_TITLE'
    title: string,
    id: string
}
type actionTypeChangeTodolistFilter = {
    type: 'CHANGE_TODOLIST_FILTER'
    filter: valueFilterType
    id: string
}

type CommonActionType =
    actionTypeAddTodolist
    | actionTypeRemoveTodolist
    | actionTypeChangeTodolistTitle
    | actionTypeChangeTodolistFilter

const initialState: Array<todoListsType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<todoListsType> = initialState, action: CommonActionType): Array<todoListsType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodolist: todoListsType = {
                id: action.todolistId,
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
            return state;
    }
}

export const addTodoListAC = (title: string): actionTypeAddTodolist => (
    {type: 'ADD_TODOLIST', title: title, todolistId: v1()}
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