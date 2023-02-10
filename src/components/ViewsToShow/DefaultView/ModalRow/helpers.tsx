// Components
import Link from 'components/shared/Link/Link';
// Types
import { JSXInternal } from 'preact/src/jsx';
import { DefaultModes, TransformedModes } from 'sharedTypes';

const correctModalIcon = (mode: DefaultModes): TransformedModes => {
  if (mode === 'tram') return 'metro';
  if (mode === 'train') return 'rail';
  return mode;
};

interface DisruptionIconToShow {
  iconName: string;
  disruptionIndicatorClass: string;
  htmlToShow: JSXInternal.Element;
  from: string;
  to: string;
}

const disruptionIconToShow = (
  totalDisruptions: number | undefined,
  mode: DefaultModes,
  from: string,
  to: string
): DisruptionIconToShow => {
  // If total modal disruption is 0 (no known disruptions)
  let iconName = 'general-success';
  let disruptionIndicatorClass = 'wmnds-disruption-indicator-medium--success';
  let htmlToShow = <strong>No known disruptions</strong>;

  // If total modal  disruptions on mode is not 0 then it has disruptions
  if (totalDisruptions !== 0) {
    iconName = 'general-warning-circle';
    disruptionIndicatorClass = 'wmnds-disruption-indicator-medium--warning';
    htmlToShow = (
      <Link href={`//disruptions.tfwm.org.uk/?mode=${mode}`}>
        {totalDisruptions} {totalDisruptions === 1 ? 'disruption' : 'disruptions'}
      </Link>
    );
  }

  return { iconName, disruptionIndicatorClass, htmlToShow, from, to };
};

export { correctModalIcon, disruptionIconToShow };
