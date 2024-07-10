import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/home/home';
import ServicesPage from '../../pages/services/services';
import AboutPage from '../../pages/about/about';
import LoginPage from '../../pages/login/login';
import SearchPage from '../../pages/search/search';
import RegisterPage from '../../pages/register/register';

export const routes = {
  HOME: '/',
  SERVICES: '/services',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH_CATEGORY: {
    path: '/search/:category',
    url: (category) => `/search/${category}`
  },
  ERROR: '*',
}

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
  // {
  //   path: routes.ERROR,
  //   element: <ErrorPage />,
  // },
]);

export const Routes = () => {
  return <RouterProvider router={router} />
}