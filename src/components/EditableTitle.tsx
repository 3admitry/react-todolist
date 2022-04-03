import React, {ChangeEvent, useState} from 'react';

type EditableTitleProps = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableTitle = (props: EditableTitleProps) => {
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
            ? <input type="text" value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>


    )
}