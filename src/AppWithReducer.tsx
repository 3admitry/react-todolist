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

export type valueFilterType = 'all' | 'active' | 'completed'
export type todoListsType = {
    id: string
    title: string
    filter: valueFilterType
}
export type tasksObjcType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]);

    let [tasksObjc, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Babel', isDone: false},
            {id: v1(), title: 'Mysql', isDone: true},
            {id: v1(), title: 'NodeJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Cookie', isDone: false},
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Sugar222', isDone: true},
            {id: v1(), title: 'Water3', isDone: false}
        ]
    });

    const addTodolist = (title: string) => {

        const action = addTodoListAC(title);
        dispatchToTodoListsReducer(action);

    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTodoListsReducer(action);
        dispatchToTasksReducer(action);
    }

    const changeTodolistTitle = (newTitle: string, todoListId: string) => {
        const action = changeTodoLisTitletAC(newTitle, todoListId);
        dispatchToTodoListsReducer(action);
    }

    const changeFilter = (filter: valueFilterType, todoListId: string) => {
        const action = changeTodoLisFiltertAC(filter, todoListId);
        dispatchToTodoListsReducer(action);
    }

    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action);
    }

    const changeStatus = (taskId: string, checked: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(checked, taskId, todoListId);
        dispatchToTasksReducer(action);
    }

    const changeTitleTask = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitletAC(newTitle, taskId, todoListId);
        dispatchToTasksReducer(action);
    }

    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId);
        dispatchToTasksReducer(action);
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
                    {todoLists.map((tl,i) => {
                        let tasksTodoList = tasksObjc[tl.id];
                        if (tl.filter === 'active') {
                            tasksTodoList = tasksObjc[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksTodoList = tasksObjc[tl.id].filter(t => t.isDone)
                        }

                        return (
                            <Grid item key={'grid-'+i}>
                                <Todolist
                                    key={tl.id}
                                    todoListId={tl.id}
                                    title={tl.title}
                                    tasks={tasksTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatusTask={changeStatus}
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
        </div>
    );
}

export default AppWithReducer;

