import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './AddNewTodo.css';

const AddNewTodo = (props) => {

    const [taskName, setTaskName] = useState('');

    const taskInputHandler = (event) => {
        setTaskName(event.target.value);
    }

    const addNewTaskHandler = () => {
        props.addNewTask(taskName)
        setTaskName('');
    }


    return (
        <div className='center'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" className='todoInput' label="What to do?" variant="outlined" value={taskName} onChange={taskInputHandler}/>
                <Button variant="outlined" className='todoBtn' onClick={addNewTaskHandler}>New List</Button>
            </Box>
        </div>
    )
}

export default AddNewTodo;