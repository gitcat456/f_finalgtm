import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';
import AnalyticsTracker from './components/AnalyticsTracker';

const App = () => {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
