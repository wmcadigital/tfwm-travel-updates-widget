// Components
import Icon from 'components/shared/Icon/Icon';
// Helpers
import { capitaliseFirstChar } from 'sharedHelpers';
import { correctModalIcon, disruptionIconToShow } from './helpers';
// Types
import { ModalRowProps } from './types';

const ModalRow = ({ isFetching, response, mode, from, to }: ModalRowProps): JSX.Element => {
  const modalIcon = correctModalIcon(mode);
  const modalName = mode === 'roads' ? 'road' : mode;
  const totalDisruptions = response?.totals[modalName];

  let { iconName, disruptionIndicatorClass, htmlToShow } = disruptionIconToShow(
    totalDisruptions,
    mode,
    from,
    to
  );

  if (isFetching) {
    iconName = 'general-warning-circle';
    htmlToShow = <strong>Loading</strong>;
    disruptionIndicatorClass = '';
  }

  return (
    <>
      <div className="wmnds-travel-update">
        <div className="wmnds-travel-update__disruption">
          <div
            className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--narrow ${disruptionIndicatorClass}`}
          >
            <Icon
              className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--left"
              iconName={`modes-isolated-${modalIcon}`}
            />
            <Icon
              className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
              iconName={iconName}
            />
          </div>
          <h3 className="wmnds-m-none">{capitaliseFirstChar(mode)}</h3>
          <div className="wmnds-travel-update__disruption-text">{htmlToShow}</div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ModalRow;
