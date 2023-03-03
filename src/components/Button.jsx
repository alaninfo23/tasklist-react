import React from 'react';

import '../css/Button.css';

const Button = ({ children, onClick, testId}) => {
    return (  <button data-testid={testId} onClick={onClick} className='button'>
                {children}
            </button>
        );
}
 
export default Button;