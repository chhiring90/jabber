import React from 'react';

import Avatar from './Avatar';
import NavbarMenu from './NavbarMenu';
import Button from './Button';
import DefaultAvatar from '../assets/images/jabber-default.svg';
import { AiOutlinePoweroff } from 'react-icons/ai';

const Navbar = () => {
    return (
        <nav className="max-w-nav flex-col w-full flex flex-wrap shadow-nav h-screen bg-white pt-12">
            <Avatar imageSrc={DefaultAvatar} size="large" name={'Henry Jabbawockiez'} />
            <NavbarMenu />
            <div className="flex-full mt-auto">
                <Button customClass="flex w-full justify-center text-lg tracking-wider items-center py-5 font-bold px-4 text-center text-brand-gray uppercase hover:text-brand-primary focus:text-brand-primary active:text-brand-primary transition">
                    <AiOutlinePoweroff className="mr-2" />
                Logout
            </Button>
            </div>
        </nav>
    )
}

export default Navbar;