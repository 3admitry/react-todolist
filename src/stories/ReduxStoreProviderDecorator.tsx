import {Provider} from 'react-redux';
import React from 'react';
import {combineReducers, createStore} from 'redux';
import todolistsReducer from '../store/todolists-reducer';
import {tasksReducer} from '../store/tasks-reducer';
import {v1} from 'uuid';
import {AppRootState} from '../store/store';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    task: tasksReducer,
})

export const storyBookStore = createStore(rootReducer);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}