import { todoListsType } from "../App";
import {v1} from 'uuid';

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const DELETE_TODOLIST = 'DELETE_TODOLIST';

type actionType = {
    type:string,
    [key:string]: string
}

export const todolistsReducer = (state: todoListsType[], action:actionType): todoListsType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodolist: todoListsType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [newTodolist, ...state];
        default:
            throw new Error("I don't understand this action type");
    }
}

export default todolistsReducer;