import React from 'react';
import Avatar from './Avatar';
import Badge from './Badge';

const Chat = () => {
    return (
        <div className="shadow-chat rounded-md bg-white px-10 py-8 min-h-chat mb-9">
            <Avatar size="medium" name="Luy Robin" />
            <blockquote className="font-semibold text-brand-gray flex">
                <div className="flex-auto">
                    Most of its text is made up from sections 1.10.32–3 of Cicero's De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes).
                </div>
                <div className="flex-auto">
                    <Badge>3</Badge>
                </div>
            </blockquote>
        </div>
    )
}

export default Chat;