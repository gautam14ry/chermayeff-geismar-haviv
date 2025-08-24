"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import "./PreContent.css";

interface Props {
  filterType: string;
}

const PreContent = ({ filterType }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Detect which filter is active from pathname
  const activeFilter = (() => {
    if (pathname.startsWith("/work/logos")) return "Logos";
    if (pathname.startsWith("/work/graphics")) return "Graphics";
    if (pathname.startsWith("/work/art-in-architecture")) return "Art in Architecture";
    return "Logos"; // fallback
  })();

  const filterLinks = [
    { label: "Logos", href: "/work/logos/" },
    { label: "Graphics", href: "/work/graphics/" },
    { label: "Art in Architecture", href: "/work/art-in-architecture/" },
  ];

  const sortOptions = [
    { label: "Curated", href: `/work/${filterType}` },
    { label: "A–Z", href: `/work/${filterType}/az` },
    { label: "Newest", href: `/work/${filterType}/new` },
  ];

  return (
    <section className="pageContent--workFilterAndSort">
      {/* Label acts as hover toggle */}
      <span
        className={classNames({
          'filter-toggle': true,
          'active': isOpen
        })}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {activeFilter}
      </span>

      {/* Other filter links (exclude active one) */}
      <div className="filter--otherLinks">
        {filterLinks
          .filter((link) => link.label !== activeFilter)
          .map((link) => (
            <span key={link.href} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
              <Link
                href={link.href}
              >{link.label}</Link>
            </span>
          ))}
      </div>

      {/* Sort Options */}
      <ul className="sort">
        {sortOptions.map((option) =>
          <li key={option.href}>
            <Link
              href={option.href}
              className={classNames({
                'active': pathname === option.href
              })}
            >
              {option.label}
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default PreContent;
