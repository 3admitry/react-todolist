import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: number
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TodolistTasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

type CreateTaskType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}

type UpdateTaskType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}

type ObjUpdateTask = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
    }
})


export const todolistAPI = {
    // Todolists methods
    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    // Tasks methods
    getTodolistTasks(todolistId: string) {
        return instance.get<TodolistTasksType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTodolistTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: title});
    },
    updateTodolistTask(todolistId: string, taskId: string, taskObj: ObjUpdateTask) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, taskObj);
    },
    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },

}
