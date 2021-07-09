type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  isButton?: boolean;
} & typeof defaultProps;

const defaultProps = {
  className: '',
  isButton: false,
};

const Link = ({ href, children, className, isButton }: LinkProps): JSX.Element => (
  <a href={encodeURI(href)} className={`${!isButton && 'wmnds-link'} ${className}`}>
    {children}
  </a>
);

Link.defaultProps = defaultProps;

export default Link;
