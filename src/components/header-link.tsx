import { cn } from "@/utils";

interface Props {
  title: string;
  className?: string;
  bold?: boolean;
}

export default ({ title, className, bold }: Props) => (
  <a
    className={cn(
      "border-b border-transparent hover:border-current no-underline text-accent",
      bold && "bg-accent text-white px-2 py-1 rounded-xl",
      className,
    )}
    href={`#${escape(title)}`}
    target="_top"
  >
    {title}
  </a>
);
