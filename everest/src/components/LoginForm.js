import React from 'react';
import { NavLink } from 'react-router-dom';

import Input from './Input';
import Button from './Button';
import { FormTitle, Form, FormMessage } from './FormElements';
import Spinner from './Spinner';

const LoginForm = ({ loginData, changed, submit, message, isLoading }) => {
    const transformedLoginData = Object.keys(loginData)
        .map(key => {
            return [...Array(loginData[key])]
                .map(input => {
                    return <Input
                        key={input.key}
                        elementType={input.elementType}
                        label={input.label}
                        elementConfig={input.elementConfig}
                        require={true}
                        invalid={!input.valid}
                        shouldValidate={input.validation}
                        touched={input.touched}
                        value={input.value}
                        changed={(event) => changed(event, key)}
                    />
                })
        })
        .reduce((acc, el) => acc.concat(el), []);

    let spinner = isLoading ? <Spinner /> : null;

    return (
        <Form submit={submit}>
            <FormTitle
                title="Log In"
                link="/signup"
                linkContent="Create an account">
                Not registered yet?
            </FormTitle>
            {message && <FormMessage message={message} />}
            {transformedLoginData}
            <NavLink
                className="block text-brand-primary font-semibold mb-4"
                to="/forgot-password">Forgot Password ?</NavLink>
            <Button
                buttonType="button"
                type="submit">Log In {spinner}</Button>
        </Form>
    )
};

export default LoginForm;