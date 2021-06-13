import React from 'react';
import uuid from 'react-uuid';

const Input = ({ 
    elementType,
    changed,
    value,
    options,
    elementConfig,
    label,
    shouldValidate,
    invalid,
    touched,
    additionalClass,
    fullWidth,
    additionalWrapClass }) => {

    let inputElement = null;
    let classes = {
        input: [],
        label: ['inline-block leading-5 tracking-wider font-semibold text-brand-gray'],
        wrap: ['flex flex-wrap items-center']
    };

    if (invalid && shouldValidate && touched) {
        classes.input.push('focus:ring-red-400 focus:border-red-400');
    }

    if (['checkbox', 'radio'].includes(elementConfig.type)) {
        classes.input.push('order-1');
        classes.label.push('order-2 mb-0 ml-2');
    }else {
        if(fullWidth){
            classes.wrap.push('w-full mb-4');
            classes.label.push('mb-2');
        }
    }

    if (!invalid) {
        classes.input.push('focus:ring-green-400 focus:border-green-400');
    }

    if (additionalClass) {
        classes.input.push(additionalClass);
    }

    if(additionalWrapClass){
        classes.wrap.push(additionalWrapClass)
    }

    if(elementConfig.type === 'file'){
        classes.input.push('absolute inset-0 w-full h-full opacity-0');
        classes.label.push('w-10 h-10 rounded-full mx-auto bg-brand-primary flex items-center justify-center');
        classes.wrap.push('relative flex-shrink-0 mb-0');
    }

    const onKeyPressTextarea = (event) => {
        if(event.key === 'Enter' && !event.shiftKey) event.preventDefault();
    }

    switch (elementType) {
        case 'input':
            inputElement = <input
                className={classes.input.join(' ')}
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
                    className={classes.input.join(' ')}
                    {...elementConfig}
                    onChange={changed}
                    onKeyPress={(event) => onKeyPressTextarea(event)}>
                </textarea>);
            break;
        default: break;
    }

    return (
        <div className={classes.wrap.join(' ')}>
            {label &&
                <label
                    className={classes.label.join(' ')}
                    htmlFor={elementConfig.id}>
                    {label}
                </label>}
            {inputElement}
        </div >
    )
};

export default Input;