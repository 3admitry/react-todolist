import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableTitleProps = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableTitle = React.memo((props: EditableTitleProps) => {

   console.log('EditableTitle is called')

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.changeTitle(title);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
//debugger
    return (

        editMode
            ? <TextField size={'small'} value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>


    )
});