import Input from './Input';
import Button from './Button';
import { FormTitle, Form, FormMessage } from './FormElements';
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

    return (
        <Form submit={submit}>
            <FormTitle
                title="Create Account"
                link="/login"
                linkContent="Login">
                Not registered yet?
            </FormTitle>
            {message && <FormMessage message={message} />}
            {transformedLoginData}
            <Button buttonType="button" type="submit">Create Account {spinner}</Button>
        </Form>
    );
};

export default SignupForm;