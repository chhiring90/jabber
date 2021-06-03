import React, {Component} from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Avatar from '../components/Avatar';
import Message from '../components/Message';

class Messages extends Component {
    state = {
        messages: []
    }

    render() {
        return(
            <div className="flex flex-wrap w-100 shadow-message">
                <div className="bg-brand-gray-200 border-brand-gray-400 border-b-2 flex-full px-6 pt-6 pb-3">
                    <Avatar size="medium" typing={false} name="Nika Jerrardo"/>
                </div>
                <SimpleBar className="flex-full max-h-chat p-5">
                    <Message />
                </SimpleBar>
            </div>
        )
    }
}

export default Messages;