/* Comando imr importa a biblioteca */
import React, { useState } from 'react';

import Button from './Button';

import '../css/AddTask.css'

/* Comando sfc cria uma função */
const AddTask = ({ handleTaskAddition }) => {
    const [inputData, setInputData] = useState('');

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    }
    const handleAddTaskClick = () => {
        handleTaskAddition(inputData);
        setInputData('');
    }
    return (
        <div className='add-task-container'>
            <input 
                onChange={handleInputChange}
                value={inputData}
                data-testid='INPUT_TASK'
                className='add-task-input' 
                type='text' 
            />
            ;
            <div className="add-task-button-container"> 
            <Button onClick={handleAddTaskClick}>Adicionar</Button>
            </div>
        </div>
    );
};
 
export default AddTask;