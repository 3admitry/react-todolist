// Button.stories.ts|tsx

import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from './AddItemForm';

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: { action: 'User add new item:' }
    },
} as ComponentMeta<typeof AddItemForm>;

/*export const BaseExample: ComponentStory<typeof AddItemForm> = (argTypes) => {
    return (
        <>
            <AddItemForm addItem={argTypes.addItem} />
        </>
    )
}*/

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const BaseExample = Template.bind({});

BaseExample.args = {};

