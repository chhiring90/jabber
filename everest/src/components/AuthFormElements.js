import { NavLink } from 'react-router-dom';

export const FormTitle = ({ formTitle }) => {
    const { title, children, linkContent, link } = formTitle;

    return (
        <div className="mb-4 tracking-wider font-bold">
            <h3 className="w-full font-bold text-gray-800 text-4xl mb-3 leading-7">{title}</h3>
            <p>{children}<NavLink className="text-brand-primary" to={link}> {linkContent}</NavLink>.</p>
        </div>
    )
};

export const FormMessage = ({ message }) => {
    let messageClassName;

    switch (message[0]) {
        case 'MESSAGE_SUCCESS':
            messageClassName = 'text-green-400';
            break;
        case 'MESSAGE_ERROR':
            messageClassName = 'text-red-400';
            break;
        case 'MESSAGE_INFO':
            messageClassName = 'text-blue-500';
            break;
        default: break;
    }

    return (<p className={`${messageClassName} text-sm font-bold mb-3`}>{message[1]}</p>)
}