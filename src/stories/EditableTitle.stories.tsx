// Button.stories.ts|tsx

import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableSpan} from '../components/EditableTitle';


export default {
    title: 'TodoList/EditableTitle',
    component: EditableSpan,
    argTypes: {
        changeTitle: {action: 'Changed title:'},
    },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const BaseExample = Template.bind({});

BaseExample.args = {
    value: 'React',
};


