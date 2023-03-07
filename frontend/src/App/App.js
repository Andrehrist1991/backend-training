// Modules
import { Provider } from 'react-redux';

// Components
import AppRoutes from './AppRoutes';
import Header from 'Components/Header';

// Store
import store from './app-store';

// Styles
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
