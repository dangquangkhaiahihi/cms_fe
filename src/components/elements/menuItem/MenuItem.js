import Link from "next/link";

export const MenuItem = ({ id, title, path }) => {
  return (
    <li id={id} className="menu-item center" aria-haspopup="true">
      <Link href={path}>
        <a className="menu-link">
          <i className="menu-bullet menu-bullet-dot">
            <span></span>
          </i>
          <span className="menu-text">{title}</span>
        </a>
      </Link>
    </li>
  );
};
