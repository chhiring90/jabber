import React, { Component } from 'react';

import Chat from '../components/Chat';
import Button from '../components/Button';
import { AiOutlinePlus } from 'react-icons/ai';

class Chats extends Component {
    render() {
        return (
            <>
                <div className="flex mb-5">
                    <div className="flex-auto w-3/5 font-semibold tracking-wider">
                        <h2 className="text-4xl font-bold">Chats</h2>
                        <p>Recent Chats</p>
                    </div>
                    <div className="flex-auto w-2/5">
                        <Button buttonType="button">
                            <AiOutlinePlus className="mr-2 w-5 h-5" />
                            Create New Room
                        </Button>
                    </div>
                </div>
                <Chat />
                <Chat />
                <Chat />
                <Chat />
            </>
        )
    }
}

export default Chats;