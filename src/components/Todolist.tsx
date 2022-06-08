import React, {useCallback} from 'react';
import {valueFilterType} from '../AppWithReducer';
import {AddItemForm} from './AddItemForm';
import {EditableTitle} from './EditableTitle';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTypeTodolsit = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: valueFilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatusTask: (taskId: string, checked: boolean, todoListId: string) => void
    changeTitleTask: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (id: string, todolistId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle: (newTitle: string, todoListId: string) => void
    valueFilter: valueFilterType
}

export const Todolist: React.FC<PropsTypeTodolsit> = React.memo(({ // props
                                                                     todoListId,
                                                                     title,
                                                                     tasks,
                                                                     removeTask,
                                                                     changeFilter,
                                                                     addTask,
                                                                     changeStatusTask,
                                                                     removeTodoList,
                                                                     valueFilter,
                                                                     changeTitleTask,
                                                                     changeTodolistTitle
                                                                 }) => {

    console.log('Todolist is called');

    if (valueFilter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (valueFilter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const addItem = useCallback((title: string) => {
        addTask(title, todoListId)
    }, [addTask, todoListId]);


    // display Tasks List

    const taskList = tasks.map(t => <Task
        changeStatusTask={changeStatusTask}
        changeTitleTask={changeTitleTask}
        removeTask={removeTask}
        task={t}
        todoListId={todoListId}
        key={t.id}
    />)

    const onClickButtonHandlerAll = useCallback(() => changeFilter('all', todoListId), [changeFilter, todoListId]);
    const onClickButtonHandlerActive = useCallback(() => changeFilter('active', todoListId), [changeFilter, todoListId]);
    const onClickButtonHandlerCompleted = useCallback(() => changeFilter('completed', todoListId), [changeFilter, todoListId]);

    const changeCurrentTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(title, todoListId);
    }, [changeTodolistTitle, todoListId]);

    //Display TodoList
    return (
        <div>
            <h3>
                <EditableTitle title={title} changeTitle={changeCurrentTodolistTitle}/>
                &nbsp;&nbsp;
                <IconButton aria-label="delete" onClick={() => removeTodoList(todoListId)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>

            <ul>
                {taskList}
            </ul>
            <div>
                {
                    //className={(valueFilter === 'all' ? 'active-filter' : '')}
                }
                <Button variant={(valueFilter === 'all' ? 'contained' : 'text')}
                        onClick={onClickButtonHandlerAll}>All
                </Button>
                <Button color={'success'} variant={(valueFilter === 'active' ? 'contained' : 'text')}
                        onClick={onClickButtonHandlerActive}>Active
                </Button>
                <Button color={'error'} variant={(valueFilter === 'completed' ? 'contained' : 'text')}
                        onClick={onClickButtonHandlerCompleted}>Completed
                </Button>
            </div>
        </div>
    );
});

