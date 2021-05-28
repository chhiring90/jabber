import Input from './Input';
import Button from './Button';
import { FormTitle, Form } from './FormElements';

const SignupForm = ({ submit, signupData, changed }) => {
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

    return (
        <Form submit={submit}>
            <FormTitle
                title="Create Account"
                link="/login"
                linkContent="Login">
                Not registered yet?
            </FormTitle>
            {transformedLoginData}
            <Button buttonType="button" type="submit">Create Account</Button>
        </Form>
    );
};

export default SignupForm;