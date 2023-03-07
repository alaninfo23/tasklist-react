import React from 'react';
import { CgClose, CgInfo } from 'react-icons/cg';
import {useHistory} from 'react-router-dom';


import '../css/Task.css';

const Task = ({ task, handleTaskClick, handleTaskDeletion }) => {
    const history = useHistory();
    
    const handleTaskDetailsClick = () => {
        history.push(`/${task.title}`);
    };

    return (
        <div className='task-container' 
            style={ task.completed ? { borderLeft: '6px solid chartreuse' } : {}}
            data-testid={`TASK_CONTAINER_${task.title}`}
        >
            <div className='task-title' 
            data-testid='TASK_NAME' 
            onClick={() => handleTaskClick(task.id)}>
                {task.title}
            </div>

            <div className='buttons-container'>
                <button 
                    className='remove-task-button'
                    data-testid='DELETE_TASK'
                    onClick={ () => handleTaskDeletion(task.id)}
                >
                  <CgClose />
                </button>

                <button 
                  className='see-task-details-button'
                  data-testid='INFO_TASK_BUTTON'
                  onClick={handleTaskDetailsClick}
                >
                  <CgInfo />
                </button>

            </div>
        </div>
    )
    //return <div className='task-container'>{task.title}</div>;
}
export default Task;