import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableTitle} from './EditableTitle';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';

type PropsTaskType = {
    changeTitleTask: (taskId: string, newTitle: string, todoListId: string) => void
    changeStatusTask: (taskId: string, checked: boolean, todoListId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: PropsTaskType) => {
    const changeTitleCurrentTask = useCallback((newTitle: string) => {
        props.changeTitleTask(props.task.id, newTitle, props.todoListId)
    }, [props.changeTitleTask, props.task.id, props.todoListId]);
    const onChangeCheckboxHandler = useCallback((taskId: string, event: ChangeEvent<HTMLInputElement>, todoListId: string) => {
        props.changeStatusTask(taskId, event.currentTarget.checked, todoListId)
    },[props.changeStatusTask]);

    return (
        <li
            className={(props.task.isDone ? 'is-done' : '')}
            key={props.task.id}>
            <Checkbox
                checked={props.task.isDone}
                onChange={(event) => onChangeCheckboxHandler(props.task.id, event, props.todoListId)}
                color="success"

            />
            <EditableTitle title={props.task.title} changeTitle={changeTitleCurrentTask}/>
            <IconButton aria-label="delete" onClick={() => props.removeTask(props.task.id, props.todoListId)}>
                <Delete/>
            </IconButton>

        </li>
    )
});