// import 'preact/debug';
import habitat from 'preact-habitat';
import App from './components/App/App';

const { REACT_APP_NAME, REACT_APP_VERSION } = process.env;

// eslint-disable-next-line no-console
console.log(`Loaded ${REACT_APP_NAME} - v${REACT_APP_VERSION}`);

habitat(App).render({
  selector: `[data-widget-host="${REACT_APP_NAME}"]`,
  clean: true,
});
