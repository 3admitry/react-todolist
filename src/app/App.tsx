import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import { Menu } from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from './hooks';

type PropsType = {
    demo?: boolean
}

function App({demo = false}:PropsType) {
    const status = useAppSelector(state => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnackbar />
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    )
}

export default App
