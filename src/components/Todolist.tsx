import React, {ChangeEvent} from 'react';
import {valueFilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableTitle} from './EditableTitle';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: valueFilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, checked: boolean, todoListId: string) => void
    changeTitleTask: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (newTitle: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    valueFilter: valueFilterType
}

export const Todolist: React.FC<PropsType> = ({ // props
                                                  todoListId,
                                                  title,
                                                  tasks,
                                                  removeTask,
                                                  changeFilter,
                                                  addTask,
                                                  changeStatus,
                                                  removeTodoList,
                                                  valueFilter,
                                                  changeTitleTask,
                                                  changeTodolistTitle
                                              }) => {


    const addItem = (title: string) => {
        addTask(title, todoListId)
    }

    const onChangeCheckboxHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>, todoListId: string) => {
        changeStatus(taskId, event.currentTarget.checked, todoListId)
    }


    // display Tasks List
    const taskList = tasks.map((t, i) => {
        const changeTitleCurrentTask = (newTitle: string) => {
            changeTitleTask(t.id, newTitle, todoListId)
        }

        return (
            <li
                className={(t.isDone ? 'is-done' : '')}
                key={i}>
                <Checkbox
                       checked={t.isDone}
                       onChange={(event) => onChangeCheckboxHandler(t.id, event, todoListId)}
                       color="success"

                />
                <EditableTitle title={t.title} changeTitle={changeTitleCurrentTask}/>
                <IconButton aria-label="delete" onClick={() => removeTask(t.id, todoListId)}>
                    <Delete/>
                </IconButton>

            </li>
        )
    })

    const onClickButtonHandlerAll = () => changeFilter('all', todoListId)
    const onClickButtonHandlerActive = () => changeFilter('active', todoListId)
    const onClickButtonHandlerCompleted = () => changeFilter('completed', todoListId)

    const chnageCurrentTodolistTitle = (title: string) => {
        changeTodolistTitle(title, todoListId);
    }

    //Display TodoList
    return (
        <div>
            <h3>
                <EditableTitle title={title} changeTitle={chnageCurrentTodolistTitle}/>
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
}

