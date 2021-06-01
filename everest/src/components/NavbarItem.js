import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavbarItem = ({ link, children }) => {
    let [isActive, setIsActive] = useState(false);
    let currentLocation = window.location.pathname;

    useEffect(() => {
        if (link === currentLocation) {
            setIsActive(true);
        }
        return () => setIsActive(false);
    }, [currentLocation]);

    return (
        <li className="mb-5">
            <NavLink
                className="flex py-2 px-7 items-center relative uppercase text-brand-gray tracking-wide font-bold hover:text-brand-primary transition focus:text-brand-primary active:text-brand-primary"
                to={link}>
                {isActive ?
                    <span
                        className="bg-brand-primary inset-y-0 left-0 transition rounded-xl absolute block w-1 h-12 shadow-navlink"></span>
                    : null}
                {children}
            </NavLink>
        </li>
    );
};

export default NavbarItem;