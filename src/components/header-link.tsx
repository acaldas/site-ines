import { cn } from "@/utils";

interface Props {
  title: string;
  className?: string;
  bold?: boolean;
  href?: string;
}

export default ({ title, className, bold, href }: Props) => (
  <a
    className={cn(
      "border-b border-transparent hover:border-current no-underline text-accent",
      bold && "bg-accent text-white px-2 py-1 rounded-xl",
      className,
    )}
    href={href ?? `/#${escape(title)}`}
    target="_top"
  >
    {title}
  </a>
);
