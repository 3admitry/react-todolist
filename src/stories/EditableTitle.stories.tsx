import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditableSpan} from '../components/EditableSpan/EditableTitle';

export default {
    title: 'TodoList/EditableTitle',
    component: EditableSpan,
    argTypes: {
        changeTitle: {action: 'Changed title:'},
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const BaseExample = Template.bind({});
export const DisabledExample = Template.bind({});

BaseExample.args = {
    value: 'React',
};
DisabledExample.args = {
    value: 'React',
    disabled: true
};


