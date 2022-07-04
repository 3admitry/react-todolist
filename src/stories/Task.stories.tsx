// Button.stories.ts|tsx

import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import { Task } from '../features/TodolistsList/Todolist/Task/Task';

export default {
    title: 'TodoList/Task',
    component: Task,
    argTypes: {
        /**
         *  todoListId - string. Id of TodolistsList array
         */
        changeTaskStatus: {action: 'Change status task:'},
        changeTaskTitle: {action: 'Change title task:'},
        removeTask: {action: 'Remove task:'},
    },
} as ComponentMeta<typeof Task>;

/*export const BaseExample: ComponentStory<typeof AddItemForm> = (argTypes) => {
    return (
        <>
            <AddItemForm addItem={argTypes.addItem} />
        </>
    )
}*/

//👇 We create a “template” of how args map to rendering

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

/*export const BaseExample: ComponentStory<typeof Task> = (argTypes) => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: 'CSS'}}
            todoListId={'todoList1'}
            changeStatusTask={argTypes.changeStatusTask}
            changeTitleTask={argTypes.changeTitleTask}
            removeTask={argTypes.removeTask}
            />
        <Task
            task={{id: '2', isDone: false, title: 'REACT'}}
            todoListId={'todoList2'}
            changeStatusTask={argTypes.changeStatusTask}
            changeTitleTask={argTypes.changeTitleTask}
            removeTask={argTypes.removeTask}
            />
        </>
        }*/

