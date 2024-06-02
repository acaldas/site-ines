import { cn } from "@/utils";

interface Props {
  title: string;
  className?: string;
}

export default ({ title, className }: Props) => (
  <a
    className={cn(
      "border-b border-transparent hover:border-current no-underline",
      className,
    )}
    href={`#${escape(title)}`}
    target="_top"
  >
    {title}
  </a>
);
