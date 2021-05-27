import React from 'react';

const Button = ({ children, buttonType, type }) => {
    let buttonElement = null;
    let classes = 'bg-brand-primary px-2 text-white font-semibold tracking-widest py-4 w-full rounded transition focus:ring-2 focus:ring-brand-primary focus:ring-opacity-70 focus:outline-none ring-offset-2 hover:bg-opacity-90 active:bg-brand-tertiary active:bg-opacity-70';
    switch (buttonType) {
        case 'anchor':
            buttonElement = <a href="?" className={classes}>{children}</a>;
            break;
        case 'button':
            buttonElement = <button className={classes} type={type}>{children}</button>;
            break;
        default: break;
    }
    return buttonElement;
}

export default Button;