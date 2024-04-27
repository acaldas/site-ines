interface Props {
  title: string;
}

export default ({ title }: Props) => (
  <a
    className="text-white border-b border-transparent hover:border-white"
    href={`#${escape(title)}`}
  >
    {title}
  </a>
);
