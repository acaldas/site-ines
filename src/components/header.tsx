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

const defaultLinks = [
  "Sobre mim",
  "Atividade",
  "Media",
  "Ebook",
  "Marcar consulta",
];

const ebookLink = "https://inesnevescaldas.com/ebook-pca-2/";

interface Props {
  links?: string[];
}

const highlightedLinks = ["Ebook", "Marcar consulta"];

export default (props: Props) => {
  const { links = defaultLinks } = props;

  const regularLinks = links.filter((link) => !highlightedLinks.includes(link));
  const ctaLinks = links.filter((link) => highlightedLinks.includes(link));

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
          className="hidden md:flex gap-2 lg:gap-5 flex-grow !justify-evenly"
          justify="center"
        >
          {links.map((link) => (
            <NavbarItem
              key={link}
              className="text-white/70 hover:text-white text-sm lg:text-base"
            >
              <HeaderLink
                title={link}
                bold={link === "Marcar consulta" || link === "Ebook"}
                href={link === "Ebook" ? ebookLink : undefined}
              />
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end" className="md:hidden gap-2" as="div">
          {ctaLinks.map((link) => (
            <NavbarItem key={link} className="hidden xs:flex">
              <HeaderLink
                title={link}
                bold
                href={link === "Ebook" ? ebookLink : undefined}
              />
            </NavbarItem>
          ))}
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
              {regularLinks.map((link) => (
                <DropdownItem key={link}>
                  <HeaderLink title={link} />
                </DropdownItem>
              ))}
              {ctaLinks.map((link) => (
                <DropdownItem key={link} className="xs:hidden">
                  <HeaderLink
                    title={link}
                    bold
                    href={link === "Ebook" ? ebookLink : undefined}
                  />
                </DropdownItem>
              ))}
              <DropdownItem className="hidden xs:flex">
                <div className="flex gap-4 px-[10px]">{socialLinks}</div>
              </DropdownItem>
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
