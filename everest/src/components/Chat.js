import React from 'react';
import Avatar from './Avatar';
import Badge from './Badge';

const Chat = ({status, name, clicked, active}) => {
    return (
        <div
            onClick={clicked}
            className={`shadow-chat relative select-none cursor-pointer rounded-md transition border-2 border-transparent px-7 py-7 min-h-chat mb-9 ${active ? 'bg-brand-gray-100' : 'bg-white '}`}>
            <Avatar 
                status={status} 
                typing={true}
                size="medium" 
                name={name} />
            <blockquote
                className="font-semibold text-brand-gray flex text-base leading-tight">
                <div 
                    className="flex-auto pr-2">
                    Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes).
                </div>
                <div 
                    className="flex-auto">
                    <Badge>3</Badge>
                </div>
            </blockquote>
        </div>
    );
};

export default Chat;