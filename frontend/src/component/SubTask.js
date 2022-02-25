import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const SubTask = (props) => {

    const subTaskStatusHandler = () => {
        props.subTaskStatusHandler(props.subtask.id, !props.subtask.status);
    }

    return (
        <>
            <ListItemButton sx={{ pl: 4 }} className='innerList'>
                <Checkbox defaultChecked={props.subtask.status} onChange={subTaskStatusHandler}/>
                <ListItemText primary={props.subtask.title} />
            </ListItemButton>
        </>
    )
}

export default SubTask;