import React, { useState } from 'react'
import '../asserts/todolist.css';
import { Checkbox } from '@mui/material';
type Todolist = {
    task: string,
    completed: boolean,
    edit: boolean,
}

type TodolistType = {
    todo: Todolist[],
    setTodo: (TaskSet: Todolist[]) => void
}

const TodoList = ({ todo, setTodo }: TodolistType) => {

    let [count, setCount] = useState(0);

    function handleDelete(index: number) {
        todo.splice(index, 1);
        setTodo([...todo]);
    };

    function handleEdit(todos: Todolist) {
        todos.edit = !todos.edit;
        setTodo([...todo]);
    };

    function handleChecked(todos: Todolist) {
        todos.completed = !todos.completed;
        setTodo([...todo]);
        todos.completed === true ? setCount(++count) : setCount(--count);
    };

    function handleUpdate(event: React.ChangeEvent<HTMLInputElement>, todos: Todolist) {
        todos.task = event.target.value;
        setTodo([...todo]);
    }

    return (

        <div>
            {todo.map((todos, index) => (
                <div key={index} className='displaytask'>
                    <div className='display'>
                        <Checkbox className="checkcomplete" disabled={todos.edit} onChange={() => handleChecked(todos)} />
                        {todos.completed ? <input type="text" value={todos.task}  className = 'donetask' disabled = {todos.completed}/> 
                        : <input type = "text" value={todos.task} className = {todos.edit ? 'edit':'noedit'} onChange = {(event)=>handleUpdate(event,todos)} readOnly = {!todos.edit}/>}
                        <button disabled={todos.completed || todos.edit} onClick={() => handleDelete(index)}>X</button>
                        <button disabled={todos.completed} onClick={() => handleEdit(todos)}>{todos.edit ? 'SAVE' : 'EDIT'}</button>
                    </div>
                </div>
            ))

            }
            <p className='donecount'>Done : {count}</p>
        </div>
    );
};

export default TodoList;
