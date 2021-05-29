import Input from './Input';
import Button from './Button';
import { FormTitle, Form } from './FormElements';
import Spinner from './Spinner';

const SignupForm = ({ submit, signupData, changed, isLoading, message }) => {
    const transformedLoginData = Object.keys(signupData)
        .map(key => {
            return [...Array(signupData[key])]
                .map(input => <Input
                    key={key}
                    elementType={input.elementType}
                    elementConfig={input.elementConfig}
                    label={input.label}
                    require={input.require}
                    changed={event => changed(event, key)} />)
        })
        .reduce((acc, el) => acc.concat(el), []);

    let spinner = isLoading ? <Spinner /> : null;

    let messageClassName;

    console.log(message[0]);

    switch (message[0]) {
        case 'MESSAGE_SUCCESS':
            messageClassName = 'text-green-400';
            break;
        case 'MESSAGE_ERROR':
            messageClassName = 'text-red-400';
            break;
        case 'MESSAGE_INFO':
            messageClassName = 'text-blue-500';
            break;
        default: break;
    }

    return (
        <Form submit={submit}>
            <FormTitle
                title="Create Account"
                link="/login"
                linkContent="Login">
                Not registered yet?
            </FormTitle>
            {message && <p className={`${messageClassName} text-sm font-bold mb-3`}>{message[1]}</p>}
            {transformedLoginData}
            <Button buttonType="button" type="submit">Create Account {spinner}</Button>
        </Form>
    );
};

export default SignupForm;