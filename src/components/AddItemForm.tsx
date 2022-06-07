import React, {KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddCircleOutlineOutlined} from '@mui/icons-material';

type addItemFormProps = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<addItemFormProps> = React.memo(({addItem}) => {
    console.log('AddItemForm is called');
    let [titleNewTask, setTitleNewTask] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = () => {
        if (titleNewTask.trim() !== '') {
            addItem(titleNewTask.trim())
            setTitleNewTask('')
            setError(null)
        } else {
            setError('Field is required')
        }
    }

    const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(e.currentTarget.value)
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickButtonHandler()
    }

    return (
        <div>
            <TextField
                value={titleNewTask}
                variant={'outlined'}
                label={'Type value'}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                error={!!error}
                helperText={error}
                size="small"
            />
            <IconButton  onClick={onClickButtonHandler} color={'primary'}>
                <AddCircleOutlineOutlined />
            </IconButton>
        </div>
    )
});