export default function Link(props: {
  href: string;
  className: string;
  children: string;
}) {
  const isInternalLink = props.href && props.href.startsWith("/");
  const isAnchorLink = props.href && props.href.startsWith("#");

  if (isInternalLink || isAnchorLink) {
    return (
      <a href={props.href} className={props.className}>
        {props.children}
      </a>
    );
  }
  return (
    <a
      href={props.href}
      className={props.className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
}
