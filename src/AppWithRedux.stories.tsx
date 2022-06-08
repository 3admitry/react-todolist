// Button.stories.ts|tsx

import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


export const AppWithReduxBaseExample: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux />



