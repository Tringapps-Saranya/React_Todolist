import React, { useEffect, useState } from 'react'
import '../asserts/todoform.css';
import  Todolist  from '../components/Todolist';
import {Button} from '@mui/material';
 type TodoType = {
    task : string,
    completed: boolean,
    edit: boolean
 }[]

const TodoForm = () => {

    const [input, setInput] = useState("");
    const [todo, setTodo] =useState<TodoType>([]);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        if(input.length ==0){
            alert("Enter the task")
        }
        else{
            setTodo([...todo, { task: input.trim(), completed: false, edit: false }]);
            setInput("");
        }
    }

    return (
        <div  className='TodoForm'>
            <h2 className='header'>THINGS TO DO:</h2>
            {(todo.length === 0)? <p className='notask'>Looks like you're absolutely free today!</p>:
            <Todolist todo={todo} setTodo={setTodo} />}
            <form onSubmit={handleSubmit}>
                <input name="task" type="text" className="inputbox" placeholder='Enter new task' value={input} onChange={handleInputChange}/>
                <Button type='submit' variant="contained" sx = {{marginLeft:'25px',height: '50px'}}>Add task</Button>
            </form>
        </div>
    );
};

export default TodoForm;
