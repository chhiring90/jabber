import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import SignupForm from '../components/SignupForm';
import * as action from '../stores/actions/index';

class SignUp extends Component {

    state = {
        // isAuthenticated: false
        formData: {
            name: {
                key: `${uuid()}`,
                label: 'Your Name',
                elementType: 'input',
                type: 'text',
                placeholder: 'Your Name',
                id: 'name',
                name: 'name',
                require: true,
                value: '',
            },
            email: {
                key: `${uuid()}`,
                label: 'Your Email',
                elementType: 'input',
                type: 'email',
                placeholder: 'Your Email',
                id: 'email',
                name: 'email',
                require: true,
                value: '',
            },
            password: {
                key: `${uuid()}`,
                label: 'Password',
                elementType: 'input',
                type: 'password',
                placeholder: 'Password',
                id: 'password',
                name: 'password',
                require: true,
                value: '',
            },
            passwordConfirm: {
                key: `${uuid()}`,
                elementType: 'input',
                type: 'password',
                placeholder: 'Password Confirm',
                id: 'password-confirm',
                name: 'password-confirm',
                label: 'Password Confirm',
                require: true,
                value: '',
            }
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onSignUp()
    }

    onChangeHandler = (event, id) => {
        console.log(id);
    };

    render() {
        return (
            <FormSection>
                <FormContainer>
                    <SignupForm
                        changed={(event) => this.onChangeHandler}
                        signupData={this.state.formData}
                        submit={this.onSubmitHandler} />
                </FormContainer>
                <FormGraphic></FormGraphic>
            </FormSection>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (name, email, password, passwordConfirm) => dispatch(action.signup(name, email, password, passwordConfirm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);