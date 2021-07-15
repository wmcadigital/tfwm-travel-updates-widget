type PersonalRowTitleProps = {
  isFetching: boolean;
  hasError: boolean;
  title: string;
};

const PersonalRowTitle = ({ isFetching, hasError, title }: PersonalRowTitleProps): JSX.Element => (
  <>
    <div className="wmnds-travel-update__disruption-title">
      <h3 className="wmnds-m-none">{title}</h3>
      {isFetching && <strong>Loading...</strong>}
    </div>
    {hasError && (
      <>
        <span>
          Apologies, we are having technical difficulties loading your {title.toLowerCase()} travel
          updates.
          <br />
          Please try again later.
        </span>
      </>
    )}
  </>
);

export default PersonalRowTitle;
