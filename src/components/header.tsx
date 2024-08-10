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
import { Menu, Linkedin, Instagram } from "lucide-react";

interface Props {
  links: string[];
}

export default (props: Props) => {
  const { links } = props;

  const socialLinks = [
    <a
      key="linkedin"
      href="https://www.linkedin.com/in/inesnevescaldas/"
      className="text-accent"
    >
      <Linkedin size="28" strokeWidth={1.5} />
    </a>,
    <a
      key="instagram"
      href="https://www.instagram.com/inesnevescaldas.psiquiatra/"
      className="text-accent"
    >
      <Instagram size="28" strokeWidth={1.5} />
    </a>,
  ];

  return (
    <>
      <Navbar
        isBordered
        isBlurred={false}
        shouldHideOnScroll
        position="static"
        className="!bg-[#E9E0D8]"
        // classNames={{ base: "!bg-transparent" }}
      >
        <NavbarBrand>
          <a href="/" target="_top" className="text-accent text-xl">
            Inês Neves Caldas
          </a>
        </NavbarBrand>
        <NavbarContent
          className="hidden md:flex gap-2 lg:gap-5"
          justify="center"
        >
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
          <div className="gap-4 px-[10px] hidden xs:flex">{socialLinks}</div>
          <Dropdown placement="bottom" className="bg-bg">
            <DropdownTrigger>
              <Menu size={32} className="text-accent" />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Header Actions"
              variant="shadow"
              bottomContent={
                <div className="flex gap-4 px-[10px] xs:hidden">
                  {socialLinks}
                </div>
              }
            >
              {links.map((link) => (
                <DropdownItem key={link}>
                  <HeaderLink title={link} className="text-accent" />
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden md:flex">
          <NavbarItem className="flex gap-3">{socialLinks}</NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
