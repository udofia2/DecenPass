import { lazy } from 'react';

const FormElements = lazy(() => import('../Form/FormElements'));
const FormLayout = lazy(() => import('../Form/FormLayout'));
const Profile = lazy(() => import('../Profile'));
const Settings = lazy(() => import('../Settings'));
const Tables = lazy(() => import('../Tables'));


const coreRoutes = [

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  
];

const routes = [...coreRoutes];
export default routes;
