import React from 'react';

const Button = ({ children, buttonType, type, disabled, customClass }) => {
    let buttonElement = null;
    let classes = 'bg-brand-primary inline-flex justify-center items-center text-center px-2 py-4 text-white font-semibold tracking-widest w-full rounded-md transition focus:ring-2 focus:ring-brand-primary focus:ring-opacity-70 focus:outline-none ring-offset-2 hover:bg-opacity-90 active:bg-brand-tertiary active:bg-opacity-70';
    switch (buttonType) {
        case 'anchor':
            buttonElement = <a href="?" className={classes}>{children}</a>;
            break;
        case 'button':
            buttonElement = <button disabled={disabled} className={classes} type={type}>{children}</button>;
            break;
        default:
            buttonElement = <button disabled={disabled} className={customClass} type={type}>{children}</button>;
            break;
    }
    return buttonElement;
}

export default Button;