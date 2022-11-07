// Types
import { DisruptionSeverity } from 'sharedTypes';
// Components
import Link from '../Link/Link';

interface GetSeverityVarsReturnType {
  text: string;
  icon: string;
  class: string;
}

export const getSeverityVars = (
  disruptionSeverity: DisruptionSeverity
): GetSeverityVarsReturnType => {
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
    // No known disruptions (low)
    default:
      disruptionFlag = {
        text: 'No known disruptions',
        icon: 'success',
        class: 'success',
      };
      break;
  }

  return disruptionFlag;
};

export const disruptionTextElementToShow = (text: string, urlPath: string): JSX.Element => {
  //  // If no known disruptions, display as strong. Otherwise display as link to that service
  if (text.toLowerCase() !== 'no known disruptions')
    return <Link href={`//disruptions.tfwm.org.uk/${urlPath}`}>{text}</Link>;

  return <strong>{text}</strong>;
};
