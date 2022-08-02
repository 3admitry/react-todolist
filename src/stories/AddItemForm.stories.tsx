import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {action: 'User add new item:'}
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const BaseExample = Template.bind({});
export const DisabledExample = Template.bind({});

BaseExample.args = {};
DisabledExample.args = {
    disabled: true
};

