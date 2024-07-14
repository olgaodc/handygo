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
  ERROR: '*',
};

export default routes;
