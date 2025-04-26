import { Outlet } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';
import { Header } from '../Components/Header/Header';

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
