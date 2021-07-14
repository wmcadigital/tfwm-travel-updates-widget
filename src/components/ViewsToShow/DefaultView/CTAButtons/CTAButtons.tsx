// Components
import Icon from 'components/shared/Icon/Icon';
import Link from 'components/shared/Link/Link';

const CTAButtons = (): JSX.Element => {
  const disruptionsLink = '//disruptions.tfwm.org.uk/?when=now&amp;isMapVisible=false';

  return (
    <div className="wmnds-grid wmnds-grid--spacing-sm-2-lg wmnds-p-t-md">
      {/* Add services button */}
      <div className="wmnds-col-1 wmnds-col-sm-1-2">
        <Link
          href={disruptionsLink}
          className="wmnds-btn wmnds-btn--mode wmnds-btn--block wmnds-m-b-md"
          isButton
        >
          Add services
          <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-expand" />
        </Link>
      </div>
      {/* View all updates button */}
      <div className="wmnds-col-1 wmnds-col-sm-1-2">
        <Link className="wmnds-btn wmnds-btn--block" href={disruptionsLink} isButton>
          View all updates
          <Icon
            className="wmnds-btn__icon wmnds-btn__icon--right"
            iconName="general-chevron-right"
          />
        </Link>
      </div>
    </div>
  );
};

export default CTAButtons;
