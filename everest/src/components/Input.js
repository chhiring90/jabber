import React from 'react';
import uuid from 'react-uuid';

const Input = ({ elementType, type, value, placeholder, changed, name, options, require, id, label }) => {
    let inputElement = null;
    switch (elementType) {
        case 'input':
            inputElement = <input
                className={['checkbox', 'radio'].includes(type) ? 'order-1' : ''}
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={changed}
                required={require ? true : ''} />;
            break;
        case 'select':
            inputElement = (
                <select
                    id={id}
                    value={value}
                    onChange={changed}>
                    {options.map(option =>
                        <option
                            key={uuid()}
                            value={option}>
                            {option.value}
                        </option>)}
                </select>);
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={changed}>
                </textarea>);
            break;
        default: break;
    }

    let typeIsInput = ['textarea', 'select'].includes(elementType);

    return (
        <div className="mb-4 w-full flex flex-wrap items-center">
            {!typeIsInput && label &&
                <label
                    className={`inline-block leading-5 tracking-wider font-semibold text-brand-gray ${['checkbox', 'radio'].includes(type) ? 'order-2 mb-0 ml-2' : 'mb-2'}`}
                    htmlFor={id}>
                    {label}
                </label>}
            { inputElement}
        </div >
    )
};

export default Input;