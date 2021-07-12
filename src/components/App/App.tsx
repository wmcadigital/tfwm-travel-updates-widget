import ViewsToShow from 'components/ViewsToShow/ViewsToShow';
import { GlobalContextProvider } from 'globalState/GlobalStateContext';

const App = (): JSX.Element => (
  <GlobalContextProvider>
    <div className="wmnds-content-card wmnds-content-card--travel-updates">
      <ViewsToShow />
    </div>
  </GlobalContextProvider>
);

export default App;
