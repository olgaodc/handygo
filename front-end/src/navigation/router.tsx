import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from '@pages/home/home';
import ServicesPage from '@pages/services/services';
import AboutPage from '@pages/about/about';
import LoginPage from '@pages/login/login';
import SearchPage from '@pages/search/search';
import RegisterPage from '@pages/register/register';
import routes from './routes';

const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <HomePage />,
  },
  {
    path: routes.SERVICES,
    element: <ServicesPage />,
  },
  {
    path: routes.ABOUT,
    element: <AboutPage />,
  },
  {
    path: routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routes.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: routes.SEARCH_CATEGORY.path,
    element: <SearchPage />,
  },
  // TO DO:
  // {
  //   path: routes.ERROR,
  //   element: <ErrorPage />,
  // },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
