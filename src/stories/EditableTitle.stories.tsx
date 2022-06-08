// Button.stories.ts|tsx

import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableTitle} from '../components/EditableTitle';

export default {
    title: 'TodoList/EditableTitle',
    component: EditableTitle,
    argTypes: {
        changeTitle: {action: 'Changed title:'},
    },
} as ComponentMeta<typeof EditableTitle>;


const Template: ComponentStory<typeof EditableTitle> = (args) => <EditableTitle {...args} />;

export const BaseExample = Template.bind({});

BaseExample.args = {
    title: 'React',
};


