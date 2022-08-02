import React, {ChangeEvent, useEffect, useState} from 'react'
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
    const [todolistId, setTodolistId] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)
    const inputIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const updateTodo = () => {
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(({data}) => {
                setState(data)
            })
    }

    return <div>
        todolistId: <input type="text" value={todolistId} onChange={inputIdHandler}/>
        newTitle: <input type="text" value={newTitle} onChange={inputTitleHandler}/>
        <button onClick={updateTodo}>Update</button>
        <br/>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTodolist = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [state, setState] = useState<any>(null)
    const inputIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const deleteTodo = () => {
        todolistsAPI.deleteTodolist(todolistId).then(({data}) => {
            setState(data);
        })
    }

    return <div>
        todolistId: <input type="text" value={todolistId} onChange={inputIdHandler}/>
        <button onClick={deleteTodo}>Delete</button>
        <br/>
        {JSON.stringify(state)}</div>
}

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
    const [todolistId, setTodolistId] = useState<string>('')
    const inputIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const getTasks = () => {
        todolistsAPI.getTasks(todolistId).then(({data}) => {
            setState(data);
        })
    }

    return <div>
        todolistId: <input type="text" value={todolistId} onChange={inputIdHandler}/>
        <button onClick={getTasks}>Get Tasks</button>
        <br/>
        {JSON.stringify(state)}</div>
}

export const CreateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const inputIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const createTask = () => {
        todolistsAPI.createTask(todolistId, newTitle).then(({data}) => {
            setState(data);
        })
    }

    return <div>
        todolistId: <input type="text" value={todolistId} onChange={inputIdHandler}/>
        newTaskTitle: <input type="text" value={newTitle} onChange={inputTitleHandler}/>
        <button onClick={createTask}>Create Task</button>
        <br/>
        {JSON.stringify(state)}</div>
}

export const UpdateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const inputIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const inputIdTaskHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
    const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const updateTask = () => {
        TaskObj.title = newTitle;
        todolistsAPI.updateTask(todolistId, taskId, TaskObj)
            .then(({data}) => {
                setState(data)
            })
    }


    return <div>
        todolistId: <input type="text" value={todolistId} onChange={inputIdHandler}/>
        taskId: <input type="text" value={taskId} onChange={inputIdTaskHandler}/>
        newTaskTitle: <input type="text" value={newTitle} onChange={inputTitleHandler}/>
        <button onClick={updateTask}>Update Task</button>
        <br/>
        {JSON.stringify(state)}</div>
}

export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const inputIdHandler = (e: ChangeEvent<HTMLInputElement>) => setTodolistId(e.currentTarget.value)
    const inputIdTaskHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskId(e.currentTarget.value)
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId).then(({data}) => {
            setState(data);
        })
    }

    return <div>
        todolistId: <input type="text" value={todolistId} onChange={inputIdHandler}/>
        taskId: <input type="text" value={taskId} onChange={inputIdTaskHandler}/>
        <button onClick={deleteTask}>Delete Task</button>
        <br/>
        {JSON.stringify(state)}</div>
}