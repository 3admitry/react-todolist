import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'TodoList/API',
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8763fc73-614f-4013-b502-549dd18f0f18'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(({data}) => {
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('newTodolist').then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '95512281-1041-4e17-aa91-85f949a9a44a'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then(({data}) => {
                setState(data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '95512281-1041-4e17-aa91-85f949a9a44a';
        todolistAPI.deleteTodolist(todolistId).then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


//
const TaskTodolistId = '4f4d44fd-b74c-4a1a-97d0-d6c0c6edd894';
const TaskId = '95512281-1041-4e17-aa91-85f949a9a44a';
const TaskObj = {
    title: 'New task title',
    description: 'update desc',
    completed: true,
    status: 0,
    priority: 0,
    startDate: 'string',
    deadline: 'string',
}

export const GetTodolistsTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolistTasks(TaskTodolistId).then(({data}) => {
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolistTask(TaskTodolistId, 'Test task title').then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '95512281-1041-4e17-aa91-85f949a9a44a'
        todolistAPI.updateTodolistTask(TaskTodolistId, TaskId, TaskObj)
            .then(({data}) => {
                setState(data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolistTask(TaskTodolistId, TaskId).then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}