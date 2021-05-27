import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../components/Input';
import Button from '../components/Button';
import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import FormTitle from '../components/FormTitle';
import * as action from '../stores/actions/index';

class SignUp extends Component {

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
                            title="Create Account"
                            link="/login"
                            linkContent="Login">
                            Not registered yet?
                        </FormTitle>
                        <Input
                            elementType="input"
                            type="text"
                            placeholder="Your Name"
                            id="name"
                            name="name"
                            label="Your Name" />
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
                            type="password"
                            placeholder="Password Confirm"
                            id="password-confirm"
                            name="password-confirm"
                            label="Password Confirm" />
                        <Button buttonType="button" type="submit">Create Account</Button>
                    </form>
                </FormContainer>
                <FormGraphic></FormGraphic>
            </FormSection>
        )
    }

}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);