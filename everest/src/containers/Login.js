import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import FormTitle from '../components/FormTitle';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <FormSection>
                <FormContainer>
                    <form className="max-w-lg w-full mx-auto" onSubmit={this.formSubmitHandler}>
                        <FormTitle
                            title="Log In"
                            link="/signup"
                            linkContent="Create an account">
                            Not registered yet?
                        </FormTitle>
                        <Input
                            elementType="input"
                            type="email"
                            placeholder="Your Email"
                            id="email"
                            name="email"
                            label="Your Email"
                            require={true} />
                        <Input
                            elementType="input"
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            label="Password" />
                        <Input
                            elementType="input"
                            type="checkbox"
                            id="checkbox"
                            name="checkbox"
                            label="Remember me" />
                        <NavLink
                            className="block text-brand-primary font-semibold mb-4"
                            to="/forgot-password">Forgot Password ?</NavLink>
                        <Button
                            buttonType="button"
                            type="submit">Log In</Button>
                    </form>
                </FormContainer>
                <FormGraphic></FormGraphic>
            </FormSection>
        )
    }

}