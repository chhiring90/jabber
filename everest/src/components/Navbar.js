import React from 'react';

import Avatar from './Avatar';
import NavbarMenu from './NavbarMenu';
import Button from './Button';
import { AiOutlinePoweroff } from 'react-icons/ai';

const Navbar = () => {
    return (
        <nav className="flex-full w-full max-w-nav flex flex-wrap shadow-nav min-h-page h-screen bg-white pt-12">
            <Avatar size="large" name={'Henry Jabbawockiez'} />
            <NavbarMenu />
            <div className="mt-auto w-full">
                <Button customClass="flex justify-center text-lg tracking-wider items-center py-5 font-bold px-4 text-center text-brand-gray uppercase hover:text-brand-primary focus:text-brand-primary active:text-brand-primary transition">
                    <AiOutlinePoweroff className="mr-2" />
                Logout
            </Button>
            </div>
        </nav>
    )
}

export default Navbar;