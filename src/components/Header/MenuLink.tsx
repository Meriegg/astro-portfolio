interface Props {
  text: string;
  href: string;
}

const MenuLink = ({ text, href }: Props) => {
  return (
    <a role="menuitem" href={href} className="text-4xl font-semibold">
      {text}
    </a>
  );
};

export default MenuLink;
