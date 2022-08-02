import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {Task} from '../features/TodolistsList/Todolist/Task/Task';

export default {
    title: 'TodoList/Task',
    component: Task,
    argTypes: {
        changeTaskStatus: {action: 'Change status task:'},
        changeTaskTitle: {action: 'Change title task:'},
        removeTask: {action: 'Remove task:'},
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});

TaskIsDone.args = {
    task: {
        id: '1', title: 'React', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    },
    todolistId: 'todoList1',
};

export const TaskIsNotDone = Template.bind({});

TaskIsNotDone.args = {
    task: {
        id: '2', title: 'Redux', status: TaskStatuses.New, todoListId: 'todoList2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    },
    todolistId: 'todoList2',
};

