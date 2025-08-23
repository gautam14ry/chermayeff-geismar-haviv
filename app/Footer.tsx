import Link from "next/link";
import './Footer.css';

type NavLink = {
    label: string;
    href: string;
    external?: boolean;
};

type Contact = {
    title: string;
    name?: string;
    phone?: string;
    email: string;
};

const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/logos/" },
    { label: "Contact", href: "/contact/" },
];

const contacts: Contact[] = [
    {
        title: "Work Inquiries",
        email: "info@cghnyc.com",
    },
    {
        title: "Press Inquiries",
        name: "Christopher Nutter",
        phone: "917.770.0350",
        email: "press@cghnyc.com",
    },
];

const socials: NavLink[] = [
    { label: "Twitter", href: "https://twitter.com/cghnyc", external: true },
    { label: "Instagram", href: "https://www.instagram.com/chermayeff_geismar_haviv/", external: true },
    { label: "Facebook", href: "https://www.facebook.com/cghnyc", external: true },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer--container">

                {/* Navigation */}
                <section className="site-footer--links">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Address */}
                <section className="site-footer--address">
                    <span>
                        <strong>Chermayeff &amp; Geismar &amp; Haviv</strong>
                        <br />
                        27 West 24th Street, Suite 900
                        <br />
                        New York, NY 10010
                        <br />
                        212.532.4595
                    </span>
                </section>

                {/* Contacts */}
                <section className="site-footer--contact">
                    <ul>
                        {contacts.map((c) => (
                            <li key={c.title}>
                                <span>
                                    <strong>{c.title}</strong>
                                    <br />
                                    {c.name && <>{c.name}<br /></>}
                                    {c.phone && <>{c.phone}<br /></>}
                                    <a href={`mailto:${c.email}`} target="_blank" rel="noopener noreferrer">
                                        {c.email}
                                    </a>
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Social Links */}
                <section className="site-footer--social">
                    <ul>
                        {socials.map((s) => (
                            <li key={s.href}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer">
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </footer>
    );
}
