import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolist-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
    todolistId: string
}

export type updateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateTaskDomainModelType
}

export type SetTasksType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}
export const updateTaskAC = (taskId: string, model: UpdateTaskDomainModelType, todolistId: string): updateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {

        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                const tasks = res.data.data.item;
                const action = addTaskAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateTaskDomainModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        let task = state.tasks[todolistId].find(tsk => tsk.id === taskId)
        if (!task) {
            console.warn('Task not found!');
            return
        }

        let apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        };

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
}

