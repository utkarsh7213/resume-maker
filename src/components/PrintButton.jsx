import React, { useRef } from 'react';

const PrintButton = ({ resumePreviewRef }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <button onClick={handlePrint}>Print Resume</button>
    );
};

export default PrintButton;
