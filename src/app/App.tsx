import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
    CircularProgress
} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useAppDispatch, useAppSelector} from './hooks';
import {Navigate, Route, Routes, useParams} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {initializeAppTC} from './app-reducer';
import {logoutTC} from '../features/Login/auth-reducer';
import {PageNotFound} from '../components/404/PageNotFound';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const params = useParams();
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[])

    if (!isInitialized) {
        return <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            height: '100vh',
            flexWrap: 'wrap'
        }}>
            <CircularProgress/>
        </Box>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnackbar/>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<PageNotFound />}/>
                    <Route path="*" element={<Navigate to={'/404'} />}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
