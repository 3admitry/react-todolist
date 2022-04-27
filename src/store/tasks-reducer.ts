import {tasksObjcType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../components/Todolist';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';


type actionTypeAddTask = {
    type: 'ADD_TASK',
    title: string,
    taskId: string
}
type actionTypeRemoveTask = {
    type: 'REMOVE_TASK',
    taskId: string
    todoListId: string
}
type actionTypeChangeTaskTitle = {
    type: 'CHANGE_TASK_TITLE',
    newTitle: string,
    taskId: string
    todoListId: string
}
type actionTypeChangeTaskStatus = {
    type: 'CHANGE_TASK_STATUS',
    status: boolean,
    taskId: string
    todoListId: string
}

type CommonActionType = actionTypeAddTask | actionTypeRemoveTask | actionTypeChangeTaskTitle | actionTypeChangeTaskStatus


export const taskReducer = (state: tasksObjcType, action: CommonActionType): tasksObjcType => {
    switch (action.type) {
        case ADD_TASK:
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: true
            };
            return {
                ...state,
                [action.taskId]: [...state[action.taskId], newTask]
            };
        case REMOVE_TASK: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            };
        }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.newTitle}:t)
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.status}:t)
            }
        default:
            throw new Error('I don\'t understand this action type');
    }
}

export const addTaskAC = (title: string, id: string): actionTypeAddTask => (
    {type: ADD_TASK, title: title, taskId: id}
)
export const removeTaskAC = (taskId: string, todoListId: string): actionTypeRemoveTask => (
    {type: REMOVE_TASK, taskId, todoListId}
)
export const changeTaskTitletAC = (newTitle: string, taskId: string, todoListId: string): actionTypeChangeTaskTitle => (
    {type: CHANGE_TASK_TITLE, newTitle, taskId, todoListId}
)
export const changeTaskStatusAC = (status: boolean, taskId: string, todoListId: string): actionTypeChangeTaskStatus => (
    {type: CHANGE_TASK_STATUS, status, taskId, todoListId}
)
