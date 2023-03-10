import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from './Button';

import './TaskDetails.css';

const TaskDetails = () => {
    const params = useParams();
    const history = useHistory();

    const handleBackButtonClick = () => {
        history.goBack();
    }
    
    return ( 
        <>
            <div className="back-button-container">
                <Button onClick={handleBackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
            <h2>{params.taskTitle}</h2>
                <p>Sed ut perspiciatis unde omnis iste natus error sit volu
                    doloremque laudantium, totam rem aperiam, eaque ipsa q
                    veritatis et quasi architecto beatae vitae 
                </p>
            </div>
        </>
     );
}
 
export default TaskDetails;