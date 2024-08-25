import Navbar from '@/components/navbar-components/navbar/navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <ToastContainer
        bodyClassName='toastBody'
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
      <Footer />
    </>
  );
};

export default MainLayout;
