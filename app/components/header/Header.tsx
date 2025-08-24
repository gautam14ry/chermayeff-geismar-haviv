'use client'

import Image from "next/image"
import Link from "next/link"
import "./Header.css";
import { usePathname } from "next/navigation";
import classNames from 'classnames';
import { useState, useEffect, useRef } from "react";
import logo from '@/public/cgh-logo.svg'

const Header = () => {
    const currentPath = usePathname();
    const [toggleMenu, setToggleMenu] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);

    const links = [
        { label: 'Work', href: '/work/logos' },
        { label: 'Contact', href: '/contact' }
    ]

    // Handle scroll shrink (adds/removes class on body)
    useEffect(() => {
        const handleScroll = () => {
            if (!headerRef.current) return;

            const headerHeight = headerRef.current.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY > headerHeight / 4) {
                document.body.classList.add("js-shrunkNav");
            } else {
                document.body.classList.remove("js-shrunkNav");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle no-scroll when mobile menu is open
    useEffect(() => {
        if (toggleMenu) {
            document.body.classList.add("js-noScroll");
        } else {
            document.body.classList.remove("js-noScroll");
        }
    }, [toggleMenu]);

    const toggleMenuHandler = () => {
        setToggleMenu(prev => !prev);
    };

    return (
        <header
            ref={headerRef}
            className="siteHeader"
            data-expanded={toggleMenu}
        >
            <div className="siteHeader--container">
                <Link className="homeLink" href="/">
                    <Image
                        src={logo}
                        alt="CGH logo"
                        width={330}
                        height={14}
                        style={{ height: "auto" }}
                        priority 
                    />
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
                        {links.map(link => (
                            <li key={link.href}>
                                <Link
                                    className={classNames({
                                        'active': link.href === currentPath
                                    })}
                                    href={link.href}
                                    onClick={() => setToggleMenu(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
