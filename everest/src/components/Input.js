import React from 'react';
import uuid from 'react-uuid';

const Input = ({ elementType, changed, value, options, elementConfig, label, shouldValidate, invalid, touched, additionalClass }) => {
    let inputElement = null;
    let inputClasses = [];

    if (invalid && shouldValidate && touched) {
        inputClasses.push('focus:ring-red-400 focus:border-red-400');
    }

    if (['checkbox', 'radio'].includes(elementConfig.type)) {
        inputClasses.push('order-1');
    }

    if (!invalid) {
        inputClasses.push('focus:ring-green-400 focus:border-green-400');
    }

    if (additionalClass) {
        inputClasses.push(additionalClass);
    }

    switch (elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}
                checked={value}
                onChange={changed}
            />;
            break;
        case 'select':
            inputElement = (
                <select
                    {...elementConfig}
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
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    onChange={changed}>
                </textarea>);
            break;
        default: break;
    }


    return (
        <div className="mb-4 w-full flex flex-wrap items-center">
            {label &&
                <label
                    className={`inline-block leading-5 tracking-wider font-semibold text-brand-gray ${['checkbox', 'radio'].includes(elementConfig.type) ? 'order-2 mb-0 ml-2' : 'mb-2'}`}
                    htmlFor={elementConfig.id}>
                    {label}
                </label>}
            {inputElement}
        </div >
    )
};

export default Input;