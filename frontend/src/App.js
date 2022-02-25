import React, { useState, useEffect } from 'react';

import './App.css';
import AddNewTodo from './component/AddNewTodo';
import TodoList from './component/TodoList';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [todo, setTodo] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [isNewTaskAdded, setIsNewTaskAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toNotRunFirstTime, setToNotRunFirstTime] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState(undefined);
  const [isNewSubTaskAdded, setIsNewSubTaskAdded] = useState(false);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [isStatusUpdate, setIsStatusUpdate] = useState(false);
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);
  const [updateStatusId, setUpdateStatusId] = useState(0);
  const [updateTaskStatus, setUpdateTaskStatus] = useState(0);

  const [isSubStatusUpdate, setIsSubStatusUpdate] = useState(false);
  const [isSubTaskUpdate, setIsSubTaskUpdate] = useState(false);
  const [subTaskId, setSubTaskId] = useState(0);


  useEffect(() => {
    setOpen(true);
    fetch('http://localhost:3000/api/task')
      .then(data => data.json())
      .then(data => {
        setTodo(data.data);
        setIsNewTaskAdded(false);
        setIsNewSubTaskAdded(false);
        setIsTaskUpdated(false);
        setIsSubTaskUpdate(false);
        setOpen(false);
      })
  }, [isNewTaskAdded, isNewSubTaskAdded, isTaskUpdated, isSubTaskUpdate]);

  useEffect(() => {
    if (toNotRunFirstTime && newTaskName) {
      fetch('http://localhost:3000/api/task', {
        method: 'POST',
        body: JSON.stringify({
          title: newTaskName,
          status: false
        }),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json())
        .then(response => {
          if (response.apiStatus === 200) {
            setIsNewTaskAdded(true);
            setNewTaskName(undefined);
          } else {
            setErrorMessage(response.message);
            setIsError(true);
          }
        })
    } else {
      setToNotRunFirstTime(true);
    }
  }, [newTaskName]);

  useEffect(() => {
    if(newSubTaskName) {
      fetch('http://localhost:3000/api/subtask', {
        method: 'POST',
        body: JSON.stringify({
          title: newSubTaskName,
          todoId: id,
          status: false
        }),
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(response => {
        if(response.apiStatus === 200) {
          setIsNewSubTaskAdded(true);
          setNewSubTaskName(undefined);
        } else {
          setErrorMessage(response.message);
          setIsError(true);
        }
      })
    }
  }, [newSubTaskName])

  useEffect(() => {
    if(isStatusUpdate) {
      fetch('http://localhost:3000/api/task', {
        method: 'PUT',
        body: JSON.stringify({
          id: updateStatusId,
          status: updateTaskStatus
        }),
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(response => {
        if(response.apiStatus === 200) {
          setIsTaskUpdated(true);
          setIsStatusUpdate(false);
        }
      })
    }
  }, [isStatusUpdate]);


  useEffect(() => {
    if(isSubStatusUpdate) {
      console.log("Updateing subStatus", {
        id: subTaskId,
        todoId: updateStatusId,
        status: updateTaskStatus
      });
      fetch('http://localhost:3000/api/subtask', {
        method: 'PUT',
        body: JSON.stringify({
          id: subTaskId,
          todoId: updateStatusId,
          status: updateTaskStatus
        }),
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        if(response.apiStatus === 200) {
          setIsSubTaskUpdate(true);
          setIsSubStatusUpdate(false);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }, [isSubStatusUpdate]);


  const addNewTask = (title) => {
    setOpen(true);
    setNewTaskName(title);
  }

  const addNewSubTask = (title, id) => {
    setOpen(true);
    setNewSubTaskName(title);
    setId(id);
  }

  const taskHandler = (id, status) => {
    setOpen(true);
    setIsStatusUpdate(true);
    console.log(id, status);
    setUpdateStatusId(id);
    setUpdateTaskStatus(status);
  }

  const subTaskStatusHandler = (taskId, subTaskId, status) => {
    setOpen(true);
    setUpdateStatusId(taskId);
    setUpdateTaskStatus(status);
    setSubTaskId(subTaskId);
    setIsSubStatusUpdate(true);
    console.log(taskId, subTaskId, status);
  }

  return (
    <div className="App">
      
      <h1>Todo App</h1>
      <AddNewTodo addNewTask={addNewTask} />
      <div className='todoList'>
        {todo !== undefined && todo.length > 0 && todo.map(data => <TodoList taskHandler={taskHandler} addNewSubTask={addNewSubTask} subTaskStatusHandler={subTaskStatusHandler} key={data.id} todo={data} />)}
      </div>
      {isError && errorMessage}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
