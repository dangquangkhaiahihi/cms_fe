import React, { useEffect } from "react";
import Link from "next/link";

const Crumb = ({ text: defaultText, textGenerator, href, last = false }) => {
  const [text, setText] = React.useState(defaultText);
  const styleClass = last
    ? "breadcrumb-item text-muted breadcrumbs-item--active"
    : "breadcrumb-item text-muted";

  useEffect(async () => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!Boolean(textGenerator)) {
      return;
    }
    // Run the text generator and set the text again
    const finalText = await textGenerator();
    setText(finalText);
  }, [textGenerator]);

  return (
    <li className={styleClass}>
      <Link underline="hover" color="inherit" href={href}>
        <a className="text-dark-50">
          <span className="txt">{text}</span>
        </a>
      </Link>
    </li>
  );
};

export default Crumb;
