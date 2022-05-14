import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Divider, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import todolistsReducer, {
    addTodoListAC,
    changeTodoLisFiltertAC,
    changeTodoLisTitletAC,
    removeTodoListAC
} from './store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitletAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store/store';

export type valueFilterType = 'all' | 'active' | 'completed'
export type todoListsType = {
    id: string
    title: string
    filter: valueFilterType
}
export type tasksObjcType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<todoListsType>>(state => state.todolists);
    const tasksObjc = useSelector<AppRootState, tasksObjcType>(state => state.task);


    const addTodolist = (title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action);
    }

    const changeTodolistTitle = (newTitle: string, todoListId: string) => {
        const action = changeTodoLisTitletAC(newTitle, todoListId);
        dispatch(action);
    }

    const changeFilter = (filter: valueFilterType, todoListId: string) => {
        const action = changeTodoLisFiltertAC(filter, todoListId);
        dispatch(action);
    }

    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId);
        dispatch(action);
    }

    const changeStatus = (taskId: string, checked: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(checked, taskId, todoListId);
        dispatch(action);
    }

    const changeTitleTask = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitletAC(newTitle, taskId, todoListId);
        dispatch(action);
    }

    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <Grid item style={{padding: '2rem 0'}}>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}} style={{marginBottom: '1rem'}}>
                            Add new TodoList
                        </Typography>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                </Grid>
                <Divider textAlign="left">My TodoLists</Divider>
                <Grid container spacing={3}>
                    {todoLists.map((tl, i) => {
                        let tasksTodoList = tasksObjc[tl.id];
                        if (tl.filter === 'active') {
                            tasksTodoList = tasksObjc[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksTodoList = tasksObjc[tl.id].filter(t => t.isDone)
                        }

                        return (
                            <Grid item key={'grid-' + i}>
                                <Todolist
                                    key={tl.id}
                                    todoListId={tl.id}
                                    title={tl.title}
                                    tasks={tasksTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    changeTitleTask={changeTitleTask}
                                    changeTodolistTitle={changeTodolistTitle}
                                    valueFilter={tl.filter}
                                    removeTodoList={removeTodoList}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>


            {/*<Bodies title={'Book'} countli={simpleData}/>*/}
        </div>
    );
}

export default AppWithRedux;

