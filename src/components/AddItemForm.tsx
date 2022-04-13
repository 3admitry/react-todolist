import React, {KeyboardEvent, useState} from 'react';
import {Button} from '@mui/material';

type addItemFormProps = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<addItemFormProps> = ({addItem}) => {

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
            <input value={titleNewTask}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressInputHandler}
                   className={error ? 'error' : ''}
            />
            <Button onClick={onClickButtonHandler} variant={'contained'} color={'primary'}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}