import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import SignupForm from '../components/SignupForm';
import * as actions from '../stores/actions/index';

class SignUp extends Component {

    state = {
        // isAuthenticated: false
        formData: {
            name: {
                key: `${uuid()}`,
                label: 'Your Name',
                elementType: 'input',
                value: '',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    id: 'name',
                    name: 'name',
                },
                validation: {
                    require: true,
                },
            },
            email: {
                key: `${uuid()}`,
                label: 'Your Email',
                elementType: 'input',
                value: '',
                elementConfig: {
                    placeholder: 'Your Email',
                    type: 'email',
                    id: 'email',
                    name: 'email',
                },
                validation: {
                    require: true,
                    isEmail: true
                }
            },
            password: {
                key: `${uuid()}`,
                label: 'Password',
                elementType: 'input',
                value: '',
                elementConfig: {
                    placeholder: 'Password',
                    type: 'password',
                    id: 'password',
                    name: 'password'
                },
                validation: {
                    require: true,
                    minLength: 8
                },
            },
            passwordConfirm: {
                key: `${uuid()}`,
                elementType: 'input',
                label: 'Password Confirm',
                value: '',
                elementConfig: {
                    placeholder: 'Password Confirm',
                    id: 'password-confirm',
                    name: 'password-confirm',
                    type: 'password',
                },
                validation: {
                    require: true,
                    minLength: 8
                }
            }
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { name, email, password, passwordConfirm } = this.state.formData;
        this.props.onSignUp(name.value, email.value, password.value, passwordConfirm.value);
    }

    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.formData,
            [controlName]: {
                ...this.state.formData[controlName],
                value: event.target.value,
                // valid: checkValid
            }
        }

        this.setState({ formData: updateControls });
    };

    render() {
        console.log(this.props.isAuthenticated);
        return (
            <FormSection>
                <FormContainer>
                    <SignupForm
                        changed={this.inputChangeHandler}
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
        onSignUp: (name, email, password, passwordConfirm) => dispatch(actions.signup(name, email, password, passwordConfirm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);