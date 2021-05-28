import { NavLink } from 'react-router-dom';

export const FormTitle = ({ children, title, link, linkContent }) => (
    <div className="mb-8 tracking-wider font-bold">
        <h3 className="w-full font-bold text-gray-800 text-4xl mb-3 leading-7">{title}</h3>
        <p>{children}<NavLink className="text-brand-primary" to={link}> {linkContent}</NavLink>.</p>
    </div>
);

export const Form = ({ children, submit }) => (
    <form className="max-w-lg w-full mx-auto" onSubmit={(event) => submit(event)}>
        {children}
    </form>
);