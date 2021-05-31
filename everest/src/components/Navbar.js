import React from 'react';

import Avatar from './Avatar';
import DefaultAvatar from '../assets/images/jabber-default.svg';

const Navbar = () => {
    return (
        <nav className="max-w-nav w-full shadow-nav h-screen bg-white pt-12">
            <Avatar imageSrc={DefaultAvatar} size="large" />
        </nav>
    )
}

export default Navbar;