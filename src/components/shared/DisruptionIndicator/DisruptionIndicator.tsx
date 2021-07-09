import Icon from 'components/shared/Icon/Icon';
import { TransformedModes, DisruptionSeverity } from 'sharedTypes';
import Link from '../Link/Link';

const getSeverityVars = (disruptionSeverity: DisruptionSeverity) => {
  let disruptionFlag = {
    text: 'Unknown service',
    icon: 'success',
    class: 'success',
  };

  // Do a switch on the disruption severity, then map the type and iconName to the correct vars
  switch (disruptionSeverity) {
    // Minor disruption (normal)
    case 'normal':
      disruptionFlag = {
        text: 'Minor disruption',
        icon: 'warning-circle',
        class: 'warning',
      };
      break;
    // Major disruption (high)
    case 'high':
      disruptionFlag = {
        text: 'Major disruption',
        icon: 'warning-triangle',
        class: 'error',
      };
      break;
    // Severe disruption (veryHigh)
    case 'veryHigh':
      disruptionFlag = {
        text: 'Severe disruption',
        icon: 'warning-triangle',
        class: 'severe',
      };
      break;
    // Good service (low)
    default:
      disruptionFlag = {
        text: 'Good service',
        icon: 'success',
        class: 'success',
      };
      break;
  }

  return disruptionFlag;
};

type DisruptionIndicatorProps = {
  disruptionSeverity: DisruptionSeverity;
  disruptionUrlSearchParams?: string;
  formatDisruptionIndicatorText?: boolean;
  indicatorText: string;
  optionalText?: string;
  modalIcon: TransformedModes;
} & typeof defaultProps;

const defaultProps = {
  disruptionUrlSearchParams: '',
  formatDisruptionIndicatorText: false,
  optionalText: '',
};

const DisruptionIndicator = ({
  disruptionSeverity,
  disruptionUrlSearchParams,
  formatDisruptionIndicatorText,
  indicatorText,
  modalIcon,
  optionalText,
}: DisruptionIndicatorProps): JSX.Element => {
  const severity = getSeverityVars(disruptionSeverity);

  return (
    <div className="wmnds-travel-update__disruption">
      <button
        type="button"
        className="wmnds-travel-update__disruption-indicator-btn"
        aria-expanded="false"
      >
        <div
          className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--narrow
          wmnds-disruption-indicator-medium--${severity.class} ${
            formatDisruptionIndicatorText && 'wmnds-disruption-indicator-medium--capitalize'
          }`}
        >
          <Icon
            className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--left"
            iconName={`modes-isolated-${modalIcon}`}
          />

          <span className="wmnds-disruption-indicator-medium__service ">{indicatorText}</span>

          <Icon
            className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
            iconName={`general-${severity.icon}`}
          />
        </div>
      </button>

      <div className="wmnds-travel-update__disruption-text">
        {optionalText && <strong>{optionalText}</strong>}
        {
          // If good service, display as strong. Otherwise display as link to that service
          severity.text !== 'Good service' ? (
            <Link href={`//disruptions.tfwm.org.uk/${disruptionUrlSearchParams}`}>
              {severity.text}
            </Link>
          ) : (
            <strong>{severity.text}</strong>
          )
        }
      </div>
    </div>
  );
};

DisruptionIndicator.defaultProps = defaultProps;

export default DisruptionIndicator;
