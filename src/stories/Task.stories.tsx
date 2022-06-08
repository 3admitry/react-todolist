// Button.stories.ts|tsx

import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from '../components/Task';

export default {
    title: 'TodoList/Task',
    component: Task,
    argTypes: {
        /**
         *  todoListId - string. Id of Todolist array
         */
        changeStatusTask: {action: 'Change status task:'},
        changeTitleTask: {action: 'Change title task:'},
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
    task: {id: '1', isDone: true, title: 'React'},
    todoListId: 'todoList1',
};

export const TaskIsNotDone = Template.bind({});

TaskIsNotDone.args = {
    task: {id: '2', isDone: false, title: 'Angular'},
    todoListId: 'todoList2',
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

