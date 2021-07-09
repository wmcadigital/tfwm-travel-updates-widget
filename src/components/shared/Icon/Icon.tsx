// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html
type IconProps = {
  title?: string;
  description?: string;
  className?: string;
  iconName: string;
} & typeof defaultProps;

const defaultProps = {
  title: '',
  description: '',
  className: '',
};

const Icon = ({ title, description, className, iconName }: IconProps): JSX.Element => (
  <svg className={className}>
    {title && <title>{title}</title>}
    {description && <desc>{description}</desc>}
    <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
  </svg>
);

Icon.defaultProps = defaultProps;

export default Icon;
