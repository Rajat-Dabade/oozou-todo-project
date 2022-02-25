import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


import './TodoList.css'
import { Button } from '@mui/material';
import SubTask from './SubTask';

const TodoList = (props) => {

    const [open, setOpen] = useState(false);
    const [subTaskName, setSubTaskName] = useState('');

    const handleClick = () => {
        setOpen(!open);
    };

    const newSubTaskHandler = () => {
        props.addNewSubTask(subTaskName, props.todo.id);
        setSubTaskName('');
    }

    const subTaskNameInputHandler = (event) => {
        setSubTaskName(event.target.value);
    }

    const taskHandler = () => {
        props.taskHandler(props.todo.id, !props.todo.status);
    }

    const subTaskStatusHandler = (id, status) => {
        console.log("Bhaire", status);
        props.subTaskStatusHandler(props.todo.id, id, status);
    }

    return (
        <>
            <ListItemButton className='mainTodoBtn' >
                <Checkbox defaultChecked={props.todo.status} onChange={taskHandler}/>
                <ListItemText primary={props.todo.title} />
                <Button endIcon={open ? <ExpandLess /> : <ExpandMore />} onClick={handleClick}></Button>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>

                <List component="div" disablePadding >
                    {props.todo.subtasks.length > 0 && props.todo.subtasks.map(subtask => <SubTask subTaskStatusHandler={subTaskStatusHandler} key={subtask.id} subtask={subtask} />)}
                </List>
                <ListItemButton sx={{ pl: 4 }} className='innerList centerdiv'>
                    <TextField id="outlined-basic" label="What to do?" variant="outlined" value={subTaskName} onChange={subTaskNameInputHandler}/>
                    <Button variant="outlined" className='subtaskBtn' onClick={newSubTaskHandler}>New</Button>
                </ListItemButton>
            </Collapse>
        </>
    )
}

export default TodoList;