import React, {Component} from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Avatar from '../components/Avatar';
import Message from '../components/Message';
import Input from '../components/Input';
import { AiOutlinePlus } from 'react-icons/ai';

class Messages extends Component {
    state = {
        messages: [],
        formData: {
            imageUpload: {
                elementType: 'input',
                value: '',
                label: <AiOutlinePlus/>,
                elementConfig: {
                    id: 'image-upload',
                    name: 'image-upload',
                    type: 'file'
                },
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
            textarea: {
                elementType: 'textarea',
                value: '',
                elementConfig: {
                    placeholder: 'Type a message here',
                    id: 'textarea',
                    name: 'textarea',
                },
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
        },
    }

    render() {
        let textareaClass = 'border-none rounded-none px-4 py-5 resize-none max-h-20 h-20 focus:ring-opacity-0 focus:ring-offset-0 font-semibold text-brand-gray -mb-4';

        return(
            <div className="flex flex-wrap w-100 shadow-message">
                <div className="bg-brand-gray-200 border-brand-gray-400 border-b-2 flex-full px-6 pt-6 pb-3">
                    <Avatar size="medium" typing={false} name="Nika Jerrardo"/>
                </div>
                <SimpleBar className="flex-full max-h-chat p-5">
                    <Message />
                </SimpleBar>
                <div className="border-brand-gray-400 border-t-2 flex-full">
                    <div className="flex flex-wrap">
                        {Object.keys(this.state.formData)
                        .map(key => [...Array(this.state.formData[key])].map(input => {
                            return <Input
                            additionalClass={key === 'textarea' ? textareaClass : null}
                            elementType={input.elementType}
                            elementConfig={input.elementConfig}
                            label={input.label}
                            invalid={!input.valid}
                            require={input.require}
                            shouldValidate={input.validation}
                            touched={input.touched}
                            changed={event => event.target.value} />}
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages;