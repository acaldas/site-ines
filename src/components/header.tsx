import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import HeaderLink from "./header-link";
import { Menu } from "lucide-react";

interface Props {
  links: string[];
}

export default (props: Props) => {
  const { links } = props;

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred
      position="static"
      className="!bg-transparent"
      classNames={{ base: "!bg-transparent" }}
    >
      <NavbarBrand>
        <a href="/" className="text-accent text-xl">
          Inês Neves Caldas
        </a>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-2 lg:gap-5" justify="center">
        {links.map((link) => (
          <NavbarItem
            key={link}
            className="text-white/70 hover:text-white text-sm lg:text-base"
          >
            <HeaderLink title={link} />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="md:hidden" as="div">
        <Dropdown placement="bottom" className="bg-bg">
          <DropdownTrigger>
            <Menu size={32} className="text-accent" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Header Actions" variant="shadow">
            {links.map((link) => (
              <DropdownItem key={link}>
                <HeaderLink title={link} className="text-lg text-text" />
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
