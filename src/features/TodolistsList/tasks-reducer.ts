import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolist-api'
import {AppRootStateType, AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {errorNetworkHandler, errorServerHandler} from '../../utils/error-utils'

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

//Tasks Reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
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
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'CLEAR-TASKS':
            return {}
        default:
            return state;
    }
}

//Action Creators
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType, todolistId: string) =>
    ({type: 'ADD-TASK', task, todolistId} as const)
export const updateTaskAC = (taskId: string, model: UpdateTaskDomainModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const clearTasksAC = () => ({type: 'CLEAR-TASKS'} as const)

//Thunks
export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        dispatch(setTasksAC(res.data.items, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }

}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }

}
export const addTaskTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            errorServerHandler(res.data, dispatch)
        }
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
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
export const updateTaskTC = (taskId: string, domainModel: UpdateTaskDomainModelType, todolistId: string): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))

    const state = getState();
    let task = state.tasks[todolistId].find(tsk => tsk.id === taskId)
    if (!task) {
        console.warn('Task not found!');
        dispatch(setAppStatusAC('failed'))
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

    try {
        const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            errorServerHandler(res.data, dispatch)
        }
    } catch (error: any) {
        errorNetworkHandler(error, dispatch)
    }
}

//types
export type TasksStateType = { [key: string]: Array<TaskType> }
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type updateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
export type clearTasksActionType = ReturnType<typeof clearTasksAC>

export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
    | clearTasksActionType