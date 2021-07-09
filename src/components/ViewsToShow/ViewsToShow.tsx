import { hasAnyFavourites } from 'helpers/cookies/cookies';
import CTAButtons from './CTAButtons/CTAButtons';
import DefaultView from './DefaultView/DefaultView';
import PersonalisedView from './PersonalisedView/PersonalisedView';

const ViewsToShow = (): JSX.Element => (
  <div className="wmnds-p-sm wmnds-col-1">
    <h2 className="wmnds-content-card__title">Travel updates</h2>

    {hasAnyFavourites() ? <PersonalisedView /> : <DefaultView />}

    <CTAButtons />
  </div>
);

export default ViewsToShow;
