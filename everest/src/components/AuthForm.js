import React from 'react';
import { NavLink } from 'react-router-dom';

import Input from './Input';
import Button from './Button';
import { FormTitle, FormMessage } from './AuthFormElements';
import Spinner from './Spinner';

const AuthForm = ({ submit, formData, changed, isLoading, message, formTitle, isLoginForm }) => {

    const form = Object.keys(formData)
        .map(key => {
            return [...Array(formData[key])]
                .map(input => <Input
                    key={key}
                    elementType={input.elementType}
                    elementConfig={input.elementConfig}
                    label={input.label}
                    invalid={!input.valid}
                    require={input.require}
                    shouldValidate={input.validation}
                    touched={input.touched}
                    changed={event => changed(event, key)}
                    fullWidth={true} />)
        })
        .reduce((acc, el) => acc.concat(el), []);

    return (
        <form
            onSubmit={(event) => submit(event)}
            className="w-full">
            <FormTitle formTitle={formTitle} />
            {message && <FormMessage message={message} />}
            {form}
            {isLoginForm ? <NavLink
                className="block text-brand-primary font-semibold mb-4"
                to="/forgot-password">Forgot Password ?</NavLink> : null}
            <Button buttonType="button" type="submit">Create Account {isLoading ? <Spinner /> : null}</Button>
        </form >
    );
};

export default AuthForm;