import Navbar from '@/components/navbar-components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default MainLayout;
