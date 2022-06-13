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

export const GetTodolistsTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(({data}) => {
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

/todo-lists/{todolistId}/tasks

