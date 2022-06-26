import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolist-api';
export default {
    title: 'TodoList/API',
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then(({data}) => {
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('newTodolist').then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '24a80a88-96d7-4b70-927a-27d5be0f0da9'
        todolistsAPI.updateTodolist(todolistId, 'What to Learn')
            .then(({data}) => {
                setState(data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f51a3355-0c70-4259-8b14-c3cfcf34a14e';
        todolistsAPI.deleteTodolist(todolistId).then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


//
const TaskTodolistId = '24a80a88-96d7-4b70-927a-27d5be0f0da9';
const TaskId = '79b9d332-01f4-45fc-800d-44b7950dfb35';
const TaskObj = {
    title: 'Updated task title',
    description: 'update desc',
    completed: true,
    status: 0,
    priority: 0,
    startDate: '2022-06-23T10:31:11.02',
    deadline: '2022-06-25T10:31:11.02',
}

export const GetTodolistsTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTasks(TaskTodolistId).then(({data}) => {
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTask(TaskTodolistId, 'Test task title').then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTask(TaskTodolistId, TaskId, TaskObj)
            .then(({data}) => {
                setState(data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTask(TaskTodolistId, TaskId).then(({data}) => {
            setState(data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}