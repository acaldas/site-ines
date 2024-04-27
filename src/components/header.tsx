import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarMenuToggle,
} from "@nextui-org/react";
import HeaderLink from "./header-link";
import { Menu } from "lucide-react";

interface Props {
  links: string[];
}

export default (props: Props) => {
  const { links } = props;

  return (
    <Navbar shouldHideOnScroll className="bg-red">
      <NavbarBrand>
        <a href="https://inesnevescaldas.pt/" className="text-accent text-xl">
          Inês Neves Caldas
        </a>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link) => (
          <NavbarItem>
            <HeaderLink title={link} />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="sm:hidden" as="div">
        <Dropdown placement="bottom">
          <DropdownTrigger>
            <Menu size={32} className="text-accent" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Header Actions" variant="flat">
            {links.map((link) => (
              <DropdownItem key={link}>
                <HeaderLink title={link} />
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
