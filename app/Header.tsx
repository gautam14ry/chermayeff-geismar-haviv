'use client'

import Image from "next/image"
import Link from "next/link"
import "./Header.css";
import { usePathname } from "next/navigation";
import classNames from 'classnames';
import { useState } from "react";
import logo from '@/public/cgh-logo.svg'

const Header = () => {
    const currentPath = usePathname();
    const [toggleMenu, setToggleMenu] = useState(false);

    const links = [
        { label: 'Work', href: '/work/logos' },
        { label: 'Contact', href: '/contact' }
    ]

    const toggleMenuHandler = () => {
        setToggleMenu(!toggleMenu);
        const body = document.querySelector('body');
        if (!toggleMenu) {
            body?.classList.add('js-noScroll');
        } else {
            body?.classList.remove('js-noScroll');
        }
    }

    return (
        <header className="siteHeader" data-expanded={toggleMenu}>
            <div className="siteHeader--container">
                <Link className="homeLink" href="/">
                    <Image src={logo} alt="CGH logo" width={330} height={14} style={{ height: "auto" }} />
                </Link>

                <nav>
                    <button
                        aria-controls="primary-menu"
                        aria-label={toggleMenu ? "Close" : "Open"}
                        className="menu-toggle"
                        onClick={toggleMenuHandler}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className="menu" id="primary-menu">
                        {
                            links.map(link =>
                                <li key={link.href}>
                                    <Link
                                        className={classNames({
                                            'active': link.href == currentPath
                                        })}
                                        aria-current="false"
                                        href={link.href}
                                        onClick={() => setToggleMenu(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header