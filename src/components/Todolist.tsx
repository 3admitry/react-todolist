import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {valueFilterType} from '../App';
import {AddItemForm} from './AddItemForm';

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
                                                  valueFilter
                                              }) => {


    const addItem = (title: string) => {
        addTask(title, todoListId)
    }

    const onChangeCheckboxHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>, todoListId: string) => {
        changeStatus(taskId, event.currentTarget.checked, todoListId)
    }

    // display Tasks List
    const taskList = tasks.map((t, i) => {
        return (
            <li
                className={(t.isDone ? 'is-done' : '')}
                key={i}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={(event) => onChangeCheckboxHandler(t.id, event, todoListId)}

                />
                <span>{t.title}</span>
                <button onClick={() => removeTask(t.id, todoListId)}>x</button>
            </li>
        )
    })

    const onClickButtonHandlerAll = () => changeFilter('all', todoListId)
    const onClickButtonHandlerActive = () => changeFilter('active', todoListId)
    const onClickButtonHandlerCompleted = () => changeFilter('completed', todoListId)

    //Display TodoList
    return (
        <div>
            <h3>{title}
                &nbsp;&nbsp;
                <button onClick={() => removeTodoList(todoListId)}>x</button>
            </h3>
            <AddItemForm addItem={addItem}/>

            <ul>
                {taskList}
            </ul>
            <div>
                <button className={(valueFilter === 'all' ? 'active-filter' : '')}
                        onClick={onClickButtonHandlerAll}>All
                </button>
                <button className={(valueFilter === 'active' ? 'active-filter' : '')}
                        onClick={onClickButtonHandlerActive}>Active
                </button>
                <button className={(valueFilter === 'completed' ? 'active-filter' : '')}
                        onClick={onClickButtonHandlerCompleted}>Completed
                </button>
            </div>
        </div>
    );
}
