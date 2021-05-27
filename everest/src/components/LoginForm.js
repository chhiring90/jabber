import React from 'react';
import { NavLink } from 'react-router-dom';

import Input from './Input';
import Button from './Button';
import { FormTitle, Form } from './FormElements';

const LoginForm = ({ loginData, changed, submit }) => {
    const transformedLoginData = Object.keys(loginData)
        .map(key => {
            return [...Array(loginData[key])]
                .map(input => <Input
                    key={input.key}
                    elementType={input.elementType}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    name={input.name}
                    label={input.label}
                    require={true}
                    value={input.value}
                    changed={changed}
                />)
        })
        .reduce((acc, el) => acc.concat(el), []);

    return (
        <Form onSubmit={submit}>
            <FormTitle
                title="Log In"
                link="/signup"
                linkContent="Create an account">
                Not registered yet?
            </FormTitle>
            {transformedLoginData}
            <NavLink
                className="block text-brand-primary font-semibold mb-4"
                to="/forgot-password">Forgot Password ?</NavLink>
            <Button
                buttonType="button"
                type="submit">Log In</Button>
        </Form>
    )
};

export default LoginForm;