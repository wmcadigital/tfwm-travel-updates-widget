type PersonalRowTitleProps = {
  isFetching: boolean;
  title: string;
};

const PersonalRowTitle = ({ isFetching, title }: PersonalRowTitleProps): JSX.Element => (
  <div className="wmnds-travel-update__disruption-title">
    <h3 className="wmnds-m-none">{title}</h3>
    {isFetching && <strong>Loading...</strong>}
  </div>
);

export default PersonalRowTitle;
