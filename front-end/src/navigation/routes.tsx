const routes = {
  HOME: '/',
  SERVICES: '/services',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH_CATEGORY: {
    path: '/search/:category',
    url: (category: string) => `/search/${category}`,
  },
  BUSINESS_ID: {
    path: '/business/:id',
    url: (id: string) => `/business/${id}`,
  },
  BOOKINGS: '/bookings',
  ACCOUNT: '/account',
  ERROR: '*',
};

export default routes;
