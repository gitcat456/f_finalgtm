import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout';
import Home from '../pages/Home';
import Events from '../pages/Events';
import AboutPage from '../pages/About';
import BranchesPage from '../pages/Locations';
import SocialsPage from '../pages/Socials';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="locations" element={<BranchesPage />} />
        <Route path="gtm_socials" element={<SocialsPage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
