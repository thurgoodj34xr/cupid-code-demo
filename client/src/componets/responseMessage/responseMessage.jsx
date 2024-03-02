import React from 'react';

const ResponseMessage = ({ type, message }) => {
    const getColor = () => {
        return type === 'error' ? 'red' : 'green';
    };

    return (
        <div style={{ color: getColor(), marginTop: '10px' }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}: {message}
        </div>
    );
};

export default ResponseMessage;
