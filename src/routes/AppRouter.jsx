import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout';
import Home from '../pages/Home';
import Events from '../pages/Events';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
