import React from 'react';
import { AiFillHome, AiFillCompass, AiFillWechat, AiFillSetting } from "react-icons/ai";

import NavbarItem from './NavbarItem';

const NavbarMenu = () => {
    return (
        <ul className="py-6 flex-full">
            <NavbarItem link="/"><AiFillHome className="mr-2" />Home</NavbarItem>
            <NavbarItem link="/discover"><AiFillCompass className="mr-2" />Discover</NavbarItem>
            <NavbarItem link="/chats"><AiFillWechat className="mr-2" />Chats</NavbarItem>
            <NavbarItem link="/settings"><AiFillSetting className="mr-2" />Settings</NavbarItem>
        </ul>
    )
}

export default NavbarMenu;