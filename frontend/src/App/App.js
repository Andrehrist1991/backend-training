// Modules

// Components
import AppRoutes from './AppRoutes';
import Header from 'Components/Header';

// Styles
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
