import React, { useState, useEffect, useRef } from 'react';
import { TiWarning, TiInputChecked } from 'react-icons/ti'

const Dialog = ({ messageType, messageText, show }) => {
    const [isActive, setIsActive] = useState(show);
    const dialogRef = useRef(null);

    useEffect(() => {
        console.log(isActive);
        const setIncative = setTimeout(() => {
            setIsActive(false);
        }, 2000);
        
        return () => {
            clearTimeout(setIncative);
        }
    }, [isActive]);

    let message;
    let dialogClass;

    switch (messageType) {
        case 'MESSAGE_ERROR':
            message = 'Error!';
            dialogClass = 'from-red-500 to-red-600'
            break;
            case 'MESSAGE_SUCCESS':
                message = 'Success!';
                dialogClass = 'from-green-400 to-green-500'
            break;
            default: break;
    }

    return (
        <div 
            className={`w-80 text-white flex items-center ${isActive ? 'top-4' : '-translate-y-full -top-24'} transition duration-500 ease-in-out transform -translate-x-2/4 left-2/4 fixed z-4 shadow-md rounded-md bg-gradient-to-r ${dialogClass}`} 
            ref={dialogRef}>
            <div className="flex-auto w-4/12 p-4">
                {/* <TiWarning className="w-16 h-16 mx-auto text-red-500"/> */}
                <TiInputChecked className="w-16 h-16 mx-auto" />
            </div>
            <div className="flex-auto flex items-center w-8/12 relative py-4 px-5">
                <span className="h-4/5 w-1 bg-white absolute left-0 top-2/4 transform -translate-y-2/4 opacity-80"></span>
                <div className="font-semibold">
                    <h3 className="font-extrabold text-xl tracking-wide uppercase">{message}</h3>
                    {/* <p>This is the dialog that will be displayed</p> */}
                    <p>{messageText}</p>
                </div>
            </div>
        </div>
    )
}

export default Dialog;