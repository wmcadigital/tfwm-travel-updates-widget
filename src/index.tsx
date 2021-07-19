import 'preact/debug';
import habitat from 'preact-habitat';
import App from './components/App/App';

// eslint-disable-next-line no-console
console.log(`Loaded ${process.env.REACT_APP_NAME} - v${process.env.REACT_APP_VERSION}`);

habitat(App).render({
  selector: '[data-widget-host="habitat"]',
  clean: true,
});
