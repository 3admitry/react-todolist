import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from '../app/App';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
    title: 'TodoList/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

export const AppWithReduxBaseExample: ComponentStory<typeof App> = () => <App demo={true}/>



